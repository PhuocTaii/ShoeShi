function toggleAddColor() {
  $('#modal-manage-color').modal('toggle')
  document.getElementById('action-color').innerHTML = `Add color`
}
function toggleModifyColor(id) {
  $('#modal-manage-color').modal('toggle')
  document.getElementById('action-color').innerHTML = `Update color`
}

function toggleAddSize() {
  $('#modal-manage-size').modal('toggle')
  document.getElementById('action-size').innerHTML = `Add size`
}
function toggleModifySize(id) {
  $('#modal-manage-size').modal('toggle')
  document.getElementById('action-size').innerHTML = `Update size`
}

function toggleDeleteItem(id) {
  $('#modal-delete-item').modal('toggle')
}

function showColorCode(colorCode) {
	document.getElementById('color-code-chosen').innerHTML = colorCode
}