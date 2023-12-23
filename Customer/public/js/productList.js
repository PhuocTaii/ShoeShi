// UPDATE FILTER AND SORT WHEN LOADING PAGE
function getUrlParams() {
	const searchParams = new URLSearchParams(window.location.search);
	const params = {};

	for (const [key, value] of searchParams) {
		if (params[key]) {
			if (Array.isArray(params[key])) {
					params[key].push(value);
			} else {
					params[key] = [params[key], value];
			}
		} else {
			params[key] = value;
		}
	}

	return params;
}

const urlParams = getUrlParams();

const filterForm = document.getElementById('filter-form')
filterForm['product-name'].value = urlParams['product-name'] || ''
filterForm['from-input'].value = urlParams['from-input'] || 100000
filterForm['to-input'].value = urlParams['to-input'] || 9000000
controlFromInput(fromSlider, fromInput, toInput, toSlider)
controlToInput(toSlider, fromInput, toInput, toSlider)
const categoryCheckboxes = document.querySelectorAll('#filter-form input[name="category"]');
categoryCheckboxes.forEach(checkbox => {
		checkbox.checked = urlParams['category'] && urlParams['category'].includes(checkbox.value);
});
const manufacturerCheckboxes = document.querySelectorAll('#filter-form input[name="manufacturer"]');
manufacturerCheckboxes.forEach(checkbox => {
		checkbox.checked = urlParams['manufacturer'] && urlParams['manufacturer'].includes(checkbox.value);
});
const sortOptionSelected = urlParams['sort'] || 'none'
const sortOptions = document.querySelector(`#sort-products option[value="${sortOptionSelected}"]`)
sortOptions.selected = true

// PRODUCT CATALOG
const productsTemplate = 
`
{{#if totalPages}}

<div class='product-list row row-cols-1 row-cols-md-3 row-cols-lg-4 g-2'>
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
</div>

{{else}}
<p class='no-products'>No products found</p>
{{/if}}
`
const productsTemplateFunction = Handlebars.compile(productsTemplate);

function updateProductListView(data) {
	document.getElementById("product-container").innerHTML = productsTemplateFunction(data);
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