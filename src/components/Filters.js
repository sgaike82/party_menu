import React from 'react';

const categories = ['ALL', 'STARTER', 'MAIN COURSE', 'DESSERT', 'SIDES'];

export default function Filters({
  activeCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  vegOnly,
  onVegOnlyChange,
  countsByCategory
}) {
  return (
    <div className="filters container">
      <div className="search-bar" role="search">
        <button className="btn btn-outline" aria-hidden="true">🔍</button>
        <input
          type="text"
          placeholder="Search dish for your party......"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <button className="btn btn-outline" onClick={() => onSearchChange('')}>✖</button>
      </div>

      <div className="category-tabs" style={{ marginTop: 10 }}>
        {categories.map(cat => {
          const count = countsByCategory[cat] || 0;
          return (
            <button
              key={cat}
              className={`tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => onCategoryChange(cat)}
            >
              {cat} {cat !== 'ALL' && <span className="badge" style={{ marginLeft: 6 }}>{count}</span>}
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10 }}>
        <label style={{ display: 'flex', gap: 8, alignItems: 'center', color: '#6b7280' }}>
          <input type="checkbox" checked={vegOnly} onChange={e => onVegOnlyChange(e.target.checked)} />
          Veg Only
        </label>
      </div>
    </div>
  );
}
