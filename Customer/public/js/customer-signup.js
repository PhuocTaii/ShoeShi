$(document).ready(function () {
    $("#form-signup").submit(function (event) {
      event.preventDefault(); 
      const formData = $(this).serialize();
      accountActivation(formData)
    });
});

function checkValidUsername(username) {
  $.ajax({
    type: 'POST',
    url: '/signup/check-username',
    data: { username: username },
    success: function (response) {
      const input = document.getElementById('username')
      if (response.valid) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
      }
      else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        const feedback = document.getElementById('feedback-username')
        feedback.innerHTML = response.message
      }
    },
    error: function (error) {
      console.log(error)
    },
  })
}

function checkValidPassword(password) {
  $.ajax({
    type: 'POST',
    url: '/signup/check-password',
    data: { password: password },
    success: function (response) {
      const input = document.getElementById('password')
      if (response.valid) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
      }
      else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        document.getElementById('feedback-password').innerHTML = response.message
      }
    },
    error: function (error) {
    },
  })
}

function checkValidEmail(email) {
  $.ajax({
    type: 'POST',
    url: '/signup/check-email',
    data: { email: email },
    success: function (response) {
      const input = document.getElementById('email')
      if (response.valid) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
      }
      else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        document.getElementById('feedback-email').innerHTML = response.message
      }
    },
    error: function (error) {
    },
  })
}

function accountActivation(formData) {
  $.ajax({
    type: "POST", 
    url: "/signup", 
    data: formData,
    success: function (response) {
      const container = document.getElementById('signup-container')
      container.classList.add('hide-container')
      const checkContainer = document.getElementById('check-mail-container')
      checkContainer.classList.remove('hide-container')
      document.getElementById('mail-sent').innerHTML = document.getElementById('email').value
    },
    error: function (xhr) {
      const errorMessage = xhr.responseJSON ? xhr.responseJSON : 'Sign up failed';
      alert(errorMessage);
    }
  });
}

function resendConfirmEmail() {
  const formData = $("#form-signup").serialize();
  accountActivation(formData)
}