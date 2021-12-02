import React, { useState, useEffect } from 'react';
import { db } from "../firebase";
import './Orders.css'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/UserSlice'
import Order from './Order'
import { selectItems } from '../features/BasketSlice';
import { Sidebars } from './Sidebars';
import Ordersss from './Ordersss';


function Orderss() {
    const user = useSelector(selectUser);
    const items = useSelector(selectItems)

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            db.collection('users')
                .doc(user?.uid)
                .collection('orders')
                .orderBy('created', 'desc')
                .onSnapshot(snapshot => (
                    setOrders(snapshot.docs.map(doc => {
                        return {
                            _id: doc.id, ...doc.data(), basket: doc.data()?.basket?.filter(itm => itm?.remail === user.email)
                        }
                    }
                    ))
                ))
        } else {
            setOrders([])
        }

    }, [user])

    return (

        <div className="div">

            <div>
                <Sidebars />
            </div>
            <div className='orders'>
                <h1>Your Orders</h1>

                <div className='orders__order'>
                    {orders?.map(order => (
                        <Ordersss order={order} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Orderss