import React, { useState } from "react";
import "../FormStyle/Form.css";

function FoodForm({ close }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [food, setFood] = useState({
    name: "",
    price: "",
    img: null, // store the file
    preview: null, // store preview URL
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFood({ ...food, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFood({
        ...food,
        img: file,
        preview: URL.createObjectURL(file), // show preview
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!food.name || !food.price || !food.img) {
      alert("Please fill all fields");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", food.name.trim());
    formData.append("price", food.price);
    formData.append("img", food.img);

    try {
      const res = await fetch("http://localhost:5000/api/foods", {
        method: "POST",
        body: formData, 
      });
      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.message || "Failed to add food");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setMessage(data.message || "Food added successfully");
      setTimeout(() => setMessage(""), 3000);
      setLoading(false);
      setFood({
        name: "",
        price: "",
        img: null,
        preview: null,
      });
    } catch (error) {
      console.error("Upload error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="foodform-center">
      <div className="foodform-container">
        <button className="close-btn" onClick={close}>
          X
        </button>
        <h2>Add New Food</h2>
        <h3 className="message">{message}</h3>

        <form onSubmit={handleSubmit} className="foodform">
          <label>
            Food Name
            <input
              type="text"
              name="name"
              value={food.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Price (৳)
            <input
              type="number"
              name="price"
              value={food.price}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </label>

          {/* Preview Image */}
          {food.preview && (
            <img src={food.preview} alt="Preview" className="food-preview" />
          )}

          <button type="submit">{loading ? <div className="spinner"></div> : "Add Food"}</button>
        </form>
      </div>
    </div>
  );
}

export default FoodForm;
