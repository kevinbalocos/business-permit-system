import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Link } from "react-router-dom";
import { Building, TrendingUp, Clock, Users, Moon, Sun } from "lucide-react";

import abstractBG from "../assets/abstract-entrypage-bg.png";

// Keys used for persistence
const THEME_KEY = "alaminos_theme_v1";
const DISABLE_3D_KEY = "alaminos_3d_disabled_v1";

export default function Advanced3DBusinessPermitEntry() {
  const wrapperRef = useRef(null); // { wrapper, bg, canvasContainer, _three }
  const rafRef = useRef(null);

  // Heuristic: consider device low-end if few CPU cores or little device memory.
  const isLowEndDevice = (() => {
    try {
      if (typeof navigator === "undefined") return false;
      const cores = navigator.hardwareConcurrency || 2;
      const mem = navigator.deviceMemory || 2;
      return cores <= 2 || mem <= 2;
    } catch (e) {
      return false;
    }
  })();

  // Theme persisted (fallback to prefers-color-scheme if available)
  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved) return saved;
      if (
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      )
        return "dark";
    } catch (e) {}
    return "light";
  });
  const setTheme = (t) => {
    setThemeState(t);
    try {
      localStorage.setItem(THEME_KEY, t);
    } catch (e) {}
  };

  // Persisted 3D toggle (default: disabled on low-end devices or very small screens)
  const [disable3D, setDisable3D] = useState(() => {
    try {
      const saved = localStorage.getItem(DISABLE_3D_KEY);
      if (saved !== null) return saved === "1" || saved === "true";
    } catch (e) {}
    // default: disable on low-end or narrow viewports
    try {
      if (isLowEndDevice) return true;
      if (typeof window !== "undefined" && window.innerWidth < 700) return true;
    } catch (e) {}
    return false;
  });
  useEffect(() => {
    try {
      localStorage.setItem(DISABLE_3D_KEY, disable3D ? "1" : "0");
    } catch (e) {}
  }, [disable3D]);

  // small realtime clock for UI
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Utility: check webgl support quickly
  const supportsWebGL = () => {
    try {
      const canvas = document.createElement("canvas");
      return !!(
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      );
    } catch {
      return false;
    }
  };

  // Mobile nav popover state + refs (we avoid hamburger; provide compact action popover)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);

  // Close mobile menu on outside click / Escape
  useEffect(() => {
    const onDocClick = (e) => {
      if (!mobileMenuOpen) return;
      const menu = mobileMenuRef.current;
      const btn = mobileMenuButtonRef.current;
      if (menu && !menu.contains(e.target) && btn && !btn.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileMenuOpen]);

  // Cleanup helper (idempotent)
  const cleanupThreeWrapper = () => {
    try {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    } catch {}
    try {
      const w = wrapperRef.current;
      if (w?.wrapper) {
        // attempt to dispose resources if available
        const t = w._three;
        if (t) {
          try {
            t.particleGeometry && t.particleGeometry.dispose();
          } catch {}
          try {
            t.particleMaterial && t.particleMaterial.dispose();
          } catch {}
          try {
            t.buildingGeometry && t.buildingGeometry.dispose();
          } catch {}
          try {
            if (Array.isArray(t.buildings)) {
              t.buildings.forEach((b) => {
                try {
                  b.geometry && b.geometry.dispose();
                } catch {}
                try {
                  if (b.material) {
                    if (Array.isArray(b.material))
                      b.material.forEach((m) => m.dispose());
                    else b.material.dispose();
                  }
                } catch {}
              });
            }
          } catch {}
        }
        // remove DOM wrapper
        document.body.removeChild(w.wrapper);
      }
    } catch (e) {
      // ignore
    } finally {
      wrapperRef.current = null;
    }
  };

  // MAIN: initialize / destroy three only when 3D is enabled
  useEffect(() => {
    // if user disabled 3D or no webgl support -> ensure cleaned up and return
    if (disable3D || typeof window === "undefined" || !supportsWebGL()) {
      cleanupThreeWrapper();
      return;
    }

    // create wrapper fixed to viewport
    const wrapper = document.createElement("div");
    wrapper.style.position = "fixed";
    wrapper.style.inset = "0";
    wrapper.style.zIndex = "0"; // UI should be z-50+
    wrapper.style.pointerEvents = "none";
    wrapper.className = "advanced-3d-wrapper";

    // scene-only background (separate from hero image)
    const bg = document.createElement("div");
    bg.style.position = "absolute";
    bg.style.inset = "0";
    bg.style.zIndex = "0";
    bg.style.pointerEvents = "none";
    bg.style.background =
      theme === "light"
        ? "linear-gradient(180deg, rgba(250,252,254,1) 0%, rgba(235,249,246,1) 100%)"
        : "linear-gradient(180deg, rgba(4,16,37,1) 0%, rgba(7,16,38,1) 100%)";

    const canvasContainer = document.createElement("div");
    canvasContainer.style.position = "absolute";
    canvasContainer.style.inset = "0";
    canvasContainer.style.zIndex = "1";
    canvasContainer.style.pointerEvents = "none";

    wrapper.appendChild(bg);
    wrapper.appendChild(canvasContainer);
    document.body.appendChild(wrapper);

    // store early for cleanup
    wrapperRef.current = { wrapper, bg, canvasContainer, _three: null };

    // low-end heuristic (re-check inside effect)
    const isLowEnd = isLowEndDevice || window.innerWidth < 600;

    // THREE scene
    const scene = new THREE.Scene();

    // camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.set(0, 5, isLowEnd ? 20 : 18);

    // renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isLowEnd,
      alpha: true,
    });
    const dpr = Math.min(window.devicePixelRatio || 1, isLowEnd ? 1 : 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.pointerEvents = "none";
    renderer.shadowMap.enabled = !isLowEnd;
    canvasContainer.appendChild(renderer.domElement);

    // lights
    const ambient = new THREE.AmbientLight(
      0xffffff,
      theme === "light" ? 1.0 : 0.45
    );
    scene.add(ambient);
    const dir = new THREE.DirectionalLight(
      0xffffff,
      theme === "light" ? 0.9 : 1.0
    );
    dir.position.set(10, 20, 10);
    if (!isLowEnd) dir.castShadow = true;
    scene.add(dir);
    const p1 = new THREE.PointLight(0x5eead4, 0.45, 80);
    p1.position.set(-18, 12, 18);
    scene.add(p1);
    const p2 = new THREE.PointLight(0xffb86b, 0.35, 60);
    p2.position.set(18, 8, -12);
    scene.add(p2);

    // buildings
    const buildingGeometry = new THREE.BoxGeometry(2, 8, 2);
    const buildings = [];
    const BUILDING_COUNT = isLowEnd ? 8 : 20;
    for (let i = 0; i < BUILDING_COUNT; i++) {
      const mat = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(
          0.55 + Math.random() * 0.06,
          theme === "light" ? 0.22 : 0.35,
          theme === "light" ? 0.75 : 0.45
        ),
        transparent: true,
        opacity: 0.95,
      });
      const mesh = new THREE.Mesh(buildingGeometry, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 60,
        Math.random() * 6,
        (Math.random() - 0.5) * 60
      );
      scene.add(mesh);
      buildings.push(mesh);
    }

    // character (low-poly)
    const char = new THREE.Group();
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, isLowEnd ? 8 : 12, isLowEnd ? 8 : 12),
      new THREE.MeshPhongMaterial({ color: 0xffe0c4 })
    );
    head.position.y = 2;
    char.add(head);
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.6, 0.8, 2, 8),
      new THREE.MeshPhongMaterial({ color: 0x0ea5a6 })
    );
    body.position.y = 0.5;
    char.add(body);
    const leftArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.15, 1.5, isLowEnd ? 6 : 8),
      new THREE.MeshPhongMaterial({ color: 0xffe0c4 })
    );
    leftArm.position.set(-1, 1, 0);
    leftArm.rotation.z = Math.PI / 6;
    char.add(leftArm);
    const rightArm = leftArm.clone();
    rightArm.position.set(1, 1, 0);
    rightArm.rotation.z = -Math.PI / 6;
    char.add(rightArm);
    const leftLeg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.2, 2, isLowEnd ? 6 : 8),
      new THREE.MeshPhongMaterial({ color: 0x102840 })
    );
    leftLeg.position.set(-0.3, -1.5, 0);
    char.add(leftLeg);
    const rightLeg = leftLeg.clone();
    rightLeg.position.set(0.3, -1.5, 0);
    char.add(rightLeg);
    const doc = new THREE.Mesh(
      new THREE.PlaneGeometry(0.5, 0.7),
      new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide })
    );
    doc.position.set(0.5, 1.5, 0.3);
    doc.rotation.x = -Math.PI / 4;
    char.add(doc);
    char.position.set(0, 0, 0);
    scene.add(char);

    // particles
    const particleCount = isLowEnd ? 80 : 220;
    const particleGeometry = new THREE.BufferGeometry();
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 120;
      pos[i * 3 + 1] = Math.random() * 60;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 120;
    }
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(pos, 3)
    );
    const particleMaterial = new THREE.PointsMaterial({
      color: theme === "light" ? 0x0aa3a3 : 0x7ef0ff,
      size: isLowEnd ? 0.14 : 0.18,
      transparent: true,
      opacity: theme === "light" ? 0.6 : 0.75,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // holo panel
    const createHoloPanel = (text) => {
      const canvas = document.createElement("canvas");
      canvas.width = isLowEnd ? 512 : 1024;
      canvas.height = isLowEnd ? 256 : 512;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle =
        theme === "light" ? "rgba(255,255,255,0.95)" : "rgba(2,6,23,0.45)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, "rgba(0,230,255,0.03)");
      grad.addColorStop(1, "rgba(10,150,120,0.03)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle =
        theme === "light" ? "rgba(10,160,150,0.45)" : "rgba(126,240,255,0.6)";
      ctx.lineWidth = 4;
      ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);
      ctx.fillStyle = theme === "light" ? "#0b2330" : "#ffffff";
      ctx.font = (isLowEnd ? "bold 22px" : "bold 46px") + " Inter, Arial";
      ctx.textAlign = "center";
      ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 6);
      ctx.font = (isLowEnd ? "12px" : "20px") + " Inter, Arial";
      ctx.fillStyle =
        theme === "light" ? "rgba(11,35,48,0.9)" : "rgba(255,255,255,0.85)";
      ctx.fillText(
        "Alaminos — Digital Permit Processing",
        canvas.width / 2,
        canvas.height / 2 + 46
      );
      const texture = new THREE.CanvasTexture(canvas);
      const mat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.98,
        side: THREE.DoubleSide,
      });
      const geo = new THREE.PlaneGeometry(6, 3);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(0, 8, -5);
      return mesh;
    };

    const holo = createHoloPanel("ALAMINOS BUSINESS PERMIT");
    scene.add(holo);

    // animate with visibility check and framerate cap on low-end devices
    let time = 0;
    let last = performance.now();
    const targetFPS = isLowEnd ? 30 : 60;
    const minDelta = 1000 / targetFPS;

    const isVisible = () => !document.hidden;

    const animate = (nowMs) => {
      rafRef.current = requestAnimationFrame(animate);
      if (!isVisible()) return; // do not update while tab is hidden

      const deltaMs = nowMs - last;
      if (deltaMs < minDelta) return; // simple frame limiting
      last = nowMs;
      const delta = deltaMs / 1000;
      time += delta;

      // simple char motion
      char.children.forEach((c, idx) => {
        if (idx === 0) c.position.y = 2 + Math.sin(time * 4) * 0.05;
        if (idx === 2 || idx === 3)
          c.rotation.x = Math.sin(time * 2 + idx) * 0.45;
        if (idx === 4 || idx === 5)
          c.rotation.x = Math.sin(time * 2 + idx) * 0.28;
      });

      // buildings
      buildings.forEach((b, i) => {
        b.rotation.y += 0.002 + Math.sin(time * 0.2 + i) * 0.0004;
        b.position.y = Math.sin(time + i * 0.3) * 0.45;
      });

      // particles
      const pArr = particleGeometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        pArr[i * 3 + 1] += 0.02 + Math.sin(time * 0.1 + i) * 0.001;
        if (pArr[i * 3 + 1] > 70) pArr[i * 3 + 1] = 0;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // camera orbit
      camera.position.x = Math.cos(time * 0.06) * (isLowEnd ? 18 : 15);
      camera.position.z = Math.sin(time * 0.06) * (isLowEnd ? 18 : 15);
      camera.position.y = 5 + Math.sin(time * 0.4) * 0.4;
      camera.lookAt(0, 2, 0);

      // holo idle
      holo.rotation.y = Math.sin(time * 0.6) * 0.12;
      holo.position.y = 8 + Math.sin(time * 2) * 0.18;

      renderer.render(scene, camera);
    };

    rafRef.current = requestAnimationFrame(animate);

    // resize handler (debounced via RAF)
    let resizeRAF = null;
    const onResize = () => {
      if (resizeRAF) cancelAnimationFrame(resizeRAF);
      resizeRAF = requestAnimationFrame(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    };
    window.addEventListener("resize", onResize);

    // expose for theme updates and cleanup
    wrapperRef.current._three = {
      buildings,
      particleGeometry,
      particleMaterial,
      buildingGeometry,
    };
    wrapperRef.current.renderer = renderer;
    wrapperRef.current.scene = scene;
    wrapperRef.current.wrapper = wrapper;

    // cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      try {
        if (wrapperRef.current?.wrapper)
          document.body.removeChild(wrapperRef.current.wrapper);
      } catch (e) {}
      // best-effort dispose
      try {
        particleGeometry.dispose();
        particleMaterial.dispose();
        buildingGeometry.dispose();
        buildings.forEach((b) => {
          if (b.geometry) b.geometry.dispose();
          if (b.material) {
            if (Array.isArray(b.material))
              b.material.forEach((m) => m.dispose());
            else b.material.dispose();
          }
        });
        scene.traverse((o) => {
          if (o.geometry) o.geometry.dispose();
          if (o.material) {
            if (Array.isArray(o.material)) {
              o.material.forEach((m) => {
                if (m.map) m.map.dispose();
                m.dispose();
              });
            } else {
              if (o.material.map) o.material.map.dispose();
              o.material.dispose();
            }
          }
        });
        renderer.dispose();
      } catch (e) {
        // ignore
      }

      wrapperRef.current = null;
    };
  }, [disable3D, theme]);

  // theme effect: update wrapper background + materials (best-effort)
  useEffect(() => {
    const w = wrapperRef.current;
    if (!w) return;
    const { bg, _three } = w;
    if (bg)
      bg.style.background =
        theme === "light"
          ? "linear-gradient(180deg, rgba(245,250,255,1) 0%, rgba(230,251,250,1) 100%)"
          : "linear-gradient(180deg, rgba(4,16,37,1) 0%, rgba(7,16,38,1) 100%)";

    try {
      if (_three?.particleMaterial) {
        _three.particleMaterial.color.set(
          theme === "light" ? 0x0aa3a3 : 0x7ef0ff
        );
        _three.particleMaterial.opacity = theme === "light" ? 0.6 : 0.75;
        _three.particleMaterial.needsUpdate = true;
      }
      if (_three?.buildings) {
        _three.buildings.forEach((m) => {
          if (!m || !m.material) return;
          if (theme === "light")
            m.material.color.setHSL(0.52 + Math.random() * 0.02, 0.2, 0.78);
          else m.material.color.setHSL(0.55 + Math.random() * 0.08, 0.35, 0.45);
          m.material.needsUpdate = true;
        });
      }
    } catch (e) {
      // ignore
    }
  }, [theme]);

  const timeString = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const dateString = now.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className={`relative w-full overflow-x-hidden ${
        theme === "light" ? "bg-white" : "bg-slate-900"
      }`}
    >
      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md ${
          theme === "light"
            ? "bg-white/90 border-b border-slate-200"
            : "bg-black/40 border-b border-white/6"
        }`}
      >
        <div className="px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 min-w-0">
              <Building
                className={`flex-shrink-0 ${
                  theme === "light"
                    ? "w-7 h-7 text-teal-600"
                    : "w-7 h-7 text-cyan-300"
                }`}
              />

              {/* Title: shorter on very small screens */}
              <div className="min-w-0">
                <div
                  className={`font-semibold truncate ${
                    theme === "light"
                      ? "text-slate-900 text-sm"
                      : "text-white text-sm"
                  }`}
                >
                  <span className="inline sm:hidden">Alaminos</span>
                  <span className="hidden sm:inline">
                    Alaminos Business Permit
                  </span>
                </div>
                <div className="hidden md:block text-xs text-slate-500">
                  Digital permit processing
                </div>
              </div>
            </div>

            {/* Right side: compact, responsive actions. On small screens we show a single "Actions" pill that opens a popover (no hamburger). */}
            <div className="flex items-center gap-2">
              {/* Local time - hidden on narrow phones to save space */}
              <div className="hidden sm:flex flex-col items-end text-right mr-2 text-xs">
                <div className="text-xs text-gray-400">Local Time</div>
                <div
                  className={`font-medium ${
                    theme === "light" ? "text-slate-800" : "text-white"
                  }`}
                >
                  {timeString}
                </div>
              </div>

              {/* On larger screens show inline actions */}
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  to="/login"
                  className={`px-2 py-1 rounded-md text-xs ${
                    theme === "light"
                      ? "bg-white border border-slate-200 text-teal-700"
                      : "bg-gradient-to-r from-cyan-400 to-teal-400 text-black"
                  }`}
                >
                  Log in
                </Link>

                <Link
                  to="/register"
                  className={`px-2 py-1 rounded-md text-xs border ${
                    theme === "light"
                      ? "border-slate-200 text-slate-700 bg-white"
                      : "border-white/10 text-white bg-black/20"
                  }`}
                >
                  Register
                </Link>

                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-500">3D</label>
                  <button
                    title={disable3D ? "Enable 3D" : "Disable 3D"}
                    onClick={() => setDisable3D((s) => !s)}
                    className={`px-2 py-1 rounded-full border text-xs ${
                      disable3D
                        ? "bg-white/80 text-slate-700 border-slate-200"
                        : "bg-gradient-to-r from-cyan-400 to-teal-400 text-black"
                    }`}
                  >
                    {disable3D ? "Off" : "On"}
                  </button>
                </div>

                <button
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  aria-label="Toggle theme"
                  className={`p-2 rounded-full ${
                    theme === "light"
                      ? "bg-white border border-slate-200"
                      : "bg-black/40 border border-white/10"
                  }`}
                >
                  {theme === "light" ? (
                    <Moon className="w-5 h-5 text-slate-700" />
                  ) : (
                    <Sun className="w-5 h-5 text-yellow-300" />
                  )}
                </button>
              </div>

              {/* Small screens: compact "Actions" pill (no hamburger). This opens a popover with the same controls. */}
              <div className="sm:hidden">
                <button
                  ref={mobileMenuButtonRef}
                  onClick={() => setMobileMenuOpen((s) => !s)}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-actions-popover"
                  className={`px-3 py-1 rounded-full border shadow-sm text-sm ${
                    theme === "light"
                      ? "bg-white/95 border-slate-200"
                      : "bg-black/30 border-white/10 text-white"
                  }`}
                >
                  Start Now
                </button>

                {/* popover */}
                {mobileMenuOpen && (
                  <div
                    id="mobile-actions-popover"
                    ref={mobileMenuRef}
                    role="dialog"
                    aria-modal="false"
                    style={{ right: 12, top: 56, zIndex: 9999 }}
                    className={`absolute w-[min(92vw,320px)] p-3 rounded-2xl shadow-2xl ${
                      theme === "light"
                        ? "bg-white/95 text-slate-900"
                        : "bg-black/80 text-white"
                    }`}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Local Time</div>
                        <div className="text-sm">{timeString}</div>
                      </div>

                      <Link
                        to="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-100 text-sm"
                      >
                        Log in
                      </Link>

                      <Link
                        to="/register"
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-100 text-sm"
                      >
                        Register
                      </Link>

                      <div className="flex items-center justify-between px-1 py-2">
                        <div className="text-sm">3D</div>
                        <button
                          onClick={() => setDisable3D((s) => !s)}
                          className={`px-3 py-2 rounded-full border text-sm ${
                            disable3D
                              ? "bg-white/80 text-slate-700"
                              : "bg-gradient-to-r from-cyan-400 to-teal-400 text-black"
                          }`}
                        >
                          {disable3D ? "Disable 3D" : "Enable 3D"}
                        </button>
                      </div>

                      <div className="flex items-center justify-between px-1 py-2">
                        <div className="text-sm">Theme</div>
                        <button
                          onClick={() =>
                            setTheme(theme === "light" ? "dark" : "light")
                          }
                          aria-label="Toggle theme"
                          className={`p-2 rounded-full ${
                            theme === "light"
                              ? "bg-white border border-slate-200"
                              : "bg-black/40 border border-white/10"
                          }`}
                        >
                          {theme === "light" ? (
                            <Moon className="w-5 h-5 text-slate-700" />
                          ) : (
                            <Sun className="w-5 h-5 text-yellow-300" />
                          )}
                        </button>
                      </div>

                      <div className="text-xs text-gray-400 mt-1">
                        Tip: tap outside to close
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
