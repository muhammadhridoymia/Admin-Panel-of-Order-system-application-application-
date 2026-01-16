import React, { useState } from "react";

function FoodForm({ close }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [food, setFood] = useState({
    name: "",
    price: "",
    img: null,
    preview: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!food.name || !food.price || !food.img) {
      return alert("All fields are required");
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", food.name.trim());
    formData.append("price", food.price);
    formData.append("img", food.img);

    try {
      const res = await fetch("http://localhost:5000/api/foods", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMessage(data.message || "Food added successfully");
      setFood({ name: "", price: "", img: null, preview: null });
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        {/* HEADER */}
        <div className="modal-header">
          <h2>Add Food</h2>
          <button onClick={close}>✕</button>
        </div>

        {/* FORM */}
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Food name"
            value={food.name}
            onChange={(e) => setFood({ ...food, name: e.target.value })}
          />

          <input
            type="number"
            placeholder="Price (৳)"
            value={food.price}
            onChange={(e) => setFood({ ...food, price: e.target.value })}
          />

          <label className="upload-box">
            Upload Image
            <input
              type="file"
              hidden
              onChange={(e) =>
                setFood({
                  ...food,
                  img: e.target.files[0],
                  preview: URL.createObjectURL(e.target.files[0]),
                })
              }
            />
          </label>

          {food.preview && (
            <img src={food.preview} className="preview" alt="preview" />
          )}

          <button disabled={loading}>
            {loading ? "Uploading..." : "Add Food"}
          </button>
        </form>

        {message && <p className="success">{message}</p>}
      </div>
    </div>
  );
}

export default FoodForm;
