import React from "react";
import { reviews } from "../data/demoData";
import "../Styles/Reviews.css"

function Reviews() {
  return (
    <div>
      <h2>Reviews</h2>

      {reviews.map(r => (
        <div key={r.id}>
          <strong>{r.user}</strong> ⭐{r.rating}
          <p>{r.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default Reviews;
