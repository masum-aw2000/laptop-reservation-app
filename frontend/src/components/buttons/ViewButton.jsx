// ViewButton.jsx

import {useNavigate} from 'react-router-dom';

const ViewButton = ({reservationId}) =>{
    const navigate = useNavigate();

    const handleView = () => {
        navigate(`reservations/view/${reservationId}`);
    };

    return (
        <button onClick={handleView}>View</button>
    )
};

export default ViewButton;