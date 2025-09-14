// src/components/IngredientModal.js
import React from "react";
import "./IngredientModal.css";

const IngredientModal = ({ dish, onClose }) => {
  if (!dish) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        {/* Header */}
        <div className="modal-header">
          <h3 className="modal-title">Ingredient list</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* Dish Info */}
        <div className="dish-info">
          {dish.image && (
            <img src={dish.image} alt={dish.name} className="dish-image" />
          )}
          <div>
            <h2 className="dish-name">{dish.name}</h2>
            <img src="https://storage.googleapis.com/chefkartimages/customer_app_assets/star_chef/north_indian.png"/>
            <p className="dish-description">{dish.description}</p>
          </div>
        </div>

        {/* Ingredients */}
        <div className="ingredients-section">
          <h4>Ingredients</h4>
          <p className="for-people">For 2 people</p>
          <ul className="ingredient-list">
            {dish.ingredients && dish.ingredients.length > 0 ? (
              dish.ingredients.map((item, idx) => (
                <li key={idx} className="ingredient-item">
                  <span>{item.name}</span>
                  <span>{item.quantity}</span>
                </li>
              ))
            ) : (
              <p>No ingredients available.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IngredientModal;
