import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate("/");
      } else {
        setError(result.error || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Government Trust Badge */}
        <div className="text-center mb-8">
          <div className="govt-badge mx-auto mb-6 justify-center">
            <span className="gov-indicator">🇮🇳 OFFICIAL PORTAL</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-3">
            Yojana Setu
          </h1>
          <p className="text-xl text-slate-700 font-body">
            Find Government Schemes For You
          </p>
          <p className="text-base text-slate-600 mt-2 font-body">
            Sign in to your account
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl shadow-md p-8 sm:p-10">
          {/* Error Message with better accessibility */}
          {error && (
            <div 
              className="alert alert-error mb-8" 
              role="alert"
              aria-live="polite"
            >
              <strong>⚠️ Error:</strong> {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="form-label">
                Email Address <span className="text-red-600">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="form-input"
                required
                aria-required="true"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="form-label">
                Password <span className="text-red-600">*</span>
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="form-input"
                required
                aria-required="true"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-navy-600 rounded border-slate-300"
                />
                <span className="text-base text-slate-700 font-body">
                  Remember me
                </span>
              </label>
              <Link 
                to="#" 
                className="text-base text-navy-600 hover:underline font-semibold font-body"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-saffron w-full text-lg font-semibold"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 border-t-2 border-slate-200"></div>
            <span className="text-slate-600 font-body text-sm">or</span>
            <div className="flex-1 border-t-2 border-slate-200"></div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-slate-700 font-body text-base">
            Don't have an account?{" "}
            <Link to="/signup" className="text-navy-600 hover:underline font-semibold">
              Create one now
            </Link>
          </p>
        </div>

        {/* Security Info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-900 font-body">
            <strong>🔒 Secure Login:</strong> Your data is encrypted with SSL security. Only government officials can access your information.
          </p>
        </div>

        {/* Footer Info */}
        <p className="text-center text-slate-500 text-sm mt-8 font-body">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
