function createOrder(event){
    event.preventDefault();
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phoneNum = document.getElementById('phone-num').value;

    console.log(name);
    console.log(address);
    console.log(phoneNum); 

    $.ajax({
        url: '/checkout',
        type: 'POST',
        data: {name: name, address: address, phone: phoneNum},
        dataType: 'json',
        success: function(data) {
            console.log(data);
            window.location.href = '/order';
            alert('Create order successfully');
        },
        error: function(err) {
            // console.log(err)
            // window.location.href = '/login';
            alert('Not enough product');

        }
    })
}