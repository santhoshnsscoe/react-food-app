import { useContext } from "react";
import { getCurrency } from "../../util/price";
import Button from "../UI/Button";
import CartContext from "../../store/CartContext";
import DeleteIcon from "../UI/DeleteIcon";

export default function CartItem({ item, ...props }) {
  const cartCtx = useContext(CartContext);

  const decrementCartItem = () => {
    cartCtx.removeItem({ ...item, quantity: 1 });
  };
  const incrementCartItem = () => {
    cartCtx.addItem({ ...item, quantity: 1 });
  };
  const deleteCartItem = () => {
    cartCtx.deleteItem(item.id);
  };

  return (
    <li {...props}>
      <div className="cart__item-title">
        <p>
          {item.name}{" "}
        </p>
        <p>
          {item.quantity} x {getCurrency(item.price)}
          <DeleteIcon onClick={deleteCartItem} className="cart__item-delete" />
        </p>
      </div>
      <div className="cart__item-actions">
        <Button onClick={decrementCartItem} className="cart__item-decrement" textOnly={true}>
          -
        </Button>
        <span>{item.quantity}</span>
        <Button onClick={incrementCartItem} className="cart__item-increment" textOnly={true}>
          +
        </Button>
      </div>
    </li>
  );
}
