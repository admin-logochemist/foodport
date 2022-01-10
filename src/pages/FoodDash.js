import React from 'react';
import "./NewDashboard.css"
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
// import { selectResturant } from '../features/ResSlice';

const FoodDash = ({obj}) => {
  const history=useHistory();
  const  dispatch = useDispatch();
//   const openResturant=()=>{
//     let payload = obj
//     dispatch(selectResturant(payload));
//     history.push('/restaurantbox', obj)
//   }
  return (
    <div class="top_cards_item">
    <img src={obj?.postImage} alt=""/>
    <h3 class="top_cards_title">{obj?.resName}
        <br/>
        <span class="top_cards_ddes">{obj?.address}</span>
    </h3>
</div>
  );
};

export default FoodDash;