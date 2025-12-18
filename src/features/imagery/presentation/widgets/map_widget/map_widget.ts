var map = L.map('map').setView([51.505, -0.09], 13);
var popup = L.popup();
var latlng;
function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
  latlng = e.latlng;
}

map.on('click', onMapClick);
