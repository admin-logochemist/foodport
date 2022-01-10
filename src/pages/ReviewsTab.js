import React from 'react';
import "./NewDashboard.css"
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
// import { selectResturant } from '../features/ResSlice';
import test from "./test.png"
const ReviewsTab = ({obj}) => {
  const history=useHistory();
  const  dispatch = useDispatch();
//   const openResturant=()=>{
//     let payload = obj
//     dispatch(selectResturant(payload));
//     history.push('/restaurantbox', obj)
//   }
console.log("ER",obj)
  return (
    <div class="top_cards_item customer_cards">
    <img src={test} alt=""/>
    <h3 class="top_cards_title">{obj?.data.username}
        <br/>
        <span class="top_cards_ddes">{obj?.data.email}</span>
        <p className='testi_para'>{obj?.data.reviews}</p>
    </h3>
</div>
  );
};

export default ReviewsTab;