import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ViewButton from './buttons/ViewButton';
import EditButton from './buttons/EditButton';
import DeleteButton from './buttons/DeleteButton';

const ReservationsList = () => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch('http://localhost:3000/reservations');
        const data = await response.json();

        // Log the raw response data to debug
        console.log('Fetched data:', data);

        if (Array.isArray(data)) {
          setReservations(data);
        } else {
          console.error('Expected an array but got:', data);
          setError('Unexpected data format'); // Set error state
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
        setError('Failed to fetch reservations'); // Set error state
      }
    };

    fetchReservations();
  }, []);

  
  return (
    <div>
      <h1>Reservations</h1>
      {error && <p>Error: {error}</p>} {/* Display error if any */}

      {reservations.length === 0 ? (
        <div>
          <p>No reservations available.</p>
        </div>
      ) : (
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation.id}>
              <strong>{reservation.laptop}</strong> - {reservation.user}
              <div>
                <ViewButton reservationId={reservation.id} />
                <EditButton reservationId={reservation.id} />
                <DeleteButton reservationId={reservation.id} />
              </div>
            </li>
          ))}
        </ul>
      )}
      <Link to="reservations/create">Create a new reservation</Link> {/* Link to the CreateReservation component */}
    </div>
  );
};

export default ReservationsList;
