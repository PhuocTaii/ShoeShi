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
	return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
});