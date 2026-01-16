import React, { useState, useEffect } from "react";
import "../Styles/AddCategories.css";
function AddCategories({ close }) {
  const [fetchLoading, setFetchLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [foods, setFoods] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);

  const [category, setCategory] = useState({
    name: "",
    img: null,
    preview: null,
  });

  const fetchFoods = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/get/foods");
      const data = await res.json();
      if (data.success) setFoods(data.foods);
    } catch (err) {
      console.error(err);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category.name || !category.img) return alert("Name & image required");

    setSubmitLoading(true);

    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("foodIds", JSON.stringify(selectedFoods));
    formData.append("img", category.img);

    try {
      const res = await fetch("http://localhost:5000/api/create/categories", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setMessage(data.message);
      setCategory({ name: "", img: null, preview: null });
      setSelectedFoods([]);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const toggleFood = (id) => {
    setSelectedFoods((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        {/* HEADER */}
        <div className="modal-header">
          <h2>Create Category</h2>
          <button onClick={close}>✕</button>
        </div>
        {/* FORM */}
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Category name"
            value={category.name}
            onChange={(e) =>
              setCategory({ ...category, name: e.target.value })
            }
          />

          <label className="upload-box">
            Upload Image
            <input
              type="file"
              hidden
              onChange={(e) =>
                setCategory({
                  ...category,
                  img: e.target.files[0],
                  preview: URL.createObjectURL(e.target.files[0]),
                })
              }
            />
          </label>

          {category.preview && (
            <img src={category.preview} className="preview" alt="preview" />
          )}

          <button disabled={submitLoading}>
            {submitLoading ? "Saving..." : "Create Category"}
          </button>
        </form>

        {/* FOOD LIST */}
        <h4 className="section-title">Attach Foods</h4>

        {fetchLoading ? (
          <p className="loading">Loading foods...</p>
        ) : (
          <div className="food-grid">
            {foods.map((food) => (
              <div
                key={food._id}
                className={`food-card ${
                  selectedFoods.includes(food._id) ? "active" : ""
                }`}
                onClick={() => toggleFood(food._id)}
              >
                <img src={food.img} alt={food.name} />
                <span>{food.name}</span>
              </div>
            ))}
          </div>
        )}

        {message && <p className="success">{message}</p>}
      </div>
    </div>
  );
}

export default AddCategories;
