import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import truncate from 'lodash.truncate';
import ViewButton from './buttons/ViewButton';
import EditButton from './buttons/EditButton';
import DeleteButton from './buttons/DeleteButton';
import Card from './card/Card';
import ViewReservationModal from './modals/ViewReservationModal';
import EditReservationModal from './modals/EditReservationModal';

const ReservationsList = () => {
  const [reservations, setReservations] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    // Fetch reservations and inventory
    const fetchReservations = async () => {
      try {
        const reservationsResponse = await fetch('http://localhost:3000/reservations');
        const reservationsData = await reservationsResponse.json();
        setReservations(reservationsData);

        const inventoryResponse = await fetch('http://localhost:3000/inventory');
        const inventoryData = await inventoryResponse.json();
        setInventory(inventoryData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchReservations();
  }, []);

  // Function to find the corresponding inventory item
  const getInventoryForReservation = (laptopName) => {
    return inventory.find((item) => item.name === laptopName);
  };

  const handleView = (reservation) => {
    setSelectedReservation(reservation);
    setIsViewModalOpen(true);
  };

  const handleEdit = (reservation) => {
    setSelectedReservation(reservation);
    setIsEditModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedReservation(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedReservation(null);
  };

  return (
    <div className='container'>
      <section id='reservations'>
        <h1>Reservations</h1>

        {reservations.length === 0 ? (
          <div>
            <p>No reservations available.</p>
          </div>
        ) : (
          <ul className='reservations-list'>
            {reservations.map((reservation) => {
              const matchingInventory = getInventoryForReservation(reservation.laptop);

              return (
                <li key={reservation.id}>
                  {/* reservation-preview component */}
                  <Card
                    cardTitle={reservation.laptop}
                    cardSubtitle={truncate(reservation.id, { length: 12 })} // lodash truncate function to prevent excessive characters for reservation titles
                    cardImg={matchingInventory?.thumbnail || null}
                    cardOptions={
                      [
                        <ViewButton
                          key={`view-${reservation.id}`}
                          onClick={() => handleView(reservation)}
                        />,
                        <EditButton
                          key={`edit-${reservation.id}`}
                          onClick={() => handleEdit(reservation)}
                        />,
                        <DeleteButton
                          key={`delete-${reservation.id}`}
                          reservationId={reservation.id}
                        />
                      ]
                    }
                  />
                </li>
              );
            })}
          </ul>
        )}
        <Link to="reservations/create">Create a new reservation</Link> {/* Link to the CreateReservation component */}

        {/* Modals for Viewing and Editing */}
        {selectedReservation && (
          <>
            <ViewReservationModal
              isOpen={isViewModalOpen}
              onRequestClose={handleCloseViewModal}
              reservation={selectedReservation}
            />
            <EditReservationModal
              isOpen={isEditModalOpen}
              onRequestClose={handleCloseEditModal}
              reservation={selectedReservation}
            />
          </>
        )}
      </section>
    </div>
  );
};

export default ReservationsList;
