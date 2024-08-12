const express = require("express");
const router = new express.Router();

const stripe = require('stripe')(process.env.STRIPE_TOKEN);

const SNS_DOMAIN = process.env.REACT_APP_HOST


// const app = express();
router.use(express.static('public'));


router.post('/create-checkout-session', async (req, res) => {


  let productID = process.env.NODE_ENV === "test" ? process.env.STRIPE_HCP_DEV_PRICE_ID : process.env.STRIPE_HCP_PROD_PRICE_ID


    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: productID,
        },
      ],
      mode: 'subscription',
      success_url: `${SNS_DOMAIN}?success=true&checkoutSessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SNS_DOMAIN}?canceled=true`,
      automatic_tax: {enabled: true},
    });
  
    res.redirect(303, session.url);
  });


  router.post('/create-portal-session', async (req, res) => {
      const {session_id} = req.body;
      const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)

      const returnURL = SNS_DOMAIN + `/register/${session_id}`

      const portalSession = await stripe.billingPortal.sessions.create({
        customer: checkoutSession.customer,
        return_url: returnURL
      })

      res.redirect(303, portalSession.url)

  })

  module.exports = router;

