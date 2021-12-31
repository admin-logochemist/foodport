import React, { useState, useEffect } from 'react'
import { db } from '../firebase';
import { useHistory } from 'react-router-dom';
import './RestaurentsDetails.css'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { selectResturant } from '../features/ResSlice';

function RestaurentsDetails({ obj }) {
  const [count, setCount] = useState(0);
  const dispatch=useDispatch();
  const history = useHistory()
  function handleClickedd() {
    history.push({ pathname: "/addFood", state: obj });
    
  }
  const openResturant=()=>{
    let payload = obj
    dispatch(selectResturant(payload));
    history.push('/foodItem', obj)
  }
  {console.log(obj)}
  return (
    <div>
    {console.log('óbj', obj)}
    <Card className="bty" style={ {cursor: 'pointer',width: 300}}>
      <img top width="100%" src={obj?.postImage} alt="Card image cap" />
      <CardBody>
      <CardTitle tag="h4">{obj?.resName}</CardTitle>
      
        <CardText>{obj?.address}</CardText>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexwrap:'wrap'}}>
     <button className="btn-FOodcart" onClick={() => { handleClickedd() }}>Add FoodItem</button>
     <button className="btn-FOodcart" onClick={openResturant}>See FoodItems</button>
                 {/* <button style={{ color: 'white',backgroundColor: '#d70000', border: 'hidden', padding: 15, margin: 2 }} onClick={()=>{handleClick()}}>Add Restaurents</button> */}
               </div>
      </CardBody>
    </Card>
  </div>
  )
}

export default RestaurentsDetails
