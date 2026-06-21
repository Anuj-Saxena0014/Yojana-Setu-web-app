import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !passwordConfirm) {
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
      const result = await signup(name, email, password, passwordConfirm);
      if (result.success) {
        navigate("/", { state: { welcome: true, name } });
      } else {
        setError(result.error || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error("Signup error:", err);
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
            Quick & secure registration
          </p>
        </div>

        {/* Signup Card */}
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

          {/* Signup Form */}
         <form onSubmit={handleSubmit} className="space-y-7" noValidate>
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="form-label">
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="form-input"
                required
                aria-required="true"
                aria-describedby="name-help"
              />
              <div id="name-help" className="form-help">
                Use your legal name as it appears in your ID
              </div>
            </div>

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
                aria-describedby="email-help"
              />
              <div id="email-help" className="form-help">
                We'll use this to verify your account
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="form-label">
                Create Password <span className="text-red-600">*</span>
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
                aria-describedby="password-help"
              />
              <div id="password-help" className="form-help">
                Use a strong password with numbers & letters
              </div>
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
                placeholder="Re-enter your password"
                className="form-input"
                required
                minLength={6}
                aria-required="true"
              />
            </div>

            {/* Terms Agreement */}
            <div className="pt-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  className="w-5 h-5 text-navy-600 rounded mt-0.5"
                  aria-required="true"
                />
                <span className="text-base text-slate-700 font-body leading-relaxed">
                  I agree to the <Link to="#" className="text-navy-600 hover:underline font-semibold">Terms of Service</Link> and <Link to="#" className="text-navy-600 hover:underline font-semibold">Privacy Policy</Link>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-saffron w-full text-lg font-semibold"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 border-t-2 border-slate-200"></div>
            <span className="text-slate-600 font-body text-sm">or</span>
            <div className="flex-1 border-t-2 border-slate-200"></div>
          </div>

          {/* Login Link */}
          <p className="text-center text-slate-700 font-body text-base">
            Already have an account?{" "}
            <Link to="/login" className="text-navy-600 hover:underline font-semibold">
              Sign In
            </Link>
          </p>
        </div>

        {/* Security Info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-900 font-body">
            <strong>🔒 Secure & Private:</strong> Your information is encrypted and secure. We never share your data.
          </p>
        </div>
      </div>
    </div>
  );
}
