import React, { useState } from "react";
import "../Styles/Post.css";

export default function AdminPage() {
  
  const [posts, setPosts] = useState([
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
      message: "🔥 Welcome to Our Restaurant!",
      date: "Feb 22, 2026",
    },
        {
      id: 1,
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
      message: "🔥 20% Discount on All Burgers Today!",
      date: "Feb 20, 2026"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      message: "🥗 Try Our Fresh Healthy Salad Menu!",
      date: "Feb 18, 2026"
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCreatePost = () => {
    if (!message || !imageFile) {
      alert("All fields required!");
      return;
    }

    const newPost = {
      id: Date.now(),
      image: preview,
      message: message,
      date: new Date().toLocaleDateString(),
    };

    setPosts([newPost, ...posts]);
    setShowModal(false);
    setMessage("");
    setImageFile(null);
    setPreview(null);
  };

  return (
    <div className="admin-container">
      <div className="header">
        <h1>Restaurant Admin Panel</h1>
        <button className="create-btn" onClick={() => setShowModal(true)}>
          + Create Post
        </button>
      </div>

      <div className="posts-grid">
        {posts.map((post) => (
          <div className="post-card" key={post.id}>
            <img src={post.image} alt="post" />
            <div className="post-content">
              <p>{post.message}</p>
              <span className="date">{post.date}</span>
              <span className="delete-btn" onClick={() => setPosts(posts.filter(p => p.id !== post.id))}>
                Delete
              </span>
              <span className="edit-btn" onClick={() => alert("Edit functionality coming soon!")}>
                Edit
              </span>
              <span className="display-btn" onClick={() => alert("View functionality coming soon!")}>
                Display
              </span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="popup-header">
              <h2>Create New Post</h2>
              <button className="" onClick={() => setShowModal(false)}>
                X
              </button>
            </div>

            <label className="upload-box">
              {preview ? (
                <img src={preview} alt="preview" />
              ) : (
                <span>Click to Upload Image</span>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />
            </label>

            <textarea
              placeholder="Write message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="modal-buttons">
              <button className="submit-btn" onClick={handleCreatePost}>
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
