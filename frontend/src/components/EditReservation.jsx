import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const EditReservation = () => {
    const { id } = useParams(); // get the reservation ID from the url
    const [reservation, setReservation] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // navigate programatically

    useEffect(() => {
        const fetchReservation = async () => {
            try {
                const response = await fetch(`http://localhost:3000/reservations/${id}`); // fetch data from server endpoint
                const data = await response.json(); // retrun as a JSON object

                if (data) {
                    setReservation(data);
                } else {
                    setError('Reservation not found');
                }
            } catch (error) {
                setError('Failed to fetch reservation');
            }
        };

        fetchReservation();
    }, [id]);

    const handleChange = (e) => {
        setReservation({ ...reservation, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/reservations/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservation),

            });

            const data = await response.json();
            if (response.ok) {
                console.log('Reservation updated:', data);
                navigate(`/reservations/view/${id}`); // redirect to the reservation details page
            } else {
                setError('Error updating reservation.');
            }
        } catch (error) {
            setError('Failed to update resrvation.')
        }
    };

    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Edit Reservation</h1>
            {reservation ? (
                <form onSubmit={handleSubmit}>
                    <label>Laptop:</label>
                    <input
                        type='text'
                        name='laptop'
                        value={reservation.laptop}
                        onChange={handleChange}
                    />
                    <label>Checkout Date:</label>
                    <input
                        type='date'
                        name='checkoutDate'
                        value={reservation.checkoutDate}
                        onChange={handleChange}
                    />
                    <label>Checkout Time:</label>
                    <input
                        type='time'
                        name='checkoutTime'
                        value={reservation.checkoutTime}
                        onChange={handleChange}
                    />
                    <label>Return Date:</label>
                    <input
                        type='date'
                        name='returnDate'
                        value={reservation.returnDate}
                        onChange={handleChange}
                    />
                    <label>Return Time:</label>
                    <input
                        type='time'
                        name='returnTime'
                        value={reservation.returnTime}
                        onChange={handleChange}
                    />
                    <button type='submit'>Update Reservation</button>
                </form>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default EditReservation;