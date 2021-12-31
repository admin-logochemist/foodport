import React from 'react'
import './Order.css'
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import {useSelector} from 'react-redux';
import { selectItems, selectTotal } from '../features/BasketSlice';
import { Sidebars } from './Sidebars';
import "./DashboardTabs.css";
import Checkoutorder from './Checkoutorder';

function Ordersss({ order }) {
    const total=useSelector(selectTotal)
    const items=useSelector(selectItems)
    return (


        <div className='orderss'>
               <div className='imagesboxes'>
            { order?.basket.map(item => {
                            return <Checkoutorder
                                id={item?._id}
                                img={item?.img}
                                title={item?.title}
                                price={item?.price}
                                _id={item?._id}
                                remail={item?.remail}
                                description={item?.description}
                            />
                        }
                        )} 
           {console.log('order',order)}
           </div>
          
            
            <div className="ordersdatils pl-3">
            <h2>Order</h2>
            <li>
               Name: <small>{order?.name}</small>
            </li>
            <li>
               Email: <small>{order?.user}</small>
            </li>
         
            <li>
               Date: <small>{moment.unix(order?.created).format("MMMM Do YYYY, h:mma")}</small>
            </li>
            {/* <li>
               Purchase Stripe Key: <small>{order._id}</small>
            </li> */}
            <li>
               Phone: <small>{order?.phone}</small>
            </li>
            <li>
               Address: <small>{order?.address}</small>
            </li>
            <li>
               Country: <small>{order?.country}</small>
            </li>
            <li>
               State: <small>{order?.state}</small>
            </li>
            <li>
               ZipCode: <small>{order?.zipcode}</small>
            </li>
            </div>
        
        </div>

    )
}

export default Ordersss;