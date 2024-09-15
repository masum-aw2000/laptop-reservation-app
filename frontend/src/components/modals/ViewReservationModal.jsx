import ReactModal from "react-modal";


const ViewReservationModal = ({ isOpen, onRequestClose, reservation, error }) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="View Reservation"
            className="modal"
        >
            <h2>Reservation Details</h2>
            {error && <p>Error: {error}</p>}
            {reservation ? (
                <div>
                    <p><strong>Item:</strong> {reservation.item}</p>
                    <p><strong>User:</strong> {reservation.user}</p>
                    <p><strong>Checkout Date:</strong> {reservation.checkoutDate}</p>
                    <p><strong>Checkout Time:</strong> {reservation.checkoutTime}</p>
                    <p><strong>Return Date:</strong> {reservation.returnDate}</p>
                    <p><strong>Return Time:</strong> {reservation.returnTime}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </ReactModal>
    )
};

export default ViewReservationModal;