Handlebars.registerHelper("disabledPage", function(i, activePage) {
	return i == activePage ? 'disabled' : '';
});
Handlebars.registerHelper("activeCurrentPage", function(i, activePage) {
	return i == activePage ? 'active':'';
});
Handlebars.registerHelper("loopTill", function(num, options) {
	var result = '';
  for (var i = 1; i <= num; i++) {
    result += options.fn({...this, index: i});
  }
  return result;
});
Handlebars.registerHelper("add", function(a, b) {
	return a + b;
});
Handlebars.registerHelper("lessThanOrEqual", function(a, b) {
	return a <= b;
});
Handlebars.registerHelper("formatPrice", function(price) {
	return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
});
Handlebars.registerHelper("joinArrObj", function(array, attribute) {
	const newArr = array.map(item => item[attribute])
	return newArr.join(', ')
});
Handlebars.registerHelper("formatDate", function(date) {
	return new Date(date).toLocaleString('en-GB');
});

Handlebars.registerHelper('decrement', function(value) { return value - 1; }),

Handlebars.registerHelper('increment', function(value) { return value + 1; }),

Handlebars.registerHelper('eq', function(a, b) { return a === b; }),

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
	return arg1 == arg2 ? options.fn(this) : options.inverse(this)
})