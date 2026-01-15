import React, { useState, useEffect } from "react";
import "../Styles/FoodList.css";
import FoodForm from "../Form/AddFood";

function FoodList() {
  const [showForm, setShowForm] = useState(false);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchFoods = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/get/foods");

    if (!res.ok) {
      throw new Error("Server not responding");
    }

    const data = await res.json();

    if (data.success) {
      setFoods(data.foods);
    }
  } catch (error) {
    console.error("Fetch error:", error.message);
  } finally {
    setLoading(false); // ✅ ALWAYS stop loading
  }
};


   useEffect(() => {
    fetchFoods();
  }, []);

  if (loading) {
    return (<div className="loading">Loading...</div>)
  }

  return (
    <div className="foodlist-con">
      {showForm && <FoodForm close={() => setShowForm(false)} />}
      <div className="foodlist-header">
        <h2>Food List</h2>
      <button className="add-food-btn" onClick={() => setShowForm(!showForm)}>
        Add New Food
      </button>
      </div>

      <table className="food-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price (৳)</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {foods.map((food, index) => (
            <tr key={food._id || index}>
              <td>
                <img src={food.img} alt={food.name} />
              </td>
              <td>{food.name}</td>
              <td>{food.price}</td>
              <td>
                {food.display ? (
                  <span className="active">
                    <button>Active</button>
                  </span>
                ) : (
                  <span className="inactive">
                    <button>Deactive</button>
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FoodList;
