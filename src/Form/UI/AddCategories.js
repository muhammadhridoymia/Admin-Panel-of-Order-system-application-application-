import React, { useState, useEffect } from "react";

function AddCategories({ close }) {
  // Loading states
  const [fetchLoading, setFetchLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  // UI states
  const [message, setMessage] = useState("");

  // Data states
  const [foods, setFoods] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);

  // Category form state
  const [category, setCategory] = useState({
    name: "",
    img: null,
    preview: null,
  });

  /* ---------------- FETCH FOODS ---------------- */
  const fetchFoods = async () => {
    setFetchLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/get/foods");

      if (!res.ok) {
        throw new Error("Server not responding");
      }

      const data = await res.json();

      if (data.success) {
        setFoods(data.foods);
        console.log("Fetched foods:", data.foods);
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  /* ---------------- FORM HANDLERS ---------------- */
  const handleChange = (e) => {
    setCategory({ ...category, name: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (category.preview) {
      URL.revokeObjectURL(category.preview);
    }

    setCategory({
      ...category,
      img: file,
      preview: URL.createObjectURL(file),
    });
  };

  /* ---------------- SUBMIT CATEGORY ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    if (!category.name || !category.img) {
      alert("Category name and image are required");
      setSubmitLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", category.name.trim());
    formData.append("foodIds", JSON.stringify(selectedFoods));
    formData.append("img", category.img);
    console.log("Submitting category with foods:", formData);

    try {
      const res = await fetch("http://localhost:5000/api/create/categories", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create category");
      }

      const data = await res.json();
      setMessage(data.message || "Category created successfully");

      // Reset
      setCategory({ name: "", img: null, preview: null });
      setSelectedFoods([]);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      alert(error.message, "Error");
    } finally {
      setSubmitLoading(false);
    }
  };

  /* ---------------- TOGGLE FOOD ---------------- */
  const toggleFood = (foodId) => {
    setSelectedFoods((prev) =>
      prev.includes(foodId)
        ? prev.filter((id) => id !== foodId)
        : [...prev, foodId]
    );
  };

  /* ---------------- CLEANUP PREVIEW ---------------- */
  useEffect(() => {
    return () => {
      if (category.preview) {
        URL.revokeObjectURL(category.preview);
      }
    };
  }, [category.preview]);

  /* ---------------- UI ---------------- */
  return (
    <div className="foodform-center">
      <div className="foodform-container">
        <button className="close-btn" onClick={close}>
          ✕
        </button>

        <h2>Add Category</h2>
        {message && <p className="message">{message}</p>}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="foodform">
          <label>
            Category Name
            <input
              type="text"
              value={category.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Upload Image
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>

          {category.preview && (
            <img
              src={category.preview}
              alt="Preview"
              className="food-preview"
            />
          )}

          <button type="submit" disabled={submitLoading}>
            {submitLoading ? <div className="spinner" /> : "Add Category"}
          </button>
        </form>

        {/* FOOD SELECTION */}
        <div className="food-list">
          {fetchLoading ? (
            <div className="loader">Loading foods...</div>
          ) : foods.length === 0 ? (
            <div className="empty">No foods found</div>
          ) : (
            foods.map((food) => (
              <div key={food._id} className="food-box">
                <img src={food.img} alt={food.name} className="food-pic" />
                <div className="food-name">{food.name}</div>
                <input
                  type="checkbox"
                  checked={selectedFoods.includes(food._id)}
                  onChange={() => toggleFood(food._id)}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AddCategories;
