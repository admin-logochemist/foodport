import React, { useState, useEffect } from 'react';
import { db } from "../firebase";
import './Orders.css'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/UserSlice'
import Order from './Order'
import { selectItems } from '../features/BasketSlice';
import { Sidebars } from './Sidebars';
import Navbar from '../components/Navbar'
function Orders() {
const user = useSelector(selectUser);
const items = useSelector(selectItems)
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if(user) {
        db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot(snapshot => (
            setOrders(snapshot.docs.map(doc => ({
                _id: doc.id, ...doc.data()
            })))
        ))
    } else {
        setOrders([])
    }

  }, [user])

    return (
        <>
        <Navbar/>
        <div className="" style={{backgroundColor:"#ff2c2c"}}>
          
            {/* <div>
                <Sidebars/> 
            </div> */}
        <div className=''>
            

            <div className=''>
                {orders?.map(order => (
                    <Order order={order} />
                ))}
            </div>
        </div>
        </div>
        </>
    )
}

export default Orders