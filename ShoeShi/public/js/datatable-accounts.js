window.addEventListener('DOMContentLoaded', (event) => {
  // Simple-DataTables
  // https://github.com/fiduswriter/Simple-DataTables/wiki

  const tableCustomer = document.getElementById('customer')
  if (tableCustomer) {
    const tableCusObj = new DataTable(tableCustomer, {
      lengthMenu: [5, 10, 20, 50],
    })

    tableCusObj.on('click', 'tbody tr', (event) => {
      event.preventDefault()
      // const data = tableCusObj.row(event.target).data();
      // alert('You clicked on ' + data[0] + "'s row");
      // document.getElementById('modal-detail').modal('show');
      $('#modal-detail').modal('toggle')
    })
  }

  const tableAdmin = document.getElementById('admin')
  if (tableAdmin) {
    const tableAdObj = new DataTable(tableAdmin, {
      lengthMenu: [5, 10, 20, 50],
    })

    tableAdObj.on('click', 'tbody tr', (event) => {
      event.preventDefault()
      $('#modal-detail').modal('toggle')
    })
  }
})
