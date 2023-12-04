function handleAddCate() {
  $('#modal-manage-item').modal('toggle')
  document.getElementById('action').innerHTML = `Add category`
}
function handleModifyCate(id) {
  $('#modal-manage-item').modal('toggle')
  document.getElementById('action').innerHTML = `Update category`
}
function handleDeleteCate(id) {
  $('#modal-delete-item').modal('toggle')
}

function handleAddManu() {
  $('#modal-manage-item').modal('toggle')
  document.getElementById('action').innerHTML = `Add manufacturer`
}
function handleModifyManu(id) {
  $('#modal-manage-item').modal('toggle')
  document.getElementById('action').innerHTML = `Update manufacturer`
}
function handleDeleteManu(id) {
  $('#modal-delete-item').modal('toggle')
}