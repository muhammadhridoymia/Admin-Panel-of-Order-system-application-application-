import React, { useEffect, useState } from "react";
import "../Styles/Categories.css";
import AddCategories from "../Form/AddCategories";
import CategoriesFoods from "./CategoriesFoods";

function Categories() {
  const [showFoods, setShowFoods] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [imgLoading, setImgLoading] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/get/categories");
      const data = await res.json();
      if (data.success) setCategories(data.categories);
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

  /* -------- REMOVE CATEGORY -------- */
  const removeCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/categories/${id}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setCategories((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  /* -------- CHANGE IMAGE -------- */
  const changeImage = async (id, file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("img", file);

    try {
      setImgLoading(id);
      const res = await fetch(
        `http://localhost:5000/api/categories/${id}/image`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setCategories((prev) =>
        prev.map((c) =>
          c._id === id ? { ...c, img: data.img } : c
        )
      );
    } catch (err) {
      alert(err.message);
    } finally {
      setImgLoading(null);
    }
  };

  return (
    <div className="category-page">
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
            <div
              className="image-wrapper"
              onClick={() => openFoods(category)}
            >
              <img src={category.img} alt={category.name} />
            </div>

            <h3>{category.name}</h3>

            <div className="category-actions">
              <button
                className="danger"
                onClick={() => removeCategory(category._id)}
              >
                Remove
              </button>

              <label className="secondary">
                {imgLoading === category._id ? "Uploading..." : "Change Image"}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) =>
                    changeImage(category._id, e.target.files[0])
                  }
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
