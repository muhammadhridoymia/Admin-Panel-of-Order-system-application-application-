import React from "react";
import { foods } from "../data/demoData";
import "../Styles/PopularFoods.css"

function PopularFoods() {
  const popularFoods = foods.filter(f => f.popular);

  return (
    <div>
      <h2>Popular Foods</h2>

      {popularFoods.map(food => (
        <p key={food.id}>{food.name}</p>
      ))}
    </div>
  );
}

export default PopularFoods;
