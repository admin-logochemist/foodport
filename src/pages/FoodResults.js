import React,{useState} from 'react'
import "./FoodResults.css"
import { useDispatch } from 'react-redux';
import { addToBasket } from '../features/BasketSlice';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
  import {Modal} from 'react-bootstrap'
 
  
function FoodResults({
    img, title, description, price,email,_id,remail
}) {
    const dispatch = useDispatch();
    const addItemsToBasket = () => {
        const product = {
            img, title, description, price,_id,remail
        }
        dispatch(addToBasket(product))
    
        setShow(true)
    }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    return (
        <div>
   
        <Card className="bty" style={ { margin: 10,cursor: 'pointer',width: 300,borderRadius:20}}>
          <img top width="100%" style={{borderRadius:20}} src={img} alt="Card image cap" />
          <CardBody>
          <CardTitle tag="h4">{title}</CardTitle>
          
            <CardText>{description}</CardText>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexwrap:'wrap'}}>
            <CardText ><span style={{fontSize:28,color:'black'}}>$</span><span style={{fontSize:28,fontWeight:'bolder'}}>{price}</span></CardText>
            <button className="btn-Cart" onClick={addItemsToBasket}> Add To Basket</button>
                   </div>
          </CardBody>
        </Card>
        <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>FoodPort</Modal.Title>
        </Modal.Header>
        <Modal.Body>Added Item to Cart Successfully</Modal.Body>
        
      </Modal>
      </div>
    )
}

export default FoodResults