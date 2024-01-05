const colorTableTemplate = `
    {{#each this}}
      <tr id="{{this._id}}">
        <td>{{this.color}}</td>
        <td>
          <div class="color-present" style="background-color:{{this.colorCode}}"></div>
        </td>
        <td>
          <button class='edit-btn' onclick='toggleModifyColor("{{this._id}}")'>
            <i class='ri-pencil-line'
            ></i>
          </button>
          <button class='delete-btn' onclick='toggleDeleteItem("color", "{{this._id}}")'>
            <i
              class='ri-delete-bin-6-line'
            ></i>
          </button>
        </td>
      </tr>
    {{/each}}
`

const colorTableFunction = Handlebars.compile(colorTableTemplate);   

$.ajax({
  type: 'GET',
  url: '/color',
  dataType: 'json',
  success: function (response) {
      document.getElementById('color-table').innerHTML = colorTableFunction(response);
  },
  error: function (error) {
  },
})

function rgbToHex(rgb) {
  // Extract the RGB values
  const matches = rgb.match(/\d+/g);
  if (!matches || matches.length !== 3) {
    console.error('Invalid RGB format');
    return null;
  }

  // Convert each RGB value to hexadecimal
  const hexValues = matches.map(value => {
    const hex = Number(value).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  });

  // Construct the hex code
  const hexCode = '#' + hexValues.join('');

  return hexCode;
}

function resetColorModal(id) {
  if(id){
    document.querySelector('#item-name').value = document.querySelector(`#${CSS.escape(id)} td:first-child`).innerHTML
    document.querySelector('#color-code-chosen').innerHTML = rgbToHex(document.querySelector(`#${CSS.escape(id)} .color-present`).style.backgroundColor)
    document.querySelector('#item-color').value = rgbToHex(document.querySelector(`#${CSS.escape(id)} .color-present`).style.backgroundColor)
  } else{
    document.querySelector('#item-name').value = ''
    document.querySelector('#color-code-chosen').innerHTML = ''
    document.querySelector('#item-color').value = '#000000'
  }
}

function toggleAddColor() {
  resetColorModal()
  $('#modal-manage-color').modal('toggle')
  document.getElementById('action-color').innerHTML = `Add color`
  document.querySelector('#modal-manage-color form').onsubmit = function(event) {
    event.preventDefault()
    handleSaveColor(null)
  }
}

function toggleModifyColor(id) {
  resetColorModal(id)
  $('#modal-manage-color').modal('toggle')
  document.getElementById('action-color').innerHTML = `Update color`
  document.querySelector('#modal-manage-color form').onsubmit = function(event) {
    event.preventDefault()
    handleSaveColor(id)
  }
}

function handleSaveColor(id) {

  data = {
    color: document.querySelector('#item-name').value,
    colorCode: document.querySelector('#color-code-chosen').innerHTML
  }


  $.ajax({
    type: id == null ? "POST" : "PUT", 
    url: id == null ? "/color" : `/color/${id}`,
    data,
    dataType: 'json',
    success: function (response) {
      // format toast
      document.getElementById('toast-noti-product').innerHTML = toastTemplateFunction({
        title: (id == null ? "Add" : "Update") + ' color',
        message: (id == null ? "Add" : "Update") + ' color successfully',
        success: true,
      });
      // Trigger toast
      const toastElement = document.querySelector('.toast');
      const toast = bootstrap.Toast.getOrCreateInstance(toastElement);
      toast.show();

      $('#modal-manage-color').modal('toggle')

      document.getElementById('color-table').innerHTML = colorTableFunction(response);

    },
    error: function (err) {
      document.getElementById('toast-noti-product').innerHTML = toastTemplateFunction({
        title: (id == null ? "Add" : "Update") + ' color',
        message: (id == null ? "Add" : "Update") + ' color failed! System error. Please try again!',
        success: false,
      });
      // Trigger toast
      const toastElement = document.querySelector('.toast');
      const toast = bootstrap.Toast.getOrCreateInstance(toastElement);
      toast.show();
    }
  });
}

function showColorCode(colorCode) {
	document.getElementById('color-code-chosen').innerHTML = colorCode
}


const sizeTableTemplate = `
    {{#each this}}
      <tr id="{{this._id}}">
        <td>{{this.size}}</td>
        <td>
          <button class='edit-btn' onclick='toggleModifySize("{{this._id}}")'><i
              class='ri-pencil-line'
            ></i></button>
          <button class='delete-btn' onclick='toggleDeleteItem("size", "{{this._id}}")'><i
              class='ri-delete-bin-6-line'
            ></i></button>
        </td>
      </tr>
    {{/each}}
`

const sizeTableFunction = Handlebars.compile(sizeTableTemplate);   

