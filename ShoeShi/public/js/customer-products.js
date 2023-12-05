$(document).ready(function () {
    $('#filter-form').submit(function (event) {
      event.preventDefault()
      const formData = $(this).serialize()
      console.log(formData)
      $.ajax({
        type: 'GET',
        url: '/products/filter',
        data: formData,
        success: function (response) {
          console.log(response)
        },
        error: function (error) {
          alert("Can's find")
        },
      })
    })
})

function sortProducts(){
  var sortElement = "sort=" + document.getElementById('sort-products').value;
  
  console.log(sortElement);
  $.ajax({
    type: 'GET',
    url: '/products/sort',
    data: sortElement,
    success: function (response) {
      console.log(response)
    },
    error: function (error) {
      alert("Can's find")
    },
  })
}