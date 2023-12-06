$(document).ready(function () {
  $('#form-login').submit(function (event) {
    event.preventDefault()
    const formData = $(this).serialize()
    $.ajax({
      type: 'POST',
      url: '/admin/login',
      data: formData,
      success: function (response) {
        alert('Login successful')
        window.location.href = response.redirect
      },
      error: function (error) {
        const errorMessage =
          error.responseJSON && error.responseJSON.message
            ? error.responseJSON.message
            : 'Login failed'
        alert(errorMessage)
      },
    })
  })
})
