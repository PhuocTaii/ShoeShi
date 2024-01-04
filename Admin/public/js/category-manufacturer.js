function handleAddCate() {
  $('#modal-manage-item').modal('toggle')
  document.getElementById('action').innerHTML = `Add category`

  $('.confirm-btn').off('click').click(function () {
    const name = $('#item-name').val()

    $.ajax({
      url: `/category`,
      method: 'POST',
      data: {
        name: name,
      },
      success: function (response) {
        // Handle the response from the server if needed
        fetchCategoryTable()
        $('#item-name').val('')
        $('#modal-manage-item').modal('hide')
      },
      error: function (error) {
        console.error('Error sending data:', error)
      },
    })
  })
}
function handleModifyCate(id) {
  $('#modal-manage-item').modal('toggle')
  document.getElementById('action').innerHTML = `Update category`

  $('.confirm-btn').off('click').click(function () {
    const name = $('#item-name').val()

    $.ajax({
      url: `/category/${id}`,
      method: 'PUT',
      data: {
        name: name,
      },
      success: function (response) {
        fetchCategoryTable()
        $('#item-name').val('')
        $('#modal-manage-item').modal('hide')
      },
      error: function (error) {
        console.error('Error sending data:', error)
      },
    })
  })
}
function handleDeleteCate(id) {
  $('#modal-delete-item').modal('toggle')

  $('.confirm-btn').off('click').click(function () {
    $.ajax({
      url: `/category/${id}`,
      method: 'DELETE',
      success: function (response) {
        // Handle the response from the server if needed
        console.log('Category deleted successfully')
        fetchCategoryTable()
        $('#modal-delete-item').modal('hide')
      },
      error: function (error) {
        console.error('Error deleting category:', error)
      },
    })
  })
}

function handleAddManu() {
  $('#modal-manage-item').modal('toggle')
  document.getElementById('action').innerHTML = `Add manufacturer`

  $('.confirm-btn').off('click').click(function () {
    const name = $('#item-name').val()

    $.ajax({
      url: `/manufacturer`,
      method: 'POST',
      data: {
        name: name,
      },
      success: function (response) {
        fetchManufacturerTable()
        $('#item-name').val('')
        $('#modal-manage-item').modal('hide')
      },
      error: function (error) {
        console.error('Error sending data:', error)
      },
    })
  })
}
function handleModifyManu(id) {
  $('#modal-manage-item').modal('toggle')
  document.getElementById('action').innerHTML = `Update manufacturer`

  $('.confirm-btn').off('click').click(function () {
    const name = $('#item-name').val()

    $.ajax({
      url: `/manufacturer/${id}`,
      method: 'PUT',
      data: {
        name: name,
      },
      success: function (response) {
        fetchManufacturerTable()
        $('#item-name').val('')
        $('#modal-manage-item').modal('hide')
      },
      error: function (error) {
        console.error('Error sending data:', error)
      },
    })
  })
}
function handleDeleteManu(id) {
  $('#modal-delete-item').modal('toggle')

  $('.confirm-btn').off('click').click(function () {
    $.ajax({
      url: `/manufacturer/${id}`,
      method: 'DELETE',
      success: function (response) {
        fetchManufacturerTable()
        $('#modal-delete-item').modal('hide')
      },
      error: function (error) {
        console.error('Error deleting manufacture:', error)
      },
    })
  })
}

function fetchCategoryTable() {
  $.ajax({
    url: '/category',
    type: 'GET',
    contentType: 'application/json',
    dataType: 'json',
    success: function (data) {
      const table = $('#table-category')
      table.html('')

      $.each(data, function (index, category) {
        const row = $('<tr></tr>')
        row.attr('data-id', category._id)

        row.attr('data-id', category._id)

        // Add index
        const order = $('<td></td>')
        order.text(index + 1)
        row.append(order)

        // Add name
        const name = $('<td></td>')
        name.text(category.name)
        row.append(name)

        // Add buttons
        const buttons = $('<td></td>')
        buttons.html(`
    <button class='edit-btn'><i class='ri-pencil-line'></i></button>
    <button class='delete-btn'><i class='ri-delete-bin-6-line'></i></button>
  `)
        row.append(buttons)

        // Add the row to the table
        table.append(row)
      })
    },
    error: function (error) {
      console.error('Error:', error)
    },
  })
}

function fetchManufacturerTable() {
  $.ajax({
    url: '/manufacturer',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      const table = $('#table-manufacturer')
      table.html('')

      $.each(data, function (index, manufac) {
        const row = $('<tr></tr>')
        row.attr('data-id', manufac._id)

        // Add index
        const order = $('<td></td>')
        order.text(index + 1)
        row.append(order)

        // Add name
        const name = $('<td></td>')
        name.text(manufac.name)
        row.append(name)

        // Add buttons
        const buttons = $('<td></td>')
        buttons.html(`
    <button class='edit-btn'><i class='ri-pencil-line'></i></button>
    <button class='delete-btn'><i class='ri-delete-bin-6-line'></i></button>
  `)
        row.append(buttons)

        // Add the row to the table
        table.append(row)
      })
    },
    error: function (error) {
      console.error('Error:', error)
    },
  })
}

document.addEventListener('DOMContentLoaded', (event) => {
  event.preventDefault()
  fetchCategoryTable()
  fetchManufacturerTable()
})

document.addEventListener('DOMContentLoaded', (event) => {
  const table = document.getElementById('table-category')
  table.addEventListener('click', (event) => {
    let target = $(event.target)

    // Check if the clicked element is an 'i' element and if so, get its parent button
    if (target.is('i')) {
      target = target.parent()
    }

    const row = target.closest('tr')
    if (!row) return

    const id = $(row).data('id')
    // console.log(id)

    if (target.hasClass('edit-btn')) {
      handleModifyCate(id)
    }

    if (target.hasClass('delete-btn')) {
      handleDeleteCate(id)
    }
  })
})

document.addEventListener('DOMContentLoaded', (event) => {
  const table = document.getElementById('table-manufacturer')
  table.addEventListener('click', (event) => {
    let target = $(event.target)

    // Check if the clicked element is an 'i' element and if so, get its parent button
    if (target.is('i')) {
      target = target.parent()
    }

    const row = target.closest('tr')
    if (!row) return

    const id = $(row).data('id')
    // console.log(id)

    if (target.hasClass('edit-btn')) {
      handleModifyManu(id)
    }

    if (target.hasClass('delete-btn')) {
      handleDeleteManu(id)
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

  const formattedTime = date.toLocaleTimeString('vi-VN', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  })

  return `${formattedDate} | ${formattedTime}`
}

