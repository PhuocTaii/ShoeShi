// SHOW IMAGES IN CAROUSEL
const carouselIndicators = document.getElementById('carousel-product-image').querySelector('.carousel-indicators button');
carouselIndicators.classList.add('active');
const imageActiveCarousel = document.getElementById('carousel-images').querySelector('.carousel-item');
imageActiveCarousel.classList.add('active');


// PRODUCT-REVIEW
function rate(event) {
  const element = event.currentTarget
  const stars = element.querySelectorAll('span')
  stars.forEach((star, index) => {
    star.addEventListener('mouseenter', () => {
      resetStars(stars)
      highlightStars(stars, index + 1)
    })

    star.addEventListener('mouseleave', () => {
      resetStars(stars)
      const rating = element.getAttribute('data-rating-add')
      if (rating) {
        highlightStars(stars, parseInt(rating))
      }
    })

    star.addEventListener('click', () => {
      const rating = index + 1
      element.setAttribute('data-rating-add', rating)
    })
  })
}
function resetStars(stars) {
  stars.forEach((star) => {
    star.style.color = '#ccc'
  })
}
function highlightStars(stars, count) {
  for (let i = 0; i < count; i++) {
    stars[i].style.color = '#000'
  }
}

const reviewTemplate = 
`
{{#if reviews.length}}
{{#each reviews}}
<div id={{_id}} class='r-review' data-rating={{rating}}>
	<p class='r-topic'>{{title}}</p>
	
	<div class='r-rating'>
		{{#loopTill 5}}
		{{#if (lessThanOrEqual index rating)}}
		<span class='rating-star' style='color: #000'>&#9733</span>
		{{else}}
		<span class='rating-star'>&#9733</span>
		{{/if}}
		{{/loopTill}}
	</div>
	<p class='r-content'>{{content}}</p>
	<p class='r-reviewer'>{{reviewer.name}} | {{reviewTime}}</p>
</div>
{{/each}}
{{else}}
	<p class='no-review'>No review yet</p>
{{/if}}
`

const paginationTemplate = 
`
	{{#if totalPages}}
	<li class="page-item {{disabledPage 1 activePage}}">
		<a class="page-link" aria-label="Previous" onclick="paging({{add activePage -1}})">
			<span aria-hidden="true">&laquo;</span>
		</a>
	</li>

	{{#loopTill totalPages}}
		<li class="page-item {{activeCurrentPage index activePage}}"><a class="page-link" onclick=paging({{index}})>{{index}}</a></li>
	{{/loopTill}}

	<li class="page-item {{disabledPage totalPages activePage}}">
		<a class="page-link" aria-label="Next" onclick="paging({{add activePage 1}})">
			<span aria-hidden="true">&raquo;</span>
		</a>
	</li>
	{{/if}}
`

const templateFunction = Handlebars.compile(reviewTemplate);
const paginationTemplateFunction = Handlebars.compile(paginationTemplate);

const productId = document.getElementById('main-product-detail').getAttribute('data-product-id')
$.getJSON(`/review/${productId}`, function( data ) {
	document.getElementById("review-amount").innerHTML = '('+data.totalReviews+')';
	document.getElementById("review-section").innerHTML = templateFunction(data);
	document.getElementById("review-pagination").innerHTML = paginationTemplateFunction(data);
});

function paging(page) {
	$.getJSON(`/review/${productId}?page=${page}`, function( data ) {
		document.getElementById("review-amount").innerHTML = '('+data.totalReviews+')';
		document.getElementById("review-section").innerHTML = templateFunction(data);
		document.getElementById("review-pagination").innerHTML = paginationTemplateFunction(data);
	});
}

// ADD REVIEW
function sendReview(event) {
	event.preventDefault();

	const form = document.forms['review-form']

	const title = form['title'].value
	const content = form['content'].value
	const rating = document.getElementById('review-form').querySelector('.rating').getAttribute('data-rating-add')

	const data = {
		title,
		content,
		rating,
	}

	const productId = document.getElementById('main-product-detail').getAttribute('data-product-id')

	$.ajax({
		url: `/review/${productId}`,
		type: 'POST',
		data,
		dataType: 'json',
		success: function(data) {
			alert('Review added successfully');
			document.getElementById("review-amount").innerHTML = '('+data.totalReviews+')';
			document.getElementById("review-section").innerHTML = templateFunction(data);
			document.getElementById("review-pagination").innerHTML = paginationTemplateFunction(data);
		},
		error: function(err) {
		}
	})
}

// RELATED PRODUCTS
const relatedProductsTemplate = 
`
	{{#each this}}
	<a class='product col' href="/product/{{_id}}">
		<img class='product-card-img' src={{productImage.[0]}} />
		<div class='product-details'>
			<p class='product-name'>{{name}}</p>
			<p class='product-branch'>{{manufacturer.name}}</p>
			<p class='product-price'>{{formatPrice price}} ₫</p>
		</div>
	</a>
	{{/each}}
`
const relatedProductsTemplateFunction = Handlebars.compile(relatedProductsTemplate);

$.getJSON(`/product/related/${productId}`, function( data ) {
	document.getElementsByClassName("related-product-container")[0].innerHTML = relatedProductsTemplateFunction(data.slice(0, 6));
	document.getElementsByClassName("related-product-container")[1].innerHTML = relatedProductsTemplateFunction(data.slice(6, 12));
});