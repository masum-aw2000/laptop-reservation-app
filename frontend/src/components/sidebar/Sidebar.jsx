// main component for sidebar
import Tab from "./Tab";
import styles from './SidebarStyles.module.css';

const Sidebar = () => {
    return (
        <div className={`${styles.sidebarContent}`}>
            {/* content goes here */}
            <div>
                <Tab
                    tabName='Dashboard'
                    tabLink='/'
                />

                <Tab
                    tabName='My Reservations'
                    tabLink='/'
                />
            </div>
        </div>
    );
};
export default Sidebar;