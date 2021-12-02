const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51J5C8JLwMYFuVwcJ6RxFSNfgVY00h369S0Ft7q6yxZQqf5GHO1NI1eh7rRGFUJnJu99PcU0TLjBSWpUj8Ov1KY6A00Y7hvjgNL"
);
const admin = require("firebase-admin");
const serviceAccount = require('./foodport-87389-firebase-adminsdk-lezmu-01c3ab2968.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const app = express();
// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());
// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });
  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app,admin);