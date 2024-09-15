// render card with laptop information
import { useState } from "react";

const ItemCard = ({ item, onSelect, isSelected }) => {
  const [selected, setSelected] = useState(isSelected);

  const handleSelect = () => {
    if (item.available) {
      setSelected(!selected);
      onSelect(item); // notify parent component about the selection
    } else {
      alert("This item is not available for reservation.");
    }
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  

  return (
    <div className={`item-card ${selected ? "selected" : ""}`}>
      <div className="card-hearder">
        <h3>{item.name}</h3>
      </div>
      <div className="card-img">
        <img src={`http://localhost:3000${item.thumbnail}`}></img>
      </div>
      <div className="card-body">
        {/* iterate over the 'specs' object to display each spec*/}
        <div className="item-specs">
          {Object.entries(item.specs).map(([key, value]) => (
            <p key={key}>
              <strong>{capitalize(key.replace(/([A-Z])/g, ' $1'))}:</strong> <br/> 
              {/* if boolean value, value is Yes or No based on boolean value */}
              {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
            </p>
          ))}
        </div>
      </div>
      <div className="card-footer">
        <button onClick={handleSelect} type="button" className={`seconday ${selected ? 'primary' : ''}`}>
          {selected ? 'Deselect' : 'Select'}
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
