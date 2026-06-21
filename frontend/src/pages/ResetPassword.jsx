import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!password || !passwordConfirm) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await api.post(`/auth/reset-password/${token}`, {
        password,
        passwordConfirm,
      });

      if (data.success) {
        setMessage(data.message || "Password reset successful! Redirecting to login...");
        setPassword("");
        setPasswordConfirm("");
        // Automatically navigate to login after 3 seconds
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setError(data.message || "Failed to reset password.");
      }
    } catch (err) {
      setError(err.message || "An error occurred. The link may be invalid or expired.");
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
            Set your new account password
          </p>
        </div>

        {/* Reset Password Card */}
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

          {/* Reset Password Form */}
          {!message && (
            <form onSubmit={handleSubmit} className="space-y-7" noValidate>
              {/* Password Field */}
              <div>
                <label htmlFor="password" className="form-label">
                  New Password <span className="text-red-600">*</span>
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="form-input"
                  required
                  minLength={6}
                  aria-required="true"
                  disabled={isLoading}
                />
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="passwordConfirm" className="form-label">
                  Confirm Password <span className="text-red-600">*</span>
                </label>
                <input
                  id="passwordConfirm"
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  placeholder="Re-enter new password"
                  className="form-input"
                  required
                  minLength={6}
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
                {isLoading ? "Resetting Password..." : "Reset Password"}
              </button>
            </form>
          )}

          {message && (
            <div className="text-center pt-4">
              <Link to="/login" className="btn-saffron w-full text-lg font-semibold inline-block text-center decoration-none">
                Go to Sign In
              </Link>
            </div>
          )}

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
      </div>
    </div>
  );
}
