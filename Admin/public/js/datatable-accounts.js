let filter = ''
let sortBy = ''
let sortOrder = 1
let filterOption = ''
const sortOptions = {
  'none': { sortBy: '', sortOrder: '' },
  'name-a-z': { sortBy: 'name', sortOrder: 'asc' },
  'name-z-a': { sortBy: 'name', sortOrder: 'desc' },
  'email-a-z': { sortBy: 'email', sortOrder: 'asc' },
  'email-z-a': { sortBy: 'email', sortOrder: 'desc' },
  newest: { sortBy: 'createTime', sortOrder: 'desc' },
  oldest: { sortBy: 'createTime', sortOrder: 'asc' },
}

function toggleAccountDetail(id) {
  $('#modal-account-detail').modal('toggle')
}

let adminSearch = true

const paginationCustomerTemplate = 
`
<li class='page-item'>
  <a
    id='prevPage'
    class='page-link'
    aria-label='Previous'
    onclick='prevPage()'
  >
    <span aria-hidden='true'>&laquo;</span>
  </a>
</li>
{{#each pages as |page|}}
<li class='page-item {{#if (eq page currentPage)}}active{{/if}}'>
  <a class='page-link' id='page{{page}}' onclick="paging({{page}})">{{page}}</a>
</li>
{{/each}}
<li class='page-item'>
  <a
    id='nextPage'
    class='page-link'
    aria-label='Next'
    onclick='nextPage()'
  >
    <span aria-hidden='true'>&raquo;</span>
  </a>
</li>
`
const paginationCustomerRendered = Handlebars.compile(paginationCustomerTemplate);

const paginationAdminTemplate = 
`
<li class='page-item'>
  <a
    id='prevPageAdmin'
    class='page-link'
    aria-label='Previous'
    onclick='prevPageAdmin()'
  >
    <span aria-hidden='true'>&laquo;</span>
  </a>
</li>
{{#each pages as |page|}}
  <li class='page-item'>
    <a class='page-link' id='pageAdmin{{page}}' onclick="pagingAdmin({{page}})">{{page}}</a>
  </li>
{{/each}}
<li class='page-item'>
  <a
    id='nextPageAdmin'
    class='page-link'
    aria-label='Next'
    onclick='nextPageAdmin()'
  >
    <span aria-hidden='true'>&raquo;</span>
  </a>
</li>
`
const paginationAdminRendered = Handlebars.compile(paginationAdminTemplate);

function fetchPage(pageNumber, pageAdmin, isAdmin) {
  $.ajax({
    url: `/user/api?pageUser=${pageNumber}&pageAdmin=${pageAdmin}&sortBy=${sortBy}&sortOrder=${sortOrder}&filterBy=${filterOption}&search=${filter}&isAdmin=${isAdmin}`,
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      const table = document.getElementById(
        isAdmin ? 'table-admins' : 'table-accounts'
      )
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
        const dateObject = new Date(customer.createTime);
        const formattedDate = dateObject.toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'UTC'
        });
        createTimeCell.textContent = formattedDate
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

        if(isAdmin){
          document.getElementById('form-control-admin').value = ''
        } else{
          document.getElementById('form-control').value = ''
        }

        // Add the row to the table
        table.appendChild(row)

        // update pagination
        if(isAdmin) {
          document.getElementById('pagination-admin-table').innerHTML = paginationAdminRendered({pages : data.pages, currentPage: data.currentPage})
        }
        else {
          document.getElementById('pagination-customer-table').innerHTML = paginationCustomerRendered({pages : data.pages, currentPage: data.currentPage})
        }
      })


    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(textStatus, errorThrown)
    },
  })
}

let currentPage = 1
let currentPageAdmin = 1

// document.getElementById('nextPage').addEventListener('click', () => {
//   currentPage++
//   adminSearch = false
//   fetchPage(currentPage, currentPageAdmin, adminSearch)
// })

// document.getElementById('prevPage').addEventListener('click', () => {
//   if (currentPage > 1) {
//     currentPage--
//     adminSearch = false
//     fetchPage(currentPage, currentPageAdmin, adminSearch)
//   }
// })

// document.getElementById('nextPageAdmin').addEventListener('click', () => {
//   currentPageAdmin++
//   adminSearch = true
//   fetchPage(currentPage, currentPageAdmin, adminSearch)
// })

// document.getElementById('prevPageAdmin').addEventListener('click', () => {
//   if (currentPageAdmin > 1) {
//     currentPageAdmin--
//     adminSearch = true
//     fetchPage(currentPage, currentPageAdmin, adminSearch)
//   }
// })

function nextPage() {
  currentPage++
  adminSearch = false
  fetchPage(currentPage, currentPageAdmin, adminSearch)
}
function prevPage() {
  if (currentPage > 1) {
    currentPage--
    adminSearch = false
    fetchPage(currentPage, currentPageAdmin, adminSearch)
  }
}
function paging(page) {
  currentPage = page
  adminSearch = false
  fetchPage(currentPage, currentPageAdmin, adminSearch)
}

function nextPageAdmin() {
  currentPageAdmin++
  adminSearch = true
  fetchPage(currentPage, currentPageAdmin, adminSearch)
}
function prevPageAdmin() {
  if (currentPageAdmin > 1) {
    currentPageAdmin--
    adminSearch = true
    fetchPage(currentPage, currentPageAdmin, adminSearch)
  }
}
function pagingAdmin(page) {
  currentPageAdmin = page
  adminSearch = true
  fetchPage(currentPage, currentPageAdmin, adminSearch)
}

