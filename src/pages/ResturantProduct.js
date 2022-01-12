import React,{useState} from 'react'
import "./FoodResults.css"
import { useDispatch } from 'react-redux';
import { addToBasket } from '../features/BasketSlice';

  import {Modal} from 'react-bootstrap'
 
  
function ResturantProduct({
    img, title, description, price,email,_id,remail, quantity, price_total
}) {
    const dispatch = useDispatch();
    const addItemsToBasket = () => {
        const product = {
            img, title, description, price,_id,remail, quantity, price_total
        }
        dispatch(addToBasket(product))
    
        setShow(true)
    }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    return (
        <div>
   
   <div className="inner_item_div">
                            <img src={img} alt=""/>
                            <h5>{title}</h5>
                            <p>{price}</p>
                            <p onClick={addItemsToBasket}>Add to Cart</p>
                        </div>
        <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>FoodPort</Modal.Title>
        </Modal.Header>
        <Modal.Body>Added Item to Cart Successfully</Modal.Body>
        
      </Modal>
      </div>
    )
}

export default  ResturantProduct