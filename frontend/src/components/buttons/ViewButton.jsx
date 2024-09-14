// ViewButton.jsx

const ViewButton = ({reservationId, onClick}) =>{
    return (
        <button className='primary' onClick={() => onClick(reservationId)}>View</button>
    )
};

export default ViewButton;