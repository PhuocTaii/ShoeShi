function paging(page) {
	// var searchQuery = window.location.search
	// if(searchQuery == '') {
	// 	searchQuery = '?page=' + page
	// }
	// else {
	// 	searchQuery = searchQuery.split('?')[1]
	// 	searchParams = searchQuery.split('&')
	// 	console.log(searchParams)
	// 	searchParams = searchParams.filter(param => param.split('=')[0] != 'page')
	// 	searchQuery = searchParams.join('&')
	// 	console.log(searchQuery)
	// }

	const url = '/products'+ '?page=' + page
	$.ajax({
		url: url,
		type: 'GET',
		dataType: 'json',
		success: function(data) {
			window.history.pushState({"html":data.html},"", url);
			updateProduct(data.products)
			updatePagination(data.totalPages, data.activePage)
		},
		error: function(err) {
			console.log(err)
		}
	})
}

function updateProduct(products) {
	const productsContainer = document.getElementById('product-list')
	productsContainer.innerHTML = ''
	products.forEach(prod => {
		productsContainer.innerHTML +=
		`
		<div class='col'>
			<div class='product mx-1 my-2'>
				<img class='product-img' src='/assets/img/product.png' />
				<div class='product-details'>
					<p class='product-name'>${prod.name}</p>
					<p class='product-branch'>${prod.manufacturer}</p>
					<p class='product-price'>${prod.price} ₫</p>
				</div>
			</div>
		</div>
		`
	});
}

function updatePagination(totalPages, activePage) {
	const listNumPages = document.getElementById('product-pagination')
	listNumPages.innerHTML = 
	`
	<li class="page-item ${activePage==1 ? 'disabled':''}">
		<a class="page-link" aria-label="Previous" onclick="paging(${activePage-1})">
			<span aria-hidden="true">&laquo;</span>
		</a>
	</li>
	`

	for(var i = 1; i <= totalPages; i++) {
		listNumPages.innerHTML += 
		`<li class="page-item ${i==activePage ? 'active':''}"><a class="page-link" onclick="paging(${i})">${i}</a></li>`
	}

	listNumPages.innerHTML += 
	`
	<li class="page-item ${activePage==totalPages ? 'disabled':''}">
		<a class="page-link" aria-label="Next" onclick="paging(${activePage+1})">
			<span aria-hidden="true">&raquo;</span>
		</a>
	</li>
	`
}

updatePagination(parseInt(document.currentScript.getAttribute('data-total-pages'), 10), parseInt(document.currentScript.getAttribute('data-active-page'), 10))