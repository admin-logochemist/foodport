import Button from '@restart/ui/esm/Button'
import React,{useState} from 'react'
import { Image, Row } from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import { removeFromBasket } from '../features/BasketSlice'
import 'bootstrap/dist/css/bootstrap.min.css';
import CloseIcon from '@mui/icons-material/Close';
import "./FoodItem.css"
function CheckoutPro({img,title,description,price,_id,remail}) {
    const dispatch=useDispatch()
const removeItemFromBasket=()=>{
dispatch(removeFromBasket({_id}))
}
const [style, setStyle] = useState("fg");
const changeStyle = () => {
    console.log("you just clicked");
  
    setStyle("fgt");
  };
    return (
      


    

        <div class="col-lg-4 col-md-8 mt-3">
          <div class="foodport_items">
          <img src={img} alt="" class="img-fluid" />
             <div class="foodMain">
             <CloseIcon onClick={removeItemFromBasket} style={{cursor:'pointer',paddingRight:10}}/>
                <h4 class="food_title">{title}</h4>
                <p class="food_descriptionsss">{description}</p>
             </div>
             <div>
                <h5 class="pricetags">${price}</h5>
             </div>
          </div>
        </div>
        
    
    )
}

export default CheckoutPro
