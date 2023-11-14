window.addEventListener('DOMContentLoaded', event => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki
    
    const tableCate = document.getElementById('category');
    if (tableCate) {
        new DataTable(tableCate, {
            lengthMenu: [5, 10, 20, 50],
            scrollX: true,
            columnDefs: [{ width: 30, targets: 0 }, { width: "20%", targets: 2 }],
        });
    }

    const tableManu = document.getElementById('manufacturer');
    if (tableManu) {
        new DataTable(tableManu, {
            lengthMenu: [5, 10, 20, 50],
            scrollX: true,
            columnDefs: [{ width: 30, targets: 0 }, { width: "20%", targets: 2 }],
        });
    }
});

document.getElementsByClassName("btn category")[0].addEventListener("click", function () {
    $('#modal-manage-item').modal('toggle')
    document.getElementById("action").innerHTML = `Add new category`;
});

const btnsEditCate = document.getElementById('category').getElementsByClassName("edit-btn")
Array.from(btnsEditCate).forEach(btn => {
    btn.addEventListener("click", function () {
        $('#modal-manage-item').modal('toggle')
        document.getElementById("action").innerHTML = `Update category`;
    });
});

const btnsDeleteCate = document.getElementById('category').getElementsByClassName("delete-btn")
Array.from(btnsDeleteCate).forEach(btn => {
    btn.addEventListener("click", function () {
        $('#modal-delete-item').modal('toggle')
    });
});

document.getElementsByClassName("btn manufacturer")[0].addEventListener("click", function () {
    $('#modal-manage-item').modal('toggle')
    document.getElementById("action").innerHTML = `Add new manufacturer`;
});

const btnsManu = document.getElementById('manufacturer').getElementsByClassName("edit-btn")
Array.from(btnsManu).forEach(btn => {
    btn.addEventListener("click", function () {
        $('#modal-manage-item').modal('toggle')
        document.getElementById("action").innerHTML = `Update manufacturer`;
    });
});

const btnsDeleteManu = document.getElementById('manufacturer').getElementsByClassName("delete-btn")
Array.from(btnsDeleteManu).forEach(btn => {
    btn.addEventListener("click", function () {
        $('#modal-delete-item').modal('toggle')
    });
});