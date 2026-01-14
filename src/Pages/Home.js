import React, { useState } from "react";
import Orders from "../Components/ShowOrders";
import FoodList from "../Components/FoodList";
import Categories from "../Components/Categories";
import PopularFoods from "../Components/PopularFoods";
import DeactiveFoods from "../Components/DeactiveFoods";
import Banners from "../Components/Banners";
import Reviews from "../Components/Reviews";
import Users from "../Components/Users";
import "../Styles/Home.css";

function Home() {
  const [activePage, setActivePage] = useState("Orders");
  const [active, setActive] = useState(false);

  const menuItems = [
    { key: "Orders", label: "All Orders" },
    { key: "Foods", label: "Foods" },
    { key: "Categorys", label: "Categorys" },
    { key: "Popular", label: "Popular" },
    { key: "Deactive", label: "Deactive Foods" },
    { key: "Banner", label: "Banner" },
    { key: "Reviews", label: "Reviews" },
    { key: "Users", label: "Users" },
  ];

  const renderPage = () => {
    switch (activePage) {
      case "Orders": return <Orders />;
      case "Foods": return <FoodList />;
      case "Categorys": return <Categories />;
      case "Popular": return <PopularFoods />;
      case "Deactive": return <DeactiveFoods />;
      case "Banner": return <Banners />;
      case "Reviews": return <Reviews />;
      case "Users": return <Users />;
      default: return null;
    }
  };

  return (
    <div className="admin-con">
      <h1>Dashboard</h1>

      <div className="Body">
        <div className="left">
          {menuItems.map(item => (
            <div
              key={item.key}
              className={activePage === item.key ? "menu-active" : "menu"}
              onClick={() => setActivePage(item.key)}
            >
              {item.label}
            </div>
          ))}
        </div>

        <div>{renderPage()}</div>
      </div>
    </div>
  );
}

export default Home;
