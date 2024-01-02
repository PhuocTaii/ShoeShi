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
document.getElementById('products-filter-name').value = urlParams['product-name'] || ''
const categoryCheckboxes = document.querySelectorAll('#filter-form input[name="category"]');
categoryCheckboxes.forEach(checkbox => {
		checkbox.checked = urlParams['category'] && urlParams['category'].includes(checkbox.value);
});
const manufacturerCheckboxes = document.querySelectorAll('#filter-form input[name="manufacturer"]');
manufacturerCheckboxes.forEach(checkbox => {
		checkbox.checked = urlParams['manufacturer'] && urlParams['manufacturer'].includes(checkbox.value);
});
const sortOptionSelected = urlParams['sort'] || 'none'
const sortOptions = document.querySelector(`#product-sort option[value="${sortOptionSelected}"]`)
sortOptions.selected = true

// PRODUCT TABLE
const productsTemplate = 
`
{{#each products}}
<tr id={{_id}}>
  <td>{{name}}</td>
  <td>{{joinArrObj category 'name'}}</td>
  <td>{{manufacturer.name}}</td>
  <td>{{formatDate creationDate}}</td>
  <td>{{formatPrice price}}</td>
  <td>{{quantity}}</td>
  <td>{{totalPurchase}}</td>
  <td>{{status}}</td>
  <td>
    <button class='edit-btn' onclick="toggleUpdateProduct({{_id}})"><i class='ri-pencil-line'></i></button>
    <button class='delete-btn' onclick="toggleDeleteProduct({{_id}})">
      <i class='ri-delete-bin-6-line'></i>
    </button>
  </td>
</tr>
{{/each}}
`
const productsTemplateFunction = Handlebars.compile(productsTemplate);

function updateProductListView(data) {
	document.getElementById("table-products").innerHTML = productsTemplateFunction(data);
	document.getElementById("product-pagination").innerHTML = paginationTemplateFunction(data);
}

$.getJSON(window.location.href, function( data ) {
	updateProductListView(data)
});

function paging(page) {
  const url = new URL(window.location.href);
  const query = url.search;
  if(query.length > 0) {
    url.searchParams.set('page', page);
  }
  else {
    url.search = `?page=${page}`;
  }
  $.getJSON(url.href, function( data ) {
		window.history.pushState({"data":data},"", url.href);
		updateProductListView(data)
	});
}

// FILTER
function getQueryString() {
	const filter = $('#filter-form').serialize()
  const url = new URL(window.location.href);
  url.search = `?${filter}`;

	const nameVal = document.getElementById('products-filter-name').value
  if(nameVal!=='')
    url.searchParams.set('product-name', nameVal);
  
	const sortVal = document.getElementById('product-sort').value
  if(sortVal!=='none')
    url.searchParams.set('sort', sortVal);

  return url.search
}

function handleQuery(event) {
	event.preventDefault()
	const query = getQueryString()
	$.getJSON('/product'+query, function( data ) {
		window.history.pushState({"data":data},"", '/product'+query);
		updateProductListView(data)
	});
}

// MANAGE PRODUCT

// ITEM IN LIST TEMPLATE
const selectedListTemplate =
`
<li id='{{infoType}}-{{id}}'>
  <p>{{name}}</p>
  <button class='remove-icon' onclick="removeSelectedItem('{{infoType}}', '{{id}}')">
    <i class='ri-subtract-line'>
    </i>
</li>
`
const selectedListTemplateFunction = Handlebars.compile(selectedListTemplate);

const info = {
  photos: [],
  cates: [],
  colors: [],
  sizes: [],
}

function toggleAddProduct() {
  info.photos.splice(0, info.photos.length)
  info.cates.splice(0, info.cates.length)
  info.colors.splice(0, info.colors.length)
  info.sizes.splice(0, info.sizes.length)

  document.querySelector(".chosen-list.cates").innerHTML = ''
  document.querySelector(".chosen-list.colors").innerHTML = ''
  document.querySelector(".chosen-list.sizes").innerHTML = ''
  document.getElementById('photos-container').innerHTML = ''

  document.querySelector('#name-product').value = ''
  document.querySelector('#price-product').value = ''
  document.querySelector('#manufacturer-product').value = document.querySelector('#manufacturer-product option:first-child').value
  document.querySelector('#status-product').value = document.querySelector('#status-product option:first-child').value
  document.querySelector('#quant-product').value = ''

  $('#modal-manage-product').modal('toggle')
  document.getElementById('action-product').innerHTML = `Add new product`
}

