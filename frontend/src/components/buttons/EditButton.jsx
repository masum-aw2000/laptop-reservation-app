// EditButton.jsx

import {useNavigate} from 'react-router-dom';

const EditButton = ({reservationId}) =>{
    const navigate = useNavigate();

    const handleView = () => {
        navigate(`reservations/edit/${reservationId}`);
    };

    return (
        <button onClick={handleView}>Edit</button>
    )
};

export default EditButton;