const user = document.getElementById('user-cart').getAttribute('data-user')

if(!user){
    const localCartTemplate = 
    `
    {{#each this}}
        <div class="item row my-3">
            <div class='col-md-3 p-0'>
                <img
                    src='{{this.image}}'
                    class='img-fluid'
                    alt='cart img'
                />
            </div>
            <div class='col-md-9 mx-auto px-4 mt-2'>
            <div class='row h-100'>
                <!-- product name  -->
                <div class='left-box-info col-6 card-title'>
                <p class='mb-3 fw-bold'>{{this.product}}</p>
                <div class='info'>
                    <p class='mb-3'  id="product-color-{{this.id}}">Color: {{this.color}}</p>
                    <p class='mb-3' id="product-size-{{this.id}}">Size: {{this.size}}</p>
                    <div class='mb-3 input-quant'>
                    <label>Quantity: </label>
                    <input type='number' id="{{this.id}}" required min='1' value='{{this.quantity}}' oninput="updateCart('{{this.productID}}', '{{this.colorId}}', '{{this.sizeId}}')" />
                    </div>
                </div>
                </div>
                <div class='right-box-info col-6'>
                <p class='m-0 fw-bold' data-product-price='{{this.price}}' id="product-price-{{this.id}}">{{this.price}}</p>
                <img class='mb-3' src='assets/img/trash-icon.svg' alt='' />
                </div>
            </div>
            </div>
        </div>
    {{/each}}
    `
    
    const localCartTemplateFunction = Handlebars.compile(localCartTemplate);
    
    const localCartData = JSON.parse(localStorage.getItem('cartData'))
    $.ajax({
        type: 'POST',
        url: '/cart/local',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(localCartData),
        success: function (data) {
            document.getElementById('local-cart').innerHTML = localCartTemplateFunction(data.detailList);
            document.getElementById("total-item").innerHTML = data.totalAmount + ' items'
            document.getElementById("total-price").innerHTML = data.totalPrice
            document.getElementById("total").innerHTML = data.total + '₫'
        },
        error: function (error) {
        },
    })
    // document.getElementById("number-cart-items").innerHTML = localCartData.length
    // console.log(localCartData.length)

}

function updateCart(productId, colorId, sizeId) {
    const id = productId + colorId + sizeId
    const productQuantity = document.getElementById(id).value
    const productPrice = Number(document.getElementById("product-price-" + id).getAttribute('data-product-price'));
    const user = document.getElementById('user-cart').getAttribute('data-user')
    if(user){
        $.ajax({
            type: 'PUT',
            url: `/cart/updateproduct/${productId}`,
            data: {quantity: productQuantity, color: colorId.toString(), size: sizeId.toString()},
            dataType: 'json',
            success: function (data) {
                var tAmount = 0;
                var tPrice = 0;
                for(let i = 0; i < data.length; i++){
                    tAmount += data[i].quantity
                    tPrice += data[i].quantity * data[i].price
                }
                const total = Number(tPrice + 20000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                
                document.getElementById("log-total-item").innerHTML = tAmount + ' items'
                document.getElementById("log-total-price").innerHTML = tPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                document.getElementById("log-total").innerHTML = total + '₫'
            },
            error: function (error) {
            },
        })
    } else{
        var localCart = JSON.parse(localStorage.getItem('cartData')) || [];
        var totalPrice = 0
        var cnt = 0;
        for(let i = 0; i < localCart.length; i++){
            if(localCart[i].productId == productId && localCart[i].color == colorId && localCart[i].size == sizeId){
                localCart[i].quantity = productQuantity;
                cnt += Number(productQuantity)
                localStorage.setItem('cartData', JSON.stringify(localCart));
            } else{
                cnt += Number(localCart[i].quantity)
            }
            totalPrice += Number(localCart[i].quantity * localCart[i].productPrice)
        }
        const total = Number(totalPrice + 20000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        document.getElementById("total-item").innerHTML = cnt + ' items'
        document.getElementById("total-price").innerHTML = totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        document.getElementById("total").innerHTML = total + '₫'
    }

}

function checkoutPage(){
    $.ajax({
        type: 'GET',
        url: '/checkout',
        success: function () {
            window.location.href = '/checkout'
        },
        error: function (error) {
        },
    })
}