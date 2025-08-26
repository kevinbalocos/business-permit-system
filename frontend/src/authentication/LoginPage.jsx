// src/pages/LoginPage.jsx  (replace your current file with this)
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle,
  Building2,
  Shield,
  FileText,
  Award,
} from "lucide-react";
import Logo from "../assets/alaminos-logos.png";
import BgImage from "../assets/alaminos-bg.jpeg";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [validations, setValidations] = useState({
    email: false,
    password: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "email") {
      setValidations((prev) => ({
        ...prev,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      }));
    }
    if (name === "password") {
      setValidations((prev) => ({
        ...prev,
        password: value.length >= 6,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      // Call backend for login
      const res = await axios.post("http://localhost:5000/api/login", form);

      // Extract token and user from response
      const token = res.data?.token;
      const user = res.data?.user;

      if (!token || !user) {
        toast.error("Login failed: No token or user data returned.");
        return;
      }

      // Save token and user info in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userRole", user.role || "");
      localStorage.setItem("userStatus", user.status || "");
      localStorage.setItem("userEmail", user.email || form.email);

      toast.success("Login successful!");

      // Redirect based on user role and status
      const role = user.role;
      const status = user.status;

      // after you get user from res.data.user
      if (role === "superadmin") {
        navigate("/superadmin");
      } else if (role === "admin") {
        if (status === "approved") navigate("/admin-dashboard");
        else {
          toast.error("Your admin account is pending approval.");
          navigate("/");
        }
      } else if (role === "cashier") {
        // Optionally check approved
        if (status === "approved") navigate("/cashier-dashboard");
        else {
          toast.error("Your cashier account is pending approval.");
          navigate("/");
        }
      } else if (role === "user") {
        if (status === "approved") navigate("/user-dashboard");
        else {
          toast.error("Your user account is pending approval.");
          navigate("/");
        }
      } else {
        toast.error(
          "Login successful, but role/status not recognized. Contact support."
        );
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = (fieldName) => `
    w-full px-4 py-3 pl-12 bg-white/95 border-2 rounded-lg
    transition-all duration-300 ease-out text-gray-700 placeholder-gray-500 text-sm sm:text-base
    focus:outline-none focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100
    hover:bg-white hover:border-teal-500 hover:shadow-sm
    ${
      focusedField === fieldName
        ? "shadow-lg shadow-teal-100 border-teal-600 bg-white"
        : "border-gray-300"
    }
    ${validations[fieldName] ? "border-teal-600 bg-teal-50/30" : ""}
  `;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BgImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600/80 sm:from-teal-600/75 to-teal-800/90 sm:to-teal-800/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/70 sm:from-teal-900/60 via-transparent to-teal-700/50 sm:to-teal-700/40" />
      </div>
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-4 sm:px-8 sm:py-8">
        <div className="w-full max-w-lg sm:max-w-6xl">
          <div className="bg-white/96 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl shadow-teal-900/25 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
              <div className="bg-gradient-to-br from-teal-500 to-teal-800 p-6 sm:p-8 flex flex-col justify-center items-center text-center relative order-1">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <div className="relative z-10 space-y-4 sm:space-y-6">
                  <div className="flex justify-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full p-2.5 sm:p-3 shadow-lg ring-2 sm:ring-4 ring-white/30">
                      <img
                        src={Logo}
                        alt="Alaminos Municipal Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <h1 className="text-lg sm:text-2xl font-bold text-white tracking-wide leading-tight">
                      REPUBLIC OF THE PHILIPPINES
                    </h1>
                    <h2 className="text-base sm:text-xl font-semibold text-teal-100">
                      Municipality of Alaminos
                    </h2>
                    <p className="text-teal-200 text-sm sm:text-base font-medium">
                      Province of Laguna
                    </p>
                  </div>

                  <div className="pt-4 sm:pt-6 border-t border-teal-600/50 space-y-2 sm:space-y-3">
                    <h3 className="text-base sm:text-xl font-bold text-white flex flex-col sm:flex-row items-center justify-center gap-2">
                      <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span className="text-center leading-tight">
                        Business Permit
                        <br className="sm:hidden" /> Management System
                      </span>
                    </h3>
                    <p className="text-teal-200 text-xs sm:text-sm">
                      Authorized Personnel Access Portal
                    </p>
                  </div>

                  <div className="pt-4 sm:pt-6 space-y-2 sm:space-y-3">
                    <div className="grid grid-cols-1 gap-2 sm:gap-3 text-xs sm:text-sm text-teal-100">
                      <div className="flex items-center justify-center gap-2">
                        <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>SSL Encrypted Connection</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Government Certified System</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Building2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Official Municipal Portal</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-center order-2">
                <div className="max-w-md mx-auto w-full space-y-5 sm:space-y-6">
                  <div className="text-center space-y-2 sm:space-y-3">
                    <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-teal-100 rounded-full">
                      <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-teal-700" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                      Secure Access
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Please authenticate to access the system
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 sm:space-y-5"
                  >
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Official Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                          <Mail
                            className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                              focusedField === "email"
                                ? "text-teal-600"
                                : "text-gray-400"
                            }`}
                          />
                        </div>
                        <input
                          type="email"
                          name="email"
                          placeholder="your.name@alaminos.gov.ph"
                          className={inputClasses("email")}
                          value={form.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField("")}
                          required
                        />
                        {validations.email && (
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 animate-scale-in" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Secure Password
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                          <Lock
                            className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                              focusedField === "password"
                                ? "text-teal-600"
                                : "text-gray-400"
                            }`}
                          />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Enter your secure password"
                          className={inputClasses("password")}
                          value={form.password}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("password")}
                          onBlur={() => setFocusedField("")}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-teal-600 transition-all duration-200 hover:scale-110 touch-manipulation"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                          ) : (
                            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                          )}
                        </button>
                        {validations.password && (
                          <div className="absolute right-10 sm:right-12 top-1/2 transform -translate-y-1/2">
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 animate-scale-in" />
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className={`group relative w-full py-3.5 sm:py-4 px-6 rounded-lg font-semibold text-sm sm:text-base
                        transition-all duration-300 transform hover:scale-[1.01] active:scale-95
                        focus:outline-none focus:ring-4 focus:ring-teal-200 touch-manipulation
                        ${
                          loading
                            ? "bg-gray-300 cursor-not-allowed text-gray-500"
                            : "bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-800 hover:to-teal-900 text-white shadow-lg shadow-teal-700/30"
                        }
                      `}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                          Authenticating...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                          SECURE LOGIN
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
                      )}
                    </button>
                  </form>

                  <div className="text-center pt-4 border-t border-gray-200 space-y-2">
                    <p className="text-xs sm:text-sm text-gray-600">
                      New business applicant?
                    </p>
                    <Link
                      to="/register"
                      className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-semibold text-xs sm:text-sm transition-colors duration-200 hover:underline decoration-2 underline-offset-4 touch-manipulation"
                    >
                      <Building2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      Create account for Business Permit
                    </Link>
                  </div>

                  <div className="text-center pt-3 sm:pt-4 space-y-1 sm:space-y-2">
                    <div className="text-xs text-gray-400">
                      <p>© 2025 Municipality of Alaminos, Laguna</p>
                      <p className="hidden sm:block">
                        System Version 2.1.0 • Powered by DCSI
                      </p>
                      <p className="block sm:hidden">System v2.1.0 • DCSI</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* end main */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 1.2s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
        }
        .touch-manipulation {
          touch-action: manipulation;
        }
        @media (max-width: 640px) {
          input[type="text"],
          input[type="email"],
          input[type="password"] {
            font-size: 16px !important;
          }
          ::-webkit-scrollbar {
            width: 3px;
          }
          ::-webkit-scrollbar-track {
            background: transparent;
          }
          ::-webkit-scrollbar-thumb {
            background: rgba(20, 184, 166, 0.3);
            border-radius: 3px;
          }
        }
        * {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 150ms;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
