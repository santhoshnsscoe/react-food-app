import { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/CartContext";
import CartItem from "./CartItem";
import { getCurrency } from "../../util/price";
import Button from "../UI/Button";
import UserProgressContext from "../../store/UserProgressContext";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const handleClose = () => {
    userProgressCtx.resetProgress();
  };

  const handleCheckout = () => {
    userProgressCtx.showCheckout();
  };

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? handleClose : null}
    >
      <h2>My Cart</h2>
      <ul className="cart__items">
        {cartCtx.items.map((item) => (
          <CartItem className="cart__item" key={item.id} item={item} />
        ))}
      </ul>
      {cartCtx.items.length > 0 ? (
        <p className="cart__total">{getCurrency(cartTotal)}</p>
      ) : (
        <p className="cart__nocart">No items added to cart.</p>
      )}
      <div className="cart__actions modal__actions">
        <Button onClick={handleClose} textOnly>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleCheckout}>Checkout</Button>
        )}
      </div>
    </Modal>
  );
}
