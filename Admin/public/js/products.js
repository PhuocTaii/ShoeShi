window.addEventListener('DOMContentLoaded', event => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki
    
    const tableProd = document.getElementById('product');
    if (tableProd) {
        new DataTable(tableProd, {
            lengthMenu: [5, 10, 20, 50],
            scrollX: true,
        });
    }
});

document.getElementsByClassName("btn product")[0].addEventListener("click", function () {
    $('#modal-manage-product').modal('toggle')
    document.getElementById("action-product").innerHTML = `Add new product`;
});

const btnsEditProd = document.getElementById('product').getElementsByClassName("edit-btn")
Array.from(btnsEditProd).forEach(btn => {
    btn.addEventListener("click", function () {
        $('#modal-manage-product').modal('toggle')
        document.getElementById("action-product").innerHTML = `Update product`;
    });
});

const btnsDeleteProd = document.getElementById('product').getElementsByClassName("delete-btn")
Array.from(btnsDeleteProd).forEach(btn => {
    btn.addEventListener("click", function () {
        $('#modal-delete-product').modal('toggle')
    });
});

function handleAddPhotoProduct(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
        // handle file upload here

        // add photo to photo container in modal
        const photoContainer = document.getElementById("photos-product").getElementsByClassName("photos-container")[0];
        const newDiv = document.createElement("div");
        newDiv.classList.add("photo-frame");

        const newImg = document.createElement("img");
        newImg.setAttribute("src", URL.createObjectURL(selectedFile));
        newImg.setAttribute("alt", "product");

        const newButton = document.createElement("button");
        newButton.classList.add("remove-icon");
        newButton.addEventListener("click", handleRemovePhotoProduct);

        const newIcon = document.createElement("i");
        newIcon.classList.add("ri-subtract-line");

        newButton.appendChild(newIcon);
        newDiv.appendChild(newImg);
        newDiv.appendChild(newButton);
        photoContainer.appendChild(newDiv);
    }
}

function handleRemovePhotoProduct(event) {
    const rowContainer = document.getElementById("photos-product").getElementsByClassName("photos-container")[0];
    rowContainer.removeChild(event.currentTarget.parentElement);
}

function addColorElement() {
    const rowContainer = document.getElementById("color-container").getElementsByClassName("input-container")[0];
    
    const newDiv = document.createElement("div");
    newDiv.classList.add("row");

    const columns = ["color-product", "size-color", "quant-color", "remove-icon"];
    columns.forEach(colClass => {
        const column = document.createElement("div");

        if (colClass === "remove-icon") {
            column.classList.add("col-1");
            const dummySpace = document.createElement("div");
            dummySpace.classList.add("dummy-space");

            const removeButton = document.createElement("button");
            removeButton.classList.add("remove-icon");
            removeButton.addEventListener("click", removeColorElement);

            const icon = document.createElement("i");
            icon.classList.add("ri-subtract-line");

            removeButton.appendChild(icon);

            column.appendChild(dummySpace);
            column.appendChild(removeButton);
        } else {
            column.classList.add("col");
            const label = document.createElement("label");
            label.textContent = colClass === "color-product" ? "Color" : colClass === "size-color" ? "Size" : "Quantity";

            const input = document.createElement("input");
            input.setAttribute("type", colClass === "color-product" ? "color" : "number");
            input.setAttribute("class", `${colClass}`);
            input.setAttribute("min", colClass === "quant-color" ? 1 : 0);

            column.appendChild(label);
            column.appendChild(input);
        }

        newDiv.appendChild(column);
    });

    rowContainer.appendChild(newDiv);
}

function removeColorElement(event) {
    const rowContainer = document.getElementById("color-container").getElementsByClassName("input-container")[0];
    rowContainer.removeChild(event.currentTarget.parentElement.parentElement);
}