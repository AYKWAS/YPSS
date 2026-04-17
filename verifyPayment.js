const axios = require("axios");

const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY || "YOUR_SECRET_KEY";

async function verifyTransaction(transactionId) {
  try {
    if (!transactionId) {
      throw new Error("Transaction ID is required");
    }

    const response = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
      {
        headers: {
          Authorization: `Bearer ${FLW_SECRET_KEY}`
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error("Transaction verification failed:", error.response?.data || error.message);
    return {
      status: "error",
      message: error.message
    };
  }
}

module.exports = verifyTransaction;