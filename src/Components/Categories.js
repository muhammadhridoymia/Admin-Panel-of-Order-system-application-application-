import React ,{useEffect}from "react";
import "../Styles/Categories.css"
import AddCategories from "../Form/UI/AddCategories";
import CategoriesFoods from "./CategoriesFoods";

function Categories() {
  const [showFoods, setShowFoods] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [categorydata, setCategorydata] = React.useState(null);

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/get/categories");

      if (!res.ok) {
        throw new Error("Server not responding");
      }

      const data = await res.json();

      if (data.success) {
        setCategories(data.categories);
        console.log("Fetched categories:", data.categories);
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };
   useEffect(() => {
    fetchCategories();
  }, []);
  
  const handler=(e)=>{
    setShowFoods(true);
    setCategorydata(e);
  }

  return (
    <div>
      {showFoods && <CategoriesFoods close={() => setShowFoods(false)} Data={categorydata} />}
      {showForm && <AddCategories close={() => setShowForm(false)} />}
      <div className="foodlist-header">
        <h2>Categories</h2>
      <button className="add-food-btn" onClick={() => setShowForm(!showForm)}>
        Create Category
      </button>
      </div>
      <div className="categories-container">
        {categories.map((category) => (
          <div key={category._id} className="category-card" onClick={() => handler(category)}>
            <img src={category.img} alt={category.name} className="category-img" />
            <h3 className="category-name">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
