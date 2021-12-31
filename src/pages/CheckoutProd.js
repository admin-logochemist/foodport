import Button from '@restart/ui/esm/Button'
import React,{useState} from 'react'
import { Image, Row } from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import { removeFromBasket } from '../features/BasketSlice'
import CloseIcon from '@mui/icons-material/Close';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import NotesIcon from '@mui/icons-material/Notes';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import "./Checkout.css"
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
  } from 'reactstrap';
function CheckoutProd({img,title,description,price,_id,remail}) {
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

        <Card className="bty" style={ { margin: 10,cursor: 'pointer',width: 300,borderRadius:20}}>
        <img top width="100%" style={{borderRadius:20}} src={img} alt="Card image cap" />
        <CardBody>
        <CardTitle tag="h4">{title}</CardTitle>
          <CardText>{description}</CardText>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexwrap:'wrap'}}>
          <CardText ><LocalOfferIcon/><span style={{fontSize:28,color:'black'}}>$</span><span style={{fontSize:28,fontWeight:'bolder'}}>{price}</span></CardText>        
                 </div>
        </CardBody>
      </Card>
            

    )
}

export default CheckoutProd
