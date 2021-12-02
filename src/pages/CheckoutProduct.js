import Button from '@restart/ui/esm/Button'
import React from 'react'
import { Image } from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import { removeFromBasket } from '../features/BasketSlice'
import "./Checkout.css"
function CheckoutProduct({img,title,description,price,_id,remail}) {
    const dispatch=useDispatch()
const removeItemFromBasket=()=>{
dispatch(removeFromBasket({_id}))
}
    return (
        <div>
   <div className="eventResults">
       {console.log('img', img)}
            <img src={img} alt="" width='500px' height='500px' />
            
            <div class="eventr__info">
                <div class="event__infoTop">
        
                    <h3 style={{
                        fontWeight: 'bold'
                    }}>{title}</h3>
                    <p>------</p>
                    <p>{remail}</p>
                    <p style={{
                        fontWeight: 'bold'
                    }}>{description}</p>                  
                </div>                  
                <div class="event__infoBottom">
                    <div class="event__stars">
                        
                    </div>
                    <div class="event__price">
                        <Button className="btn-Remove-cart" color="success" onClick={removeItemFromBasket}>Remove Cart</Button>
                        <h3> 
                           $ {price}
                        </h3>
                     
                    </div>


                </div>
                </div>     
              </div>

        </div>
    )
}

export default CheckoutProduct
