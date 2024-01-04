let filter = ''
let sortBy = ''
let sortOrder = 1
let filterOption = ''
const sortOptions = {
  'name-a-z': { sortBy: 'name', sortOrder: 'asc' },
  'name-z-a': { sortBy: 'name', sortOrder: 'desc' },
  'email-a-z': { sortBy: 'email', sortOrder: 'asc' },
  'email-z-a': { sortBy: 'email', sortOrder: 'desc' },
  newest: { sortBy: 'registrationTime', sortOrder: 'desc' },
  oldest: { sortBy: 'registrationTime', sortOrder: 'asc' },
}

function toggleAccountDetail(id) {
  $('#modal-account-detail').modal('toggle')
}

function fetchPage(pageNumber) {
  fetch(
    `/user/api?pageUser=${pageNumber}&sortBy=${sortBy}&sortOrder=${sortOrder}&filterBy=${filterOption}&search=${filter}`
  )
    .then((response) => response.json())
    .then((data) => {
      const table = document.getElementById('table-accounts')
      table.innerHTML = ''

      data.usersInPage.forEach((customer) => {
        const row = document.createElement('tr')
        row.setAttribute('data-id', customer._id)

        const usernameCell = document.createElement('td')
        usernameCell.textContent = customer.username
        row.appendChild(usernameCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = customer.name
        row.appendChild(nameCell)

        const emailCell = document.createElement('td')
        emailCell.textContent = customer.email
        row.appendChild(emailCell)

        const createTimeCell = document.createElement('td')
        createTimeCell.textContent = customer.createTime
        row.appendChild(createTimeCell)

        const checkBox = document.createElement('td')
        const input = document.createElement('input')
        input.type = 'checkbox'
        checkBox.appendChild(input)
        if (customer.isBan) {
          input.checked = true
        } else {
          input.checked = false
        }
        row.appendChild(checkBox)

        // Add the row to the table
        table.appendChild(row)
      })
    })
}

let currentPage = 1

document.getElementById('nextPage').addEventListener('click', () => {
  event?.preventDefault()
  currentPage++
  fetchPage(currentPage)
})

document.getElementById('prevPage').addEventListener('click', () => {
  event?.preventDefault()
  if (currentPage > 1) {
    currentPage--
    fetchPage(currentPage)
  }
})

const totalPage = document.getElementById('totalUserPage').textContent

for (let i = 1; i <= totalPage; i++) {
  document.getElementById(`page${i}`).addEventListener('click', (event) => {
    event.preventDefault()
    currentPage = i
    fetchPage(currentPage)
  })
}

document.addEventListener('DOMContentLoaded', (event) => {
  event.preventDefault()
  currentPage = 1
  fetchPage(currentPage)
})

document.addEventListener('DOMContentLoaded', (event) => {
  const sortSelect = document.getElementById('customer-sort')
  const filterSelect = document.getElementById('customer-filter')
  const filterInput = document.querySelector('.search-table .form-control')
  const searchButton = document.querySelector('.search-table .btn')

  searchButton.addEventListener('click', () => {
    const selectedSortOption = sortOptions[sortSelect.value]
    if (selectedSortOption) {
      sortBy = selectedSortOption.sortBy
      sortOrder = selectedSortOption.sortOrder
      filter = filterInput.value
      filterOption = filterSelect.value
    }

    fetchPage(currentPage)
  })
})

document.addEventListener('DOMContentLoaded', (event) => {
  // ... rest of your code ...

  const table = document.getElementById('table-accounts')
  table.addEventListener('click', (event) => {
    const target = event.target
    if (target.type === 'checkbox') {
      event.stopPropagation()
      return
    }
    const row = target.closest('tr')
    if (!row) return

    const id = $(row).data('id')

    $.ajax({
      url: `/user/${id}`,
      method: 'GET', // Change the method as per your requirement
      success: function (response) {
        // Handle the response from the server if needed
        const { id, name, gender, address, email, phone, dob, username } =
          response

        $('.username-modal').text(username)
        $('.name-modal').text(name)
        $('.gender-modal').text(gender)
        $('.address-modal').text(address)
        $('.email-modal').text(email)
        $('.phone-modal').text(phone)
        $('.dob-modal').text(formatDate(dob))

        var myModal = new bootstrap.Modal(
          document.getElementById('modal-account-detail')
        )
        myModal.show()
      },
      error: function (error) {
        console.error('Error sending data:', error)
      },
    })
  })
})

document.addEventListener('DOMContentLoaded', (event) => {
  // Get the table element
  const table = document.getElementById('table-accounts')

  // Add a click event listener to the table
  table.addEventListener('click', (event) => {
    const target = event.target
    const row = target.closest('tr')
    if (!row) return

    // If the clicked element is a checkbox, ban the account
    if (target.type === 'checkbox') {
      const accountId = row.getAttribute('data-id')

      if (target.checked) {
        // If the checkbox is checked, send a request to ban the account
        fetch(`/user/ban/${accountId}`, {
          method: 'POST',
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              console.log(`Account ${accountId} has been banned.`)
            } else {
              console.error(`Failed to ban account ${accountId}.`)
            }
          })
          .catch((error) => {
            console.error('Error:', error)
          })
      } else {
        // If the checkbox is checked, send a request to ban the account
        fetch(`/user/ban/${accountId}`, {
          method: 'POST',
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              console.log(`Account ${accountId} has been unbanned.`)
            } else {
              console.error(`Failed to unban account ${accountId}.`)
            }
          })
          .catch((error) => {
            console.error('Error:', error)
          })
      }
    }
  })
})

