const Melon = require('melon-chart-api');
Melon('04/24/2017', { cutLine: 5 }).daily().then(chartData => {
  console.log(chartData);
})