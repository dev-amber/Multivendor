const { isSeller } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const CoupounCode = require("../model/coupounCode");
const Event = require("../model/event");
const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const express = require("express");
const router = express.Router();

// create CoupounCode {/* is Seller*/} also add in this verification
 { /**router.post(
  "/create-coupon-code",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const isCouponCodeExist = await CoupounCode.find({
        name: req.body.name,
      });

      if (isCouponCodeExist.length !== 0) {
        return next(new ErrorHandler("coupoun code is already exit", 400));
      }

      const couponCode = await CoupounCode.create(req.body);
      res.status(201).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all coupons code of shop isSeller also add but error

router.get(
  "/get-coupon/:id",isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCodes = await CoupounCode.find({ shopId: req.params.id });

      res.status(200).json({
        success: true,
        couponCodes,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get coupon code value
router.get(
  "/get-coupon-value/:name",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await CoupounCode.findOne({ name: req.params.name });

      res.status(200).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
  **/}

module.exports = router;