var map;
function initmap() {
	map = new L.Map("the-map");

	// create OpenStreetMap tile layer with the correct attribution
	var smUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var smAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	var streetMapLayer = new L.TileLayer( smUrl, {minZoom: 6, maxZoom: 13, attribution: smAttrib});

	// Lets center on Adelaide :-)
	map.setView(new L.LatLng(-34.929, 138.6010),6);
	map.addLayer(streetMapLayer);

	L.marker([-34.933, 138.602]).addTo(map)
		.bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

	L.circle([-34.922,138.612], 500, {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.5
	}).addTo(map).bindPopup("I am a circle.");

	L.polygon([
		[-34.91, 134.2],
		[-34.92, 134.3],
		[-33.9, 134.2]
	]).addTo(map).bindPopup("I am a polygon.");
	var popup = L.popup();

	function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent("You clicked the map at " + e.latlng.toString())
			.openOn(map);
	}

	map.on('click', onMapClick);
}

function onloadHandler()
{
	initmap();
}
