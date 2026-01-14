import React from "react";
import { foods } from "../data/demoData";
import "../Styles/DeactiveFoods.css"

function DeactiveFoods() {
  const deactive = foods.filter(f => !f.active);

  return (
    <div>
      <h2>Deactive Foods</h2>

      {deactive.map(food => (
        <p key={food.id}>{food.name}</p>
      ))}
    </div>
  );
}

export default DeactiveFoods;
