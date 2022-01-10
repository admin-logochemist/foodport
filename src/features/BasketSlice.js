import { createSlice } from "@reduxjs/toolkit";
const initialState={
    items:[]
}
export const basketSlice = createSlice({
name:"basket",
initialState,
reducers:{
    addToBasket:(state,action)=>{
        state.items=[...state.items,action.payload]
    },
    updateBasket:(state,action)=>{
        const index =state.items.findIndex(
            (basketItem)=> {
                if (basketItem._id === action.payload._id) {
                    if (action.payload.addItem) {
                        basketItem['quantity'] += 1
                        console.log("add")
                        basketItem['price_total'] = basketItem['quantity'] * basketItem['price']
                    } else if (action.payload.removeItem) {
                        basketItem['quantity'] -= 1
                        console.log("remove")
                        basketItem['price_total'] = basketItem['quantity'] * basketItem['price']
                    }
                }
            }
        );

        let newBasket = [...state.items];
        state.items=newBasket;
    },    
    removeFromBasket:(state,action)=>{
        const index =state.items.findIndex(
            (basketItem)=> basketItem._id === action.payload._id
        );
        let newBasket = [...state.items];
        if(index>=0){
            newBasket.splice(index,1)
        }else{
            console.warn("cant Upload Product")
        }
        state.items=newBasket;
    }
}
});
export const {addToBasket,removeFromBasket,updateBasket}=basketSlice.actions;
export const selectItems =(state) => state.basket.items;
export const selectTotal =(state) => 
state.basket.items.reduce((price_total,item)=> price_total + item.price_total,0)
export default basketSlice.reducer;