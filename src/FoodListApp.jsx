import React, { useState } from "react";

const FoodListApp = () => {
  const [foodItems, setFoodItems] = useState([
    "Pizza",
    "Burger",
    "Pasta",
    "Sushi",
    "Tacos",
    "Biryani",
    "Sandwich",
    "Salad",
    "Soup",
    "Noodles",
    "Dumplings",
    "Steak",
    "Curry",
    "Fries",
    "Ice Cream",
  ]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [removedItems, setRemovedItems] = useState([]);

  const handleCheckboxChange = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = () => {
    setFoodItems((prev) =>
      prev.filter((item) => !selectedItems.includes(item))
    );
    setRemovedItems((prev) => [...prev, ...selectedItems]);
    setSelectedItems([]);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Food List</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {foodItems.map((item, index) => (
          <li key={index} style={{ marginBottom: "5px" }}>
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(item)}
              checked={selectedItems.includes(item)}
            />{" "}
            {item}
          </li>
        ))}
      </ul>
      <button
        onClick={handleSubmit}
        style={{ padding: "5px 10px", cursor: "pointer" }}
      >
        Submit
      </button>
      <h2>Removed Items</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {removedItems.map((item, index) => (
          <li key={index} style={{ color: "red" }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodListApp;
