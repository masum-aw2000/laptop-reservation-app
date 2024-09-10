// render card with laptop information
import { useState } from "react";

const LaptopCard = ({ laptop, onSelect, isSelected }) => {
  const [selected, setSelected] = useState(isSelected);

  const handleSelect = () => {
    if (laptop.available) {
      setSelected(!selected);
      onSelect(laptop); // notify parent component about the selection
    } else {
      alert("This laptop is not available for reservation.");
    }
  };

  return (
    <div className={`laptop-card ${selected ? "selected" : ""}`}>
      <div className="card-hearder">
        <h3>{laptop.name}</h3>
      </div>
      <div className="card-img"></div>
      <div className="card-body">
        <p>Operating System: {laptop.specs.operatingSystem}</p>
        <p>Processor: {laptop.specs.processor}</p>
        <p>RAM: {laptop.specs.ram}</p>
        <p>Storage: {laptop.specs.storage}</p>
      </div>
      <div className="card-footer">
        <button onClick={handleSelect} type="button">
            {selected ? 'Deselect' : 'Select'}
        </button>
      </div>
    </div>
  );
};

export default LaptopCard;
