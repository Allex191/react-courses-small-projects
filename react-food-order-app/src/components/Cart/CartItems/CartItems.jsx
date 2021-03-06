import React, { useContext } from "react";
import CartContext from "../../../store/cart-context";
import CartItem from "../CartItem";
import classes from "./CartItems.module.css";

const CartItems = () => {
  const cartCtx = useContext(CartContext);

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  return (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item, i) => (
        <CartItem
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          key={item.id}
        >
          {item.price}
        </CartItem>
      ))}
    </ul>
  );
};

export default CartItems;
