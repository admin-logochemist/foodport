
import Button from '@restart/ui/esm/Button'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectItems, selectTotal } from '../features/BasketSlice'
import CheckoutProduct from './CheckoutProduct'
import { useHistory } from 'react-router'
import StripeCheckout from 'react-stripe-checkout';
import Footer from './Footer'
import Currency from 'react-currency-formatter';
import "./Checkout.css"
import {loadStripe} from '@stripe/stripe-js'
function Checkout() {
    const stripePromise=loadStripe();
    const items = useSelector(selectItems);
    const history=useHistory()
    const total = useSelector(selectTotal)
    function createCheckout (){
        history.push('/stripe')
    }
    function handleTheClick (){
        history.push('/')
    }
    const onToken = (token) => {
        console.log(token)
    }
    
    return (
        <div>
        <div>
            <main style={{ display: 'flex' ,flexDirection:'row' ,justifyContent:'space-around',flexWrap:'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column', padding: 5, justifyContent: 'space-between', backgroundColor: 'white' }}>
                    <h1 className="h1h1">
                        {items.length === 0 ? "Your Food Basket Is Empty, Please Add Some Items" : "Your Shopping Basket :"}
                    </h1>
                    <button className="Browse-btn" onClick={() => handleTheClick()}>Continue Shopping</button>
                    <div>
                        {items && items?.length ? items.map((item, i) => {
                            return <CheckoutProduct
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
                <div>
                    {items.length>0 && (
                        <>
                        <div className="background-color">
                        <h3 className="Subtotal">Subtotal({items.length}):
                        <span>
                            <Currency quantity={total} currency="USD"/>
                        </span>
                        </h3>
                        
                        <Button className="btn-proceed" role="Link" onClick={() => createCheckout()}> Proceed To CheckOut</Button>
                        </div>
                        </>
                    )}
                </div>
            </main>
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
