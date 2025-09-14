import React from 'react';

const fallbackImage = 'https://placehold.co/600x360/F3F4F6/111827?text=Dish';

export default function DishModal({ dish, onClose, onAdd, onRemove, isSelected }) {
  if (!dish) return null;
  const img = dish.image || dish.category?.image || fallbackImage;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        
        <div style={{ padding: 8 }}>
          <div className="modal-title">{dish.name}</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 6 }}>
            <div className="badge">{dish.mealType}</div>
            <div style={{ color: '#6b7280', fontSize: 13 }}>{dish.type}</div>
          </div>
          <img src={img} alt={dish.name} className="modal-img" />
          <div className="modal-desc">{dish.description}</div>

          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button className="btn btn-outline" onClick={() => onClose()}>Close</button>
            {isSelected ? (
              <button className="btn btn-primary" onClick={() => onRemove(dish.id)}>Remove</button>
            ) : (
              <button className="btn btn-primary" onClick={() => onAdd(dish.id)}>Add to Menu</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
