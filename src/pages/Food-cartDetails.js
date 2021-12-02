import React from 'react'
import {useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { selectResturant } from '../features/ResSlice';
import { Image } from 'react-bootstrap';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
function FoodcartDetails({ obj }) {
  const history=useHistory()
  const dispatch=useDispatch();
  function handleClickedd() {
    history.push({pathname: "/addFood", state: obj});
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
    <Card style={{    margin: 10,cursor: 'pointer',width: 300}}>
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
  //   <div>
  //   <div className="A-Box"  >
  //   <div className="Box-headings">
  //   <Image  src={obj?.postImage}/>
  //     <p>{obj?.resName}</p>
  //   </div>
 
  //   <div className="btn-one">
  //   <button className="btn-FOodcart" onClick={() => { handleClickedd() }}>Add FoodItem</button>
  //   <button className="btn-FOodcart" onClick={openResturant}>See FoodItems</button>
  //               {/* <button style={{ color: 'white',backgroundColor: '#d70000', border: 'hidden', padding: 15, margin: 2 }} onClick={()=>{handleClick()}}>Add Restaurents</button> */}
  //             </div>
  // </div>
  // </div>
  )
}
export default FoodcartDetails