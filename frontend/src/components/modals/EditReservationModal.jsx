import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

const EditReservationModal = ({ isOpen, onRequestClose, reservation, onSave }) => {
  const [formData, setFormData] = useState(reservation || {});

  useEffect(() => {
    setFormData(reservation || {});
  }, [reservation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onRequestClose();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Reservation"
      className='modal'
    >
      <h2>Edit Reservation</h2>
      {reservation ? (
        <form>
          <label>Laptop:</label>
          <input
            type="text"
            name="laptop"
            value={formData.laptop}
            onChange={handleChange}
          />
          {/* Add other fields here */}
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={onRequestClose}>Cancel</button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </ReactModal>
  );
};

export default EditReservationModal;
