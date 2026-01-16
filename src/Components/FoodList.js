import React, { useState, useEffect } from "react";
import "../Styles/FoodList.css";
import FoodForm from "../Form/AddFood";

function FoodList() {
  const [showForm, setShowForm] = useState(false);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: "", price: "" });
  const [imageLoading, setImageLoading] = useState(null);

  const fetchFoods = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/get/foods");
      const data = await res.json();
      if (data.success) setFoods(data.foods);
      console.log("Fetched foods:", data.foods);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const startEdit = (food) => {
    setEditId(food._id);
    setEditData({ name: food.name, price: food.price });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({ name: "", price: "" });
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="foodlist-card">
      {showForm && <FoodForm close={() => setShowForm(false)} />}

      <div className="foodlist-header">
        <h2>Food Management</h2>
        <button className="primary-btn" onClick={() => setShowForm(true)}>
          + Add Food
        </button>
      </div>

      <table className="food-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price (৳)</th>
            <th>Status</th>
            <th>Popular</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {foods.map((food) => (
            <tr key={food._id}>
              <td className="image-cell">
                <img src={food.img} alt={food.name} />

                <label className="change-img-btn">
                  {imageLoading === food._id ? "Uploading..." : "Change"}
                  <input type="file" hidden accept="image/*" onChange={""} />
                </label>
              </td>

              <td>
                {editId === food._id ? (
                  <input
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                  />
                ) : (
                  food.name
                )}
              </td>

              <td>
                {editId === food._id ? (
                  <input
                    type="number"
                    value={editData.price}
                    onChange={(e) =>
                      setEditData({ ...editData, price: e.target.value })
                    }
                  />
                ) : (
                  `৳ ${food.price}`
                )}
              </td>

              <td>
                <button
                  className={`status-btn ${
                    food.display ? "active" : "inactive"
                  }`}
                  onClick={""}
                >
                  {food.display ? "Active" : "Inactive"}
                </button>
              </td>
              
              <td>
                <button
                  className={`status-btn ${
                    food.popular ? "active" : "inactive"
                  }`}
                  onClick={""}
                >
                  {food.popular ? "Active" : "Inactive"}
                </button>
              </td>

              <td className="action-cell">
                {editId === food._id ? (
                  <>
                    <button className="save-btn">Save</button>
                    <button className="cancel-btn" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button className="edit-btn" onClick={() => startEdit(food)}>
                    ✏️ Edit
                  </button>
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
