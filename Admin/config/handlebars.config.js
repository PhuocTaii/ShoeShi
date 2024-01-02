const express_handlebars  = require('express-handlebars');
const path = require('path')

const hbs = express_handlebars.create({
  extname: '.hbs',
  layoutsDir: path.join(__dirname, '../views', 'layout'),
  helpers: {
    
  }
});

module.exports = hbs;