import React ,{useState}from "react";
import "../Styles/FoodList.css";
import FoodForm from "../Form/AddFood";

function FoodList() {
  const [showForm, setShowForm] = useState(false);

    // data/foods.js
   const foods = [
  {
    id: 1,
    img: "https://via.placeholder.com/80",
    name: "Burger",
    category: "Fast Food",
    price: 250,
    active: true,
  },
  {
    id: 2,
    img: "https://via.placeholder.com/80",
    name: "Coke",
    category: "Drinks",
    price: 50,
    active: false,
  },
  {
    id: 2,
    img: "https://via.placeholder.com/80",
    name: "Coke",
    category: "Drinks",
    price: 50,
    active: false,
  },
  {
    id: 2,
    img: "https://via.placeholder.com/80",
    name: "Coke",
    category: "Drinks",
    price: 50,
    active: false,
  },
  {
    id: 2,
    img: "https://via.placeholder.com/80",
    name: "Coke",
    category: "Drinks",
    price: 50,
    active: false,
  },
  {
    id: 2,
    img: "https://via.placeholder.com/80",
    name: "Coke",
    category: "Drinks",
    price: 50,
    active: false,
  },
  {
    id: 2,
    img: "https://via.placeholder.com/80",
    name: "Coke",
    category: "Drinks",
    price: 50,
    active: false,
  },
  {
    id: 2,
    img: "https://via.placeholder.com/80",
    name: "Coke",
    category: "Drinks",
    price: 50,
    active: false,
  },
  {
    id: 2,
    img: "https://via.placeholder.com/80",
    name: "Coke",
    category: "Drinks",
    price: 50,
    active: false,
  },

  {
    id: 2,
    img: "https://via.placeholder.com/80",
    name: "Coke",
    category: "Drinks",
    price: 50,
    active: false,
  },
  {
    id: 2,
    img: "https://via.placeholder.com/80",
    name: "Coke",
    category: "Drinks",
    price: 50,
    active: false,
  },
  {
    id: 2,
    img: "https://via.placeholder.com/80",
    name: "Coke",
    category: "Drinks",
    price: 50,
    active: false,
  },
  {
    id: 2,
    img: "https://via.placeholder.com/80",
    name: "Coke",
    category: "Drinks",
    price: 50,
    active: false,
  },
];

  return (

    <div className="foodlist-con">
      {showForm && <FoodForm close={() => setShowForm(false)} />}
      <h2>Food List</h2>
      <button className="add-food-btn" onClick={() => setShowForm(!showForm)}>Add New Food</button>

      <table className="food-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price (৳)</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {foods.map((food) => (
            <tr key={food.id}>
              <td>
                <img src={food.img} alt={food.name} />
              </td>
              <td>{food.name}</td>
              <td>{food.category}</td>
              <td>{food.price}</td>
              <td>
                {food.active ? (
                  <span className="active"><button>Active</button></span>
                ) : (
                  <span className="inactive"><button>Deactive</button></span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FoodList;
