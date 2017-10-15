window.onload = function drawChart() {

	var today = new Date();
	var date = today.getMonth() + '/' + today.getDate() + '/' + today.getFullYear();

	const Melon = require('melon-chart-api');
	Melon(date, { cutLine: 50 }).daily().then(chartData => {
	  var dataDump = chartData['data'];
	  var titles = [];
	  var artists = [];
	  var albums = [];
	  var albumArt = [];

	  for (track of dataDump) {
	  	titles.push(track['title']);
	  	artists.push(track['artist']);
	  	albums.push(track['album']);
	  }

	  chart_list = document.getElementById('chart_list');
	  for (var i = 0; i < titles.length; i++) {
	  	chart_item = document.createElement('li');
	  	chart_item.innerHTML = artists[i] + " " + albums[i] + " " + titles[i] + 
	  	" " + albumCover(albums[i]);
	  	break;
	  	chart_list.appendChild(chart_item);
	  }
	  console.log(chart_list);
	})
}

function albumCover(albums) {
    var xmlHttp = new XMLHttpRequest(),
    	theUrl = "http://www.maniadb.com/api/search/" + albums + "/?sr=album&display=1&key=[apikey]&v=0.5",
    	method = "GET";

    xmlHttp.open(method, theUrl, true); 
    xmlHttp.onreadystatechange = function() {
    	if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
    		var text = xmlHttp.responseText;
    		var parser = new DOMParser();
    		var xmlDoc = parser.parseFromString(text,"text/xml");
    		console.log(text);
    		thumb_url = document.querySelector('#collapsible124 > div.expanded > div.collapsible-content > span');
    		// console.log(thumb_url);
    		var someshit = xmlDoc.getElementsByTagName("maniadb:coverart")[0];
    		someshit_2 = someshit.childNodes[1].childNodes[5].innerHTML;

    	}
    	else if(xmlHttp.readyState == 4 && xmlHttp.status == 500) {
    		alert("Please try again!");
    	}
    };
    xmlHttp.send();
}



