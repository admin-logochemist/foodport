
import Button from '@restart/ui/esm/Button'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectItems, selectTotal } from '../features/BasketSlice'
import CheckoutProduct from './CheckoutProduct'
import { useHistory } from 'react-router'
import StripeCheckout from 'react-stripe-checkout';
import Footer from './Footer'
import Navbar from '../components/Navbar'
import Currency from 'react-currency-formatter';
import "./Checkouts.css"
import {loadStripe} from '@stripe/stripe-js'
import { selectUser } from '../features/UserSlice'
import CheckoutPro from './CheckoutPro'
import 'bootstrap/dist/css/bootstrap.min.css';
function Checkout() {
    const user =useSelector(selectUser);
    const stripePromise=loadStripe();
    const items = useSelector(selectItems);
    const history=useHistory()
    const total = useSelector(selectTotal)
    function createCheckout (){
 if(!user){
     history.push("./MainLogin")
     alert("Please Signin Before Checkout")
    }else{
        history.push("./stripe")
    }
    
    }
    function handleTheClick (){
        history.push('/')
    }
    const onToken = (token) => {
        console.log(token)
    }
    
    return (
   
        <div>
		<Navbar/>
        <div>
        <div class="checkout_top">
        <div class="container checkout_container">
            <div class="row mt-5">
                <div class="col-6 p-3 box-left">
                    <h4 class="shop_head">{items.length === 0 ? "Your Food Basket Is Empty, Please Add Some Items" : "Your Shopping Basket :"}</h4>
                    <span class="check_borderr"></span>
                    <button class="shop_bttn"  onClick={() => handleTheClick()}>Continue Shopping</button>
               
                </div>
                <div class="col-6 p-3 box-right">
                    <h4 class="proceed_head">SUBTOTAL [{items.length}]: <span>${total}</span></h4>
                    <span class="check_borderr"></span>
                    <button class="shop_bttn" onClick={() => createCheckout()}>Proceed To CheckOut</button>
                </div>
            </div>
        </div>
    </div> 
  
    <div class="container-fluid">
    <div class="row mt-4">
                        {items && items?.length ? items.map((item, i) => {
                            return <CheckoutPro
                                key={i}
                                img={item?.img || ''}
                                title={item?.title||''}
                                price={item?.price||''}
                                _id={item?._id||''}
                                remail={item?.remail||''}
                                description={item?.description}
                                useremail={item?.email}
                               

                            />
                        }
                        ) : null}
                        {console.log(items)}
                      
                        </div>
        </div>
    <br/>
            <br/>
            <br/>    <br/>
            <br/>
            <br/>    <br/>
            <br/>
            <br/>    <br/>
            <br/>
            <br/>    <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Footer/>
        </div>
        <div className="copyright-checkout">
            <h1>Copyright 2020.All rights reserved.</h1>
        </div>
        </div>

    )
}
export default Checkout
