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
    eq: function(a, b) { return a === b; }
  }
});

module.exports = hbs;