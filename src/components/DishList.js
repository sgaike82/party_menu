import React from 'react';
import DishCard from './DishCard';

export default function DishList({ dishes, selectedMap, onAdd, onRemove, onViewIngredients }) {
  if (!dishes || dishes.length === 0) {
    return <div className="container"><p style={{ color: '#6b7280' }}>No dishes found.</p></div>;
  }

  return (
    <div className="dish-list container">
      {dishes.map(d => (
        <DishCard
          key={d.id}
          dish={d}
          isSelected={!!selectedMap[d.id]}
          onAdd={onAdd}
          onRemove={onRemove}
          onViewIngredients={onViewIngredients}
        />
      ))}
    </div>
  );
}
