// format currency
const productPrice = document.getElementById('main-product-detail').querySelector('.product-price span');
const price = productPrice.getAttribute('data-price');
productPrice.innerHTML = formatCurrency(price);

function paging(page) {
	$.ajax({
		url: window.location.href + '?page=' + page,
		type: 'GET',
		dataType: 'json',
		success: function(data) {
			updateReview(data.details.review)
			updatePagination(data.totalPages, data.activePage)
		},
		error: function(err) {
			console.log(err)
		}
	})
}

function updateReview(reviews) {
    const reviewContainer = document.getElementById('review-page')
    reviewContainer.innerHTML = ''
    reviews.forEach(review => {
			reviewContainer.innerHTML +=
        `
				<div id=${review._id} class='r-review' data-rating=${review.rating}>
					<p class='r-topic'>${review.title}</p>
					<div class='r-rating'>
						<span class='rating-star'>&#9733</span>
						<span class='rating-star'>&#9733</span>
						<span class='rating-star'>&#9733</span>
						<span class='rating-star'>&#9733</span>
						<span class='rating-star'>&#9733</span>
					</div>
					<p class='r-content'>${review.content}</p>
					<p class='r-reviewer'>${review.reviewer} | ${review.reviewTime}</p>
				</div>
        `

			updateRatingReview(review._id, review.rating)
    })
}

function updateRatingReview(id, rating) {
	const star = document.getElementById(id).querySelectorAll('.r-rating span.rating-star')
	for (let i = 0; i < rating; i++) {
		star[i].style.color = '#000'
	}
}

// show rating stars
const allReviews = document.getElementById('review-page').querySelectorAll('.r-review')
allReviews.forEach(review => {
	const id = review.getAttribute('id')
	const rating = review.getAttribute('data-rating')
	updateRatingReview(id, rating)
})


function updatePagination(totalPages, activePage) {
	const listNumPages = document.getElementById('review-pagination')
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

updatePagination(parseInt(document.getElementById('review-pagination').getAttribute('data-total-pages'), 10), parseInt(document.getElementById('review-pagination').getAttribute('data-active-page'), 10))

