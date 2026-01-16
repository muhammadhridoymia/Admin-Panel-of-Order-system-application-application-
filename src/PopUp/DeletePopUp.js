import React from "react";
import "../Styles/DeletePopUp.css";

function DeletePopup({ title, message, onCancel, onConfirm }) {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h3>{title || "Confirm Delete"}</h3>
        <p>{message || "Are you sure you want to delete this item?"}</p>
        <div className="popup-actions">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="delete-btn" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePopup;
