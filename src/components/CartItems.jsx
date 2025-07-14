import React, { useContext } from "react";
import { cartContext } from "../cartContext";

const CartItems = ({ cartItem }) => {
    const {removeFromCart, addToCart} = useContext(cartContext);

    const handleAddToCart=(item)=>{
        addToCart(item);
    }

    const handleRemoveFromCart=(item)=>{
        removeFromCart(item.id, item.price);
    }

  return (
  
    <div className="py-5 my-2 px-2 text-xs desktop:text-md  shadow-md">
      <div className="flex ">
        <div className="flex basis-1/3 items-center">
          <img className="rounded-full mx-auto w-20 h-20 desktop:w-20 desktop:h-20 "src={cartItem.image} />
        </div>

        <div className="flex flex-col basis-2/3">
          <div className="text-md font-semibold my-1">{cartItem.name}</div>
          <div className="text-md font-semibold my-1">Price: ${cartItem.price}</div>
          <div className="text-md font-semibold my-1">{cartItem.description}</div>
          <div className=" items-center  mt-2">
            <button className="bg-indigo-600 text-white w-5 text-lg rounded-sm" onClick={()=>handleRemoveFromCart(cartItem)}>-</button>
            <span className="text-md font-semibold px-2 w-5">{cartItem.quantity}</span>
            <button className="bg-indigo-600 text-white w-5 text-lg rounded-sm" onClick={()=>handleAddToCart(cartItem)}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
