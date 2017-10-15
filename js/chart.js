window.onload = function drawChart() {


	var today = new Date();
	var date = today.getMonth() + '/' + today.getDate() + '/' + today.getFullYear();


	const Melon = require('melon-chart-api');
	Melon(date, { cutLine: 5 }).daily().then(chartData => {
	  var dataDump = chartData['data'];
	  var titles = [];
	  var artists = [];
	  var albums = [];

	  for (track of dataDump) {
	  	titles.push(track['title']);
	  	artists.push(track['artist']);
	  	albums.push(track['album']);
	  }

	  chart_list = document.getElementById('chart_list');
	  for (var i = 0; i < titles.length; i++) {
	  	chart_item = document.createElement('li');
	  	chart_item.innerHTML = artists[i] + " " + albums[i] + " " + titles[i] + " ";
	  	chart_list.appendChild(chart_item);
	  }
	  console.log(chart_list);
	})
}
