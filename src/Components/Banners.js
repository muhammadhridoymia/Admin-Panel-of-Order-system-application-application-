import React, { useEffect, useState } from "react";
import DeletePopup from "../PopUp/DeletePopUp";
import AddBanner from "../Form/AddBanner";
import "../Styles/Banner.css";
import { Delete ,toggle} from "../Toggle/StatusChangs";

function BannerList() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [ShowDeleteUI, setShowDeleteUI] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [NotFoundMessage, setNotFoundMessage] = useState();
  const [IDforStatus, setIDforStatus] = useState(null);

  // Fetch banners
  const fetchBanners = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/get/banners");
      const data = await res.json();
      if (data.success){
        setBanners(data.banners);
        setLoading(false);
        console.log("Fetched banners:", data.banners);
      }
      else {
        setNotFoundMessage(data.message ||"No banners");
        setBanners([]);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
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
                <img src={banner.img} alt="banner" className="banner-img" />
              </td>

              <td>
                <button
                  className={`status-btn ${
                    banner.active ? "active" : "inactive"
                  }` }
                  onClick={() => toggle(banner._id, setBanners, setIDforStatus, "active")}
                >
                  {IDforStatus===banner._id ? "Updating..." : banner.active ? "Yes" : "No"}
                </button>
              </td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() => {
                    setDeleteId(banner._id);
                    setShowDeleteUI(true);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {ShowDeleteUI && (
        <DeletePopup
          title="Delete Banner"
          message="This banner will be permanently deleted."
          onCancel={() => setShowDeleteUI(false)}
          onConfirm={() => Delete(deleteId, setBanners, setShowDeleteUI, "banner")}
        />
      )}
      {NotFoundMessage && <p className="no-banners">{NotFoundMessage}</p>}
    </div>
  );
}

export default BannerList;
