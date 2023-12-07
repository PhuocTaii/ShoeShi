$(document).ready(function () {
    $('#filter-form').submit(function (event) {
      event.preventDefault()
      const formData = $(this).serialize()
      $.ajax({
        type: 'GET',
        url: '/products',
        data: formData,
        dataType: 'json',
        success: function (data) {
          window.history.pushState({"html":data.html},"", '/products'+ '?' + formData);
          updateProduct(data.products)
          updatePagination(data.totalPages, data.activePage)
        },
        error: function (error) {
          // alert("Can's find")
        },
      })
    })
})

function sortProducts(){
  var sortElement = "sort=" + document.getElementById('sort-products').value;
  
  console.log(sortElement);
  $.ajax({
    type: 'GET',
    url: '/products',
    data: sortElement,
    dataType: 'json',
    success: function (data) {
      window.history.pushState({"html":data.html},"", '/products'+ '?' + sortElement);
      updateProduct(data.products)
      updatePagination(data.totalPages, data.activePage)
    },
    error: function (error) {
      // alert("Can's find")
    },
  })
}