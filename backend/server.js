const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./midleware/errorMidleware.js');
const connectDB = require('./config/db.js');
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
