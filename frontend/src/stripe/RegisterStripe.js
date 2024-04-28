import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import IntakeCheckout from "./IntakeCheckout";
import SmartnosisApi from "../api";

 
function RegisterStripe({
  changeStep,
  step,
  setCheckoutId,
  orgType
}) {

  let [success, setSuccess] = useState(false);
  let [intakeCheckoutId, setIntakeCheckoutId] = useState('');
  // let [message, setMessage] = useState('');
    // let [sessionId, setSessionId] = useState('');

    let params = useParams();
    let checkoutId = params.checkoutSessionId;
    // console.log(params)


  const handleSubmit = (e) => {
    e.preventDefault();
    changeStep(1);
  };


  const ProductDisplay = () => (
    <section>
      <div className="product">
        {/* <Logo />  ADD SMARTNOSIS LOGO*/}
        <stripe-pricing-table
      pricing-table-id="prctbl_1P31qjKudO6a4edUF1pE5oI4"
      publishable-key={process.env.REACT_APP_PRODUCT_TABLE_KEY}>
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

  const saveLocalSession = (data) => {
    localStorage.setItem("session-initiated", JSON.stringify(data));
  };

  useEffect(()=>{
    if(sessionId){
      let session = loadLocalSession()
      if(session){
        session.stripeSessionId = sessionId
        saveLocalSession(session)
      }
    }
  }, [])

    return (
      <section>
        <div className="product Box-root">
          {/* <Logo /> */}
          <div className="description Box-root">
            <h3>Subscription successful!</h3>
          </div>
        </div>
        <form onSubmit={async (e)=>{
          e.preventDefault()
          await SmartnosisApi.createPortalSession(sessionId)
          // action="/stripe/create-portal-session" method="POST"
        }}
        >
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
  
  let loadLocalSession = () => {
    const session = JSON.parse(localStorage.getItem("session-initiated"));
    if (session) {
      return(session);
    } else return null
  };


  useEffect(() =>{
    // console.log('we got an id', checkoutId)
    if(checkoutId){
      setSuccess(true);
      setCheckoutId(checkoutId);
    }
  }
    , [checkoutId]);

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        // console.log(query.values())

        if (query.get('success')) {
        //  console.log('this one works!');
        }
    
        if (query.get("checkoutSessionId")) {
            // console.log('in the if')
            let id = query.get('checkoutSessionId')
            setIntakeCheckoutId(id)
        }
        
        let session = loadLocalSession()
        if(session && session.stripeSessionId){
          setCheckoutId(session.stripeSessionId)
        } 

      }, []);

let StripeCheckout
if(orgType !== 'hcp'){ StripeCheckout = <IntakeCheckout /> }
else { StripeCheckout = <ProductDisplay /> }


  return (
    <form onSubmit={handleSubmit}>
      <p>Set up your billing account</p>
      {!checkoutId && !intakeCheckoutId && StripeCheckout}
        {checkoutId || intakeCheckoutId && <SuccessDisplay sessionId={checkoutId || intakeCheckoutId} /> }

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
          <button className="btn btn-primary form-control" disabled={!checkoutId && !intakeCheckoutId}>
            {step === 3 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default RegisterStripe;