// const totalPage = document.getElementById('totalUserPage').textContent
// const totalPageAdmin = document.getElementById('totalAdminPage').textContent
// for (let i = 1; i <= totalPage; i++) {
//   document.getElementById(`page${i}`).addEventListener('click', (event) => {
//     event.preventDefault()
//     currentPage = i
//     adminSearch = false
//     fetchPage(currentPage, currentPageAdmin, adminSearch)
//   })
// }

// for (let i = 1; i <= totalPageAdmin; i++) {
//   document
//     .getElementById(`pageAdmin${i}`)
//     .addEventListener('click', (event) => {
//       event.preventDefault()
//       currentPageAdmin = i
//       adminSearch = true
//       fetchPage(currentPage, currentPageAdmin, adminSearch)
//     })
// }

document.addEventListener('DOMContentLoaded', (event) => {
  event.preventDefault()
  currentPage = 1
  currentPageAdmin = 1
  // fetchPage(currentPage,false)
  fetchPage(currentPage, currentPageAdmin, true)
  fetchPage(currentPage, currentPageAdmin, false)
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
    adminSearch = false
    fetchPage(currentPage, currentPageAdmin, adminSearch)
  })
})

document.addEventListener('DOMContentLoaded', (event) => {
  const sortSelect = document.getElementById('customer-sort-admin')
  const filterSelect = document.getElementById('customer-filter-admin')
  const filterInput = document.querySelector(
    '.search-table .form-control-admin'
  )
  const searchButton = document.querySelector('.search-table .btn-admin')

  searchButton.addEventListener('click', () => {
    const selectedSortOption = sortOptions[sortSelect.value]
    if (selectedSortOption) {
      sortBy = selectedSortOption.sortBy
      sortOrder = selectedSortOption.sortOrder
      filter = filterInput.value
      filterOption = filterSelect.value
    }
    adminSearch = true
    fetchPage(currentPage, currentPageAdmin, adminSearch)
  })
})

document.addEventListener('DOMContentLoaded', (event) => {
  // ... rest of your code ...

  const tableAccounts = document.getElementById('table-accounts')
  const tableAdmins = document.getElementById('table-admins')
  const handleClick = (event) => {
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
        const { id, name, gender, address, email, phone, dob, username, img } =
          response
        $('.username-modal').text(username)
        $('.name-modal').text(name)
        $('.gender-modal').text(gender)
        $('.address-modal').text(address)
        $('.email-modal').text(email)
        $('.phone-modal').text(phone)
        $('.dob-modal').text(formatDate(dob))
        $('.img-frame').attr('src', img)


        var myModal = new bootstrap.Modal(
          document.getElementById('modal-account-detail')
        )
        myModal.show()
      },
      error: function (error) {
        console.error('Error sending data:', error)
      },
    })
  }

  tableAccounts.addEventListener('click', handleClick)
  tableAdmins.addEventListener('click', handleClick)
})

document.addEventListener('DOMContentLoaded', (event) => {
  // Get the table element
  const tableAccounts = document.getElementById('table-accounts')
  const tableAdmins = document.getElementById('table-admins')

  const banAccount = (event) => {
    const target = event.target
    const row = target.closest('tr')
    if (!row) return

    // If the clicked element is a checkbox, ban the account
    if (target.type === 'checkbox') {
      const accountId = row.getAttribute('data-id')

      const userId = document.getElementById('userId').textContent

      if (accountId.toString() == userId.toString()) {
        if (target.checked){
          alert("You can't ban your own account.")
          target.checked = false
          return
        }
      }

      if (target.checked) {
        fetch(`/user/ban/${accountId}`, {
          method: 'POST',
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              alert(`Account has been banned.`)
            } else {
              alert(`Failed to ban account.`)
            }
          })
          .catch((error) => {
            console.error('Error:', error)
          })
      } else {
        fetch(`/user/ban/${accountId}`, {
          method: 'POST',
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              alert(`Account has been unbanned.`)
            } else {
              alert(`Failed to unban account.`)
            }
          })
          .catch((error) => {
            console.error('Error:', error)
          })
      }
    }
  }
  
  tableAccounts.addEventListener('click', banAccount)
  tableAdmins.addEventListener('click', banAccount)
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
  // show modal
  $('#modal-manage-admin').modal('toggle')
  // set title
  document.getElementById('action-admin').innerHTML = `Add new admin`
  // set submit action
  document.querySelector('#modal-manage-admin form').onsubmit = function (
    event
  ) {
    event.preventDefault()
    handleSaveAdmin()
  }
}

function handleSaveAdmin() {
  var gender
  var genderRadios = document.getElementsByName('gender')
  var genderRadios = document.getElementsByName('gender');
  for (let i = 0; i < genderRadios.length; i++) {
    if (genderRadios[i].checked) {
      var selectedGender = genderRadios[i].value
      gender = selectedGender
      break
    }
  }

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
    gender: gender,
  }
  // call ajax
  $.ajax({
    type: 'POST',
    url: '/user',
    data,
    dataType: 'json',
    // processData: false,
    // contentType: false,
    success: function (response) {
      // format toast
      document.getElementById('toast-noti-product').innerHTML =
        toastTemplateFunction({
          title: 'Add admin',
          message: 'Add admin successfully',
          success: true,
        })
      // Trigger toast
      const toastElement = document.querySelector('.toast')
      const toast = bootstrap.Toast.getOrCreateInstance(toastElement)
      toast.show()

      // close modal
      $('#modal-manage-admin').modal('toggle')
    },
    error: function (err) {
      document.getElementById('toast-noti-product').innerHTML =
        toastTemplateFunction({
          title: 'Add admin',
          message: 'Add admin failed! System error. Please try again!',
          success: false,
        })
      // Trigger toast
      const toastElement = document.querySelector('.toast')
      const toast = bootstrap.Toast.getOrCreateInstance(toastElement)
      toast.show()
    },
  })
}
