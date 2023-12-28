function createOrder(event){
    event.preventDefault();
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phoneNum = document.getElementById('phone-num').value;
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

    console.log(name);
    console.log(address);
    console.log(phoneNum);
    console.log(paymentMethod);

    $.ajax({
        url: '/checkout',
        type: 'POST',
        data: {name: name, address: address, phone: phoneNum},
        dataType: 'json',
        success: function(data) {
            alert('Create order successfully');
        },
        error: function(err) {
            console.log(err)
            // redirect('/login');
            window.location.href = '/login';
        }
    })
}