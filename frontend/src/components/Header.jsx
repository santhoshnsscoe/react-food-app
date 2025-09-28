import { useContext } from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalItems = cartCtx.items.reduce((total, item) => {
    return total + item.quantity
  }, 0);

  const handleCartButton = () => {
    userProgressCtx.showCart();
  }

  return (
    <header className="header">
      <div className="header__content">
        <img src={logo} alt="React Foods" />
        <h1>React Foods</h1>
      </div>
      <nav className="header__nav">
        <Button onClick={handleCartButton} textOnly>Cart ({totalItems})</Button>
      </nav>
    </header>
  );
}
