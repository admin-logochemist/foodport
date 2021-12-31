import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { selectResturant } from '../features/ResSlice';

const ResturantInfo = ({obj}) => {
  const history=useHistory();
  const  dispatch = useDispatch();
  const openResturant=()=>{
    let payload = obj
    dispatch(selectResturant(payload));
    history.push('/restaurantbox', obj)
  }
  return (
    <div onClick={openResturant}>
      <Card className="bty" style={ { margin: 10,cursor: 'pointer',width: 300,borderRadius:20}}>
        <img top width="100%" style={{borderRadius:20}} src={obj?.postImage} alt="Card image cap" />
        <CardBody>
        <CardTitle tag="h4">{obj?.resName}</CardTitle>
        
          <CardText>{obj?.address}</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default ResturantInfo;