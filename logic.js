// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("map", {
  center: [45.52, -122.67],
  zoom: 4
});

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

var earthquake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(earthquake_url).then(function(response) {

  console.log(response);

  for (var i = 0; i < response.features.length; i++) {
    var location = response.features[i].geometry;
    var magnitude = response.features[i].properties.mag

    if (location) {
      L.circle([location.coordinates[1], location.coordinates[0]],
        {fillOpacity: location.coordinates[2]/25,
          color: "black",
          fillColor: "green",
          radius: magnitude*10000})
          .addTo(myMap);
    }
  }

});

