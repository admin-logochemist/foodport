import React from 'react'
import "./FoodResults.css"
import { useDispatch } from 'react-redux';
import { addToBasket } from '../features/BasketSlice';

function FoodResults({
    img, title, description, price,email,_id,remail
}) {
    const dispatch = useDispatch();
    const addItemsToBasket = () => {
        const product = {
            img, title, description, price,_id,remail
        }
        dispatch(addToBasket(product))
    }
    return (
        <div className="eventResults">
            <img src={img} alt="" />

            <div class="eventr__info">
                <div class="event__infoTop">

                    <h3>{title}</h3>
                    <p>------</p>
                    <p>{remail}</p>
                    {/* <p>{description}</p> */}
                
                    <button className="btn-Add" onClick={addItemsToBasket}> Add To Basket</button>


                </div>
                <div class="event__infoBottom">
                    <div class="event__stars">

                    </div>
                    <div class="event__price">
                        <h3>
                            $ {price}
                        </h3>

                    </div>


                </div>
            </div>
        </div>
    )
}

export default FoodResults