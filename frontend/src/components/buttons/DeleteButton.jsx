// DeleteButton.jsx
import { useNavigate } from 'react-router-dom';


const DeleteButton = ({ reservationId }) => {
    const handleDelete = async () => {
        const isConfirmed = window.confirm(`WARNING: You are about to cancel this reservation. Are you sure?`);

        if (isConfirmed) {
            try {
                const response = await fetch(`http://localhost:3000/reservations/${reservationId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // handle successful delete
                    alert('Reservation deleted');

                    // reload page
                    window.location.reload();

                } else {
                    alert('Error deleting reservation.');
                }
            } catch (error) {
                console.error('Error deleting reservation:', error);
            }
        }

    };

    return (<button onClick={handleDelete}>Cancel</button>);
};

export default DeleteButton;