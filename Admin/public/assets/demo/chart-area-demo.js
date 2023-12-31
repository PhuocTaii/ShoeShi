// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily =
  '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif'
Chart.defaults.global.defaultFontColor = '#292b2c'


function getAllDaysOfMonthFormatted(year, month) {
  function formatDay(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);

  const daysInMonth = lastDay.getDate();
  const allDays = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    const formattedDate = formatDay(date);
    allDays.push(formattedDate);
  }

  return allDays;
}


// Area Chart Example
var today = new Date();
var currentMonth = today.getMonth() + 1;
var currentYear = today.getFullYear();

var formattedDate = `${currentYear}-${currentMonth.toString().padStart(2, '0')}`;
document.getElementById('month').value = formattedDate;

var allDaysInMonth  = getAllDaysOfMonthFormatted(currentYear, currentMonth);

var ctx = document.getElementById('myAreaChart');
var myLineChart;

$.ajax({
  url: '/chartdata',
  type: 'POST',
  data: {month: formattedDate},
  dataType: 'json',
  success: function(data) {
    var max = Math.max(...data);
    ctx = document.getElementById('myAreaChart')
    myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: allDaysInMonth,
        datasets: [
          {
            label: 'Revenue',
            lineTension: 0.3,
            backgroundColor: 'rgba(2,117,216,0.2)',
            borderColor: 'rgba(2,117,216,1)',
            pointRadius: 5,
            pointBackgroundColor: 'rgba(2,117,216,1)',
            pointBorderColor: 'rgba(255,255,255,0.8)',
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(2,117,216,1)',
            pointHitRadius: 50,
            pointBorderWidth: 2,
            data: data,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              time: {
                unit: 'date',
              },
              gridLines: {
                display: false,
              },
              ticks: {
                maxTicksLimit: allDaysInMonth.length / 2,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                min: 0,
                max: max,
                maxTicksLimit: 10,
              },
              gridLines: {
                color: 'rgba(0, 0, 0, .125)',
              },
            },
          ],
        },
        legend: {
          display: false,
        },
      },
    })
  },
  error: function(err) {
    console.log(err)
  }
})

function updateChart() {
  const Month = document.getElementById('month').value.split('-')[1];
  const Year = document.getElementById('month').value.split('-')[0];
  const AllDaysInMonth  = getAllDaysOfMonthFormatted(Year, Month);
  const date = `${Year}-${Month.toString().padStart(2, '0')}`;
  console.log(date);

  $.ajax({
    url: '/chartdata',
    type: 'POST',
    data: {month: date},
    dataType: 'json',
    success: function(data) {
      var max = Math.max(...data);

      // Update only the data and options of the existing myLineChart instance
      myLineChart.data.labels = AllDaysInMonth;
      myLineChart.data.datasets[0].data = data;
      myLineChart.options.scales.yAxes[0].ticks.max = max;

      // Update the chart to reflect the changes
      myLineChart.update();
    },
    error: function(err) {
      console.log(err)
    }
  })

}