function formatDate(dateString) {
  const date = new Date(dateString)

  const formattedDate = date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })

  return `${formattedDate}`
}

function toggleAddAdmin() {
  // resetModal()

  // show modal
  $('#modal-manage-admin').modal('toggle')
  // set title
  document.getElementById('action-admin').innerHTML = `Add new admin`
  // set submit action
  document.querySelector('#modal-manage-admin form').onsubmit = function(event) {
    event.preventDefault()
    handleSaveAdmin()
  }
}

function handleSaveAdmin() {
  // get product info
  // const formData = new FormData()




  // const data {
  //   username = document.querySelector('#admin-username').value,
  // }
  var gender

  // formData.append('username', document.querySelector('#admin-username').value)
  // formData.append('password', document.querySelector('#admin-password').value)
  // formData.append('email', document.querySelector('#admin-email').value)
  // formData.append('name', document.querySelector('#admin-name').value)
  var genderRadios = document.getElementsByName('gender');
  for (let i = 0; i < genderRadios.length; i++) {
    if (genderRadios[i].checked) {
      var selectedGender = genderRadios[i].value;
      // formData.append('gender', selectedGender)
      gender = selectedGender
      break;
    }
  }
  // formData.append('phoneNum', document.querySelector('#admin-phone').value)
  // formData.append('address', document.querySelector('#admin-address').value)
  // formData.append('birthday', document.querySelector('#admin-birthday').value)

  const username = document.querySelector('#admin-username').value
  const password = document.querySelector('#admin-password').value
  const email = document.querySelector('#admin-email').value
  const name = document.querySelector('#admin-name').value
  const phoneNum = document.querySelector('#admin-phone').value
  const address = document.querySelector('#admin-address').value
  const birthday = document.querySelector('#admin-birthday').value

  const data = {
    username: username,
    password: password,
    email: email,
    name: name,
    phoneNum: phoneNum,
    address: address,
    birthday: birthday,
    gender: gender
  }
  // call ajax
  $.ajax({
    type: "POST",
    url: '/user',
    data,
    dataType: 'json',
    // processData: false,
    // contentType: false,
    success: function (response) {
      // format toast
      document.getElementById('toast-noti-product').innerHTML = toastTemplateFunction({
        title: 'Add admin',
        message: 'Add admin successfully',
        success: true,
      });
      // Trigger toast
      const toastElement = document.querySelector('.toast');
      const toast = bootstrap.Toast.getOrCreateInstance(toastElement);
      toast.show();

      // close modal
      $('#modal-manage-admin').modal('toggle')

    },
    error: function (err) {
      document.getElementById('toast-noti-product').innerHTML = toastTemplateFunction({
        title: 'Add admin',
        message: 'Add admin failed! System error. Please try again!',
        success: false,
      });
      // Trigger toast
      const toastElement = document.querySelector('.toast');
      const toast = bootstrap.Toast.getOrCreateInstance(toastElement);
      toast.show();
    }
  });
}