import React from "react";
import { categories } from "../data/demoData";

function Categories() {
  return (
    <div>
      <h2>Categories</h2>

      <ul>
        {categories.map(cat => (
          <li key={cat.id}>{cat.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
