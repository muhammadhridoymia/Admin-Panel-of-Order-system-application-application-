import React, { useState, useEffect } from "react";
import "../Styles/FoodList.css";
import FoodForm from "../Form/AddFood";
import { toggle } from "../Toggle/StatusChangs";
import ChangeImg from "../Form/ChangeImg";
import DeletePopup from "../PopUp/DeletePopUp";
import { Delete } from "../Toggle/StatusChangs";

function PopularFoods() {
  const [showForm, setShowForm] = useState(false);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: "", price: "" });
  const [changeImage, setChangeImage] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [id,setid] = useState(null);
  const [NotFoundMessage, setNotFoundMessage] = useState();

  //Loading 
  const [IDforStatus, setIDforStatus] = useState(null);

  const fetchFoods = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/get/popular/foods");
      const data = await res.json();
      if (data.success) {
        setFoods(data.popularFoods);
      }else {
        setNotFoundMessage(data.message ||"No popular foods");
        setFoods([]);
      }
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
      {deleteShow && (
        <DeletePopup
          title="Confirm Delete"
          message="Are you sure you want to delete this food?"
          onCancel={() => setDeleteShow(false)}
          onConfirm={() => Delete(id, setFoods, setDeleteShow, "food")}
        />
      )}
      {changeImage && <ChangeImg id={id} close={() => setChangeImage(false)} statusType="food" />}
      {showForm && <FoodForm close={() => setShowForm(false)} />}

      <div className="foodlist-header">
        <h2>Popular Foods</h2>
      </div>

      <table className="food-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price (৳)</th>
            <th>Display</th>
            <th>Popular</th>
            <th>Action</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {foods.map((food) => (
            <tr key={food._id}>
              <td className="image-cell">
                <img src={food.img} alt={food.name} />

                <label className="change-img-btn" onClick={() => { setChangeImage(true); setid(food._id); }}>
                  Change
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
                  onClick={() => toggle(food._id, setFoods, setIDforStatus, "display")}
                >
                  {IDforStatus===food._id ? "Updating..." : food.display ? "Yes" : "No"}
                </button>
              </td>
              
              <td>
                <button
                  className={`status-btn ${
                    food.popular ? "active" : "inactive"
                  }`}
                  onClick={() => toggle(food._id, setFoods, setIDforStatus, "popular")}
                >
                  {IDforStatus===food._id ? "Updating..." : food.popular ? "Yes" : "No"}
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
              <td className="delete-cell" onClick={() => {setDeleteShow(true);setid(food._id);}}>
                <button className="danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        {NotFoundMessage && <p className="not-found">{NotFoundMessage}</p>}
      </table>
    </div>
  );
}

export default PopularFoods;
