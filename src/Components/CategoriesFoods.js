import React from 'react'
import "../Styles/CategoriesFoods.css";

function CategoriesFoods({close, Data}) {
    const [Foods, setFoods] = React.useState([]);

    const fetchCategoriesFoods = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/get/categoryfoods/${Data._id}`);
  
        if (!res.ok) {
          throw new Error("Server not responding");
        }
  
        const data = await res.json();
  
        if (data.success) {
          setFoods(data.foods);
          console.log("Fetched categories foods:", data);
        }
      } catch (error) {
        console.error("Fetch error:", error.message);
      }
    };
     React.useEffect(() => {
      fetchCategoriesFoods();
    }, [Data._id]);

  return (
    <div className="categories-foods">
        <div className="categories-foods-center">
            <h2>{Data?.name}</h2>
            <button className="close-btn" onClick={close}>X</button>
            <div className="categories-list">
                {Foods.map(food => (
                    <div key={food.id} className="category-box">
                        <img src={food.img} alt={food.name} />
                        <h3>{food.name}</h3>
                        <p>{food.description}</p>
                        <button className='Remove-btn'>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default CategoriesFoods