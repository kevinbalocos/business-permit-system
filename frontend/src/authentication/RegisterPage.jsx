import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle,
  User,
  Phone,
  Shield,
  FileText,
  Award,
  Building2,
  UserPlus,
} from "lucide-react";
import Logo from '../assets/alaminos-logos.png'; 
import BgImage from '../assets/alaminos-bg.jpeg';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "user", 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [validations, setValidations] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    phoneNumber: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "email") {
      setValidations((prev) => ({
        ...prev,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      }));
    } else if (name === "password") {
      setValidations((prev) => ({
        ...prev,
        password: value.length >= 6,
      }));
    } else if (name === "firstName" || name === "lastName") {
      setValidations((prev) => ({
        ...prev,
        [name]: value.trim().length > 0,
      }));
    } else if (name === "phoneNumber") {
      setValidations((prev) => ({
        ...prev,
        phoneNumber: /^\+?[0-9\s-()]{7,20}$/.test(value),
      }));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.password ||
      !form.phoneNumber ||
      !form.role 
    ) {
      toast.error("All fields are required!");
      return;
    }

    if (
      !validations.firstName ||
      !validations.lastName ||
      !validations.email ||
      !validations.password ||
      !validations.phoneNumber
    ) {
      toast.error(
        "Please ensure all fields are valid: email, password (at least 6 chars), name, and phone number."
      );
      return;
    }

    setIsLoading(true);

    try {
      await axios.post("http://localhost:5000/api/register", form);
      toast.success(
        "Registered successfully! Check your email for verification. Your account is pending approval."
      );
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses = (fieldName) => `
    w-full px-4 py-3 pl-12 bg-white/95 border-2 rounded-lg
    transition-all duration-300 ease-out text-gray-700 placeholder-gray-500 text-sm sm:text-base
    focus:outline-none focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-100
    hover:bg-white hover:border-green-500 hover:shadow-sm
    ${focusedField === fieldName ? "shadow-lg shadow-green-100 border-green-600 bg-white" : "border-gray-300"}
    ${validations[fieldName] ? "border-green-600 bg-green-50/30" : ""}
  `;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Background Image with Better Visibility */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BgImage})` }}
      >
        {/* Mobile-optimized overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/80 sm:from-green-600/75 to-green-800/90 sm:to-green-800/85"></div>
        
        {/* Additional gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 sm:from-green-900/60 via-transparent to-green-700/50 sm:to-green-700/40"></div>
      </div>

      {/* Enhanced Decorative Elements - Responsive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Mobile: smaller, fewer elements */}
        <div className="absolute top-10 left-10 sm:top-20 sm:left-20 w-32 h-32 sm:w-72 sm:h-72 bg-green-300/10 sm:bg-green-300/15 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 w-40 h-40 sm:w-96 sm:h-96 bg-green-200/8 sm:bg-green-200/10 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-2000"></div>
        <div className="hidden sm:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        
        {/* Government-style grid pattern - Hidden on mobile */}
        <div className="hidden md:block absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 gap-4 h-full">
            {[...Array(144)].map((_, i) => (
              <div key={i} className="border border-white/20"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Container - Responsive Layout */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-4 sm:px-8 sm:py-8">
        <div className="w-full max-w-lg sm:max-w-7xl">
          
          {/* Responsive Registration Card */}
          <div className="bg-white/96 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl shadow-green-900/25 overflow-hidden">
            
            {/* Mobile: Vertical Stack, Desktop: Horizontal */}
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">
              
              {/* Government Branding Section */}
              <div className="bg-gradient-to-br from-green-700 to-green-800 p-6 sm:p-8 flex flex-col justify-center items-center text-center relative order-1">
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                
                <div className="relative z-10 space-y-4 sm:space-y-6">
                  {/* Logo - Responsive sizing */}
                  <div className="flex justify-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full p-2.5 sm:p-3 shadow-lg ring-2 sm:ring-4 ring-white/30">
                      <img 
                        src={Logo} 
                        alt="Alaminos Municipal Logo" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  
                  {/* Government Title - Responsive text */}
                  <div className="space-y-1 sm:space-y-2">
                    <h1 className="text-lg sm:text-2xl font-bold text-white tracking-wide leading-tight">
                      REPUBLIC OF THE PHILIPPINES
                    </h1>
                    <h2 className="text-base sm:text-xl font-semibold text-green-100">
                      Municipality of Alaminos
                    </h2>
                    <p className="text-green-200 text-sm sm:text-base font-medium">Province of Laguna</p>
                  </div>
                  
                  {/* System Title - Mobile optimized */}
                  <div className="pt-4 sm:pt-6 border-t border-green-600/50 space-y-2 sm:space-y-3">
                    <h3 className="text-base sm:text-xl font-bold text-white flex flex-col sm:flex-row items-center justify-center gap-2">
                      <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span className="text-center leading-tight">
                        Business Permit<br className="sm:hidden" /> Management System
                      </span>
                    </h3>
                    <p className="text-green-200 text-xs sm:text-sm">New Account Registration Portal</p>
                  </div>

                  {/* Registration Benefits - Responsive grid */}
                  <div className="pt-4 sm:pt-6 space-y-2 sm:space-y-3">
                    <div className="grid grid-cols-1 gap-2 sm:gap-3 text-xs sm:text-sm text-green-100">
                      <div className="flex items-center justify-center gap-2">
                        <UserPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Quick Business Registration</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Secure Account Protection</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Official Government Service</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Registration Form Section */}
              <div className="p-6 sm:p-8 flex flex-col justify-center order-2">
                <div className="max-w-md mx-auto w-full space-y-5 sm:space-y-6">
                  
                  {/* Welcome Section - Mobile optimized */}
                  <div className="text-center space-y-2 sm:space-y-3">
                    <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full">
                      <UserPlus className="w-7 h-7 sm:w-8 sm:h-8 text-green-700" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Create Account</h3>
                    <p className="text-sm sm:text-base text-gray-600">Register for business permit services</p>
                  </div>

                  {/* Registration Form - Touch-optimized */}
                  <form onSubmit={handleRegister} className="space-y-4 sm:space-y-5">
                    
                    {/* Name Fields Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* First Name Field */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          First Name
                        </label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                            <User
                              className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                                focusedField === "firstName"
                                  ? "text-green-600"
                                  : "text-gray-400"
                              }`}
                            />
                          </div>
                          <input
                            type="text"
                            name="firstName"
                            placeholder="Enter first name"
                            className={inputClasses("firstName")}
                            value={form.firstName}
                            onChange={handleChange}
                            onFocus={() => setFocusedField("firstName")}
                            onBlur={() => setFocusedField("")}
                            required
                          />
                          {validations.firstName && (
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 animate-scale-in" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Last Name Field */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Last Name
                        </label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                            <User
                              className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                                focusedField === "lastName"
                                  ? "text-green-600"
                                  : "text-gray-400"
                              }`}
                            />
                          </div>
                          <input
                            type="text"
                            name="lastName"
                            placeholder="Enter last name"
                            className={inputClasses("lastName")}
                            value={form.lastName}
                            onChange={handleChange}
                            onFocus={() => setFocusedField("lastName")}
                            onBlur={() => setFocusedField("")}
                            required
                          />
                          {validations.lastName && (
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 animate-scale-in" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                          <Mail
                            className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                              focusedField === "email"
                                ? "text-green-600"
                                : "text-gray-400"
                            }`}
                          />
                        </div>
                        <input
                          type="email"
                          name="email"
                          placeholder="your.email@domain.com"
                          className={inputClasses("email")}
                          value={form.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField("")}
                          required
                        />
                        {validations.email && (
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 animate-scale-in" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                          <Lock
                            className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                              focusedField === "password"
                                ? "text-green-600"
                                : "text-gray-400"
                            }`}
                          />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Create secure password"
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
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600 transition-all duration-200 hover:scale-110 touch-manipulation"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                          ) : (
                            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                          )}
                        </button>
                        {validations.password && (
                          <div className="absolute right-10 sm:right-12 top-1/2 transform -translate-y-1/2">
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 animate-scale-in" />
                          </div>
                        )}
                      </div>
                      
                      {/* Password Strength Indicator */}
                      {form.password && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-600">
                              Password Strength
                            </span>
                            <span
                              className={`text-xs font-medium ${
                                form.password.length >= 8
                                  ? "text-green-600"
                                  : form.password.length >= 6
                                  ? "text-yellow-600"
                                  : "text-red-600"
                              }`}
                            >
                              {form.password.length >= 8
                                ? "Strong"
                                : form.password.length >= 6
                                ? "Medium"
                                : "Weak"}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full transition-all duration-300 ${
                                form.password.length >= 8
                                  ? "bg-green-500 w-full"
                                  : form.password.length >= 6
                                  ? "bg-yellow-500 w-2/3"
                                  : form.password.length >= 3
                                  ? "bg-red-500 w-1/3"
                                  : "w-0"
                              }`}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Phone and Role Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone Number Field */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Phone Number
                        </label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                            <Phone
                              className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                                focusedField === "phoneNumber"
                                  ? "text-green-600"
                                  : "text-gray-400"
                              }`}
                            />
                          </div>
                          <input
                            type="tel"
                            name="phoneNumber"
                            placeholder="09XX-XXX-XXXX"
                            className={inputClasses("phoneNumber")}
                            value={form.phoneNumber}
                            onChange={handleChange}
                            onFocus={() => setFocusedField("phoneNumber")}
                            onBlur={() => setFocusedField("")}
                            required
                          />
                          {validations.phoneNumber && (
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 animate-scale-in" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Role Selection Field */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Account Type
                        </label>
                        <div className="relative">
                          <select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/95 border-2 border-gray-300 rounded-lg transition-all duration-300 ease-out text-gray-700 text-sm sm:text-base focus:outline-none focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-100 hover:bg-white hover:border-green-500 hover:shadow-sm"
                            required
                          >
                            <option value="user">Business Owner</option>
                            <option value="admin">Municipal Admin</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button - Touch-friendly */}
                    <button
                      type="submit"
                      disabled={
                        isLoading ||
                        !validations.firstName ||
                        !validations.lastName ||
                        !validations.email ||
                        !validations.password ||
                        !validations.phoneNumber
                      }
                      className={`
                        group relative w-full py-3.5 sm:py-4 px-6 rounded-lg font-semibold text-sm sm:text-base
                        transition-all duration-300 transform hover:scale-[1.01] active:scale-95
                        focus:outline-none focus:ring-4 focus:ring-green-200 touch-manipulation
                        ${
                          isLoading ||
                          !validations.firstName ||
                          !validations.lastName ||
                          !validations.email ||
                          !validations.password ||
                          !validations.phoneNumber
                            ? "bg-gray-300 cursor-not-allowed text-gray-500"
                            : "bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900 text-white shadow-lg shadow-green-700/30"
                        }
                      `}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                          Creating Account...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                          CREATE ACCOUNT
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
                      )}
                    </button>
                  </form>

                  {/* Login Link - Mobile optimized */}
                  <div className="text-center pt-4 border-t border-gray-200 space-y-2">
                    <p className="text-xs sm:text-sm text-gray-600">
                      Already have an account?
                    </p>
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 font-semibold text-xs sm:text-sm transition-colors duration-200 hover:underline decoration-2 underline-offset-4 touch-manipulation"
                    >
                      <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                      Sign in to your account
                    </Link>
                  </div>

                  {/* Footer Info - Responsive */}
                  <div className="text-center pt-3 sm:pt-4 space-y-1 sm:space-y-2">
                    <div className="text-xs text-gray-400">
                      <p>© 2025 Municipality of Alaminos, Laguna</p>
                      <p className="hidden sm:block">Registration System v2.1.0 • Powered by DCSI</p>
                      <p className="block sm:hidden">Registration v2.1.0 • DCSI</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
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

        /* Mobile viewport optimization */
        @media (max-width: 640px) {
          /* Prevent zoom on input focus in iOS */
          input[type="text"],
          input[type="email"],
          input[type="password"],
          input[type="tel"],
          select {
            font-size: 16px !important;
          }
          
          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 3px;
          }
          
          ::-webkit-scrollbar-track {
            background: transparent;
          }
          
          ::-webkit-scrollbar-thumb {
            background: rgba(34, 197, 94, 0.3);
            border-radius: 3px;
          }
        }

        /* Smooth transitions for responsive changes */
        * {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 150ms;
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;