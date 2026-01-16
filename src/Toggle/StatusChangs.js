// Toggle Popular Status of Food Item
export const toggle = async (id, setFoods, setLoadingstatus, statusType) => {

  const Display = `http://localhost:5000/api/food/display/update/${id}`;
  const Popular = `http://localhost:5000/api/food/popular/update/${id}`;

  const url = statusType === "display" ? Display : Popular;

  try {
    setLoadingstatus((prev) => ({ ...prev, [statusType]: true }));
    const res = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.success) {
      setLoadingstatus((prev) => ({ ...prev, [statusType]: false }));
      setFoods((prevFoods) =>
        prevFoods.map((f) =>
          f._id === id ? { ...f, [statusType]: !f[statusType] } : f
        )
      );
    }
  } catch (err) {
    setLoadingstatus((prev) => ({ ...prev, [statusType]: false }));
    console.error(err);
  }
};


//Delete Category
export const Delete = async (id, setCategories, setDeleteShow,statusType) => {
    const Food=`http://localhost:5000/api/food/delete/${id}`;
    const Category=`http://localhost:5000/api/category/delete/${id}`;

    const url = statusType === "food" ? Food : Category;
  try {
    setDeleteShow(true);
    const res = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.success) {
        setDeleteShow(false);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== id)
      );
    }
  } catch (err) {
    setDeleteShow(false);
    console.error(err);
  }
};