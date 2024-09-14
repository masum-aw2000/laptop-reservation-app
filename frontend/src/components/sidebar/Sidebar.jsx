// main component for sidebar
import Tab from "./Tab";
import styles from './SidebarStyles.module.css';

const Sidebar = () => {
    return (
        <div className={`${styles.sidebarContent}`}>
        <div className='logo'>ResrvIt</div>
        <div>
            {/* content goes here */}
                <Tab
                    tabName='My Reservations'
                    tabLink='/'
                />
                <Tab
                    tabName='New Reservation'
                    tabLink='/reservations/create'
                />
            </div>
        </div>
    );
};
export default Sidebar;