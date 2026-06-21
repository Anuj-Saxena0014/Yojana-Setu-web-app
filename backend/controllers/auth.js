// controllers/auth.js

const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

// ── Generate JWT Token ──────────────────────────────────────────────────────
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "your_jwt_secret_key", {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// ── SIGNUP ─────────────────────────────────────────────────────────────────
exports.signup = async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;

    // Validation
    if (!name || !email || !password || !passwordConfirm) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    // Generate token
    const token = generateToken(user._id);

    // Send Welcome Email asynchronously to not block response
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const welcomeHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 20px; background-color: #f9f9f9;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border: 1px solid #dddddd; border-radius: 5px;">
          <h2 style="color: #1e3a5f; border-bottom: 2px solid #ff7800; padding-bottom: 10px; margin-top: 0;">Yojana Setu</h2>
          <p>Namaste ${user.name},</p>
          <p>Welcome to Yojana Setu — your gateway to discovering personalized government schemes.</p>
          <p>We map your profile to central and state government programs to ensure you never miss out on benefits you qualify for.</p>
          <p style="margin-top: 30px;">
            <a href="${frontendUrl}" style="background-color: #ff7800; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Explore Yojana Setu</a>
          </p>
          <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 30px 0;">
          <p style="font-size: 12px; color: #777777; line-height: 1.4;">This is an automated notification from Yojana Setu.<br>&copy; 2026 Yojana Setu. All rights reserved.</p>
        </div>
      </body>
      </html>
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: "Welcome to Yojana Setu",
        html: welcomeHtml,
      });
      console.log(`[Email] Welcome email successfully sent to: ${user.email} 🚀`);
    } catch (emailErr) {
      console.error("[Email] Welcome email failed to send:", emailErr);
    }

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors)
        .map((err) => err.message)
        .join(", ");
      return res.status(400).json({
        success: false,
        message: messages,
      });
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `${field} already exists`,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Error during signup",
    });
  }
};

// ── LOGIN ──────────────────────────────────────────────────────────────────
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Check for user (need to select password explicitly)
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error during login",
    });
  }
};

// ── GET CURRENT USER ───────────────────────────────────────────────────────
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching user",
    });
  }
};

// ── FORGOT PASSWORD ────────────────────────────────────────────────────────
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide an email address",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with that email address",
      });
    }

    // Generate raw token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash token and store in DB
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Set expiry to 15 minutes from now
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save();

    // Create reset URL
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

    const resetHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 20px; background-color: #f9f9f9;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border: 1px solid #dddddd; border-radius: 5px;">
          <h2 style="color: #1e3a5f; border-bottom: 2px solid #ff7800; padding-bottom: 10px; margin-top: 0;">Yojana Setu Security</h2>
          <p>Hello ${user.name},</p>
          <p>We received a request to reset the password for your Yojana Setu account.</p>
          <p>Please click the button below to set a new password. This link is valid for 15 minutes:</p>
          <p style="margin-top: 30px; margin-bottom: 30px;">
            <a href="${resetUrl}" style="background-color: #ff7800; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Reset Password</a>
          </p>
          <p>If you did not request a password reset, you can safely ignore this email.</p>
          <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 30px 0;">
          <p style="font-size: 12px; color: #777777; line-height: 1.4;">This is a secure system notification from Yojana Setu.<br>&copy; 2026 Yojana Setu. All rights reserved.</p>
        </div>
      </body>
      </html>
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: "Reset your Yojana Setu Password",
        html: resetHtml,
      });

      console.log(`[Email] Password reset link successfully sent to: ${user.email} 🔒`);

      res.status(200).json({
        success: true,
        message: "Password reset link sent to your email",
      });
    } catch (emailErr) {
      console.error("[Email] Password reset email failed to send:", emailErr);

      // Rollback database changes if email fails
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      return res.status(500).json({
        success: false,
        message: "Email could not be sent. Please try again later.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error processing forgot password request",
    });
  }
};

// ── RESET PASSWORD ──────────────────────────────────────────────────────────
exports.resetPassword = async (req, res) => {
  try {
    const { password, passwordConfirm } = req.body;

    if (!password || !passwordConfirm) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields",
      });
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Hash token from req params to match with DB hashed token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    // Find user with token and checking if token has not expired
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    // Set new password (will be hashed automatically by userSchema pre-save hook)
    user.password = password;

    // Clear reset token and expiration fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully! You can now log in.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error resetting password",
    });
  }
};
