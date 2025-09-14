import React, { useMemo, useState } from 'react';
import './index.css';
import Filters from './components/Filters';
import DishList from './components/DishList';
import DishModal from './components/DishModal';
import IngredientModal from './components/IngredientModal';
import { getDishes } from './data/dishes';

function App() {
  // load dataset (30 items)
  const allDishes = useMemo(() => getDishes(), []);

  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [vegOnly, setVegOnly] = useState(false);

  // selected map: { dishId: true }
  const [selectedMap, setSelectedMap] = useState({});

  // current dish for full modal
  const [currentDish, setCurrentDish] = useState(null);

  // ingredient modal dish
  const [ingredientDish, setIngredientDish] = useState(null);

  // filtering logic
  const filtered = useMemo(() => {
    return allDishes.filter(d => {
      if (activeCategory !== 'ALL' && d.mealType !== activeCategory) return false;
      if (vegOnly && d.type !== 'VEG') return false;
      if (searchTerm) {
        const s = searchTerm.toLowerCase();
        const nameMatch = d.name.toLowerCase().includes(s);
        const descMatch = (d.description || '').toLowerCase().includes(s);
        return nameMatch || descMatch;
      }
      return true;
    });
  }, [allDishes, activeCategory, vegOnly, searchTerm]);

  // counts by category for showing on tabs
  const countsByCategory = useMemo(() => {
    const counts = { ALL: allDishes.length };
    allDishes.forEach(d => {
      const cat = d.mealType || 'OTHER';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [allDishes]);

  // counts of selected per mealType to display a small indicator (like Main Course 8)
  const selectedCountsByCategory = useMemo(() => {
    const res = {};
    Object.keys(selectedMap).forEach(idStr => {
      const id = Number(idStr);
      const dish = allDishes.find(d => d.id === id);
      if (!dish) return;
      const cat = dish.mealType || 'OTHER';
      res[cat] = (res[cat] || 0) + 1;
    });
    return res;
  }, [selectedMap, allDishes]);

  const totalSelected = Object.keys(selectedMap).length;

  const handleAdd = (id) => {
    setSelectedMap(prev => ({ ...prev, [id]: true }));
  };
  const handleRemove = (id) => {
    setSelectedMap(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const openDishModal = (dish) => setCurrentDish(dish);
  const closeDishModal = () => setCurrentDish(null);

  const openIngredientModal = (dish) => setIngredientDish(dish);
  const closeIngredientModal = () => setIngredientDish(null);

  const selectedSummary = allDishes.filter(d => selectedMap[d.id]);

  return (
    <div className="app">
      <div className="header container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button className="btn btn-outline" onClick={() => { /* back action if needed */ }}>◀</button>
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: 0 }}>Menu</h1>
            <div className="sub" style={{ fontSize: 13, marginTop: 4 }}>Choose dishes for your party</div>
          </div>
        </div>
      </div>

      <Filters
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        vegOnly={vegOnly}
        onVegOnlyChange={setVegOnly}
        countsByCategory={selectedCountsByCategory}
      />

      <main className="main">
        <section className="left" style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px' }}>
            <div style={{ fontWeight: 700 }}>Main Courses Selected ({selectedCountsByCategory['MAIN COURSE'] || 0})</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div className="count-pill">{vegOnly ? 'VEG' : 'All'}</div>
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            <DishList
              dishes={filtered}
              selectedMap={selectedMap}
              onAdd={handleAdd}
              onRemove={handleRemove}
              onViewIngredients={openIngredientModal}
            />
          </div>
        </section>
      </main>

      {/* Sticky footer */}
      <div className="sticky-footer">
        <div className="footer-card">
          <div className="footer-left">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{totalSelected} Selected</div>
              <div style={{ color: '#6b7280', fontSize: 13 }}>{selectedSummary.slice(0,3).map(d=>d.name).join(', ')}{selectedSummary.length>3?` and ${selectedSummary.length-3} more` : ''}</div>
            </div>
          </div>
          <div>
            <button className="continue-btn" onClick={() => alert(`Proceeding with ${totalSelected} items`) } disabled={totalSelected===0}>
              Continue
            </button>
          </div>
        </div>
      </div>

      {/* Dish detail modal: uses selectedMap to show add/remove */}
      {currentDish && (
        <DishModal
          dish={currentDish}
          onClose={closeDishModal}
          onAdd={handleAdd}
          onRemove={handleRemove}
          isSelected={!!selectedMap[currentDish.id]}
        />
      )}

      {/* Ingredient modal */}
      {ingredientDish && (
        <IngredientModal dish={ingredientDish} onClose={closeIngredientModal} />
      )}

      {/* Clicking a list item to open full modal isn't wired in DishList; add simple click behavior:
          we can open dish modal by clicking the dish name area. Let's patch DishList to support onViewIngredients,
          or use view in DishCard. For quick demo, clicking "Ingredients" opens ingredient modal, longpress might open dish modal.
      */}
    </div>
  );
}

export default App;
