import React, { useState, useEffect } from 'react';
import ReactStars from "react-rating-stars-component";
import "./restaurant-box.css"
import { useSelector } from 'react-redux';
import { selectOpenResturant } from '../features/ResSlice';
import FoodResults from './FoodResults';
import { Image } from 'react-bootstrap';
import { db } from '../firebase'
import { useLocation } from 'react-router';
const AnyReactComponent = ({ text }) => <div>{text}</div>;

function Restaurantbox(props) {
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
            <FoodResults
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
        <Image className="Restaurent-image" width="70%" height="500px" src={selectResturant?.postImage} />
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
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#FFFF00"
          />
          <p style={{
            fontWeight: 'bold'
          }}> Email : <span style={{
            color: '#d70000',
            fontWeight: 'bold'
          }}>{selectResturant?.email}</span></p>
          <p style={{
            fontWeight: 'bold'
          }}>Phone No # <span style={{
            color: '#d70000',
            fontWeight: 'bold'
          }}>{selectResturant?.phone}</span></p>
          {renderFood()}
        </div>
        <div className="next">
          <h1 style={{
            fontWeight: 'bold'
          }}>Location</h1>
          <p>{selectResturant?.address}</p>
        </div>
      </div>
      <br/>
      <br/>
    </div>
  );
};

export default Restaurantbox;


