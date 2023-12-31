const express_handlebars  = require('express-handlebars');
const path = require('path')

const hbs = express_handlebars.create({
  extname: '.hbs',
  layoutsDir: path.join(__dirname, '../views', 'layout'),
  helpers: {
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
    },
    decrement: function(value) { return value - 1; },
    increment: function(value) { return value + 1; },
    eq: function(a, b) { return a === b; },
    ifEquals(arg1, arg2, options) {
      return arg1 == arg2 ? options.fn(this) : options.inverse(this)
    },
    formatDateTime(dateString) {
      const date = new Date(dateString)

      const formattedDate = date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      })

      const formattedTime = date.toLocaleTimeString('vi-VN', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      })

      return `${formattedDate} | ${formattedTime}`
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
      const month = pad(date.getMonth() + 1)
      const day = pad(date.getDate())

      return `${year}-${month}-${day}`
    },

    joinArrObj(array, attribute) {
      const newArr = array.map(item => item[attribute])
      return newArr.join(', ')
    },

    disabledPage(i, activePage) {
      return i == activePage ? 'disabled' : '';
    },

    activeCurrentPage(i, activePage) {
      return i == activePage ? 'active':'';
    },

    loopTill(num, options) {
      var result = '';
      for (var i = 1; i <= num; i++) {
        result += options.fn({...this, index: i});
      }
      return result;
    },

    add(a, b) {
      return a + b;
    },
  }
});

module.exports = hbs;