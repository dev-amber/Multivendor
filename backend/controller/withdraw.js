const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const express = require("express");
const { isSeller, isAdmin, isAuthenticated } = require("../middleware/auth");
const Withdraw = require("../model/withdraw");
const sendMail = require("../utils/sendMail");
const router = express.Router();

// Create withdraw request --- only for seller
router.post(
  "/create-withdraw-request",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    const { amount } = req.body;

    // Find seller/shop
    const shop = await Shop.findById(req.seller._id);
    if (!shop) return next(new ErrorHandler("Shop not found", 404));

    if (amount > shop.availableBalance)
      return next(new ErrorHandler("Insufficient balance", 400));

    // Create withdraw request
    const withdraw = await Withdraw.create({
      seller: req.seller,
      amount,
    });

    // Deduct from available balance
    shop.availableBalance -= amount;
    await shop.save();

    // Send email (try-catch)
    try {
      await sendMail({
        email: req.seller.email,
        subject: "Withdraw Request",
        message: `Hello ${req.seller.name}, Your withdraw request of ${amount}$ is processing. It will take 3 to 7 days to process.`,
      });
    } catch (error) {
      console.log("Email not sent:", error.message);
      // Not blocking the withdraw request if email fails
    }

    // Return response once
    res.status(201).json({
      success: true,
      withdraw,
      availableBalance: shop.availableBalance, // updated balance
    });
  }),
);

// get all  withdraw request for admin
router.get(
  "/get-all-withdraw-request",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const withdraws = await Withdraw.find().sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        withdraws,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }),
);

// update withdraw for admin
router.put(
  "/update-withdraw-request/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { sellerId } = req.body; // sellerId need bcz we want to change the seller transaction also update

      const withdraw = await Withdraw.findByIdAndUpdate(
        req.params.id,
        {
          status: "succeed",
          updatedAt: Date.now(),
        },
        { new: true },
      ); // params means withdraw id

      const seller = await Shop.findById(sellerId);

      const transections = {
        _id: withdraw._id,
        amount: withdraw.amount,
        updatedAt: withdraw.updatedAt,
        status: withdraw.status,
      };

      seller.transections = [...seller.transections, transections]; // ... means old transetcuion not update

      await seller.save();

      try {
        await sendMail({
          email: seller.email, // seller we find out the seller
          subject: "Payment Confirmation",
          message: `Hello ${seller.name}, Your withdraw request of ${withdraw.amount}$ is on the way. Delivery time depends on your banks rules it usually  takes 3 days to 7 days`,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }

      res.status(201).json({
        success: true,
        withdraw,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }),
);

module.exports = router;
