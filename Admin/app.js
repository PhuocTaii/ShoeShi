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
// var bodyParser = require('body-parser');
// const morgan = require('morgan');

//Cloudinary config
const cloudinary = require('./config/cloudinary.config')


//ADMIN routes
const indexAdminRouter = require('./routes/indexRouter')
const authAdminRouter = require('./routes/authRouter')
const categoryAdminRouter = require('./routes/categoryRouter')
const colorAdminRouter = require('./routes/colorRouter')
const manufacturerAdminRouter = require('./routes/manufacturerRouter')
const orderAdminRouter = require('./routes/orderRouter')
const productAdminRouter = require('./routes/productRouter')
const sizeAdminRouter = require('./routes/sizeRouter')
const userAdminRouter = require('./routes/userRouter')


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

app.use('/', indexAdminRouter)
app.use('/', authAdminRouter)
app.use('/category', categoryAdminRouter)
app.use('/color', colorAdminRouter)
app.use('/manufacturer', manufacturerAdminRouter)
app.use('/order', orderAdminRouter)
app.use('/product', productAdminRouter)
app.use('/size', sizeAdminRouter)
app.use('/user', userAdminRouter)

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
