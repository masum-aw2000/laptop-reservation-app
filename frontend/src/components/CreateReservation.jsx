import { useState } from 'react';

const CreateReservation = () => {
    const [reservation, setReservation] = useState({
        laptop: '',
        user: 'John Doe',
        checkoutDate: '',
        checkoutTime: '',
        returnDate: '',
        returnTime: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReservation(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservation),
            });

            const data = await response.json();
            console.log('Reservation created:', data);
        } catch (error) {
            console.error('Error creating reservation:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Laptop info */}
            <label>Laptop:</label>
            <input
                type='text'
                name='laptop'
                value={reservation.laptop}
                onChange={handleChange}
            />
            {/* Checkout date info */}
            <label>Checkout Date:</label>
            <input
                type='date'
                name='checkoutDate'
                value={reservation.checkoutDate}
                onChange={handleChange}
            />
            {/* Checkout time info */}
            <label>Checkout Time:</label>
            <input
                type='time'
                name='checkoutTime'
                value={reservation.checkoutTime}
                onChange={handleChange}
            />
            {/* Return date info */}
            <label>Return Date:</label>
            <input 
                type='date'
                name='returnDate'
                value={reservation.returnDate}
                onChange={handleChange}
            />
            {/* Return time info */}
            <label>Return Time:</label>
            <input 
                type='time'
                name='returnTime'
                value={reservation.returnTime}
                onChange={handleChange}
            />
            <button type='submit'>Create Reservation</button>
        </form>
    );
};

export default CreateReservation;
