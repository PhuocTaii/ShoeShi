function validatePhoneNumber(input) {
  const phoneNumberPattern =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
  if (!phoneNumberPattern.test(input)) {
    return 'Phone number is not valid'
  }
  return ''
}

function checkOldPassword(input) {
  const id = document
    .getElementById('main-profile-detail')
    .getAttribute('profile-id')

  $.ajax({
    url: 'profile/check-password',
    method: 'POST',
    data: {
      id,
      input,
    },
    success: function (response) {
      console.log('Profile updated successfully:', response)
      input.setCustomValidity('')
    },
    error: function (xhr, status, error) {
      input.setCustomValidity('Password incorrect')
    },
  })
}

// UPDATE REVIEW
function updateProfile(event) {
  event.preventDefault()

  const form = document.forms['form-details']

  const email = form['email'].value
  const name = form['name'].value
  const gender = form['gender'].value
  const phoneNumInput = form['phoneNum']
  const phoneNum = phoneNumInput.value
  const address = form['address'].value
  const birthday = form['birthday'].value

  const phoneValidationResult = validatePhoneNumber(phoneNum)

  if (phoneValidationResult) {
    alert(phoneValidationResult)
    return
  }

  const id = document
    .getElementById('main-profile-detail')
    .getAttribute('profile-id')

  // Make an AJAX request to update profile details
  $.ajax({
    url: `/profile/${id}`,
    method: 'POST',
    data: {
      email,
      name,
      gender,
      phoneNum,
      address,
      birthday,
    },
    success: function (response) {
      console.log('Profile updated successfully:', response)
    },
    error: function (xhr, status, error) {
      // Handle error
      console.error('Error updating profile:', error)
      // Show an error message to the user, if necessary
    },
  })
}

// UPDATE PASSWORD
function updatePassword(event) {
  event.preventDefault()

  const form = document.forms['form-reset-password']

  const oldPassword = form['current-password'].value
  const newPassword = form['new-password'].value
  const confirmPassword = form['confirm-password'].value;

  if (newPassword !== confirmPassword) {
    alert("New password and confirm password don't match");
    return;
  }
  
  const id = document
  .getElementById('main-profile-detail')
  .getAttribute('profile-id')
  
  console.log(oldPassword, newPassword, confirmPassword, id);

  // Make an AJAX request to update profile details
  $.ajax({
    url: `/profile/${id}/update-password`,
    method: 'POST',
    data: {
      id,
      oldPassword,
      newPassword,
    },
    success: function (response) {
      console.log('Password updated successfully:', response);
      alert('Password updated successfully');
      // Optionally, show a success message to the user
    },
    error: function (xhr, status, error) {
      console.error('Error updating password:', error);
      const errorMessage = xhr.responseJSON ? xhr.responseJSON.message : 'Unknown error occurred';
      alert(`Error updating password: ${errorMessage}`);
    },
  });
}
