import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Building,
  TrendingUp,
  Clock,
  Users,
  CheckCircle,
  FileText,
  Moon,
  Sun,
  Shield,
  Zap,
  Award,
  ArrowRight,
  Play,
  Star,
  Globe,
  Smartphone,
  BarChart3,
  Download,
  RefreshCw,
  Eye,
  UploadCloud,
  Cpu,
  BadgeCheck,
} from "lucide-react";
import AlaminosLogo from "/src/assets/Alaminos_Laguna_seal_logo.png";

const THEME_KEY = "alaminos_theme_v1";

// (kept your existing motion mock so other parts of the file still work)
const motion = {
  div: ({ children, className, style, ...props }) => (
    <div className={className} style={style} {...props}>
      {children}
    </div>
  ),
  h1: ({ children, className, ...props }) => (
    <h1 className={className} {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, className, ...props }) => (
    <h2 className={className} {...props}>
      {children}
    </h2>
  ),
  p: ({ children, className, ...props }) => (
    <p className={className} {...props}>
      {children}
    </p>
  ),
  button: ({ children, className, ...props }) => (
    <button className={className} {...props}>
      {children}
    </button>
  ),
};

export default function EnhancedHomepage() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = window.localStorage?.getItem(THEME_KEY);
      if (saved) return saved;
      if (typeof window !== "undefined" && window.matchMedia) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      }
    } catch (e) {}
    return "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      window.localStorage?.setItem(THEME_KEY, theme);
    } catch (e) {}
  }, [theme]);

  const [currentTime, setCurrentTime] = useState(() => new Date());
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const timeString = currentTime.toLocaleTimeString("en-PH", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // IntersectionObserver-based scroll animation:
  // - elements with class `scroll-animate` will receive `.in-view` when >=25% visible
  // - children with class `animate-item` will animate with a stagger based on --delay
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.classList.add("in-view");
          } else {
            // remove so animation can replay the next time it enters
            el.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.25 }
    );

    const nodes = Array.from(document.querySelectorAll(".scroll-animate"));
    nodes.forEach((n) => observer.observe(n));

    return () => observer.disconnect();
  }, []);

  const pages = [
    {
      id: "hero",
      alignment: "left",
      title: "Datalink Creative Solution Incorporation",
      subtitle:
        "Experience the future of permit processing with the Municipality of Alaminos. Streamlined, secure, and completely digital.",
      description:
        "Say goodbye to long queues, paperwork, and bureaucratic delays. Our platform revolutionizes how businesses obtain permits, making the process faster, more transparent, and accessible 24/7.",
      features: [
        { icon: Zap, title: "Lightning Fast", desc: "Process permits in hours, not weeks" },
        { icon: Shield, title: "Bank-Grade Security", desc: "End-to-end encryption for all data" },
        { icon: Smartphone, title: "Mobile Ready", desc: "Complete applications on any device" },
        { icon: Eye, title: "Full Transparency", desc: "Real-time tracking and updates" },
      ],
      cta: { primary: { label: "Create your account", to: "/register", icon: ArrowRight } },
      stats: [
        { value: "15K+", label: "Permits Processed" },
        { value: "98%", label: "Success Rate" },
        { value: "24/7", label: "Support Available" },
      ],
    },
    // ... other pages (kept as in your file) - for brevity I kept just two here but you can add rest
    {
      id: "cta",
      alignment: "right",
      title: "Join the Digital Revolution",
      subtitle:
        "Thousands of businesses have already transformed their permit processes. Your turn to experience the future of business compliance.",
      description:
        "Don't let outdated processes slow down your business growth. Join forward-thinking companies that have embraced digital transformation for their permit needs.",
      testimonial: {
        quote:
          "This new system reduced our permit processing time from 2 months to just 3 days. The transparency and ease of use is incredible.",
        author: "Maria Santos",
        position: "CEO, Santos Enterprises",
        rating: 5,
      },
      finalStats: [
        { value: "2.5K+", label: "Active Users", growth: "+25% monthly" },
        { value: "24hrs", label: "Avg Processing", growth: "50% faster" },
        { value: "99.2%", label: "Uptime", growth: "Enterprise grade" },
        { value: "₱50M+", label: "Fees Processed", growth: "Secure payments" },
      ],
      cta: {
        primary: { label: "Get Started Now", to: "/register", icon: ArrowRight },
        secondary: { label: "Login to Dashboard", to: "/login", icon: Building },
      },
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "light"
          ? "bg-gradient-to-br from-gray-50 via-white to-teal-50 text-gray-800"
          : "bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900 text-white"
      }`}
    >
      {/* Inline CSS for the scroll animations (single-file ease-of-use) */}
      <style>{`
        /* base state for items */
        .scroll-animate .animate-item { opacity: 0; transform: translateY(18px); will-change: transform, opacity; }

        /* when container is in view, play animation on children with stagger via --delay */
        .scroll-animate.in-view .animate-item {
          animation: fadeUp 700ms cubic-bezier(.25,.1,.25,1) both;
          animation-delay: var(--delay, 0ms);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* simple scale-in for visuals */
        .scroll-animate .animate-scale { opacity: 0; transform: scale(.96); }
        .scroll-animate.in-view .animate-scale { animation: scaleIn 550ms cubic-bezier(.25,.1,.25,1) both; }
        @keyframes scaleIn { from { opacity:0; transform: scale(.96); } to { opacity:1; transform: scale(1); } }

        /* small utility to help when you want items to animate in rows */
        .animate-item.instant { transition: none; }
      `}</style>

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
          theme === "light" ? "bg-white/80 border-gray-200/50" : "bg-gray-900/80 border-gray-700/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <motion.div className="flex items-center gap-3">
              <img src={AlaminosLogo} alt="Alaminos Laguna Seal" className="w-10 h-10" />
              <div>
                <h1 className="text-lg font-bold">Municipality of Alaminos</h1>
                <p className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>
                  Province of Laguna
                </p>
              </div>
            </motion.div>

            <div className="flex items-center gap-4">
              <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs ${theme === "light" ? "bg-gray-100 text-gray-600" : "bg-gray-800 text-gray-300"}`}>
                <Clock className="w-3 h-3" />
                <span>{timeString}</span>
              </div>

              <div className="hidden sm:flex items-center gap-4">
                <Link to="/login" className={`text-sm font-medium transition-colors duration-200 ${theme === "light" ? "text-gray-600 hover:text-teal-600" : "text-gray-300 hover:text-teal-400"}`}>
                  Login
                </Link>
                <Link to="/register" className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${theme === "light" ? "bg-teal-600 hover:bg-teal-700 text-white shadow-md hover:shadow-teal-200" : "bg-teal-500 hover:bg-teal-600 text-white shadow-md hover:shadow-teal-900/50"}`}>
                  <span>Sign Up</span>
                </Link>
              </div>

              <motion.button onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))} className={`p-2 rounded-full border transition-all duration-200 ${theme === "light" ? "border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50" : "border-gray-700 hover:border-gray-600 bg-gray-800 hover:bg-gray-700"}`}>
                {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-yellow-400" />}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {pages.map((page, pageIndex) => (
          <section key={page.id} className="min-h-screen flex items-center justify-center py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className={`flex flex-col lg:flex-row items-center gap-12 ${page.alignment === "right" ? "lg:flex-row-reverse" : ""}`}>
                {/* Content Column (this container is observed for scroll and will replay on each entry) */}
                <motion.div className="flex-1 space-y-6 scroll-animate" aria-hidden={false}>
                  <div className="space-y-4">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight animate-item" style={{ ['--delay']: '0ms' }}>
                      {page.title}
                    </h2>
                    <p className={`text-lg sm:text-xl font-light ${theme === "light" ? "text-gray-600" : "text-gray-300"} animate-item`} style={{ ['--delay']: '80ms' }}>
                      {page.subtitle}
                    </p>
                    {page.description && (
                      <p className={`text-base leading-relaxed ${theme === "light" ? "text-gray-700" : "text-gray-400"} animate-item`} style={{ ['--delay']: '160ms' }}>
                        {page.description}
                      </p>
                    )}
                  </div>

                  {/* Features Grid */}
                  {page.features && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {page.features.map((feature, idx) => {
                        const Icon = feature.icon;
                        return (
                          <div key={idx} className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-lg animate-item ${theme === "light" ? "bg-white/70 border-gray-200/50 hover:border-teal-200" : "bg-gray-800/50 border-gray-700/50 hover:border-teal-500/50"}`} style={{ ['--delay']: `${(idx + 1) * 80}ms` }}>
                            <Icon className={`w-6 h-6 mb-2 ${theme === "light" ? "text-teal-600" : "text-teal-400"}`} />
                            <h4 className="font-semibold text-base mb-1">{feature.title}</h4>
                            <p className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>{feature.desc}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Benefits List */}
                  {page.benefits && (
                    <div className="space-y-5">
                      {page.benefits.map((benefit, idx) => {
                        const Icon = benefit.icon;
                        return (
                          <div key={idx} className="flex gap-4 animate-item" style={{ ['--delay']: `${idx * 70}ms` }}>
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${theme === "light" ? "bg-teal-100 text-teal-600" : "bg-teal-900/50 text-teal-400"}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-base mb-1">{benefit.title}</h4>
                              <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>{benefit.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* (Other content like featureGrid, stats, finalStats, CTA, testimonial) - keep same pattern: add `animate-item` and incremental --delay */}
                  {page.featureGrid && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {page.featureGrid.map((feature, idx) => {
                        const Icon = feature.icon;
                        return (
                          <div key={idx} className={`p-6 rounded-2xl border transition-all duration-200 hover:shadow-xl animate-item ${theme === "light" ? "bg-white/80 border-gray-200/50 hover:border-teal-200" : "bg-gray-800/60 border-gray-700/50 hover:border-teal-500/50"}`} style={{ ['--delay']: `${idx * 80}ms` }}>
                            <Icon className={`w-8 h-8 mb-3 ${theme === "light" ? "text-teal-600" : "text-teal-400"}`} />
                            <h4 className="font-bold text-lg mb-2">{feature.title}</h4>
                            <p className={`text-sm mb-3 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>{feature.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {feature.features.map((item, i) => (
                                <span key={i} className={`px-2.5 py-1 rounded-full text-xs font-medium ${theme === "light" ? "bg-teal-100 text-teal-700" : "bg-teal-900/50 text-teal-300"} animate-item`} style={{ ['--delay']: `${(i + 1) * 40}ms` }}>{item}</span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {page.stats && (
                    <div className="flex flex-wrap gap-6">
                      {page.stats.map((stat, idx) => (
                        <div key={idx} className="text-center animate-item" style={{ ['--delay']: `${idx * 80}ms` }}>
                          <div className="text-3xl font-bold">{stat.value}</div>
                          <div className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}>{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {page.finalStats && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {page.finalStats.map((stat, idx) => (
                        <div key={idx} className={`p-4 rounded-xl text-center border animate-item ${theme === "light" ? "bg-white/70 border-gray-200/50" : "bg-gray-800/50 border-gray-700/50"}`} style={{ ['--delay']: `${idx * 80}ms` }}>
                          <div className="text-xl font-bold">{stat.value}</div>
                          <div className={`text-xs mb-1 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>{stat.label}</div>
                          <div className={`text-xs ${theme === "light" ? "text-teal-600" : "text-teal-400"}`}>{stat.growth}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {page.cta && (
                    <div className="flex flex-col sm:flex-row gap-4">
                      {page.cta.primary && (
                        <Link to={page.cta.primary.to} className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-base font-semibold transition-all duration-200 hover:shadow-lg animate-item ${theme === "light" ? "bg-teal-600 hover:bg-teal-700 text-white shadow-teal-200" : "bg-teal-500 hover:bg-teal-600 text-white shadow-teal-900/50"}`} style={{ ['--delay']: '0ms' }}>
                          <span>{page.cta.primary.label}</span>
                          {page.cta.primary.icon && <page.cta.primary.icon className="w-4 h-4" />}
                        </Link>
                      )}

                      {page.cta.secondary && (
                        <Link to={page.cta.secondary.to} className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-base font-semibold border transition-all duration-200 animate-item ${theme === "light" ? "border-gray-300 text-gray-700 hover:bg-gray-50" : "border-gray-600 text-gray-300 hover:bg-gray-800"}`} style={{ ['--delay']: '80ms' }}>
                          <span>{page.cta.secondary.label}</span>
                          {page.cta.secondary.icon && <page.cta.secondary.icon className="w-4 h-4" />}
                        </Link>
                      )}
                    </div>
                  )}

                  {page.highlight && (
                    <div className={`p-5 rounded-xl border-l-4 animate-item ${theme === "light" ? "bg-teal-50 border-teal-500" : "bg-teal-900/20 border-teal-400"}`} style={{ ['--delay']: '120ms' }}>
                      <h4 className={`font-bold mb-1 text-sm ${theme === "light" ? "text-teal-900" : "text-teal-300"}`}>{page.highlight.title}</h4>
                      <p className={`text-sm ${theme === "light" ? "text-teal-800" : "text-teal-200"}`}>{page.highlight.text}</p>
                    </div>
                  )}

                  {page.testimonial && (
                    <div className={`p-6 rounded-2xl border animate-item ${theme === "light" ? "bg-white/80 border-gray-200/50" : "bg-gray-800/60 border-gray-700/50"}`} style={{ ['--delay']: '160ms' }}>
                      <div className="flex mb-3">{[...Array(page.testimonial.rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />)}</div>
                      <blockquote className="text-base mb-3 italic">"{page.testimonial.quote}"</blockquote>
                      <div>
                        <div className="font-semibold text-sm">{page.testimonial.author}</div>
                        <div className={`text-xs ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>{page.testimonial.position}</div>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Visual Column (also observed so it animates) */}
                <motion.div className="flex-1 flex justify-center scroll-animate">
                  <div className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl animate-scale ${theme === "light" ? "bg-white/90 border-gray-200/50" : "bg-gray-800/60 border-gray-700/50"}`}>
                    <div className="space-y-4">
                      <h3 className="text-center font-bold text-lg">Our Streamlined Process</h3>
                      <div className="flex items-center justify-center space-x-2">
                        <div className="text-center p-3 rounded-lg flex-1">
                          <UploadCloud className={`w-10 h-10 mx-auto mb-2 ${theme === "light" ? "text-teal-600" : "text-teal-400"}`} />
                          <p className="text-xs font-semibold">1. Upload Docs</p>
                        </div>
                        <ArrowRight className={`w-6 h-6 flex-shrink-0 ${theme === "light" ? "text-gray-300" : "text-gray-600"}`} />
                        <div className="text-center p-3 rounded-lg flex-1">
                          <Cpu className={`w-10 h-10 mx-auto mb-2 ${theme === "light" ? "text-teal-600" : "text-teal-400"}`} />
                          <p className="text-xs font-semibold">2. AI Validation</p>
                        </div>
                        <ArrowRight className={`w-6 h-6 flex-shrink-0 ${theme === "light" ? "text-gray-300" : "text-gray-600"}`} />
                        <div className="text-center p-3 rounded-lg flex-1">
                          <BadgeCheck className={`w-10 h-10 mx-auto mb-2 ${theme === "light" ? "text-teal-600" : "text-teal-400"}`} />
                          <p className="text-xs font-semibold">3. Get Permit</p>
                        </div>
                      </div>
                      <div className={`rounded-xl p-4 mt-4 ${theme === "light" ? "bg-gray-50" : "bg-gray-800/50"}`}>
                        <p className="text-center text-sm">From submission to approval, our intelligent platform handles the complexity, so you can focus on your business.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        ))}
      </main>

      {/* Mobile fixed auth action bar (visible only on small screens) */}
      <div className="sm:hidden fixed bottom-4 left-4 right-4 z-50">
        <div className={`flex items-center justify-between gap-3 p-3 rounded-2xl shadow-xl border transition-all duration-200 ${theme === "light" ? "bg-white/95 border-gray-200" : "bg-gray-900/80 border-gray-700"}`} role="navigation" aria-label="Mobile quick auth">
          <Link to="/login" className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-transform transform active:scale-95 ${theme === "light" ? "bg-white text-gray-700 border" : "bg-gray-800 text-gray-200 border"}`}>
            <Building className="w-4 h-4" />
            <span>Login</span>
          </Link>

          <Link to="/register" className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-transform transform active:scale-95 ${theme === "light" ? "bg-teal-600 text-white shadow-md" : "bg-teal-500 text-white shadow-md"}`}>
            <span>Sign Up</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
