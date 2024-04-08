const express = require("express");
const router = new express.Router();
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require('stripe')('sk_test_51Ofz4oKudO6a4edUsLXnw33myXvNgmNYDh82gvLFA9CgHFiRLCBzs4RIEtzl4IheYANpOPQ7LOaFTI9W1ze5mZYo008luJrihq');

const SNS_DOMAIN = 'http://localhost:3000/stripeTest/'

const app = express();
app.use(express.static('public'));



const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

// router.post("/create-payment-intent", async (req, res) => {
//   const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: calculateOrderAmount(items),
//     currency: "usd",
//     // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });

//   res.send({
//     clientSecret: paymentIntent.client_secret,
//   });
// });

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1P31GmKudO6a4edUqbKXmIPl',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${SNS_DOMAIN}?success=true`,
      cancel_url: `${SNS_DOMAIN}?canceled=true`,
      automatic_tax: {enabled: true},
    });
    console.log(session.url)
  
    res.redirect(303, session.url);
  });

  app.get('/api/greeting', (req, res) => {
    const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
  });

//   module.exports = router;

  app.listen(4242, () => console.log('Running on port 4242'));

