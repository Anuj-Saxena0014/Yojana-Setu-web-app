import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await api.post("/auth/forgot-password", { email });
      if (data.success) {
        setMessage(data.message || "Password reset link sent to your email.");
        setEmail("");
      } else {
        setError(data.message || "Failed to request password reset.");
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please check your network connection.");
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
            Reset your password securely
          </p>
        </div>

        {/* Forgot Password Card */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl shadow-md p-8 sm:p-10">
          
          {/* Error Message */}
          {error && (
            <div 
              className="alert alert-error mb-6" 
              role="alert"
              aria-live="polite"
            >
              <strong>⚠️ Error:</strong> {error}
            </div>
          )}

          {/* Success Message */}
          {message && (
            <div 
              className="alert alert-success mb-6" 
              role="alert"
              aria-live="polite"
            >
              <strong>✅ Success:</strong> {message}
            </div>
          )}

          <p className="text-slate-600 font-body text-base mb-6 leading-relaxed">
            Enter the email address associated with your account and we will send you a secure link to reset your password.
          </p>

          {/* Forgot Password Form */}
          <form onSubmit={handleSubmit} className="space-y-7" noValidate>
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
                disabled={isLoading}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-saffron w-full text-lg font-semibold"
            >
              {isLoading ? "Sending Link..." : "Send Reset Link"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 border-t-2 border-slate-200"></div>
            <span className="text-slate-600 font-body text-sm">or</span>
            <div className="flex-1 border-t-2 border-slate-200"></div>
          </div>

          {/* Back to Login Link */}
          <p className="text-center text-slate-700 font-body text-base">
            Remembered your password?{" "}
            <Link to="/login" className="text-navy-600 hover:underline font-semibold">
              Sign In
            </Link>
          </p>
        </div>

        {/* Security Info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-900 font-body">
            <strong>🔒 Verification Notice:</strong> The password reset link will expire in 15 minutes. Check your spam folder if you do not receive the email.
          </p>
        </div>
      </div>
    </div>
  );
}
