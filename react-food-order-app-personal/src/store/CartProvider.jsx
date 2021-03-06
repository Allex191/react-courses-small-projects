import React, { useReducer } from "react";
import CartContext from "./cart-context";

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    console.log(action.item);
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItem;
    let updatedItems;

    if (existingCartItem) {
      updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems = [...state.items];

    if (existingCartItem.amount === 1) {
      updatedItems = updatedItems.filter((item) => item.id !== action.id);
    } else {
      let updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    const updatedTotalAmount = state.totalAmount - existingCartItem.price;

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  if (action.type === "EDITED-AMOUNT") {
    const existingCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.item.id;
    });
    const updatedItems = [...state.items];

    const existingCartItem = updatedItems[existingCartItemIndex];
    const newItem = {
      ...existingCartItem,
      amount: action.item.amount,
    };
    updatedItems[existingCartItemIndex] = newItem;

    const updatedTotalAmount = updatedItems.reduce((acc, cur) => {
      return acc + cur.amount * cur.price;
    }, 0);

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }
};

const CartProvider = (props) => {
  const initialState = {
    items: [],
    totalAmount: 0,
  };
  const [cartState, dispatchCartAction] = useReducer(cartReducer, initialState);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromCartHanlder = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const addEditedAmountHandler = (item) => {
    console.log(item);
    dispatchCartAction({
      type: "EDITED-AMOUNT",
      item: item,
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHanlder,
    addEditedAmount: addEditedAmountHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
