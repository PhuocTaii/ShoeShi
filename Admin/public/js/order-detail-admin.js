const templateOrder = `
  <div class='row   '>
    <div class='col d-inline-flex'>
      <div class='number-item text-muted quantity-modal'>1x</div>
      <div class='item-info flex-column'>
        <div class='item-name item-modal'>Item Name</div>
        <div class='item-property d-inline-flex flex-row'>
          <div class='color-item m-0 color-modal'></div>
          <div class='size-item m-0 size-modal'>│ Size: M</div>
        </div>
      </div>
    </div>
    <div
      class='d-flex justify-content-end price col price-item-modal'
    >
      1,000,000 đ
    </div>
  </div>
`

function toggleViewDetail(id) {
  $.ajax({
    url: `/order/${id}`,
    method: 'GET', // Change the method as per your requirement
    success: function (response) {
      // Handle the response from the server if needed
      const { date, status, address, totalPrice, items, name ,username, phone } = response

      const adjustedSubPrice = parseFloat(totalPrice) - 20000 // Subtract 20,000 VND
      const formattedAdjustedSubPrice = adjustedSubPrice.toLocaleString('vi-VN') // Format with commas for thousands separators
      console.log(adjustedSubPrice)

      $('.datetime').text(formatDateTime(date))
      $('.status').text(status)
      $('.customer-name').text(name)
      $('.customer-phone').text(phone)
      $('.customer-username').text(username)
      $('.customer-address').text(address)
      $('.sub-price').text(
        `${(totalPrice - 20000)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ`
      )
      $('.total-price').text(
        `${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ`
      )

      const itemSummaryContainer = $('.all-items-modal')
      itemSummaryContainer.empty() // Clear previous items

      items.forEach((item) => {
        const itemDiv = $('<div>').html(templateOrder)
        itemDiv.find('.item-name').text(item.itemName)
        itemDiv.find('.size-modal').text(`│ Size: ${item.itemSize}`)
        itemDiv.find('.price-item-modal').text(`${item.itemPrice} đ`)
        itemDiv.find('.color-modal').css({
          'background-color': item.itemColor,
          border: '1px solid black', // Add black border
        })

        itemSummaryContainer.append(itemDiv)
      })

      $('#modal-view-order').modal('toggle')
    },
    error: function (error) {
      console.error('Error sending data:', error)
    },
  })
}
function toggleDeleteOrderConfirm(id) {
  $('#modal-delete-order').modal('toggle')

  $('.confirm-delete-btn')
    .off('click')
    .click(function () {
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

function showOrders(data) {
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
                <option value="pending">pending</option>
                <option value="shipping">shipping</option>
                <option value="done">done</option>
              </select>
  `)
    status.find('select').val(order.status.toLowerCase())
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
}

function fetchAllOrders() {
  $.ajax({
    url: '/order',
    type: 'GET',
    success: function (data) {
      showOrders(data)
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

    if (target.hasClass('form-select')) {
      const status = target.val()
      const capitalizedStatus = status.charAt(0).toUpperCase() + status.slice(1)
      $.ajax({
        url: `/order/${id}`,
        type: 'PUT',
        data: { capitalizedStatus },
        success: function (response) {},
        error: function (error) {
          console.error('Error updating status:', error)
        },
      })
    }
  })
})

document.addEventListener('DOMContentLoaded', (event) => {
  const radioButtons = document.getElementsByName('status')
  for (let i = 0; i < radioButtons.length; i++) {
    radioButtons[i].addEventListener('change', (event) => {
      console.log('trigger')
      if (event.target.checked) {
        const label = document.querySelector(`label[for="${event.target.id}"]`)
        const status = label.textContent
        const capitalizedStatus =
          status.charAt(0).toUpperCase() + status.slice(1)

        if (capitalizedStatus === 'None') {
          fetchAllOrders()
          return
        }

        $.ajax({
          url: `/order/search?filterBy=${capitalizedStatus}`,
          type: 'GET',
          success: function (data) {
            showOrders(data)
          },
        })
      }
    })
  }
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
