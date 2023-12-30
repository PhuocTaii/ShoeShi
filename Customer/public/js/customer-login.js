$(document).ready(function () {
  $('#form-login').submit(function (event) {
    event.preventDefault()
    const formData = $(this).serialize()
    $.ajax({
      type: 'POST',
      url: '/login',
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

function showToastForgotError(errorMsg) {
  const toast = document.getElementById('toast-forgot')
  const iconContainer = document.querySelector('#toast-forgot .icon-toast')
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast)

  toast.classList.remove('success')
  toast.classList.add('error')
  iconContainer.innerHTML = `<i class="ri-error-warning-fill me-2"></i>`
  
  document.querySelector('#toast-forgot .toast-body').innerHTML = errorMsg
  toastBootstrap.show()
}

$('#form-forgot-password').submit(function (event) {
  event.preventDefault()
  const formData = $(this).serialize()

  $.ajax({
    type: 'POST',
    url: '/login/find-account',
    data: formData,
    success: function (response) {
      if(response) {
        $.ajax({
          type: 'POST',
          url: '/login/forgot-password',
          data: response,
          success: function (response) {
            const toast = document.getElementById('toast-forgot')
            const iconContainer = document.querySelector('#toast-forgot .icon-toast')
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast)

            toast.classList.add('success')
            toast.classList.remove('error')
            iconContainer.innerHTML = `<i class="ri-checkbox-circle-fill me-2"></i>`
            
            document.querySelector('#toast-forgot .toast-body').innerHTML = `Reset password confirmation link has been sent to your email <span class="mail-text">${response.email}</span>`
            toastBootstrap.show()
          },
          error: function (error) {
            showToastForgotError('System error. Please try again!')
          },
        })
      }
      else {
        showToastForgotError('User not found')
      }
    },
    error: function (error) {
      showToastForgotError('System error. Please try again!')
    },
  })

  this.username.value=''
})

function checkValidPassword(password) {
  $.ajax({
    type: 'POST',
    url: '/signup/check-password',
    data: { password: password },
    success: function (response) {
      const input = document.getElementById('new-password')
      if (response.valid) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
      }
      else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        document.getElementById('feedback-new-password').innerHTML = response.message
      }
    },
    error: function (error) {
    },
  })
}

function showToastResetError(errorMsg) {
  const toast = document.getElementById('toast-reset')
  const iconContainer = document.querySelector('#toast-reset .icon-toast')
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast)

  toast.classList.remove('success')
  toast.classList.add('error')
  iconContainer.innerHTML = `<i class="ri-error-warning-fill me-2"></i>`
  
  document.querySelector('#toast-reset .toast-body').innerHTML = errorMsg
  toastBootstrap.show()
}

$("#form-reset-password").submit(function (event) {
  event.preventDefault(); 
  const id = document.getElementById('form-reset-password').getAttribute('data-user-id')
  
  const toast = document.getElementById('toast-reset')
  const iconContainer = document.querySelector('#toast-reset .icon-toast')
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast)
  
  $.ajax({
    type: "POST", 
    url: "/login/forgot-password/verify",
    data: {id: id, newPassword: this['new-password'].value},
    success: function (response) {
      toast.classList.add('success')
      toast.classList.remove('error')
      iconContainer.innerHTML = `<i class="ri-checkbox-circle-fill me-2"></i>`
      
      document.querySelector('#toast-reset .toast-body').innerHTML = 'Reset password successfully'
      toastBootstrap.show()

      setTimeout(() => {
        window.location.replace('/login')
      }, 3000);
    },
    error: function (err) {
      toast.classList.remove('success')
      toast.classList.add('error')
      iconContainer.innerHTML = `<i class="ri-error-warning-fill me-2"></i>`
      
      document.querySelector('#toast-reset .toast-body').innerHTML = 'System error. Please try again!'
      toastBootstrap.show()
    }
  });
});