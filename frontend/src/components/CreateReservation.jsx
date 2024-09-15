// CreateReservation.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Inventory from "./Inventory";
import Back from "./buttons/Back";

const CreateReservation = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
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
    setReservation((prev) => ({ ...prev, item: item.name })); //set the item field in reservation
  };
  const handleDateChange = (date, type) => {
    if (type === "checkout") {
      setStartDate(date);
      setReservation((prev) => ({ ...prev, checkoutDate: date }));
    } else if (type === "return") {
      setEndDate(date);
      setReservation((prev) => ({ ...prev, returnDate: date }));
    }
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

  const getMaxDate = () => {
    const maxDate = new Date(startDate); // copy startDate so we don't mutate the state
    maxDate.setDate(maxDate.getDate() + 14); // set the date to 14 days after startDate
    return maxDate;
  };

  return (
    <main className="content">
      <div className="container">
        <h1>New Reservation</h1>
        <form onSubmit={handleSubmit}>
          <section id="inventory">
            {/* Item Selection */}
            <Inventory onSelect={handleSelect} selectedItem={selectedItem} />
          </section>

          <section id="checkout-info">
            <h1>Checkout</h1>
            {/* Checkout date info */}
            <div className="form-field">
              <label>Checkout Date:</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => handleDateChange(date, "checkout")}
                minDate={new Date()} // set the minimum date as today
                // dateFormat='yyyy/MM//dd'
              />
            </div>

            {/* Checkout time info */}
            <div className="form-field">
              <label>Checkout Time:</label>
              <input
                type="time"
                name="checkoutTime"
                value={reservation.checkoutTime}
                // onChange={handleChange}
              />
            </div>

            {/* Return date info */}
            <div className="form-field">
              <label>Return Date:</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => handleDateChange(date, "return")}
                minDate={startDate}
                maxDate={getMaxDate()}
              />
            </div>

            {/* Return time info */}
            <div className="form-field">
              <label>Return Time:</label>
              <input
                type="time"
                name="returnTime"
                value={reservation.returnTime}
                // onChange={handleChange}
              />
            </div>
          </section>

          <button type="submit">Create Reservation</button>
        </form>
        <Back destination="/" text="Dashboard" />
      </div>
    </main>
  );
};

export default CreateReservation;
