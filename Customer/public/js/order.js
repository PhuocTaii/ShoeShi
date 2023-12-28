const templateOrder = `
  <div class='row'>
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

function populateItemSummary(items) {
  const itemSummaryContainer =
    document.getElementsByClassName('all-items-modal') // Assuming a container with ID 'itemSummaryContainer'

  items.forEach((item) => {
    const itemDiv = document.createElement('div')
    itemDiv.innerHTML = templateOrder

    itemSummaryContainer.appendChild(itemDiv)
  })
}

$(document).ready(function () {
  $('.orderView').on('click', function () {
    const id = $(this).data('id')
    console.log(id)

    $.ajax({
      url: `/order/${id}`,
      method: 'GET', // Change the method as per your requirement
      success: function (response) {
        // Handle the response from the server if needed
        const { date, status, address, totalPrice, items } = response

        const adjustedSubPrice = parseFloat(totalPrice) - 20000 // Subtract 20,000 VND
        const formattedAdjustedSubPrice =
          adjustedSubPrice.toLocaleString('vi-VN') // Format with commas for thousands separators
        console.log(adjustedSubPrice)

        $('.date-modal').text(formatDateTime(date))
        $('.status-modal').text(status)
        $('.address-modal').text(address)
        $('.subtotal-modal').text(
          `${(totalPrice - 20000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ`
        )
        $('.total-modal').text(
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

        $('#detailModal').modal('show')
        console.log('Data sent successfully')
      },
      error: function (error) {
        console.error('Error sending data:', error)
      },
    })

    // Populate the modal with order details
  })
})
