require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
const path = require('path');

const userRoutes = require('./server/routes/userRoutes');
const incomesRoutes = require('./routes/incomes')
const routesAtemp = require('./routes/EmployeeRouter')
const routesEmployee = require('./routes/EmployeeRouter')
const routesEmployeeLeave = require('./routes/EmployeeLeaveRouter')
const routesEmployeeAttendance = require('./routes/EmployeeAttendanceRouter')
const supplierRoutes = require('./routes/supplierRoutes')

const cors = require("cors")

const app = express();
app.use(cors())
app.use(bodyParser.json());

//global middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.path}`);
  next();
});

// Serve uploaded profile photos statically
app.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads')));

//routes
app.use('/api/users', userRoutes);
app.use('/api/supplier', supplierRoutes)
app.use('/api/incomes', incomesRoutes)
app.use('/api/employees', routesAtemp);
app.use('/api/employees/leave', routesEmployeeLeave);
app.use('/api/employees/delete', routesEmployee);
app.use('/api/employees/attendance', routesEmployeeAttendance);
app.use('/uploads', express.static('public/uploads'))

// Handling unmatched routes or methods
app.use((req, res, next) => {
  res.status(404).send('Route does not exist');
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  const status = error.status || 500;
  res.status(status).json({ error: error.message || 'Internal Server Error' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server once connected to MongoDB
    const port = process.env.PORT || 4000; // Using PORT from environment variables if available
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });