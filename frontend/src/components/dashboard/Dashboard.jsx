import ReservationsList from "../ReservationsList";
import styles from './Dashboard.module.css';

const Dashboard = () => {
    return (
        <div className={`${styles.dashboard}`}>
            <aside className={`${styles.sidebar}`}>
            </aside>
            <main className={`${styles.content}`}>
                <div className="container">
                <ReservationsList />
                    
                </div>
            </main>
        </div>
    )
}

export default Dashboard;