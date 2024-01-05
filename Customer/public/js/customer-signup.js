$(document).ready(function () {
    $("#form-signup").submit(function (event) {
      event.preventDefault(); 
      const formData = $(this).serialize();
      accountActivation(formData)
    });
});

function checkValidUsername(username) {
  const input = document.getElementById('username')
  if (username.length < 6 || username.length > 20) {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    document.getElementById('feedback-username').innerHTML = 'Must be at least 8 characters. Include letters and numbers'
  } else {
    $.ajax({
      type: 'POST',
      url: '/signup/check-username',
      data: { username: username },
      success: function (response) {
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
      },
    })
  }
}

function checkValidPassword(password) {
  const input = document.getElementById('password')
  const pattern = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/
  if (pattern.test(password)) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    document.getElementById('feedback-password').innerHTML = 'Must be at least 8 characters. Include letters and numbers'
  }
}

function checkValidEmail(email) {
  const input = document.getElementById('email')
  const pattern = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/
  if (pattern.test(email)) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    document.getElementById('feedback-email').innerHTML = 'Email is invalid'
  }
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