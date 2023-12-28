const reviewTemplate = 
`
        <div class='container'>
          <h3 class='fw-bold mb-3'>${order.date}</h3>
          <!-- Populate the modal content with specific order details -->
          <!-- Example: -->
          <div class='status text-muted'>${order.status}</div>
          <div>
            <small class='fw-bold'>Address:</small>
            <small>${order.address}</small>
          </div>
          <!-- ... other order details ... -->
        </div>
`

// jQuery document ready function
$(document).ready(function() {
    $('.orderView').click(function() {
      // Fetch order details associated with the clicked order
      let orderDetails = /* Logic to fetch order details based on the clicked order */;
      
      // Render the order details inside the modal body
      renderOrderDetails(orderDetails);
    });
  
    // Function to render order details in the modal
    function renderOrderDetails(order) {
      let modalBody = $('#detailModal .modal-body');
      // Assuming 'order' is an object containing the details of the clicked order
      // Use Handlebars syntax to structure the modal content based on the order details
      let template = `
        <!-- Your modal content structure using Handlebars syntax -->
        <div class='container'>
          <h3 class='fw-bold mb-3'>${order.date}</h3>
          <!-- Populate the modal content with specific order details -->
          <!-- Example: -->
          <div class='status text-muted'>${order.status}</div>
          <div>
            <small class='fw-bold'>Address:</small>
            <small>${order.address}</small>
          </div>
          <!-- ... other order details ... -->
        </div>
      `;
      // Set the modal body content with the rendered order details
      modalBody.html(template);
    }
  });
  