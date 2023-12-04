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