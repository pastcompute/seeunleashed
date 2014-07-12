// --------------------------------------------------------------------------
// This is a sandbox used by the YUI toolkit
// --------------------------------------------------------------------------
YUI().use('node', 'event', 'button', function (Y) {
    // The Node and Event modules are loaded and ready to use.
	var oSubmitButton1 = new Y.one('input[name="ask_school"]');
//, { value: "submitbutton1value" }); 
	var formId = "form1", form = Y.one("#"+formId), uri = form.get('action'), method = form.get('method');
	form.on('submit', function(e) {
    form1.submit();
	})
});


YUI().use('autocomplete', 'autocomplete-filters', 'autocomplete-highlighters', function (Y) {
  var states = myPyGlobal;
  Y.one('#ac-input').plug(Y.Plugin.AutoComplete, {
    resultFilters    : 'phraseMatch',
    resultHighlighter: 'phraseMatch',
    source           : states
  });
});

// --------------------------------------------------------------------------
// Code required by leaflet for the Mapping visuals
// --------------------------------------------------------------------------
var map;
// This function sets up the map display
function initmap() {
	map = new L.Map("the-map");

	// create OpenStreetMap tile layer with the correct attribution
	var smUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var smAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	var streetMapLayer = new L.TileLayer( smUrl, {minZoom: 6, maxZoom: 13, attribution: smAttrib});

	// Lets center on Adelaide :-)
	map.setView(new L.LatLng(myPyLat,myPyLon),10);
	map.addLayer(streetMapLayer);

	L.marker([myPyLat,myPyLon]).addTo(map).bindPopup("<b>" + myPySchoolName + "</b>").openPopup();

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

// This loads the map at start.
// TODO - work out how to turn on and off from the Python code
function onloadHandler()
{
	initmap();
}


