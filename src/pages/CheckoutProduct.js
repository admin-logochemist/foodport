import Button from '@restart/ui/esm/Button'
import React,{useState} from 'react'
import { Image, Row } from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import { removeFromBasket } from '../features/BasketSlice'
import { updateBasket } from '../features/BasketSlice'
import CloseIcon from '@mui/icons-material/Close';
import "./Checkout.css"
import { Update } from '@material-ui/icons'
function CheckoutProduct({img,title,description,price,_id,remail,price_total,quantity}) {
    const dispatch=useDispatch()
const removeItemFromBasket=()=>{
dispatch(removeFromBasket({_id}))
}

const UpdateQuantity=(addItem, removeItem)=>{
  dispatch(updateBasket({_id,addItem,removeItem}))
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
                      <h5 className="pricetags_checkout">{price_total}</h5>
                     <div className="quantity_group">
                     <button className='btnadd' onClick={()=>UpdateQuantity(true, false)}>+</button>
                      
                      <input type="text" className='inputqty' value={quantity} />
                      
                     
                      <button className='btnminus' onClick={()=>UpdateQuantity(false, true)}>-</button>
                     
                     </div>
                   </div>
                </div>
              </div>

    )
}

export default CheckoutProduct
