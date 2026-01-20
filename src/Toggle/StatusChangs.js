// Toggle Popular Status of Food Item
export const toggle = async (id, setData, setIDforStatus, statusType) => {

  const UserBlock = `http://localhost:5000/api/user/block/update/${id}`;
  const BannerActive = `http://localhost:5000/api/banner/active/update/${id}`;
  const FoodDisplay = `http://localhost:5000/api/food/display/update/${id}`;
  const FoodPopular = `http://localhost:5000/api/food/popular/update/${id}`;

  const statusUrlMap = {
    display: FoodDisplay,
    popular: FoodPopular,
    active: BannerActive,
  };
  const url = statusUrlMap[statusType] || UserBlock;

  try {
    setIDforStatus(id);
    const res = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.success) {
      setIDforStatus(null);
      setData((prevFoods) =>
        prevFoods.map((f) =>
          f._id === id ? { ...f, [statusType]: !f[statusType] } : f,
        ),
      );
    }
  } catch (err) {
    setIDforStatus(null);
    console.error(err);
  }
};

//Delete Category
export const Delete = async (id, setdata, CloseUI, statusType) => {

  const User = `http://localhost:5000/api/user/delete/${id}`;
  const Banner = `http://localhost:5000/api/banner/delete/${id}`;
  const Food = `http://localhost:5000/api/food/delete/${id}`;
  const Category = `http://localhost:5000/api/category/delete/${id}`;

  const urlMap = {
    food: Food,
    category: Category,
    banner: Banner,
    user: User,
  };
  const url = urlMap[statusType] || Food;

    try {
    const res = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.success) {
      CloseUI(false);
      setdata((prevCategories) =>
        prevCategories.filter((category) => category._id !== id),
      );
    }
  } catch (err) {
    CloseUI(false);
    console.error(err);
  }
};
