// PRODUCT CATALOG
const productsTemplate = 
`
{{#each products}}
<div class='col'>
	<a class='product mx-1 my-2' href='/product/{{_id}}'>
		<img class='product-img' src={{productImage.[0]}} />
		<div class='product-details'>
			<p class='product-name'>{{name}}</p>
			<p class='product-brand'>{{manufacturer.name}}</p>
			<p class='product-price'>{{formatPrice price}} ₫</p>
		</div>
	</a>
</div>
{{/each}}
`
const productsTemplateFunction = Handlebars.compile(productsTemplate);

function updateProductListView(data) {
	document.getElementById("product-list").innerHTML = productsTemplateFunction(data);
	document.getElementById("product-pagination").innerHTML = paginationTemplateFunction(data);
}

$.getJSON(window.location.href, function( data ) {
	updateProductListView(data)
});
function paging(page) {
	const url = window.location.href
	$.getJSON(url+`&page=${page}`, function( data ) {
		updateProductListView(data)
	});
}

// FILTER
function getQueryString() {
	const filter = $('#filter-form').serialize()
	const sortVal = document.getElementById('sort-products').value
	const sort = (sortVal!=='none') ? 'sort=' + document.getElementById('sort-products').value : ''
	return sort!=='' ? filter+'&'+sort : filter
}

function handleQuery(event) {
	event.preventDefault()
	const query = getQueryString()
	$.getJSON('/product?'+query, function( data ) {
		window.history.pushState({"html":data.html},"", '/product?'+query);
		updateProductListView(data)
	});
}