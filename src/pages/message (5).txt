import React, { useState, useEffect } from 'react';
import ReactStars from "react-rating-stars-component";
import "./restaurant-box.css"
import { useSelector } from 'react-redux';
import { selectOpenResturant } from '../features/ResSlice';
import FoodResults from './FoodResults';
import { Image } from 'react-bootstrap';
import { db } from '../firebase'
import SimpleMap from './SimpleMap'
import { useHistory } from 'react-router'
import { selectItems, selectTotal } from '../features/BasketSlice'
import { useLocation } from 'react-router';
import { selectUser } from '../features/UserSlice'
import Navbar from '../components/Navbar'
import Footer from './Footer';
import { Form, Input, Button } from 'antd';
import test from "./test.png"
import ReviewsTab from './ReviewsTab';
import { GoogleApiWrapper, Map } from 'google-maps-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function Restaurantbox(props) {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  const onFinish = (value) => {
    console.log('Success:', value);
    db.collection("reviews").add(
      {
       username:username,
       email:email,
       reviews:reviews,
       _id: selectResturant._id,
       resemail:selectResturant?.email
        
      })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [value, setValue] = React.useState(0);
  const [food, setFood] = useState([]);
  const [username, setUserName] = useState("")
const [email, setEmail] = useState("");
const [UReviews, setUReviews] = useState("")
  const [reviews, setReviews] = useState("")
  const { state } = useLocation()
  const total = useSelector(selectTotal)
  const items = useSelector(selectItems);
  const history=useHistory();
  const user =useSelector(selectUser);

  const getResturants = () => {
    console.log('state?._id', state?._id)
    db.collection('food').where('_id','==',selectResturant._id).onSnapshot(snapshot => (
      setFood(snapshot.docs.map(doc => ({
        data: doc.data()
      }
      )))
    ))
  };
  const getReviews = () => {
   
    db.collection('reviews').where('_id','==',selectResturant._id).onSnapshot(snapshot => (
      setUReviews(snapshot.docs.map(doc => ({
        data: doc.data()
      }
      
      )))
    ))
    console.log("Ureviews", UReviews)
  };
  useEffect(() => {
    getReviews();
    getResturants();
    cardanimation();
  }, [])
  const cardanimation=()=> {
    let id = null;
    const elem = document.getElementById("animate");
    let pos = 0;
    clearInterval(id);
    id = setInterval(frame, 100);
    function frame() {
      if (pos == 10) {
        clearInterval(id);
       
      } else {
        pos++; 
      //   elem.style.top = pos + "px"; 
        elem.style.right = pos + "px"; 
      }
    }
  }

  const goCheckout=()=>{
    if(!user){
      history.push("./MainLogin")
      alert("Please Signin Before Checkout")
     }else{
         history.push("./stripe")
     }
     
  }

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
              quantity={1}
              price_total={item?.price}
            />
          );
        })
      })
    }
  };
  const renderReviews = () => {
    if (UReviews && UReviews?.length) {
     
      // console.log('state', img)
      return UReviews.map((item, index) => {
        return <ReviewsTab
          obj={item}
        />
      
      })
    }
  };
  const selectResturant = useSelector(selectOpenResturant)
  return (
  
<>
    <div>
      		<Navbar/>
      {console.log('food', food)}
      {console.log('selectResturant', selectResturant)}
      <div style={{
        backgroundColor: '#dd4825'
      }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f58c'
      }}>
        {/* <Image className="Restaurent-image" width="70%" height="500px" src={selectResturant?.postImage} /> */}
        <div className="picback" style={{backgroundImage:`url(${selectResturant?.postImage})` }}>.</div>
      </div>
      </div>
      {/* Headings Area */}
      <div className="default">
        <div style={{
          marginTop: 20
        }}>
          <div className='Ham'>
          <div>
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
          <span><span style={{fontWeight:'bold'}}>Email: </span>{selectResturant?.email}</span>
          <br/>
          <span><span style={{fontWeight:'bold'}}>Phone: </span>{selectResturant?.phone}</span>
         
          </div>
          
      
          </div>
          <div className='geoloc'>
        <h1 className='lochead'>Location</h1>
          <span className='locbottom'>{selectResturant?.address}</span>
  <SimpleMap lat={selectResturant?.lat} lng={selectResturant?.lng}/>
        </div>   

     <div className='fooditeminfo'>
          {renderFood()}
        </div>
      <div>

      </div>
        <div className="next">
    
          <div className="right-card" id="animate">
        <h3 className="your_card_head">Your Cart</h3>
        <p className="your_card_para">Start adding items to your cart</p>
        <span classNmae="borrderr"></span>
        <div className="style_card">
            <p className="subtotals">Items <span>{items.length}</span></p>
        <p className="totals_amounts">Total <span>${total}</span></p>

        <button className='gocheck' onClick={goCheckout} >GO TO CHECKOUT</button>
        </div>
      </div>
      <br/>
      <br/>
   
        </div>
  

       

    </div>
    </div>
  
    </div>

  
  <br />
  <br />
  <br />
  <br />
<div>    
    <div class="rows review_top">
      <div class="res_reviews_section">
          <h3 class="left_reviews_head_fir">Customer Reviews</h3>
          <div class="top_scrolling">
            {renderReviews()}
          </div>
          {/* <div class="v_all">
              <button>View All</button>
          </div> */}
      </div>
  
      {user?  <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className='review_form'
      >

      <Form.Item
      className='review_label'
      label="Username"
      name="username">
      <Input value={username} onChange={(e) => setUserName(e.target.value)} className='review_input'/>
      </Form.Item>

      <Form.Item
      className='review_label'
        label="Email"
        name="Email">
        <Input value={email} onChange={(e) => setEmail(e.target.value)} className='review_input'/>
      </Form.Item>

      <Form.Item name="description" label="Review" >
        <Input.TextArea value={reviews} onChange={(e) => setReviews(e.target.value)} className='review_input'/>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" className='review_btn'>
          Submit
        </Button>
      </Form.Item>

    </Form>:""
      
}
    
    </div>

  
</div>
    </>  
  );
};

export default Restaurantbox;


