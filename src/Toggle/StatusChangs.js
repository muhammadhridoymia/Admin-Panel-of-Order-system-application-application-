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
