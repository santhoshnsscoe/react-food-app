import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (item) => {},
  deleteItem: (id) => {},
});

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    let updatedItems = [...state.items];
    if (existingItemIndex !== -1) {
      const existingItem = state.items[existingItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + action.item.quantity,
      };
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item });
    }
    return {
      ...state,
      items: updatedItems,
    };
  } else if (action.type === "REMOVE_ITEM") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    let updatedItems = [...state.items];
    if (existingItemIndex !== -1) {
      const existingItem = state.items[existingItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - action.item.quantity,
      };
      if (updatedItem.quantity <= 0) {
        updatedItems.splice(existingItemIndex, 1);
      } else {
        updatedItems[existingItemIndex] = updatedItem;
      }
    }
    return {
      ...state,
      items: updatedItems,
    };
  } else if (action.type === "DELETE_ITEM") {
    return {
      ...state,
      items: state.items.filter((item) => item.id !== action.id),
    };
  }
  return state;
};

export const CartProvider = ({ children }) => {
  const [cart, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
  });

  const cartContext = {
    items: cart.items,
    addItem: (item) => dispatchCartAction({ type: "ADD_ITEM", item }),
    removeItem: (item) => dispatchCartAction({ type: "REMOVE_ITEM", item }),
    deleteItem: (id) => dispatchCartAction({ type: "DELETE_ITEM", id }),
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartContext;
