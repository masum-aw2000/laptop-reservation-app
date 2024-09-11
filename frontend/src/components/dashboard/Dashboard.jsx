import ReservationsList from "../ReservationsList";
import styles from './Dashboard.module.css';

const Dashboard = () => {
    return (
        <main className={`${styles.content}`}>
            <div className="container">
                <ReservationsList />
            </div>
        </main>

    )
}

export default Dashboard;