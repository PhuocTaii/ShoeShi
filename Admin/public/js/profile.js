const id = document.getElementById('main-profile-detail').getAttribute('profile-id')

function validatePhoneNumber(input) {
    const phoneNumberPattern =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    if (!phoneNumberPattern.test(input)) {
      return 'Phone number is not valid'
    }
    return ''
}

function checkOldPassword() {
    const id = document.getElementById('main-profile-detail').getAttribute('profile-id')
    const btn = document.getElementById('btn-reset-password')

    const curPass = document.getElementById('current-password').value;
    const input = document.getElementById('current-password')
    
    $.ajax({
      url: `profile/${id}/checkPassword`,
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        curPass: curPass
      }),
      success: function (response) {
        if(response.valid){
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
            btn.disabled = false
        } else{
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
            const feedback = document.getElementById('feedback-current-password')
            feedback.innerHTML = response.message
            btn.disabled = true
        }
      },
      error: function (xhr, status, error) {
        console.log(error)
      },
    })
}

function updatePassword(event) {
    event.preventDefault()
    
  
    const newPassword = document.getElementById('new-password').value
    const confirmPassword = document.getElementById('confirm-password').value;
    const input = document.getElementById('current-password')

    if(newPassword != confirmPassword){
        alert('Confirm password not match')
        return
    }
    
    const id = document.getElementById('main-profile-detail').getAttribute('profile-id')
  
    $.ajax({
      url: `/profile/${id}/updatePassword`,
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        newPassword: newPassword
      }),
      success: function (response) {
        alert('Password updated successfully');
        document.getElementById('new-password').value='';
        document.getElementById('btn-reset-password').disabled = true;
        document.getElementById('current-password').value='';
        document.getElementById('confirm-password').value='';
        input.classList.remove("is-valid");

        // Optionally, show a success message to the user
      },
      error: function (xhr, status, error) {
        console.error('Error updating password:', error);
        const errorMessage = xhr.responseJSON ? xhr.responseJSON.message : 'Unknown error occurred';
        alert(`Error updating password: ${errorMessage}`);
      },
    });
}

function updateProfile(event) {
    event.preventDefault()
  
    const form = document.forms['admin-details']
  
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
      dataType: 'json',
      data: {
        email,
        name,
        gender,
        phoneNum,
        address,
        birthday,
      },
      success: function (response) {
        alert('Profile updated successfully')
        // console.log('Profile updated successfully:', response)
      },
      error: function (xhr, status, error) {
        // Handle error
        console.error('Error updating profile:', error)
        // Show an error message to the user, if necessary
      },
    })
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('admin-ava').addEventListener('click', function() {
      document.getElementById('fileInput').click();
    });
  
    // Add an event listener to the file input to handle selected files
    document.getElementById('fileInput').addEventListener('change', function(event) {
      const fileInput = event.target;
      // console.log(fileInput.files[0])
      if (fileInput.files.length > 0) {
        selectedFile = fileInput.files[0];
        displaySelectedImage(selectedFile);
        uploadImage(selectedFile);
      }
  
    });
  
    // Function to display the selected image (replace this with your own logic)
    function displaySelectedImage(file) {
      const imageContainer = document.getElementById('imageContainer');
  
      // Clear previous content
      imageContainer.innerHTML = '';
  
      // Create an img element
      const img = document.createElement('img');
  
      // Set the src attribute of the img element to a data URL representing the selected file
      img.src = URL.createObjectURL(file);
      // Set some styling (optional)
      img.style.width = '100px';
      img.style.height = '100px';
      img.style.objectFit = 'cover';
      img.style.borderRadius = '50%';
      img.style.cursor = 'pointer';
  
      // Append the img element to the image container
      imageContainer.appendChild(img);
      console.log(img.src)
    }
  
    function uploadImage(file){
      const formData = new FormData();
      formData.append('adminImage', file);
      console.log(formData)
      $.ajax({
        url: `/profile/${id}/update-avatar`,
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
          console.log('Avatar updated successfully:', response);
          alert('Avatar updated successfully');
          // Optionally, show a success message to the user
        },
        error: function (error) {
          console.error('Error updating avatar:', error);
          // alert(`Error updating avatar: ${errorMessage}`);
        },
      });
    }
  });