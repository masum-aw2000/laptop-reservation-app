// ReservationDetails.jsx

/**
 * Renders details of any reservation after successful request from server
 */

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Back from './buttons/Back';

const ReservationDetails = () => {
    const { id } = useParams();
    const [reservation, setReservation] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReservation = async () => {
            try {
                const response = await fetch(`http://localhost:3000/reservations/${id}`);
                const data = await response.json();

                console.log('Fetched reservation:', data);

                if (data) {
                    setReservation(data);
                } else {
                    console.error("No data found for reservation:", data);
                    setError("Reservation not found.");
                }
            } catch (error) {
                console.error('Error fetching reservation:', error);
                setError('Failed to fetch reservation');
            }
        };

        fetchReservation();
    }, [id]);

    return (
        <div className='container'>
            <h1>Reservation Details</h1>
            {error && <p>Error: {error}</p>}
            {reservation ? (
                <div>
                    <p><strong>Item:</strong> {reservation.itemType}</p>
                    <p><strong>User:</strong> {reservation.user}</p>
                    <p><strong>Checkout Date:</strong> {reservation.checkoutDate}</p>
                    <p><strong>Checkout Time:</strong> {reservation.checkoutTime}</p>
                    <p><strong>Return Date:</strong> {reservation.returnDate}</p>
                    <p><strong>Return Time:</strong> {reservation.returnTime}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}

            <Back
                destination='/'
                text='Go to Dashboard'
            />
        </div>
    );
};

export default ReservationDetails;