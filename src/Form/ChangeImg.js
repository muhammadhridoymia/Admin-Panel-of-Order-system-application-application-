import React, { useState } from "react";

function ChangeImg({ close,id ,statusType}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [food, setFood] = useState({
    img: null,
    preview: null,
  });

  const User=`http://localhost:5000/api/change/user/img`;
  const Food=`http://localhost:5000/api/change/food/img`;
  const Category=`http://localhost:5000/api/change/category/img`;

  const urlMap={
    food:Food,
    category:Category,
    user:User,
  };

  const url=urlMap[statusType]||Food;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id || !food.img) {
      return alert("All fields are required");
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("id", id);
    formData.append("img", food.img);
    console.log("Image data", formData);

    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMessage(data.message || "Image successfully");
      setFood({ name: "", price: "", img: null, preview: null });
      setTimeout(() => {setMessage(""); close()}, 3000);
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
          <h2>Add Image</h2>
          <button onClick={close}>✕</button>
        </div>

        {/* FORM */}
        <form className="form" onSubmit={handleSubmit}>
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

export default ChangeImg;
