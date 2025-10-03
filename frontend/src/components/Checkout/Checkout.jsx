import { useContext } from "react";
import CartContext from "../../store/CartContext";
import Modal from "../UI/Modal";
import UserProgressContext from "../../store/UserProgressContext";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { getCurrency } from "../../util/price";
import useFetchData from "../../hooks/useFetchData";
import Error from "../UI/Error";

const submitOrderRequest = { method: "post", type: "submit_order" };

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    error,
    sendRequest,
    clearData,
    isLoading: isSubmitting,
  } = useFetchData(submitOrderRequest);

  const totalAmount = cartCtx.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleClose = () => {
    userProgressCtx.resetProgress();
    cartCtx.clearItems();
    clearData();
  };

  const checkoutSubmit = async (event) => {
    event.preventDefault();
    const fields = new FormData(event.target);
    const customerData = Object.fromEntries(fields.entries());
    await sendRequest({
      order: {
        customer: customerData,
        items: cartCtx.items,
      },
    });
  };

  let actions = (
    <>
      <Button onClick={handleClose} textOnly>
        Close
      </Button>
      {cartCtx.items.length > 0 && <Button type="submit">Submit Order</Button>}
    </>
  );

  if (isSubmitting) {
    actions = <span>Submitting order...</span>;
  }

  console.log(data, error);
  if (data && !error) {
    return (
      <Modal
        className="checkout"
        open={userProgressCtx.progress === "checkout"}
        onClose={userProgressCtx.progress === "checkout" ? handleClose : null}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleClose}>Okay</Button>
        </p>
      </Modal>
    );
  }

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
        {error && <Error title="Failed to submit order" message={error} />}
        <div className="checkout__actions modal__actions">{actions}</div>
      </form>
    </Modal>
  );
}
