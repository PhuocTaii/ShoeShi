const info = {
  photos: [],
  cates: [],
  colors: [],
  sizes: [],
}

function toggleAddProduct() {
  info.photos.splice(0, info.photos.length)
  info.cates.splice(0, info.cates.length)
  info.colors.splice(0, info.colors.length)
  info.sizes.splice(0, info.sizes.length)
  showSelectedItem('cates')
  showSelectedItem('colors')
  showSelectedItem('sizes')
  showSelectedPhoto()

  $('#modal-manage-product').modal('toggle')
  document.getElementById('action-product').innerHTML = `Add new product`
}

function toggleUpdateProduct(id) {
  // get product info

  // set product info to modal

  // open modal
  $('#modal-manage-product').modal('toggle')
  document.getElementById('action-product').innerHTML = `Update product`
}

function toggleDeleteProduct(id) {
  $('#modal-delete-product').modal('toggle')
}

function showSelectedItem(infoType) {
  const list = document.getElementsByClassName("chosen-list " + infoType)[0]

  list.innerHTML = info[infoType].map(item => {
    return(
      `
      <li>
        <p>${item}</p>
        <button class='remove-icon' onclick="removeSelectedItem('${infoType}', '${item}')">
          <i class='ri-subtract-line'>
          </i>
      </li>
      `
    )
  }).join('')
}

function addSelectedItem(event, infoType) {
    const selectedValue = event.target.value
    if(!info[infoType].includes(selectedValue)) {
      // push to array
      info[infoType].push(selectedValue)
      // show to chosen list
      showSelectedItem(infoType)
    }
    event.target.selectedIndex = 0
}

function removeSelectedItem(infoType, selectedValue) {
  // remove from array
  info[infoType] = info[infoType].filter(item => item !== selectedValue)
  // show to chosen list
  showSelectedItem(infoType)
}

// onclick="removeSelectedPhoto('${photo}')"

function showSelectedPhoto() {
  const list = document.getElementById('photos-container')
  const reader = new FileReader();

  list.innerHTML = info['photos'].map(photo => {
    const url = URL.createObjectURL(photo)
    console.log(url)
    
    // console.log(reader.readAsDataURL(url))
    return(
      `
      <div class='photo-frame'>
        <img src='${url}' alt='photo-product'>
        <button class='remove-icon'>
          <i class='ri-subtract-line'>
          </i>
        </button>
      </div>
      `
    )
  }).join('')

  const removeBtns = document.getElementById('photos-container').getElementsByClassName('remove-icon')
  for(let i = 0; i < removeBtns.length; i++) {
    removeBtns[i].addEventListener('click', () => {
      removeSelectedPhoto(info['photos'][i])
    })
  }
}

function addSelectedPhoto(event) {
  const selectedFile = event.target.files[0]
  if(selectedFile) {
    // push to array
    info['photos'].push(selectedFile)
    // show to chosen list
    showSelectedPhoto()
  }
}

function removeSelectedPhoto(selectedPhoto) {
  // remove from array
  info['photos'] = info['photos'].filter(photo => photo !== selectedPhoto)
  // show to chosen list
  showSelectedPhoto()
}


function handleSaveProduct() {
  // get product info
  console.log(info)
  // close modal
  $('#modal-manage-product').modal('toggle')
}