// reusable component to use in the sidebar for tab/navigation
import { useNavigate } from "react-router-dom";
import styles from './SidebarStyles.module.css';

const Tab = ({tabName, tabLink}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(tabLink);
    }
    return(
        <div className={`${styles.tab}`} onClick={handleClick}>
            {tabName}
        </div>
    )
}

export default Tab;