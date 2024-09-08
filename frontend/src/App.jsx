/* eslint-disable no-unused-vars */
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CreateReservation from './components/CreateReservation.jsx';
import ReservationsList from './components/ReservationsList.jsx';
import ReservationDetails from './components/ReservationDetails.jsx';
import EditReservation from './components/EditReservation.jsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<ReservationsList/>}/>
        <Route path='/reservations/view/:id' element={<ReservationDetails/>}/>
        <Route path='/reservations/create' element={<CreateReservation/>}/>
        <Route path='/reservations/edit/:id' element={<EditReservation/>}/>
      </Routes>
    </Router>
  )
}

export default App
