const createError = require('http-errors')
const express = require('express')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const passport = require('passport')
const session = require('express-session')
const exphbs = require('./config/handlebars.config')
const express_handlebars_sections = require('express-handlebars-sections');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// var bodyParser = require('body-parser');
// const morgan = require('morgan');

//Cloudinary config
const cloudinary = require('./config/cloudinary.config')

// const upload = multer({ storage: storage });


//CUSTOMER routes
const indexCustomerRouter = require('./routes/indexRouter')
const authCustomerRouter = require('./routes/authRouter')
const cartCustomerRouter = require('./routes/cartRouter')
const checkoutCustomerRouter = require('./routes/checkoutRouter')
const productCustomerRouter = require('./routes/productRouter')
const userCustomerRouter = require('./routes/userRouter')
const reviewCustomerRouter = require('./routes/reviewRouter')
const orderCustomerRouter = require('./routes/orderRouter')
// const checkoutCustomerRouter = require('./routes/checkoutRouter')

const app = express()
const store = session.MemoryStore()

dotenv.config()

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Cannot connect to MongoDB ' + error)
  })

// view engine setup
express_handlebars_sections(exphbs);
app.engine('hbs', exphbs.engine);
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

// app.use(bodyParser.json());
// app.use(morgan('common'));
app.use(cors())
app.use(cookieParser())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.secret_key,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
    store,
  })
)


app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexCustomerRouter)
app.use('/', authCustomerRouter)
app.use('/product', productCustomerRouter)
app.use('/cart', cartCustomerRouter)
app.use('/profile', userCustomerRouter)
app.use('/review', reviewCustomerRouter)
app.use('/checkout', checkoutCustomerRouter)
app.use('/order', orderCustomerRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})




module.exports = app
