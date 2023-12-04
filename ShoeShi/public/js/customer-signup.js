$(document).ready(function () {
    $("#form-signup").submit(function (event) {
      event.preventDefault(); const formData = $(this).serialize(); $.ajax({
        type:
          "POST", url: "/signup", data: formData, success: function (response) {
            alert("Sign up successful"); window.location.href = response.redirect;
          },
        error: function (xhr) {
          const errorMessage = xhr.responseJSON ? xhr.responseJSON : 'Sign up failed';
          alert(errorMessage);
        }
      });
    });
 });