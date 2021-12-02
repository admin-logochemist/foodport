import React from 'react'
import "./FoodResults.css"
import { useDispatch } from 'react-redux';

function FoodList({
    img, title, description, price,email,_id,remail
}) {
    const dispatch = useDispatch();
   
    return (
        <div className="eventResults">
            <img src={img} alt="" />

            <div class="eventr__info">
                <div class="event__infoTop">

                    <h3>{title}</h3>
                    <p>------</p>
                    <p>{remail}</p>
                    <p>{description}</p>
                
             


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

export default FoodList;