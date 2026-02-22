// utils/sendShopToken.js

const sendShopToken = (seller, statusCode, res) => {
  const token = seller.getJwtToken();

  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
    httpOnly: true,  // ✅ secure from XSS

  };

  // Send cookie + response
  res
    .status(statusCode)
    .cookie("seller_token", token, options)
    .json({
      success: true,
      seller,  // changed from 'user' to 'seller' for clarity
      token,
    });
};

module.exports = sendShopToken;
