import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

 
function RegisterStripe({
  emails,
  changeStep,
  step,
  submit,
  adminRole,
  setCheckoutId,
}) {

    let [message, setMessage] = useState('');
    let [success, setSuccess] = useState(false);
    let [sessionId, setSessionId] = useState('');

    let params = useParams();
    let checkoutId = params.checkoutSessionId;


  const handleSubmit = (e) => {
    e.preventDefault();
    changeStep(1);
  };

  const handleChange = (e, i) => {
    const emailArr = [...emails];
    emailArr[i] = e.target.value;
    // setEmails(emailArr);
  };

  const generateEmailFields = () => {
    let emailsCopy = [...emails];
    if (step === 2 && adminRole === "hcp") emailsCopy.pop();
    if (step === 3 && adminRole === "staff") emailsCopy.pop();
    const emailFields = emailsCopy.map((value, i) => (
      <div className="form-floating my-2" key={i}>
        <input
          className="form-control"
          type="text"
          id={`email-${i}`}
          value={value}
          placeholder="email"
          required={step === 2 && i === 0}
          onChange={(e) => handleChange(e, i)}
        />
        <label htmlFor={`email-${i}`}>
          {step === 3 ? "Non-" : ""}HCP Email Address #{i + 1}:{" "}
          <span className="text-danger">*</span>
        </label>
      </div>
    ));
    return emailFields;
  };

  const ProductDisplay = () => (
    <section>
      <div className="product">
        {/* <Logo />  ADD SMARTNOSIS LOGO*/}
        <stripe-pricing-table
      pricing-table-id="prctbl_1P31qjKudO6a4edUF1pE5oI4"
      publishable-key="pk_test_51Ofz4oKudO6a4edU76f17soL1r4xJvTQgaCDeSh3ppbLWPYzR346OiyVFSMRn7y0yS35ZwSX3eDWga1nwjkcxRwf00BBNOi3lO"
    >
    </stripe-pricing-table>
      </div>
     {/* { <form action="/create-checkout-session" method="POST">
        Add a hidden field with the lookup_key of your Price
        <input type="hidden" name="lookup_key" value="smartnosis-hcp-basic" />
        <button id="checkout-and-portal-button" type="submit">
          Checkout
        </button>
      </form>} */}
    </section>
  )


const SuccessDisplay = ({ sessionId }) => {
    return (
      <section>
        <div className="product Box-root">
          {/* <Logo /> */}
          <div className="description Box-root">
            <h3>Subscription successful!</h3>
          </div>
        </div>
        <form action="/create-portal-session" method="POST">
          <input
            type="hidden"
            id="session-id"
            name="session_id"
            value={sessionId}
          />
          <button id="checkout-and-portal-button" className="btn btn-secondary form-control" type="submit">
            Manage your billing information
          </button>
        </form>
      </section>
    );
  };

  useEffect(() =>{
    console.log('we got an id', checkoutId)
    if(checkoutId){
      setSuccess(true);
      setCheckoutId(checkoutId);
    }
  }
    , [checkoutId]);

// const Message = ({ message }) => (
//     <section>
//       <p>{message}</p>
//     </section>
//   );

//   useEffect(() => {
//     // Check to see if this is a redirect back from Checkout
//     const query = new URLSearchParams(window.location.search);

//     if (query.get('success')) {
//       setSuccess(true);
//       setSessionId(query.get('session_id'));
//     }

//     if (query.get('canceled')) {
//       setSuccess(false);
//       setMessage(
//         "Order canceled -- continue to shop around and checkout when you're ready."
//       );
//     }
//   }, [sessionId]);


  return (
    <form onSubmit={handleSubmit}>
      <p>Set up your billing account</p>
      {!checkoutId && <ProductDisplay />}
        {checkoutId && <SuccessDisplay sessionId={checkoutId} /> }
     {/* {<Message message={message} />;} */}

      <div className="row mt-4">
        <div className="col">
          <button
            type="button"
            className="btn btn-primary form-control"
            onClick={() => changeStep(-1)}
          >
            Previous
          </button>
        </div>
        <div className="col">
          <button className="btn btn-primary form-control" disabled={!checkoutId}>
            {step === 3 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default RegisterStripe;
