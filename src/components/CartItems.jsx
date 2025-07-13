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
    /*
        {
          id: action.payload.id,
          image: action.payload.image,
          name: action.payload.name,
          price: action.payload.price,
          description: action.payload.description,
          quantity: 1,
        };

    */
    <div className="py-5 my-2 px-2 text-xs desktop:text-md border-2 shadow-sm">
      <div className="flex ">
        <div className="flex basis-1/3">
          <img className="rounded-full mx-auto w-16 h-16 desktop:w-20 desktop:h-20 "src={cartItem.image} />
        </div>

        <div className="flex flex-col basis-2/3">
          <div>{cartItem.name}</div>
          <div>Price: {cartItem.price}</div>
          <div>{cartItem.description}</div>
          <div className="flex justify-center items-center gap-2 mt-2">
            <button className="bg-blue-800 text-blue-100 w-8 py-2 text-md rounded-md" onClick={()=>handleRemoveFromCart(cartItem)}>-</button>
            <span className="text-md border-y-2 px-2 py-2">{cartItem.quantity}</span>
            <button className="bg-blue-800 text-blue-100 w-8 py-2 text-md rounded-md" onClick={()=>handleAddToCart(cartItem)}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
