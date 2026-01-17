import React from "react";
import "../Styles/DeletePopUp.css";

function DeletePopup({ title, message, onCancel, onConfirm }) {
  const [loading, setLoading] = React.useState(false);
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h3>{title || "Confirm Delete"}</h3>
        <p>{message || "Are you sure you want to delete this item?"}</p>
        <div className="popup-actions">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="delete-btn" onClick={() => { setLoading(true);onConfirm();}}>
            {loading ? <div className="loading-spinner"></div> : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePopup;
