const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRouter');

const cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('common'));
app.use(cookieParser());
// app.use(express.static('images'));

dotenv.config();

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Cannot connect to MongoDB ' + error);
  });

//ROUTES
app.use('/api/user', userRouter);

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});