import React from 'react';

const fallbackImage = 'https://placehold.co/300x200/F3F4F6/111827?text=Dish';

export default function DishCard({ dish, isSelected, onAdd, onRemove, onViewIngredients }) {
  const img = dish.image || dish.category?.image || fallbackImage;

  return (
    <div className="dish-card">
      <img src={img} alt={dish.name} className="dish-thumb" />
      <div className="dish-info">
        <div className="dish-title-row">
          <div>
            <div className="dish-name">
              {dish.name}
              <span style={{ fontSize: 12, color: '#6b7280', marginLeft: 6 }}>{dish.mealType}</span>
            </div>
            <p className="dish-desc">{dish.description?.slice(0, 80)}{dish.description?.length > 80 ? '... Read more' : ''}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="badge" style={{ marginBottom: 6 }}>{dish.type}</div>
          </div>
        </div>

        <div className="card-actions">
          <button className="btn btn-outline" onClick={() => onViewIngredients(dish)}>Ingredients</button>

          {isSelected ? (
            <button className="btn btn-primary" onClick={() => onRemove(dish.id)}>Remove</button>
          ) : (
            <button className="btn btn-outline" onClick={() => onAdd(dish.id)}>Add +</button>
          )}
        </div>
      </div>
    </div>
  );
}