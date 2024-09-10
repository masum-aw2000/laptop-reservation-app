// import necessary modules 
import express from 'express'; // express framework for creating the server
import { readFile, writeFile } from 'fs/promises'; // file system methods with promises support
import path from 'path'; // utility to handle and transform file paths
import { fileURLToPath } from 'url'; // converts module URLs to file paths
import { v4 as uuidv4} from 'uuid';
import cors from 'cors';


const app = express(); // create and Express applicatoin instance
app.use(cors()); // enable cross origin resource sharing across all routes
app.use(express.json()); // middleware to parse JSON bodies in requests

// Helper to get the directory name (since __dirname is not available in ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// define the path to the JSON file that stores reservations
const filePath = path.join(__dirname, 'data', 'reservations.json');

/**
 * Helper func to resd and parse the reservations JSON file
 * @returns {Promise<Array>} The list of reservations from the file
 */
const readReservationsFile = async () => {
    const data = await readFile(filePath, 'utf8'); // read file content
    return JSON.parse(data); // parse and return JSON data
};

/**
 * Helper function to write data to the reservations JSON file.
 * @param {Array} reservations - The updated list of reservations to write.
 * @returns {Promise<Void>}
 */
const writeReservationsFile = async (reservations) => {
    await writeFile(filePath, JSON.stringify(reservations, null, 2)); // write JSON data back to file with pretty-printing
};
// ---------- CRUD OPERATIONS BELOW ----------

// 1. Read (GET): Fetch all reservations
app.get('/reservations', async (req, res) => {
    try {
        const reservations = await readReservationsFile(); // Get all reservations
        res.json(reservations); // Send reservations as JSON response
    } catch (err) {
        res.status(500).json({ message: 'Error fetching reservations', error: err }); // Error handling
    }
});

// 1.1 Read (GET): Fetch a reservation by ID
app.get('/reservations/:id', async (req,res) => {
    const {id} = req.params;
    try {
        const reservations = await readReservationsFile(); // get all reservations
        const reservation = reservations.find(r => r.id === id);

        if(reservation){
            res.json(reservation); // send single reservation as JSON response
        } else {
            res.status(404).json({ message: 'Reservation not found'});
        }
    } catch (err) {
        res.status(500).json({message: 'Error fetching reservation.', error: err});
    };
});

// 2. Create (POST): Post a reservation
app.post('/reservations', async (req, res) => {
    try {
        console.log('Incoming request body:', req.body); // Debug logging
        const reservations = await readReservationsFile(); // Read current reservations from file

        // Create a new reservation from the request body and assign a new id
        const newReservation = { ...req.body, id: uuidv4() };

        reservations.push(newReservation); // Add new reservation to the list

        await writeReservationsFile(reservations); // Write the updated list to file

        res.status(201).json({ message: 'Reservation added.', reservation: newReservation }); // Respond with success message
    } catch (err) {
        console.error('Error adding reservation:', err); // Debug logging
        res.status(500).json({ message: 'Error adding reservation', error: err }); // Error handling
    }
});



// 3. Update (PUT): Update an existing reservation by id
app.put('/reservations/:id', async (req, res) => {
  const {id} = req.params;
    try {
      const reservations = await readReservationsFile(); // Read current reservations from file
      const reservationIndex = reservations.findIndex(r => r.id === id); // Find the reservation index by id
  
      if (reservationIndex === -1) {
        return res.status(404).json({ message: 'Reservation not found' }); // If reservation doesn't exist, send 404
      }
  
      // Update the reservation data by merging the old reservation with new data
      reservations[reservationIndex] = { ...reservations[reservationIndex], ...req.body };
  
      await writeReservationsFile(reservations); // Write updated reservations back to file
  
      res.json({ message: 'Reservation updated', reservation: reservations[reservationIndex] }); // Respond with success message
    } catch (err) {
      res.status(500).json({ message: 'Error updating reservation', error: err }); // Error handling
    }
  });

  // 4. Delete (DELETE): Remove a reservation by id
app.delete('/reservations/:id', async (req, res) => {
    const {id} = req.params;
    try {
      const reservations = await readReservationsFile(); // Read current reservations from file
      const updatedReservations = reservations.filter(r => r.id !== id); // Filter out the reservation with the matching id
  
      if (reservations.length === updatedReservations.length) {
        return res.status(404).json({ message: 'Reservation not found' }); // If no reservation was removed, send 404
      }
  
      await writeReservationsFile(updatedReservations); // Write updated reservations back to file
  
      res.json({ message: 'Reservation deleted' }); // Respond with success message
    } catch (err) {
      res.status(500).json({ message: 'Error deleting reservation', error: err }); // Error handling
    }
  });
  
  // Start the server on port 3000
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000'); // Log when server is running
  });