import Button from '@restart/ui/esm/Button'
import React,{useState} from 'react'
import { Image, Row } from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import { removeFromBasket } from '../features/BasketSlice'
import CloseIcon from '@mui/icons-material/Close';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import NotesIcon from '@mui/icons-material/Notes';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Checkout.css"
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
  } from 'reactstrap';
function Checkoutorder({img,title,description,price,_id,remail}) {
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

        <div class="foodorders">
        <img src={img} alt="" class="img-fluid order-admin-img"/>
        <div class="" style={{paddingTop: 17}}>
            <h4 class="order-admin-title">{title}</h4>
            <h3 class="order-admin-title-one">{description}</h3>
            <h5 class="order-admin-price">{price}</h5>
        </div>
    </div>  

    )
}

export default Checkoutorder
