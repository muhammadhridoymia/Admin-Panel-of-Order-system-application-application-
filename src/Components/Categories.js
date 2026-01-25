import React, { useEffect, useState } from "react";
import "../Styles/Categories.css";
import AddCategories from "../Form/AddCategories";
import CategoriesFoods from "./CategoriesFoods";
import ChangeImg from "../Form/ChangeImg";
import DeletePopup from "../PopUp/DeletePopUp";
import { Delete } from "../Toggle/StatusChangs";


function Categories() {
  const [showFoods, setShowFoods] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showImg, setShowImg] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [id,setid] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/get/categories");
      const data = await res.json();
      if (data.success) setCategories(data.categories);
      console.log("catagory data:",data)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openFoods = (category) => {
    setSelectedCategory(category);
    setShowFoods(true);
  };

  return (
    <div className="category-page">
      {deleteShow && (
        <DeletePopup
          title="Confirm Delete"
          message="Are you sure you want to delete this category?"
          onCancel={() => setDeleteShow(false)}
          onConfirm={() => Delete(id, setCategories, setDeleteShow, "category")}
        />
      )}
      {showImg && <ChangeImg id={id} close={() => setShowImg(false)} statusType="category" />}
      {showFoods && (
        <CategoriesFoods
          close={() => setShowFoods(false)}
          Data={selectedCategory}
        />
      )}

      {showForm && <AddCategories close={() => setShowForm(false)} />}

      <div className="foodlist-header">
        <h2>Category Management</h2>
        <button className="primary-btn" onClick={() => setShowForm(true)}>
          + Create Category
        </button>
      </div>

      <div className="categories-container">
        {categories.map((category) => (
          <div key={category._id} className="category-card">
            <div className="image-wrapper"
              onClick={() => openFoods(category)}
            >
              <img src={category.img} alt={category.name} />
            </div>

            <h3>{category.name}</h3>

            <div className="category-actions">
              <button className={category.display ? "danger" : "secondary"} onClick={() => {setDeleteShow(true);setid(category._id);}}>
                {category.display ? "Hide" : "Show"}
              </button>
              <button
                className="danger"
                onClick={()=> {setDeleteShow(true);setid(category._id);}}
              >
                {deleteShow ? "Deleting..." : "Delete"}
              </button>

              <label className="secondary" onClick={() => { setShowImg(true); setid(category._id); }}>
                Change
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
