import React from 'react'
import "./FoodResults.css"
import { useDispatch } from 'react-redux';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
  import './RestaurentsDetails.css'
function FoodList({
    img, title, description, price,email,_id,remail
}) {
    const dispatch = useDispatch();
   
    return (
        <div>
   
    <Card className="bty" style={ { margin: 10,cursor: 'pointer',width: 300}}>
      <img top width="100%" src={img} alt="Card image cap" />
      <CardBody>
      <CardTitle tag="h4">{title}</CardTitle>
      
        <CardText>{description}</CardText>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexwrap:'wrap'}}>
        <CardText>${price}</CardText>
               </div>
      </CardBody>
    </Card>
  </div>
    
    )
}

export default FoodList;