/* eslint-disable no-unused-vars */
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CreateReservation from './components/CreateReservation.jsx';
import ReservationsList from './components/ReservationsList.jsx';
import ReservationDetails from './components/ReservationDetails.jsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<ReservationsList/>}/>
        <Route path='/reservations/:id' element={<ReservationDetails/>}/>
        <Route path='/create' element={<CreateReservation/>}/>
      </Routes>
    </Router>
  )
}

export default App
