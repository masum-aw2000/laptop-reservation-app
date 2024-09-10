import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LaptopCard from "./card/LaptopCard";
import Back from "./buttons/Back";

const CreateReservation = () => {
  const navigate = useNavigate();
  const [laptops, setLaptops] = useState([]);
  const [selectedLaptop, setSelectedLaptop] = useState(null);
  const [reservation, setReservation] = useState({
    laptop: "",
    user: "John Doe",
    checkoutDate: "",
    checkoutTime: "",
    returnDate: "",
    returnTime: "",
  });

  // const[availableLaptops, setAvailablelLaptops] = useState([]);
  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const response = await fetch("http://localhost:3000/inventory");
        const data = await response.json();
        setLaptops(data);
      } catch (error) {
        console.error("Error fetching laptops:", error);
      }
    };

    fetchLaptops();
  }, []);

  const handleSelect = (laptop) => {
    setSelectedLaptop(laptop);
    setReservation((prev) => ({ ...prev, laptop: laptop.name })); // set the laptop field in reservation
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
          laptop: selectedLaptop.name,
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
    <div>
      <h1>New Reservation</h1>
      <form onSubmit={handleSubmit}>
        {/* Laptop info */}
        <label>Laptop:</label>
        <div>
        {Array.isArray(laptops) && laptops.map((laptop) => (
          <LaptopCard
            key={laptop.id}
            laptop={laptop}
            onSelect={() => handleSelect(laptop)}
            isSelected={selectedLaptop?.id === laptop.id}
          />
        ))}
      </div>
       
        

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
  );
};

export default CreateReservation;
