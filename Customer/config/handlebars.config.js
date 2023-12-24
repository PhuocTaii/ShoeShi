const express_handlebars = require('express-handlebars')
const path = require('path')

const hbs = express_handlebars.create({
  extname: '.hbs',
  // layoutsDir: path.join(__dirname, 'views', 'layout'),
  layoutsDir: path.join(__dirname, '../views', 'layout'),
  helpers: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    ifEquals(arg1, arg2, options) {
      return arg1 == arg2 ? options.fn(this) : options.inverse(this)
    },
    formatDate(date) {
      function pad(number) {
        if (number < 10) {
          return '0' + number
        }
        return number
      }

      if (!date) {
        return ''
      }

      const year = date.getFullYear()
      const month = pad(date.getMonth() + 1) // Months are zero-based
      const day = pad(date.getDate())

      return `${year}-${month}-${day}`
    },
  },
})

module.exports = hbs
