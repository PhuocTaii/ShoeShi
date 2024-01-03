function toggleViewDetail(id) {
  $('#modal-view-order').modal('toggle')
}
function toggleDeleteOrderConfirm(id) {
  $('#modal-delete-order').modal('toggle')

  $('.confirm-delete-btn').off('click').click(function () {
    $.ajax({
      url: `/order/${id}`,
      method: 'DELETE',
      success: function (response) {
        console.log('Category deleted successfully')
        fetchAllOrders()
        $('#modal-delete-order').modal('hide')
      },
      error: function (error) {
        console.error('Error deleting category:', error)
      },
    })
  })
}

function getProductName(data) {
  let result = ''
  data.forEach((item) => {
    result += `<li>${item.product}</li>`
  })
  return result
}

function countQuantity(data) {
  let result = 0
  data.forEach((item) => {
    result += item.quantity
  })
  return result
}

function fetchAllOrders() {
  $.ajax({
    url: '/order',
    type: 'GET',
    success: function (data) {
      const table = $('#table-order')
      table.html('')

      $.each(data, function (index, order) {
        const row = $('<tr></tr>')
        row.attr('data-id', order._id)

        const buyer = $('<td></td>')
        buyer.text(order.buyer)
        row.append(buyer)

        const creationTime = $('<td></td>')
        creationTime.text(formatDateTime(order.orderTime))
        row.append(creationTime)

        const productList = $('<td></td>')
        productList.html(getProductName(order.productList))
        row.append(productList)

        const totalPrice = $('<td></td>')
        totalPrice.text(formatPrice(order.totalPrice))
        row.append(totalPrice)

        const totalQuantity = $('<td></td>')
        const quantities = countQuantity(order.productList)
        totalQuantity.text(quantities)
        row.append(totalQuantity)

        // Add status
        const status = $('<td></td>')
        status.html(`
        <select class="form-select">
								<option selected value="pending">pending</option>
								<option value="shipping">shipping</option>
								<option value="done">done</option>
							</select>
  `)

        row.append(status)

        // Add buttons
        const buttons = $('<td></td>')
        buttons.html(`
        <td class="order-actions">
        <button type="button" class="btn detail-btn">
          <i class="ri-more-fill"></i>
        </button>
        <button type="button" class="btn delete-btn">
          <i class="ri-delete-bin-line"></i>
        </button>
      </td>
  `)
        row.append(buttons)

        // Add the row to the table
        table.append(row)
      })
    },
    error: function (error) {
      console.error(error)
    },
  })
}

document.addEventListener('DOMContentLoaded', (event) => {
  fetchAllOrders()
  const table = document.getElementById('table-order')
  table.addEventListener('click', (event) => {
    let target = $(event.target)

    // Check if the clicked element is an 'i' element and if so, get its parent button
    if (target.is('i')) {
      target = target.parent()
    }

    const row = target.closest('tr')
    if (!row) return

    const id = $(row).data('id')

    if (target.hasClass('detail-btn')) {
      toggleViewDetail(id)
    }

    if (target.hasClass('delete-btn')) {
      toggleDeleteOrderConfirm(id)
    }
  })
})


function formatDateTime(dateString) {
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

function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ'
}
