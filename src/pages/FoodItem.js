import React, { useState, useEffect } from 'react';
import ReactStars from "react-rating-stars-component";
import "./restaurant-box.css"
import { useSelector } from 'react-redux';
import { selectOpenResturant } from '../features/ResSlice';
import FoodResults from './FoodResults';
import { Image } from 'react-bootstrap';
import { db } from '../firebase'
import { useLocation } from 'react-router';
import pic from '../images/shadow.png'
import FoodList from './FooodList';
const AnyReactComponent = ({ text }) => <div>{text}</div>;

function FoodItem(props) {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  const [value, setValue] = React.useState(0);
  const [food, setFood] = useState([]);
   const { state } = useLocation()
  const getResturants = () => {
    console.log('state?._id', state?._id)
    db.collection('food').where('_id','==',selectResturant._id).onSnapshot(snapshot => (
      setFood(snapshot.docs.map(doc => ({
        data: doc.data()
      }
      )))
    ))
  };
  useEffect(() => {
    getResturants();

  }, [])
  const renderFood = () => {
    if (food.length > 0) {
      console.log("food", food);
      async function trying(url) {
        let image = await url.then(async (url) => { return url })
        console.log('image', image)
        return image.toString()
      }
      // console.log('state', img)
      return food.map((item, index) => {
        var detail = []
        console.log("ï", item)
        for (const i in item) {
          detail.push(item[i])
        }
        return detail.map((item) => {
          // const storageRef = projectStorage.ref(`images/${item.id}/`).getDownloadURL();
          return (

            <FoodList
              img={item?.postImage}
              category={item?.category}
              title={item?.title}
              description={item?.description}
              price={item?.price}
              _id={item?._id}
              useremail={selectResturant?.email}
              remail={item.remail}
            />
          );
        })
      })
    }
  };
  const selectResturant = useSelector(selectOpenResturant)
  return (
    <div>
      {console.log('food', food)}
      {console.log('selectResturant', selectResturant)}
      <div style={{
        backgroundColor: '#fafad2'
      }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
    
      </div>
      </div>
      {/* Headings Area */}
      <div className="default">
        <div style={{
          marginTop: 20
        }}>
          <h1 style={{
            fontWeight: 'bold'
          }}>{selectResturant?.resName}</h1>
      
<div className='seefoodItem'>       
           {renderFood()} 
           </div>
        </div>
     
      </div>
    
    </div>
  );
};

export default FoodItem;


