import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ItemCard from "./card/ItemCard";
import Back from "./buttons/Back";

const CreateReservation = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [reservation, setReservation] = useState({
    item: "",
    user: "John Doe",
    checkoutDate: "",
    checkoutTime: "",
    returnDate: "",
    returnTime: "",
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/inventory");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching laptops:", error);
      }
    };

    fetchItems();
  }, []);

  const handleSelect = (item) => {
    setSelectedItem(item);
    setReservation((prev) => ({ ...prev, item: item.name })); // set the laptop field in reservation
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // validate time input to ensure 30-minute increments
    if(name === "checkoutTime" || name === "returnTime") {
      if (parseInt(minutes, 10) % 30 !== 0) {
        alert("Please select a time in 30-minute increments.")
      }
    }
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

  const handleCheckoutDateChange = (e) => {
    const checkoutDate = new Date(e.target.value);
    const returnDate = new Date(reservation.returnDate);

    // Update the reservation with the new checkout date
    setReservation((prev) => ({...prev, checkoutDate: e.target.value}));

    // ensure return date is within 14 days of the checkout date
    if (reservation.returnDate && (returnDate - checkoutDate) / (1000 * 60 * 60 * 24) > 14) {
      alert("The return date must be within 14 days of the checkout date.");
      setReservation((prev) => ({...prev, returnDate: ""}));
    }
  };

  const handleReturnDateChange = (e) => {
    const returnDate = new Date(e.target.value);
    const checkoutDate = new Date(reservation.checkoutDate);

    // update the reservation is with the new return date
    setReservation((prev) => ({...prev, returnDate: e.target.value}));

    // ensure return date is within 14 days of the checkout date
    if ((returnDate - checkoutDate) / (1000 * 60 * 60 * 24) > 14) {
      alert("The return date must be within 14 days of the checkout date.");
      setReservation((prev) => ({...prev, returnDate:""}));
    }
  };


  return (
    <main className="content">
      <div className="container">
        <h1>New Reservation</h1>
        <form onSubmit={handleSubmit}>
          {/* Item info */}
          <label>Select items to reserve</label>
          <section id="inventory">
            <div className="inventory-grid">
              {Array.isArray(items) &&
                items.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onSelect={() => handleSelect(item)}
                    isSelected={selectedItem?.id === item.id}
                  />
                ))}
            </div>
          </section>

          <section id="checkout-details">
            <h1>Checkout Info</h1>
            <p>Please select checkout information.</p>

            <div className="form-group">
              {/* Checkout date info */}
              <label>Checkout Date:</label>
              <input
                type="date"
                name="checkoutDate"
                value={reservation.checkoutDate}
                onChange={handleCheckoutDateChange}
                required
              />
            </div>

            <div className="form-group">
              {/* Checkout time info */}
              <label>Checkout Time:</label>
              <input
                type="time"
                name="checkoutTime"
                value={reservation.checkoutTime}
                onChange={handleChange}
                min="08:00"
                max="16:30"
                required
              />
            </div>

            <div className="form-group">
              {/* Return date info */}
              <label>Return Date:</label>
              <input
                type="date"
                name="returnDate"
                value={reservation.returnDate}
                onChange={handleReturnDateChange}
                required
              />
            </div>

            <div className="form-group">
              {/* Return time info */}
              <label>Return Time:</label>
              <input
                type="time"
                name="returnTime"
                value={reservation.returnTime}
                onChange={handleChange}
                min="08:00"
                max="16:30"
                required
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
