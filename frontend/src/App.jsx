import "./assets/app.css";
import Header from "./components/Header";
import { CartProvider } from "./store/CartContext";
import Meals from "./components/Meals/Meals";
import { UserProgressContextProvider } from "./store/UserProgressContext";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";

function App() {
  return (
    <UserProgressContextProvider>
      <CartProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartProvider>
    </UserProgressContextProvider>
  );
}

export default App;
