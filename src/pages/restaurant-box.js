import React, { useState, useEffect } from 'react';
import ReactStars from "react-rating-stars-component";
// import "./restaurant-box.css"
import "./resturantnew.css"
import logo from '../images/logofooter.png'
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
import Review from "./review.png"
import FoodBanner from "./form_Banner.jpg"
import FoodOwner from "./business_owner.jpg"
import UserImg from "./user-icon.png"
import ResturantProduct from './ResturantProduct';
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
        //elem.style.right = pos + "px"; 
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
        console.log("??", item)
        for (const i in item) {
          detail.push(item[i])
        }
        return detail.map((item) => {
          // const storageRef = projectStorage.ref(`images/${item.id}/`).getDownloadURL();
          return (
            <ResturantProduct
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
     <section  style={{backgroundImage:`url(${selectResturant?.postImage})`}} className="restaurent_box_banner banner_effect">
        <div className="container">
            <div className="row">
                <div className="col-lg-8 col-sm-12">
                    <div className="text_section_res_box">
                        <span className="restaurent_head">{selectResturant?.resName}</span>
                        <br />
                        <span className="star one">???</span> <span className="star two">???</span>
                        <span className="star three">???</span> <span className="star four">???</span>
                        <span className="star five">???</span>
                        <span className="restaurants_reviews">489 Reviews</span>
                        <br />
                        <br />
                        <div className="restaurent_timing">
                            <i className="fas fa-check-circle"></i>
                            <span>Claimed</span>
                            <span className="dollars">$$</span>
                            <a className="bar_links"></a>
                            <a className="bar_links" style={{color:'white'}}>  {selectResturant?.address}</a>
                            <a href="" className="eidt_btn_res">Edit</a>
                        </div>
                        <br />
                        <span className="time">Open</span>
                        <span className="time">11:30 AM - 10:00 PM</span>

                    </div>
                </div>
            </div>
        </div>
    </section>

    <div className="container mt-3">
        <div className="row">
            <div className="col-lg-8">
                <div className="button_group">
                    <button><i className="fas fa-star-half-alt"></i> Write a Review</button>
                    <button><i className="fas fa-camera"></i> Add Photo</button>
                    <button><i className="fas fa-share"></i> Share</button>
                    <button><i className="far fa-bookmark"></i> Save</button>
                    <br />
                    <br />
                    <hr />
                </div>

                <div className="res_menu_item-box">
                    <span>Menu</span>
                    <br />
                    <br />
                    <span>Most mentioned dishes</span>
                    <div className="scrolling_res_box">
               {renderFood()}
                    </div>
                </div>
            </div>
            <div className="col-lg-4 mt-1">

                <div className="get_direction_box">
                    <span className="span_one" style={{color: "rgba(2,122,151,1)"}}>
                    {selectResturant?.email}
                        <i className="fas fa-retweet"></i>
                    </span>

                    <hr />
                    <br />

                    <span className="span_one">{selectResturant?.phone}
                        <i className="fas fa-phone-alt"></i>
                    </span>

                    <hr />
                    <br />

                    <span className="span_one" style={{fontSize:14}}>
                        <h6 className="span_three_head">Get Directions</h6>
                        {selectResturant?.address}
                        <i className="fas fa-directions"></i>
                    </span>

                    <hr />

                    <span className="span_one" style={{color: "rgba(2,122,151,1)"}}>
                        Message the Business<i className="far fa-comment-dots"></i>
                    </span>

                </div>
            </div>
        </div>
        <hr className='hr1'/>

        <div className="row">
            <div className="col-lg-4 mt-5">
                <div className="restaurent_small_map">
                    <h5 className="map_head mb-3">Location & Hours</h5>
                    <div className="restaurent_locat_map">
                    <SimpleMap className="map_layout" lat={selectResturant?.lat} lng={selectResturant?.lng}/>
                    </div>

                    <div className="li-width">
                        <li>798 Brannan St</li>
                        <li>San Francisco, CA 94103</li>
                        <li>7th St & Gilbert St</li>
                        <li>Mission Bay</li>
                    </div>
                    <div className="li-width">
                        <a>Get Directions</a>
                    </div>
                </div>
            </div>

            <div className="col-lg-6">
                <div className="bars_restaurent_timing table_margin">
                    <table id="timing_info">
                        <tbody>
                            <tr className="table-row">
                                <th className="" scope="col">
                                    <p className="">Mon</p>
                                </th>
                                <td className="">
                                    <ul className="">
                                        <li className="">
                                            <p className="">11:30 AM - 10:00 PM</p>
                                        </li>
                                    </ul>
                                </td>
                            </tr>

                            <tr className="table-row">
                                <th className="" scope="col">
                                    <p className="">Tue</p>
                                </th>
                                <td className="">
                                    <ul className="">
                                        <li className="">
                                            <p className="">11:30 AM - 10:00 PM</p>
                                        </li>
                                    </ul>
                                </td>
                            </tr>

                            <tr className="table-row">
                                <th className="" scope="col">
                                    <p className="">Wed</p>
                                </th>
                                <td className="">
                                    <ul className="">
                                        <li className="">
                                            <p className="">11:30 AM - 10:00 PM</p>
                                        </li>
                                    </ul>
                                </td>
                            </tr>

                            <tr className="table-row">
                                <th className="" scope="col">
                                    <p className="">Thu</p>
                                </th>
                                <td className="">
                                    <ul className="">
                                        <li className="">
                                            <p className="">11:30 AM - 10:00 PM</p>
                                        </li>
                                    </ul>
                                </td>
                            </tr>

                            <tr className="table-row">
                                <th className="" scope="col">
                                    <p className="">Fri</p>
                                </th>
                                <td className="">
                                    <ul className="">
                                        <li className="">
                                            <p className="">11:30 AM - 12:00 AM (Next day)</p>
                                        </li>
                                    </ul>
                                </td>
                            </tr>

                            <tr className="table-row">
                                <th className="" scope="col">
                                    <p className="">Sat</p>
                                </th>
                                <td className="">
                                    <ul className="">
                                        <li className="">
                                            <p className="">Closed</p>
                                        </li>
                                    </ul>
                                </td>
                            </tr>

                            <tr className="table-row">
                                <th className="" scope="col">
                                    <p className="">Sun</p>
                                </th>
                                <td className="">
                                    <ul className="">
                                        <li className="">
                                            <p className="">12:00 PM - 7:00 PM</p>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <ul className="">
                        <li className="">
                            <p className="para_bus"><i className="fas fa-pencil-alt"></i> Edit Business Info</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <hr className='hr1'/>

        <div className="row">
            <div className="col-lg-8 mt-5">
                <div className="business_profile">
                    <img src={FoodOwner} alt=""/>
                    <h5 className="about_business">About the Business
                        <br />
                        <span>Business Owner</span>
                    </h5>
                </div>
                <div className="about_para">
                    <p>
                        Voted BEST Happy Hour/Best Outdoor Garden PATIO. Great Kitchen, organic homemade food.
                        Perfect for your private parties or events Always a good time at Mars Bar. Great Drinks, Great
                        Food
                        and a fantastic Staff. You will always make friends at Mars
                    </p>
                    <button className="mt-3">Read More</button>
                </div>

            </div>
        </div>
        <hr className='hr1'/>

        <div className="row">
            <div className="col-lg-8 mt-5">
                <div className="question_box">

                    <h5 className="ques_head mb-3">
                        Ask the Community
                        <span className="ask_ques">Ask a question <i className="fas fa-plus"></i></span>
                    </h5>

                    <h6 className="mt-4">Q : 
                        <span className="question">
                            Are bars allowed to instantly add gratuity ? For one round/ 2 shots? Per the bartenders they have too....
                        </span>
                    </h6>

                    <h6 className="mt-4">A :
                        <span className="answare">
                            I never heard this. When did this happen? Usually it???s for larger events or corporate parties on drink tabs. Can
                            you be more specific. I???d love to help. My email is david@marsbarsf.com. I???m more than happy to get to the
                            bottom of this. Thanks
                            David K., Business Owner
                        </span>
                    </h6>
                    <button className="see_ques mt-3"> See question details </button>
                </div>
            </div>
        </div>
        <hr className='hr1'/>

        <div className="row">
            <div className="col-lg-7 mt-5">
                <div className="write_reviews_sec">
                    <h5 className="reviews_head">Recommended Reviews</h5>
                    <br />
                    <div className="reviews_sec_box">
                       <img src={UserImg} alt=""/>
                        <h5 className="reviews_info">User Name
                            <br />
                            <span className="user_locate">Location</span>
                        </h5>
                      <div className="rating-star">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <br />
                        <button className="re_btn mt-3">Write a Review</button>
                      </div>
                    </div>
                </div>
            </div>
        </div>
        <hr className='hr1'/>

        <div className="row">
            <div className="col-lg-8">
                <div className="reviews_demo">
                    <img src={Review} alt=""/>
                    <h5 className="re_demo_head">
                        John Z.
                        <br />
                        <span className="re_demo_locate">San Francisco, CA</span>
                    </h5>
                </div>
                <div className="rating-stars_demo mt-3">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <span className="edit_date_time">11/12/2017</span>
                    <br />
                    <hr />
                    <p className="writing_reviews">
                        After having a boozy brunch, the boys and I ended up at SF Wine Trading Company. The three of us arrived on
                        Saturday, November 4th around 4:30pm. I'd never been here before, so I figured this was just a wine / liquor shop.
                        Turns out, they do wine tastings!
                        Great store if you're looking to buy a bottle or just do a fun wine tasting. It can get crowded at the tasting
                        table, but it's nice you don't have to leave SF for a bit of the wine country
                    </p>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-lg-8">
                <h5 className="you_like_head red_color mt-5"> <span className="black_color">Restaurent</span> You May Like</h5>
               <div className="items_scrolling">

                <div className="restaurent_like_items mt-5">
                    <img src={FoodBanner} alt=""/>
                    <br />
                    <span className="res_card_head mt-4 d-block">Born to Shop</span>
                    <div className="rating-stars_demo mt-1">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                        <br />
                        <span className="res_descrip">InexpensiveGrocery, Chocolatiers & Shops, Beer, Wine & Spirit</span>
                    </div>
                </div>

                <div className="restaurent_like_items mt-5">
                    <img src={FoodBanner} alt=""/>
                    <br />
                    <span className="res_card_head mt-4 d-block">Born to Shop</span>
                    <div className="rating-stars_demo mt-1">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                        <br />
                        <span className="res_descrip">InexpensiveGrocery, Chocolatiers & Shops, Beer, Wine & Spirit</span>
                    </div>
                </div>

                <div className="restaurent_like_items mt-5">
                    <img src={FoodBanner} alt=""/>
                    <br />
                    <span className="res_card_head mt-4 d-block">Born to Shop</span>
                    <div className="rating-stars_demo mt-1">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                        <br />
                        <span className="res_descrip">InexpensiveGrocery, Chocolatiers & Shops, Beer, Wine & Spirit</span>
                    </div>
                </div>

               </div>
            </div>
           
        </div>
     
    </div>
   
     </div>
   
     </>

  


  );
};

export default Restaurantbox;


