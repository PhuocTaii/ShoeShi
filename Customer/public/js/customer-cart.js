// function renderLocalCart() {
//     const localCartData = JSON.parse(localStorage.getItem('cartData'))
  
//     const source = document.getElementById('local-cart').innerHTML;
//     const template = Handlebars.compile(source);
    
//     const context = { localCart: localCartData };
//     const html = template(context);
  
//     document.getElementById('local-cart').innerHTML = html;
//   }
  
//   // Call the function when the DOM is ready
//   document.addEventListener('DOMContentLoaded', function () {
//     renderLocalCart();
// });

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
                    <p class='mb-3'>Color: {{this.color}}</p>
                    <p class='mb-3'>Size: {{this.size}}</p>
                    <div class='mb-3 input-quant'>
                    <label>Quantity: </label>
                    <input type='number' required min='1' value='1' />
                    </div>
                </div>
                </div>
                <div class='right-box-info col-6'>
                <p class='m-0 fw-bold'>{{this.price}}</p>
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
            document.getElementById("total-item").innerHTML = data.totalAmount 
            document.getElementById("total-price").innerHTML = data.totalPrice
            document.getElementById("total").innerHTML = data.total + '₫'
        },
        error: function (error) {
        },
    })
}