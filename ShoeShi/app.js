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

// var bodyParser = require('body-parser');
// const morgan = require('morgan');

//Cloudinary config
const cloudinary = require('./config/cloudinary.config')


// // Website routes
// const indexWebRouter = require('./routes/websiteRoutes/indexRouter')
// const authWebRouter = require('./routes/websiteRoutes/authRouter')
// const productWebRouter = require('./routes/websiteRoutes/productRouter')
// const cartWebRouter = require('./routes/websiteRoutes/cartRouter')
// const userWebRouter = require('./routes/websiteRoutes/userRouter')
// const categoryWebRouter = require('./routes/websiteRoutes/categoryRouter')
// const profileWebRouter = require('./routes/websiteRoutes/profileRouter')
// const orderWebRouter = require('./routes/websiteRoutes/orderRouter')

// // API routes
// const userApiRouter = require('./routes/apiRoutes/userRouter')
// const productApiRouter = require('./routes/apiRoutes/productRouter')
// const cartApiRouter = require('./routes/apiRoutes/cartRouter')
// const categoryApiRouter = require('./routes/apiRoutes/categoryRouter')
// const sizeApiRouter = require('./routes/apiRoutes/sizeRouter')
// const orderApiRouter = require('./routes/apiRoutes/orderRouter')
// const manufacturerApiRouter = require('./routes/apiRoutes/manufacturerRouter')
// const colorApiRouter = require('./routes/apiRoutes/colorRouter')
// const authApiRouter = require('./routes/apiRoutes/authRouter')

//ADMIN routes
const indexAdminRouter = require('./routes/adminRoutes/indexRouter')
const authAdminRouter = require('./routes/adminRoutes/authRouter')
const categoryAdminRouter = require('./routes/adminRoutes/categoryRouter')
const colorAdminRouter = require('./routes/adminRoutes/colorRouter')
const manufacturerAdminRouter = require('./routes/adminRoutes/manufacturerRouter')
const orderAdminRouter = require('./routes/adminRoutes/orderRouter')
const productAdminRouter = require('./routes/adminRoutes/productRouter')
const sizeAdminRouter = require('./routes/adminRoutes/sizeRouter')
const userAdminRouter = require('./routes/adminRoutes/userRouter')

//CUSTOMER routes
const indexCustomerRouter = require('./routes/customerRoutes/indexRouter')
const authCustomerRouter = require('./routes/customerRoutes/authRouter')
const cartCustomerRouter = require('./routes/customerRoutes/cartRouter')
const orderCustomerRouter = require('./routes/customerRoutes/orderRouter')
const productCustomerRouter = require('./routes/customerRoutes/productRouter')
const userCustomerRouter = require('./routes/customerRoutes/userRouter')

const app = express()
const store = session.MemoryStore()

dotenv.config()

console.log(cloudinary.config())
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Cannot connect to MongoDB ' + error)
  })

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
// app.set('view options', { layout: 'layout/main' });

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

app.use(
  '/',
  indexCustomerRouter,
  authCustomerRouter,
  cartCustomerRouter,
  orderCustomerRouter,
  productCustomerRouter,
  userCustomerRouter
)

app.use(
  '/admin',
  indexAdminRouter,
  authAdminRouter,
  categoryAdminRouter,
  colorAdminRouter,
  manufacturerAdminRouter,
  orderAdminRouter,
  productAdminRouter,
  sizeAdminRouter,
  userAdminRouter
)

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
