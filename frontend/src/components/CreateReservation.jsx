// CreateReservation.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Inventory from "./Inventory";
import Back from "./buttons/Back";

const CreateReservation = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [reservation, setReservation] = useState({
    item: "",
    user: "John Doe",
    checkoutDate: "",
    checkoutTime: "",
    returnDate: "",
    returnTime: "",
  });

  const handleSelect = (item) => {
    setSelectedItem(item);
    setReservation((prev) => ({ ...prev, item: item.name }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...reservation,
          item: selectedItem.name,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Reservation created.");
      } else {
        alert("Error creating reservation.");
      }
      console.log("Reservation created:", data);
      navigate("/");
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  return (
    <main className="content">
      <div className="container">
        <h1>New Reservation</h1>
        <form onSubmit={handleSubmit}>
          {/* Item Selection */}
          <Inventory onSelect={handleSelect} selectedItem={selectedItem} />

          {/* Checkout date info */}
          <label>Checkout Date:</label>
          <input
            type="date"
            name="checkoutDate"
            value={reservation.checkoutDate}
            onChange={handleChange}
          />
          {/* Checkout time info */}
          <label>Checkout Time:</label>
          <input
            type="time"
            name="checkoutTime"
            value={reservation.checkoutTime}
            onChange={handleChange}
          />
          {/* Return date info */}
          <label>Return Date:</label>
          <input
            type="date"
            name="returnDate"
            value={reservation.returnDate}
            onChange={handleChange}
          />
          {/* Return time info */}
          <label>Return Time:</label>
          <input
            type="time"
            name="returnTime"
            value={reservation.returnTime}
            onChange={handleChange}
          />
          <button type="submit">Create Reservation</button>
        </form>
        <Back destination="/" text="Dashboard" />
      </div>
    </main>
  );
};

export default CreateReservation;
