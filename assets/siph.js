// Initialize Firebase
var config = {
 apiKey: "AIzaSyDSqVrrCzIDY3FydRzWwBVrTwFAXHo0imU",
 authDomain: "siph-1494544739001.firebaseapp.com",
 databaseURL: "https://siph-1494544739001.firebaseio.com",
 projectId: "siph-1494544739001",
 storageBucket: "siph-1494544739001.appspot.com",
 messagingSenderId: "524514555118"
};
firebase.initializeApp(config);

var baseUrl = "https://api.spotcrime.com/crimes.json?lat=39.9525838&lon=-75.165222&radius=0.08&callback=jQuery21306930704791620661_1494546905160&key=privatekeyforspotcrimepublicusers-commercialuse-877.410.1607&_=1494546905164"
// this variable is used by renderCrimeList
var crimes = [];

function renderCrimeList(crimes) {
    $("#map-content").css('height', '0px');
    $("#map-content").css('visibility', 'hidden');
    $("#map-content").css('overflow', 'hidden');
    $("#crime-content").html('<h2 class="lrg-center-text">Top Five Crimes in Area</h2>');
    //Loop through type of crimes so the first five are displayed in Lightbox div after Submit button clicked
    for(var i=0; i<5;i++){
		var crime = crimes[i];
		if (crime) {
			var crimeType = crimes.type;
			var crimeAddress = crime.address;
			console.log("Crime Type: " + crimeType + " " + "Crime Address: " + crimeAddress);
			$("#crime-content").append('<p> Crime: ' + crimeType + "; " + 'Crime Address: ' + crimeAddress + '<br></br>' + '</p>');
		}
    }
    $("#crime-container").css('visibility', 'visible');
    $("#crime-container").css('height', '100%');
}

//Give New Location button a function so user can start over
$(".newlocation-btn").click(function() {
  $("#map-content").css('height', '100%');
  $("#map-content").css('visibility', 'visible');
  $("#crime-content").empty();
  $("#crime-container").css('visibility', 'hidden');
  $("#crime-container").css('height', '0px');
});

function closeLightbox(){
	console.log("I am closing a light box.");
	$(".lightbox").css('visibility', 'hidden');
	$(".lightbox-content").css('visibility', 'hidden');
}


$(".lightbox").delay(200).fadeIn(1000);
$( ".lightbox-btn" ).click(function() {
	closeLightbox();
});

$(".locate-btn" ).click(function() {
  // crimes array shouldbe full from calling getCrimes
	renderCrimeList(crimes);
});

function getCrimes (lat, lng){
  var baseUrl = "https://api.spotcrime.com/crimes.json?lat=" + lat + "&lon="+ lng +"&radius=0.08&callback=jQuery21306930704791620661_1494546905160&key=privatekeyforspotcrimepublicusers-commercialuse-877.410.1607&_=1494546905164"
  $.ajax({
    url: baseUrl,
    method: "GET",
    dataType:'jsonp'
  }).done(function(crimeStats) {
	  // renderCrimeList will be clicked later
	  // so we need the list of crimes available
	  // when it's clicked
      crimes = crimeStats.crimes;
	  
      addCrimesToMap(crimeStats.crimes);
  });
}
function addCrimesToMap(crimes) {
  // get reference to map
  crimes.forEach(function(crime, index){
    console.log("Crime " + index, crime);
    // add a marker to map
    var latLng = {lat: crime.lat, lng: crime.lon};

    var infowindow = new google.maps.InfoWindow({
      content: "<h1>" + crime.type + "</h1>"
    });

    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      //label: crime.type,
    });

    marker.addListener('mouseover',function(){
        infowindow.open(map, marker);
    });

    marker.addListener('click', function(){
        infowindow.close(map, marker);
    });
   
  });
}
var map, marker;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 11
      });
        
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            marker = new google.maps.Marker({
              position:pos,
              map:map,
              title:"Location Found",
              icon:"assets/images/pin2.png",
              zIndex:1,

            });
            /*marker.setPosition(pos);
            marker.setContent('Location found.');
            marker.open(map);*/
            map.setCenter(pos);
            getCrimes(pos.lat, pos.lng);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }