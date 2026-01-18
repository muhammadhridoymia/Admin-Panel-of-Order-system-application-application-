import React, { useState } from "react";

function UserForm({ close }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [user, setUser] = useState({
    name: "",
    password: "",
    img: null,
    preview: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.name || !user.password || !user.img) {
      return alert("All fields are required");
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", user.name.trim());
    formData.append("password", user.password);
    formData.append("img", user.img);

    console.log("userdata", user);

    try {
      const res = await fetch("http://localhost:5000/api/add/user", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if(data.success){
        setMessage(data.message || "User added successfully");
      setUser({ name: "", password: "", img: null, preview: null });
      setTimeout(() => setMessage(""), 3000);
      }
      else{
        setMessage(data.message || "Failed to add user");
      setTimeout(() => setMessage(""), 3000);
      }
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
          <h2>Create User</h2>
          <button onClick={close}>✕</button>
        </div>

        {/* FORM */}
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="User name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <label className="upload-box">
            Upload Image
            <input
              type="file"
              hidden
              onChange={(e) =>
                setUser({
                  ...user,
                  img: e.target.files[0],
                  preview: URL.createObjectURL(e.target.files[0]),
                })
              }
            />
          </label>
          {user.preview && (
            <img src={user.preview} className="preview" alt="preview" />
          )}
          <button disabled={loading}>
            {loading ? "Uploading..." : "Add User"}
          </button>
        </form>

        {message && <p className="success">{message}</p>}
      </div>
    </div>
  );
}

export default UserForm;