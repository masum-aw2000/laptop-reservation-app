// back button to dashboard

import { useNavigate } from "react-router-dom";


const Back = ({destination, text}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(destination);
    }

    return(
        <button onClick={handleClick}>{text}</button>
    )

}

export default Back;