/*
Syncing with the Master Branch
0) COMMIT ALL OF THE CHANGES ON YOUR LOCAL BRANCH
1) git checkout master
2) git pull origin master
3) git checkout MY_BRANCH
4) git merge master
Put Your Changes Into Master Branch
0) COMMIT ALL OF THE CHANGES ON YOUR LOCAL BRANCH
1) git checkout master
2) git merge bryan
*/



//Should I Park Here

/*
Syncing with the Master Branch
0) COMMIT ALL OF THE CHANGES ON YOUR LOCAL BRANCH
1) git checkout master
2) git pull origin master
3) git checkout MY_BRANCH
4) git merge master
Put Your Changes Into Master Branch
0) COMMIT ALL OF THE CHANGES ON YOUR LOCAL BRANCH
1) git checkout master
2) git merge bryan
3) git thanks bryan for keeping your personal notes in
*/

function closeLightbox(){
  $(".lightbox").css('visibility', 'hidden');
  $(".lightbox-content").css('visibility', 'hidden');
}

$(".lightbox").delay(200).fadeIn(1000);

$( ".lightbox-btn" ).click(function() {
  closeLightbox();
});

$(".locate-btn" ).click(function() {
  runQuery();
});


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

//define var for 1st auth key for first API

var authKey1 = "privatekeyforspotcrimepublicusers-commercialuse-877.410.1607";
var baseUrl = "https://api.spotcrime.com/crimes.json?lat=39.9525838&lon=-75.165222&radius=0.08&callback=jQuery21306930704791620661_1494546905160&key=privatekeyforspotcrimepublicusers-commercialuse-877.410.1607&_=1494546905164"

function runQuery() {

  // The AJAX function uses the queryURL and GETS the JSON data associated with it.
  // The data then gets stored in the variable called: "NYTData"


  $.ajax({
    url: baseUrl,
    method: "GET",
    dataType:'jsonp'
  }).done(function(crimeStats) {
  $("#map-content").css('height', '0px');
  $("#map-content").css('visibility', 'hidden');
  $("#map-content").css('overflow', 'hidden');
    $("#crime-content").html('<h2 class="lrg-center-text">Top Five Crimes in Area</h2>');
    //Loop through type of crimes so the first five are displayed in Lightbox div after Submit button clicked
    for(var i=0; i<5;i++){
        var crimeType = crimeStats.crimes[i].type;
        var crimeAddress = crimeStats.crimes[i].address;
        console.log("Crime Type: " + crimeType + " " + "Crime Address: " + crimeAddress);
        $("#crime-content").append('<p> Crime: ' + crimeType + "; " + 'Crime Address: ' + crimeAddress + '<br></br>' + '</p>');
    }
  $("#crime-container").css('visibility', 'visible');
  $("#crime-container").css('height', '100%');
  });
};

//Give New Location button a function so user can start over
$(".newlocation-btn").click(function() {
  $("#map-content").css('height', '100%');
  $("#map-content").css('visibility', 'visible');
  $("#crime-content").empty();
  $("#crime-container").css('visibility', 'hidden');
  $("#crime-container").css('height', '0px');
});

// going to have to create some type of if then statement
// that will filter wether the user is trying to search or 
// if its getting their current location

function initMap() {

        var uluru = {lat: -25.363, lng: 131.044};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
};





$(".locate-btn").click(function() {
  
  var startPos;
  var nudge = document.getElementById("nudge");

  var showNudgeBanner = function() {
    nudge.style.display = "block";
  };

  var hideNudgeBanner = function() {
    nudge.style.display = "none";
  };

  var nudgeTimeoutId = setTimeout(showNudgeBanner, 5000);

  var geoSuccess = function(position) {
    hideNudgeBanner();
    // We have the location, don't display banner
    clearTimeout(nudgeTimeoutId);

    // Do magic with location
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  var geoError = function(error) {
    switch(error.code) {
      case error.TIMEOUT:
        // The user didn't accept the callout
        showNudgeBanner();
        break;
    }
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
});

window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
};

var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 13
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
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
 function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.8688, lng: 151.2195},
          zoom: 13,
          mapTypeId: 'roadmap'
        });

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
      }









//define var for 2nd auth key



//global vars 


/* UPDATE - maybe create a lightbox that has the user enter, then
opens up to the initial page with just the map and the search field
and the button to track location. then have another lightbox display
the score and the recent crimes in the area */


//load up function 
//want map to be zoomed out to a world view when page opens up 
//want our rating to be cleared out on load 

//locate me button onclick loads up to google map api location finde