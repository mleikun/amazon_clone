const { onRequest } = require("firebase-functions/v2/https");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { setGlobalOptions } = require("firebase-functions/v2");

// Load environment variables from .env file
dotenv.config();

// Initialize Stripe with the API key
const stripe = require("stripe")(process.env.STRIPE_KEY);

// Set global options for Firebase functions
setGlobalOptions({ maxInstances: 10 });

const app = express(); // Initialize express

app.use(cors({ origin: true })); // Allow cross-origin requests
app.use(express.json()); // Parse JSON requests

app.get("/", (req, res) => {
  res.status(200).json({ message: "Success!" });
});

app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total);
  if (total > 0) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
      });

      res.status(201).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json({ message: "Total must be greater than zero" });
  }
});

exports.api = onRequest(app); // Serve the app through Firebase
