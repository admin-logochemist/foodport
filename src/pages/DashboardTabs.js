import React,{useState,useEffect} from 'react';
import "./DashboardTabs.css";
import "./NewDashboard.css"
import { useHistory } from "react-router-dom";
import Sidebars  from './Sidebars';
import LineChart from '../components/LineChart'
import card from "./cards.jpg"
import test from "./test.png"
import FoodDash from './FoodDash';
import { selectUser, userSlice } from '../features/UserSlice';
import { useSelector } from 'react-redux';

import { db } from '../firebase';
import ResDash from './ResDash';
import ReviewsTab from './ReviewsTab';
const DashboardTabs = () => {
  const history = useHistory();
  const user= useSelector(selectUser)
  const [foodcart, setfoodcart] = useState([]);
  const [resturant, setResturants] = useState([]);
  const [UReviews, setUReviews] = useState("")
  useEffect(() => {
      getReviews();
      getFoodCart();
      getResturant();
  }, [])
  const getReviews = () => {
   
    db.collection('reviews').onSnapshot(snapshot => (
      setUReviews(snapshot.docs.map(doc => ({
        data: doc.data()
      }
      
      )))
    ))
    console.log("Ureviews", user?.email)
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
  const renderFoodCart = () => {
    if (foodcart && foodcart?.length) {
      async function trying(url) {
        let image = await url.then(async (url) => { return url })
        console.log('image', image)
        return image.toString()
      }
      // console.log('state', img)
      return foodcart.map((item, index) => {
        return <FoodDash
          obj={item}
        />
      
      })
    }
  };
  const getResturant = () => {
   
    db.collection('resturant').onSnapshot(snapshot => (
        setResturants(snapshot.docs.map(doc => ({
        _id: doc.id, ...doc.data()
      }
      )))
    ))
  };

  const renderResturant = () => {
    if (resturant && resturant?.length) {
        async function trying(url) {
          let image = await url.then(async (url) => { return url })
          console.log('image', image)
          return image.toString()
        }
        // console.log('state', img)
        return resturant.map((item, index) => {
          return <ResDash
            obj={item}
          />
      
      })
    }
  };
  const getFoodCart = () => {
   
    db.collection('foodcart').onSnapshot(snapshot => (
      setfoodcart(snapshot.docs.map(doc => ({
        _id: doc.id, ...doc.data()
      }
      )))
    ))
  };
const goRest =() =>{
    history.push('./Resturants')
}
  return (
  
    <div>
      <div className="div">
        <div>
      <Sidebars/>
       </div>
       <div class="main_dashboard">
        <div class="container whole_container">
            <div class="rows dash_head_row">
                <h5>Welcome to Dashboard</h5>
            </div>
            <div class="rows">
          {/* FIRTS REVIEWS SECTION  */}
             <div class="left_reviews">
                 <h3 class="left_reviews_head_fir">Total views</h3>
                 <div class="progress_reviews">
                     <span class="review_head_sec">Total Views Today</span>
                     <div class="circle-big">
                        <div class="text">
                            1,750
                      
                        </div>
                        <svg>
                            <circle class="bg" cx="57" cy="57" r="52"></circle>
                            <circle class="progress" cx="57" cy="57" r="52"></circle>
                        </svg>
                    </div>
                 </div>
                 <div class="bottom_rviews">
                     <span class="last_day_re">
                         Last Day
                      <div class="inner_divs">
                        <i class="green fas fa-long-arrow-alt-up"></i>
                        <small>5555</small>
                      </div>
                     </span>
                     <span class="last_week_re">
                         Last Week
                         <div class="inner_divs">
                            <i class="red fas fa-long-arrow-alt-down"></i>
                            <small>5555</small>
                         </div>
                        </span>

                 </div>
             </div>

             {/* CHART BAR SECTION  */}
             <div class="chart_wrapper">

                <h3 class="left_reviews_head_fir">Total views</h3>
              
               
       <LineChart id='c'/>
     
                
           
              </div>
            </div>

            {/* CARDS SECTION  */}
            <div class="rows mr_top">

                <div class="top_five_cards">

                    <h3 class="left_reviews_head_fir">Top 5 Food Cards</h3>

                    <div class="top_scrolling">

                    {renderFoodCart()}

                    </div>

                    <div class="v_all">
                        <button>View All</button>
                    </div>

                </div>

                <div class="top_five_cards">

                    <h3 class="left_reviews_head_fir">Top 5 Restaurants</h3>

                    <div class="top_scrolling">

                    {renderResturant()}

                    </div>
                    <div class="v_all">
                        <button>View All</button>
                    </div>
                </div>

            </div>

             {/* CUSTOMER REVEIWS SECTION  */}
            <div class="rows mr_top">


                <div class="customer_reviews_section">

                    <h3 class="left_reviews_head_fir">Customer Reviews (580)</h3>

                    <div class="top_scrolling">
                    {renderReviews()}
                        {/* <div class="top_cards_item customer_cards">
                            <img src={test} alt=""/>
                            <h3 class="top_cards_title">The Taco Cartel
                                <br/>
                                <span class="top_cards_ddes">Los Angeles, CA, USA</span>
                                <p className='testi_para'>Lorem ipsum dolor sit amet consectetur adipisicing elit.....</p>
                            </h3>
                        </div> */}

                    </div>

                    <div class="v_all">
                        <button>View All</button>
                    </div>

                </div>
           
           
           
            </div>
        </div>
    </div>
        {/* <div className='main_map_box'>
     <div className='map_heading'>
     <div className="Ryan-Garry fontDashboard">
         <h1>Dashboard</h1>
         <h2>Welcome to Dashboard</h2>
       </div>
        <div >
         <button className="btn_dashboard fontDashboard" onClick={() => { handleClicked() }}>Add FoodCart</button>
         <button className="btn_dashboard font__Dashboard" onClick={() => { handleClick() }}>Add Restaurants</button>
       </div>
     </div>
     <div className='canvas_box'>
       <LineChart/>
       </div>
     </div>
      </div> */}
      
    </div>
    </div>

  );
}

export default DashboardTabs