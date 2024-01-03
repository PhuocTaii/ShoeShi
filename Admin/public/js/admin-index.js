var today = new Date();
var currentMonth = today.getMonth() + 1;
var currentYear = today.getFullYear();

var formattedDate = `${currentYear}-${currentMonth.toString().padStart(2, '0')}`;
document.getElementById('month-table').value = formattedDate;

const table = `
    {{#each this}}
        <tr>
            <td>{{this.product}}</td>
            <td>{{this.count}}</td>
            <td>{{this.revenue}}</td>
        </tr>
    {{/each}}
`

const tableFunction = Handlebars.compile(table);   

$.ajax({
    type: 'POST',
    url: '/tabledata',
    data: {month: formattedDate},
    dataType: 'json',
    success: function (data) {
        document.getElementById('table-data').innerHTML = tableFunction(data);
    },
    error: function (error) {
    },
})

function updateTable(){
    const Month = document.getElementById('month-table').value.split('-')[1];
    const Year = document.getElementById('month-table').value.split('-')[0];
    const date = `${Year}-${Month.toString().padStart(2, '0')}`;
    $.ajax({
        type: 'POST',
        url: '/tabledata',
        data: {month: date},
        dataType: 'json',
        success: function (data) {
            document.getElementById('table-data').innerHTML = tableFunction(data);
        },
        error: function (error) {
        },
    })
}
