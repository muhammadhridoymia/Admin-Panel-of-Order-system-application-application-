import React, { useState } from "react";
import "../Form/FormStyle/AddFood.css";

function FoodForm({ close }) {
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

    const formData = new FormData();
    formData.append("name", food.name);
    formData.append("price", food.price);
    formData.append("img", food.img); // file object

    try {
      const res = await fetch("http://localhost:5000/api/foods", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data);
      alert("Food submitted to server!");
      setFood({ name: "", price: "", img: null, preview: null });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="foodform-center">
      <div className="foodform-container">
        <button className="close-btn" onClick={close}>
          X
        </button>
        <h2>Add New Food</h2>

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

          <button type="submit">Submit Food</button>
        </form>
      </div>
    </div>
  );
}

export default FoodForm;
