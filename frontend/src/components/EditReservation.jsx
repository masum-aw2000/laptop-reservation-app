import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

const EditReservationModal = ({ isOpen, onRequestClose, reservation }) => {
    const [editReservation, setEditReservation] = useState(reservation);
    const [error, setError] = useState(null);

    useEffect(() => {
        setEditReservation(reservation);
    }, [reservation]);

    const handleChange = (e) => {
        setEditReservation({ ...editReservation, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/reservations/${editReservation.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editReservation),
            });

            if (response.ok) {
                onRequestClose(); // Close the modal after successful update
                alert('Reservation updated.');
            } else {
                setError('Error updating reservation.');
            }
        } catch (error) {
            setError('Failed to update reservation.');
        }
    };

    if (error) return <p>{error}</p>;

    return (
        <ReactModal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Edit Reservation">
            <h2>Edit Reservation</h2>
            {editReservation ? (
                <form onSubmit={handleSubmit}>
                    <label>Laptop:</label>
                    <input
                        type='text'
                        name='laptop'
                        value={editReservation.laptop}
                        onChange={handleChange}
                    />
                    <label>Checkout Date:</label>
                    <input
                        type='date'
                        name='checkoutDate'
                        value={editReservation.checkoutDate}
                        onChange={handleChange}
                    />
                    <label>Checkout Time:</label>
                    <input
                        type='time'
                        name='checkoutTime'
                        value={editReservation.checkoutTime}
                        onChange={handleChange}
                    />
                    <label>Return Date:</label>
                    <input
                        type='date'
                        name='returnDate'
                        value={editReservation.returnDate}
                        onChange={handleChange}
                    />
                    <label>Return Time:</label>
                    <input
                        type='time'
                        name='returnTime'
                        value={editReservation.returnTime}
                        onChange={handleChange}
                    />
                    <button type='submit'>Update Reservation</button>
                    <button type='button' onClick={onRequestClose}>Cancel</button>
                </form>
            ) : (
                <p>Loading...</p>
            )}
        </ReactModal>
    );
};

export default EditReservationModal;
