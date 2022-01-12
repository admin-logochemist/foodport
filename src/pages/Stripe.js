import React, { useState, useEffect } from 'react';
import './stripe.css'
import { useSelector } from "react-redux";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { selectUser } from '../features/UserSlice'
import {  selectItems, selectTotal } from '../features/BasketSlice';
import axios from './axios';
import { SocialIcon } from 'react-social-icons';
import { db } from "../firebase";
import TextField from '@mui/material/TextField';
import Navbar from '../components/Navbar'
import itemd from './a.jpg'
import pay from './peyment-card.png'
import Footer from './Footer';

const Stripe = () => {
    const user = useSelector(selectUser)
    const items = useSelector(selectItems)
    const total = useSelector(selectTotal)
    const basket = useSelector(selectItems)
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);
    const [Name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [country, setCountry] = useState("")
    const [Zipcode, setZipCode] = useState("")
    const [state, setState] = useState("")
    const [address, setAddress] = useState("")
    const clientSecretS = (clientSecret).toString
    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${total}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])

    console.log('THE SECRET IS >>>', clientSecret)
    console.log('👱', user)

    const handleSubmit = async (event) => {
        // do all the fancy stripe stuff...
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
              
            }
        
        }).then(({ paymentIntent }) => {
            // paymentIntent = payment confirmation
{console.log('Stripe',CardElement)}
            db
              .collection('users')
              .doc(user?.uid)
              .collection('orders')
              .doc(paymentIntent.id)
              .set({
                  user:user?.email,
                  name:user?.displayName,
                  country:country,
                  zipcode:Zipcode,
                  basket: basket,
                  state:state,
                  phone:phone,
                  address,address,
                  amount: paymentIntent.amount,
                  created: paymentIntent.created
              })

            setSucceeded(true);
            setError(null)
            setProcessing(false)

          

            history.replace('/orders')
        })

    }

    const handleChange = event => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <>
      
        <Navbar/>
        <div className="checkout_banner"></div>

        <div className="containerrs mt-5">
    <div className="main_container_form">
        <h6 className="rder-head">Your Order</h6>
        <div className="items_container">
        {items.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                description={item.description}
                                img={item.img}
                                price={item.price}
                                rating={item.rating}
                                _id={item._id}
                                quantity={item.quantity}
                                price_total={item.price_total}
                            />
                        ))}
        </div>
     
        <div>
       
                <div class="itemss_totals">
                    <h4>Total : <span class="order_items_totals">${total}</span> </h4>
                </div>
            <div class="peyment-method">
                <h6>Payment Method</h6>
                <ul class="card-area">
                    <li>
                      
                        <div class="details">
                            <h6>Credit Cart <img src={pay} alt="img"/></h6>
                            <p>Pay with visa, Anex, MasterCard, Maestro,Discover and many other credit and debit credit vai paypal</p>
                        </div>
                    </li>
                </ul>
               
                <div class="col-md-12">
                    <label class="mt-3">Card Number</label>
                    <div class="single-input-wrap">
                    <CardElement onChange={handleChange}/>
                    </div>
                </div>
               
            </div>
            <form class="default-form-wrap style-2" onSubmit={handleSubmit}>
            <button class="orderBtn" disabled={processing || disabled || succeeded}> {processing ? <p>Processing</p> : "Place Order"}</button>
            </form>
        </div> 
    </div>   
    <div class="bill-payment-wrap">
        <h5 class="billing-system-head">Billing Details
        </h5>
       
            <div class="row checkpgrow">
                <div class="col-md-6">
                    <label>Full Name</label>
                    <div class="single-input-wrap">
                        <input type="text" class="form-control" placeholder="Full Name" defaultValue={user.displayName}/>
                    </div>
                </div>
                <div class="col-md-6">
                    <label>Email Address</label>
                    <div class="single-input-wrap">
                        <input type="email" class="form-control" placeholder="Email Address" defaultValue={user.email} />
                    </div>
                </div>
                <div class="col-md-6">
                    <label class="mt-3">Phone No</label>
                    <div class="single-input-wrap">
                        <input type="text" class="form-control" placeholder="Phone No" value={phone} onChange={(e) => setPhone(e.target.value)}  />
                    </div>
                </div>
                <div class="col-md-6">
                    <label class="mt-3">Country</label>
                    <div class="single-input-wrap">
                        <input type="text" class="form-control" placeholder="Type Your Country" value={country} onChange={(e) => setCountry(e.target.value)} />
                    </div>
                </div>
                <div class="col-md-6">
                    <label class="mt-3">Zip Code</label>
                    <div class="single-input-wrap">
                        <input type="text" class="form-control" placeholder="Zip Code" value={Zipcode} onChange={(e) => setZipCode(e.target.value)}/>
                    </div>
                </div>
                <div class="col-md-6">
                    <label class="mt-3">State</label>
                    <div class="single-input-wrap">
                        <input type="text" class="form-control" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
                    </div>
                </div>
                <div class="col-md-12">
                    <label class="mt-3">Address</label>
                    <div class="single-input-wrap">
                        <input type="text" class="form-control" placeholder="Type Your Address" value={address} onChange={(e) => setAddress(e.target.value)}/>
                    </div>
                </div>
            </div>
       
    </div> 
   
</div>


<Footer/>
                <div className="copyright-home">
                    <h1>Copyright 2020.All rights reserved.</h1>
                    <SocialIcon bgColor="#fff" fgColor="#d70000" style={{ height: 25 }} url="https://twitter.com/" />
                    <SocialIcon bgColor="#fff" fgColor="#d70000" style={{ height: 25 }} url="https://facebook.com/" />
                    <SocialIcon bgColor="#fff" fgColor="#d70000" style={{ height: 25 }} url="https://instagram.com/" />
                </div>
      

   
        </>
    )
}
export default Stripe
