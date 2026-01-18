import React, { useState, useEffect } from "react";
import "../Styles/FoodList.css";
import UserForm from "../Form/CreateUserForm";
import ChangeImg from "../Form/ChangeImg";
import DeletePopup from "../PopUp/DeletePopUp";
import { Delete } from "../Toggle/StatusChangs";
import { toggle } from "../Toggle/StatusChangs";

function Users() {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
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
      const res = await fetch("http://localhost:5000/api/get/users");
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
      }else {
        setNotFoundMessage(data.message ||"No users found");
        setUsers([]);
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

  if (loading) return <div className="loading"></div>;

  return (
    <div className="foodlist-card">
      {deleteShow && (
        <DeletePopup
          title="Confirm Delete"
          message="Are you sure you want to delete this user?"
          onCancel={() => setDeleteShow(false)}
          onConfirm={() => Delete(id, setUsers, setDeleteShow, "user")}
        />
      )}
      {changeImage && <ChangeImg id={id} close={() => setChangeImage(false)} statusType="user" />}
      {showForm && <UserForm close={() => setShowForm(false)} />}

      <div className="foodlist-header">
        <h2>All Users</h2>
        <button className="primary-btn" onClick={() => setShowForm(true)}>
          Create New User
        </button>
      </div>

      <table className="food-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Action</th>
            <th>Block</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="image-cell">
                <img src={user.img} alt={user.name} />

                <label className="change-img-btn" onClick={() => { setChangeImage(true); setid(user._id); }}>
                  Change
                </label>
              </td>

              <td>
                {editId === user._id ? (
                  <input
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                  />
                ) : (
                  user.name
                )}
              </td>

              <td className="action-cell">
                {editId === user._id ? (
                  <>
                    <button className="save-btn">Save</button>
                    <button className="cancel-btn" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button className="edit-btn" onClick={() => startEdit(user)}>
                    ✏️ Edit
                  </button>
                )}
              </td>
              <td>
                <button className={user.block ? "blocked-btn" : "active-btn"} onClick={() => {
                  toggle(user._id, setUsers, setIDforStatus, "block");

                }}>
                  {IDforStatus === user._id ? "Updating..." : user.block ? "Unblock" : "Block"}
                </button>
              </td>
              <td className="delete-cell" onClick={() => {setDeleteShow(true);setid(user._id);}}>
                <button className="danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {NotFoundMessage && <p className="not-found">{NotFoundMessage}</p>}
    </div>
  );
}

export default Users;
