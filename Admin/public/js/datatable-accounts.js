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
