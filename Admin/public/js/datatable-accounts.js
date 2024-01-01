
function toggleAccountDetail(id) {
  $('#modal-account-detail').modal('toggle')
}

function fetchPage(pageNumber) {
  fetch(`/accounts/api?pageUser=${pageNumber}`)
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

        const checkBox = document.createElement('td');
        const input = document.createElement('input');
        input.type = 'checkbox';
        checkBox.appendChild(input);
        row.appendChild(checkBox);

        table.appendChild(row)
      })
    })
    .catch((error) => {
      // Handle the error here
      console.error('Error:', error)
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

const totalPage = document.getElementById('totalUserPage').textContent;

for(let i = 1; i <= totalPage; i++) {
  document.getElementById(`page${i}`).addEventListener('click', (event) => {
      event.preventDefault();
      currentPage = i;
      fetchPage(currentPage);
  });
}

document.addEventListener('DOMContentLoaded', (event) => {
  event.preventDefault();
  currentPage = 1;
  fetchPage(currentPage);
});