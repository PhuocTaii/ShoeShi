const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const morgan = require('morgan');
// const dotenv = require('dotenv');
const userRouter = require('./routes/userRouter');
// const bookRouter = require('./routes/bookRouter');
// const slipRouter = require('./routes/slipRouter');
// const authRouter = require('./routes/authRouter');
const cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('common'));
app.use(cookieParser());
// app.use(express.static('images'));

// dotenv.config();

mongoose.connect("mongodb+srv://phuoctai1773:asd12345@cluster0.jfpxkuj.mongodb.net/ShoeShi?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Cannot connect to MongoDB ' + error);
  });

//ROUTES
app.use('/api/user', userRouter);
// app.use('/api/book', bookRouter);
// app.use('/api/slip', slipRouter);
// app.use('/api/auth', authRouter);

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});