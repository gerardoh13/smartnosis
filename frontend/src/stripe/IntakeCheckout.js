import React, { useState, useEffect } from "react";
import SmartnosisApi from "../api";
// import "./App.css";

const ProductDisplay = () => (
  <section>
    <div className="product">
    </div>
    <form onSubmit={async (e)=>{
          e.preventDefault()
          await SmartnosisApi.createCheckoutSession()
          // action="/stripe/create-portal-session" method="POST"
        }}>
      <button type="submit" className="btn btn-secondary form-control">
            Connect to Stripe
        </button>
    </form>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function IntakeCheckout() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay />
  );
}