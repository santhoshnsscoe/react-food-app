import { useState, useEffect } from 'react';
import { getMeals } from '../../web/meals';
import MealItem from './MealItem';

export default function Meals() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
      const data = await getMeals();
        setMeals(data);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };
    fetchMeals();
  }, []);

  return (
    <div className="meals">
      <ul>
        {meals.map((meal) => (
          <MealItem key={meal.id} meal={meal} />
        ))}
      </ul>
    </div>
  );
}