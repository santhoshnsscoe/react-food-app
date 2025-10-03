import MealItem from "./MealItem";
import useFetchData from "../../hooks/useFetchData";
import Error from "../UI/Error";

const request = { method: "get", type: "meals" };

export default function Meals() {
  const {
    data: meals,
    isLoading,
    error
  } = useFetchData(request, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

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