$.ajax({
  type: 'GET',
  url: '/size',
  dataType: 'json',
  success: function (response) {
      document.getElementById('size-table').innerHTML = sizeTableFunction(response);

  },
  error: function (error) {
  },
})

function resetSizeModal(id) {
  if(id){
    document.querySelector('#item-size').value = document.querySelector(`#${CSS.escape(id)} td:first-child`).innerHTML
  } else{
    document.querySelector('#item-name').value = ''
  }
}

function toggleAddSize() {
  resetSizeModal(null);
  $('#modal-manage-size').modal('toggle')
  document.getElementById('action-size').innerHTML = `Add size`
  document.querySelector('#modal-manage-size form').onsubmit = function(event) {
    event.preventDefault()
    handleSaveSize(null)
  }
}

function toggleModifySize(id) {
  resetSizeModal(id)
  $('#modal-manage-size').modal('toggle')
  document.getElementById('action-size').innerHTML = `Update size`
    document.querySelector('#modal-manage-size form').onsubmit = function(event) {
    event.preventDefault()
    handleSaveSize(id)
  }
}

function handleSaveSize(id) {

  data = {
    size: document.querySelector('#item-size').value,
  }


  $.ajax({
    type: id == null ? "POST" : "PUT", 
    url: id == null ? "/size" : `/size/${id}`,
    data,
    dataType: 'json',
    success: function (response) {
      // format toast
      document.getElementById('toast-noti-product').innerHTML = toastTemplateFunction({
        title: (id == null ? "Add" : "Update") + ' size',
        message: (id == null ? "Add" : "Update") + ' size successfully',
        success: true,
      });
      // Trigger toast
      const toastElement = document.querySelector('.toast');
      const toast = bootstrap.Toast.getOrCreateInstance(toastElement);
      toast.show();

      $('#modal-manage-size').modal('toggle')

      document.getElementById('size-table').innerHTML = sizeTableFunction(response);

    },
    error: function (err) {
      document.getElementById('toast-noti-product').innerHTML = toastTemplateFunction({
        title: (id == null ? "Add" : "Update") + ' size',
        message: (id == null ? "Add" : "Update") + ' size failed! System error. Please try again!',
        success: false,
      });
      // Trigger toast
      const toastElement = document.querySelector('.toast');
      const toast = bootstrap.Toast.getOrCreateInstance(toastElement);
      toast.show();
    }
  });
}

function toggleDeleteItem(type ,id) {
  $('#modal-delete-item').modal('toggle')
  document.querySelector('#modal-delete-item form').onsubmit = function(event) {
    event.preventDefault()
    handleDeleteItem(type,id)
  }
}


function handleDeleteItem(type, id){
  if(type == 'color'){
    $.ajax({
      type: 'DELETE',
      url: `/color/${id}`,
      contentType: 'application/json',
      success: function (response) {
        document.getElementById('color-table').innerHTML = colorTableFunction(response);
        $('#modal-delete-item').modal('toggle')
        document.getElementById('toast-noti-product').innerHTML = toastTemplateFunction({
          title: 'Delete ' + type,
          message: 'Delete ' + type + ' successfully',
          success: true,
        });
        const toastElement = document.querySelector('.toast');
        const toast = bootstrap.Toast.getOrCreateInstance(toastElement);
        toast.show();
      },
      error: function (error) {
        document.getElementById('toast-noti-product').innerHTML = toastTemplateFunction({
          title: 'Delete ' + type,
          message: 'Delete ' + type + ' failed! System error. Please try again!',
          success: false,
        });
        const toastElement = document.querySelector('.toast');
        const toast = bootstrap.Toast.getOrCreateInstance(toastElement);
        toast.show();
      },
    })
  }
  if(type == 'size'){
    $.ajax({
      type: 'DELETE',
      url: `/size/${id}`,
      contentType: 'application/json',
      success: function (response) {
        document.getElementById('size-table').innerHTML = sizeTableFunction(response);
        $('#modal-delete-item').modal('toggle')
        document.getElementById('toast-noti-product').innerHTML = toastTemplateFunction({
          title: 'Delete ' + type,
          message: 'Delete ' + type + ' successfully',
          success: true,
        });
        const toastElement = document.querySelector('.toast');
        const toast = bootstrap.Toast.getOrCreateInstance(toastElement);
        toast.show();
      },
      error: function (error) {
        document.getElementById('toast-noti-product').innerHTML = toastTemplateFunction({
          title: 'Delete ' + type,
          message: 'Delete ' + type + ' failed! System error. Please try again!',
          success: false,
        });
        const toastElement = document.querySelector('.toast');
        const toast = bootstrap.Toast.getOrCreateInstance(toastElement);
        toast.show();
      },
    })
  }
}