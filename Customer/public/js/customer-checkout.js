function createOrder(event){
    event.preventDefault();
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phoneNum = document.getElementById('phone-num').value;

    $.ajax({
        url: '/checkout',
        type: 'POST',
        data: {name: name, address: address, phone: phoneNum},
        dataType: 'json',
        success: function(data) {
            if(data.valid){
                alert(data.message);
                window.location.href = '/order'; 
            } else{
                alert(data.message);
            }
        },
        error: function(err) {
            // alert('Not enough product');
        }
    })
}