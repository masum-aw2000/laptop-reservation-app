// EditButton.jsx
const EditButton = ({reservationId, onClick}) =>{
    return (
        <button className='secondary' onClick={()=> onClick(reservationId)}>Edit</button>
    )
};

export default EditButton;