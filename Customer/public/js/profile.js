function validatePhoneNumber(input) {
  const phoneNumberPattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  if (!phoneNumberPattern.test(input.value)) {
      input.setCustomValidity('Phone number is not valid');
  } else {
      input.setCustomValidity('');
  }
}

// UPDATE REVIEW
function updateProfile(event) {
  event.preventDefault()

  const form = document.forms['form-details'];

  const email = form['email'].value 
  const name = form['name'].value
  const gender = form['gender'].value
  const phoneNum = form['phoneNum'].value
  const address = form['address'].value
  const birthday = form['birthday'].value

  const id = document.getElementById('main-profile-detail').getAttribute('profile-id')

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
