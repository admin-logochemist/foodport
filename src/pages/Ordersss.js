import React from 'react'
import './Order.css'
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import {useSelector} from 'react-redux';
import { selectItems, selectTotal } from '../features/BasketSlice';
import { Sidebars } from './Sidebars';
import "./DashboardTabs.css";

function Ordersss({ order }) {
    const total=useSelector(selectTotal)
    const items=useSelector(selectItems)
    return (
        
     
        <div className='order'>
            <h2>Order</h2>
            <p>{order?.user}</p>
            <p>{moment.unix(order?.created).format("MMMM Do YYYY, h:mma")}</p>
            <p >
               Purchase Stripe Key: <small>{order._id}</small>
            </p>
            { order?.basket.map(item => {
                            return <CheckoutProduct
                                id={item?._id}
                                img={item?.img || ''}
                                title={item?.title||''}
                                price={item?.price||''}
                                _id={item?._id}
                                remail={item?.remail}
                                description={item?.description}
                            />
                        }
                        )} 
           {console.log('order',order)}
           
        </div>
      
    )
}

export default Ordersss;