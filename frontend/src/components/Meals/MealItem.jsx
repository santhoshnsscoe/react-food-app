import { getWebImageUrl } from '../../web/meals';
import { getCurrency } from '../../util/price';
import Button from '../UI/Button';
import CartContext from '../../store/CartContext';
import { useContext } from 'react';
import UserProgressContext from '../../store/UserProgressContext';

export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const handleAddToCart = () => {
    cartCtx.addItem({...meal, quantity: 1});
    userProgressCtx.showCart();
  };

  return (
    <li className="meal-item">
      <div className="meal-item__content">
        <img src={getWebImageUrl(meal.image)} alt={meal.name} />
        <div className="meal-item__info">
          <h3 className="meal-item__name">{meal.name}</h3>
          <p className="meal-item__price">{getCurrency(meal.price)}</p>
          <p className="meal-item__description">{meal.description}</p>
        </div>
        <div className="meal-item__actions">
          <Button onClick={handleAddToCart} className="meal-item__add-to-cart">Add to Cart</Button>
        </div>
      </div>
    </li>
  );
}