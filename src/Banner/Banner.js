import React, { useEffect, useState } from "react";
import DeletePopup from "../PopUp/DeletePopUp";
import AddBanner from "../Form/AddBanner";
import "../Styles/Banner.css";

function BannerList() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Fetch banners
  const fetchBanners = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/banners");
      const data = await res.json();
      if (data.success) setBanners(data.banners);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  if (loading) return <p>Loading banners...</p>;

  return (
    <div className="banner-card">
        {showForm && <AddBanner close={() => {setShowForm(false); fetchBanners();}} />}
      <div className="foodlist-header">
        <h2>Food Management</h2>
        <button className="primary-btn" onClick={() => setShowForm(true)}>
          + Add Banner
        </button>
      </div>
      <table className="banner-table">
        <thead>
          <tr>
            <th>Banner</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {banners.map(banner => (
            <tr key={banner._id}>
              <td>
                <img src={banner.image} alt="banner" className="banner-img" />
              </td>

              <td>
                <button
                  className={`status-btn ${
                    banner.display ? "active" : "inactive"
                  }`}
                  onClick={''}
                >
                  {banner.display ? "Active" : "Inactive"}
                </button>
              </td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() => {
                    setDeleteId(banner._id);
                    setShowDelete(true);
                  }}
                >
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDelete && (
        <DeletePopup
          title="Delete Banner"
          message="This banner will be permanently deleted."
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  );
}

export default BannerList;
