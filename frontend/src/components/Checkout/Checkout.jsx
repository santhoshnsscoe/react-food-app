import { useContext } from "react";
import CartContext from "../../store/CartContext";
import Modal from "../UI/Modal";
import UserProgressContext from "../../store/UserProgressContext";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { getCurrency } from "../../util/price";
import { submitOrder } from "../../web/meals";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalAmount = cartCtx.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleClose = () => {
    userProgressCtx.resetProgress();
  };

  const checkoutSubmit = async (event) => {
    try {
      event.preventDefault();
      const fields = new FormData(event.target);
      const customerData = Object.fromEntries(fields.entries());
      await submitOrder({
        order: {
          customer: customerData,
          items: cartCtx.items,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      className="checkout"
      open={userProgressCtx.progress === "checkout"}
      onClose={userProgressCtx.progress === "checkout" ? handleClose : null}
    >
      <form onSubmit={checkoutSubmit}>
        <h2>Checkout</h2>
        <p className="checkout__total">{getCurrency(totalAmount)}</p>
        <div className="checkout__fields form__fields">
          <Input type="text" label="Name" id="name" required />
          <Input type="email" label="E-mail" id="email" required />
          <Input type="text" label="Street" id="street" required />
          <div className="form__fields-row">
            <Input type="text" label="Postal/Zip Code" id="zipcode" required />
            <Input type="text" label="City" id="city" required />
          </div>
        </div>
        <div className="checkout__actions modal__actions">
          <Button onClick={handleClose} textOnly>
            Close
          </Button>
          {cartCtx.items.length > 0 && (
            <Button type="submit">Submit Order</Button>
          )}
        </div>
      </form>
    </Modal>
  );
}
