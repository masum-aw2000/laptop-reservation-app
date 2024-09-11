/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateReservation from './components/CreateReservation.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx';
import ReservationDetails from './components/ReservationDetails.jsx';
import EditReservation from './components/EditReservation.jsx';
import './components/styles/globals.css';

function App() {

  return (
    <div className='dashboard'>

      <Router>
        <div className='sidebarContainer'>
          <Sidebar />
        </div>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/reservations/view/:id' element={<ReservationDetails />} />
          <Route path='/reservations/create' element={<CreateReservation />} />
          <Route path='/reservations/edit/:id' element={<EditReservation />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
