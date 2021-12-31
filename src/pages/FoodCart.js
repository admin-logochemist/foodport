import React from 'react'
import { useState, useEffect } from 'react';
import { Sidebars } from './Sidebars';
import "./DashboardTabs.css";
import { useSelector } from 'react-redux';
import { selectUser } from '../features/UserSlice';
import FoodcartDetails from './Food-cartDetails'
import { Link, useHistory } from "react-router-dom";

import { db } from "../firebase"

const FoodCart = () => {
  
    const [users, setUsers] = useState("")
  const history = useHistory();
  const user = useSelector(selectUser)
    const [foodcart, setFoodCart] = useState([]);
    const getFoodCarts = () => {
        db.collection('foodcart').onSnapshot(snapshot => (
          setFoodCart(snapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }
          )))
        ))
      };
      const getFoodCart = () => {
        db.collection('foodcart').where('user', '==', user?.email).onSnapshot(snapshot => (
          setFoodCart(snapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }
          )))
        ))
      };
      useEffect(() => {
        if (user?.email) { getFoodCart(); }
    
        else {
          getFoodCarts();
        }

    
      }, [user])
      const renderFoodCart = () => {
        if (foodcart && foodcart?.length) {
          async function trying(url) {
            let image = await url.then(async (url) => { return url })
            console.log('image', image)
            return image.toString()
          }
          // console.log('state', img)
          return foodcart.map((item, index) => {
            return <FoodcartDetails
              obj={item}
            />
    
          })
        }
      };
     
    return (
        <div className="div">
            <div>
            <Sidebars/>
            </div>
            <div>
            <div classname="Dashboard-box" style={{display:'flex',alignItems:'center',justifyContent:'center',paddingTop:10}}>
                
                  <h2 style={{ fontWeight: 'bold',fontSize:40 }}>Your FoodCart</h2>
                </div>
                <div className="btn-one">
                {renderFoodCart()}
                  {/* <button style={{ color: 'white',backgroundColor: '#d70000', border: 'hidden', padding: 15, margin: 2 }} onClick={()=>{handleClick()}}>Add Restaurents</button> */}
                </div>
            </div>
        </div>
    )
}

export default FoodCart
