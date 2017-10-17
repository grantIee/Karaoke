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
	  	chart_item.innerHTML = artists[i] + " " + albums[i] + " " + titles[i];
        albumCover(chart_item, albums[i]);
	  	chart_list.appendChild(chart_item);
	  }
	  // console.log(chart_list);
	})
}

function albumCover(list_item, albums) {
    var xmlHttp = new XMLHttpRequest(),
    	theUrl = "http://www.maniadb.com/api/search/" + albums + "/?sr=album&display=1&key=[apikey]&v=0.5",
    	method = "GET"

    xmlHttp.open(method, theUrl, true);
    var to_feed = null;
    xmlHttp.onreadystatechange = function(to_feed) {
    	if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
    		parse_response(list_item, xmlHttp.responseText);
    	}
    	else if(xmlHttp.readyState == 4 && xmlHttp.status == 500) {
    		alert("Please try again!");
    	}
    };
    xmlHttp.send();
    return to_feed;
}

function parse_response(list_item, text) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(text,"text/xml");
    thumb_url = document.querySelector('#collapsible124 > div.expanded > div.collapsible-content > span');          
    var origin = xmlDoc.getElementsByTagName("maniadb:coverart")[0];
    if(origin != null){
        picurl = origin.childNodes[1].childNodes[5].innerHTML;
        var line = picurl;
        var re = /[<!CDATA\[\]>]/g;
        var fin = line.replace(re,'');
        var album_cover = document.createElement('img');
        album_cover.setAttribute('src', fin);
        album_cover.setAttribute('width', 200);
        album_cover.setAttribute('height', 200);
        list_item.appendChild(album_cover);
    }
}


