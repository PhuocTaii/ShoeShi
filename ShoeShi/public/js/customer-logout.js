$(document).ready(function () {
  $('#logout-btn').on('click', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/logout',
      success: function (response) {
        alert('Logout successful')
        window.location.href = response.redirect
      },
      error: function (error) {
        alert('Logout failed')
        console.error('Logout failed', error)
      },
    })
  })
})