function toggleUpdateProduct(id) {
  // get product info

  // set product info to modal

  // open modal
  $('#modal-manage-product').modal('toggle')
  document.getElementById('action-product').innerHTML = `Update product`
}

function toggleDeleteProduct(id) {
  $('#modal-delete-product').modal('toggle')
}

function addSelectedItem(event, infoType) {
    const selectedId = event.target.value
    const selectedValue = event.target.options[event.target.selectedIndex].text

    if(!info[infoType].includes(selectedId)) {
      // push to array
      info[infoType].push(selectedId)
      // show chosen list
      const list = document.querySelector(".chosen-list." + infoType)
      list.insertAdjacentHTML('beforeend', selectedListTemplateFunction({id: selectedId, name: selectedValue, infoType: infoType}))
    }
    event.target.selectedIndex = 0
}

function removeSelectedItem(infoType, selectedId) {
  // remove from array
  info[infoType] = info[infoType].filter(item => item !== selectedId)

  const item = document.querySelector(".chosen-list." + infoType + " li[id='" + infoType + "-" + selectedId + "']")
  item.remove()
}

// onclick="removeSelectedPhoto('${photo}')"

const photoTemplate = 
`
<div class='photo-frame photo-{{index}}'>
  <img src='{{url}}' alt='photo-product'>
  <button class='remove-icon' onclick='removeSelectedPhoto({{index}})'>
    <i class='ri-subtract-line'>
    </i>
  </button>
</div>
`
const photoTemplateFunction = Handlebars.compile(photoTemplate);

function addSelectedPhoto(event) {
  const selectedFile = event.target.files[0]
  if(selectedFile) {
    // push to array
    info['photos'].push(selectedFile)
    // show to chosen list
    const url = URL.createObjectURL(selectedFile)
    const list = document.getElementById('photos-container')
    list.insertAdjacentHTML('beforeend', photoTemplateFunction({index: info['photos'].length - 1, url: url}))
  }
}

function removeSelectedPhoto(idx) {
  // remove from array
  info['photos'].splice(idx, 1);

  // show to chosen list
  const item = document.querySelector("#photos-container .photo-frame.photo-" + idx)
  item.remove()
}


function handleSaveProduct(event) {
  event.preventDefault()

  // get product info
  info['name'] = document.querySelector('#name-product').value
  info['price'] = document.querySelector('#price-product').value
  info['manufacturer'] = document.querySelector('#manufacturer-product').value
  info['status'] = document.querySelector('#status-product').value
  info['quantity'] = document.querySelector('#quant-product').value

  $.ajax({
    type: "POST", 
    url: "/product",
    data: {...info,
      cates: JSON.stringify(info.cates),
      colors: JSON.stringify(info.colors),
      sizes: JSON.stringify(info.sizes),
      photos: JSON.stringify(info.photos)},
    success: function (response) {
      handleQuery(event)

      document.getElementById('toast-noti-product').innerHTML = toastTemplateFunction({
        title: 'Add product',
        message: 'Add product successfully',
        success: true,
      });
      // Trigger toast
      const toastElement = document.querySelector('.toast');
      const toast = bootstrap.Toast.getOrCreateInstance(toastElement);
      toast.show();

      // close modal
      $('#modal-manage-product').modal('toggle')
    },
    error: function (xhr) {
      document.getElementById('toast-noti-product').innerHTML = toastTemplateFunction({
        title: 'Add product',
        message: 'Add product failed! System error. Please try again!',
        success: false,
      });
      // Trigger toast
      const toastElement = document.querySelector('.toast');
      const toast = bootstrap.Toast.getOrCreateInstance(toastElement);
      toast.show();
    }
  });
}