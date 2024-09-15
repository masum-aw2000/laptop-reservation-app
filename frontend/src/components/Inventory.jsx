// inventory.jsx

import { useState, useEffect } from "react";
import ItemCard from "./card/ItemCard";

const Inventory = ({ onSelect, selectedItem }) => {
    const [items, setItems] = useState([]);
    const [sortType, setSortType] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch("http://localhost:3000/inventory");
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.log("Error fetching inventory", error);
            }
        };
        fetchItems();
    }, []);

    // sorting function
    const handleSort = (e) => {
        const selectedType = e.target.value;
        setSortType(selectedType);

        const sortedItems = [...items].sort((a, b) => {
            if(selectedType === "All" || selectedType === ""){
                return 0;
            }
            return a.itemType.localeCompare(b.itemType);
        });

        setItems(sortedItems);

    }

    return (
        <div>
            <label htmlFor="sort">Sort By Item Type:</label>
            <select id='sort' value={sortType} onChange={handleSort}>
                <option value=''>All</option>
                <option value='Laptop'>Laptops</option>
                <option value='DSLR'>DSLR Cameras</option>
                <option value='Lighting'>Lighting Equipment</option>
                <option value='Camcorder'>Camcorders</option>
            </select>

            <div className="inventory-grid">
                {Array.isArray(items) &&
                    items.filter(item => sortType === "" || item.itemType === sortType).map((item) => (
                        <ItemCard
                            key={item.id}
                            item={item}
                            onSelect={()=>(item)} isSelected={selectedItem?.id === item.id}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Inventory;