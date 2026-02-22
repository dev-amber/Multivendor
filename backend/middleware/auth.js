// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const Shop = require("../model/shop");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  console.log("🔍 Cookies received in request:", req.cookies); // 👈 log cookies

  const { token } = req.cookies;

  if (!token) {
    console.log("❌ No token found in cookies!");
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log("✅ Decoded JWT payload:", decoded); // 👈 log decoded token

  req.user = await User.findById(decoded.id);

  if (!req.user) {
    console.log("❌ No user found for this token ID");
    return next(new ErrorHandler("User not found", 404));
  }

  console.log("✅ Authenticated User:", req.user.email);
  next();
});

exports.isSeller = catchAsyncErrors(async (req, res, next) => {
  console.log("🔍 Cookies received in request:", req.cookies); // 👈 log cookies

  const { seller_token } = req.cookies;

  if (!seller_token) {
    console.log("❌ No seller_token found in cookies!");
    return next(new ErrorHandler("Please login to continue", 401));
  }

  try {
    const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);
    console.log("✅ Decoded JWT payload:", decoded); // 👈 log decoded token

    req.seller = await Shop.findById(decoded.id);

    if (!req.seller) {
      console.log("❌ No seller found for this token ID");
      return next(new ErrorHandler("Seller not found", 404));
    }

    console.log("✅ Authenticated Seller:", req.seller.email);
    next();
  } catch (err) {
    console.log("❌ Invalid or expired seller token:", err.message);
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
});

exports.isAdmin = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`${req.user.role} can not access this resources!`))
        };
        next();
    }
}

