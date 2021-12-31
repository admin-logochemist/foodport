import Button from '@restart/ui/esm/Button'
import React,{useState} from 'react'
import { Image, Row } from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import { removeFromBasket } from '../features/BasketSlice'
import CloseIcon from '@mui/icons-material/Close';
import "./Checkout.css"
function CheckoutProduct({img,title,description,price,_id,remail}) {
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
        <div className="itemsss">
                <div className="foodport_items_checkout">
                     <img src={img} className="img-fluid" alt=""/> 
                   <div className="foodMain_checkout">
                      <h4 className="food_checkout_title">{title}</h4>
                      <p className="food_checkout_descriptionsss">{description}</p>
                      <h5 className="pricetags_checkout">{price}</h5>
                   </div>
                </div>
              </div>

    )
}

export default CheckoutProduct
