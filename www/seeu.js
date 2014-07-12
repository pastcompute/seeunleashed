// --------------------------------------------------------------------------
// This is a sandbox used by the YUI toolkit
// --------------------------------------------------------------------------
YUI().use('node', 'event', function (Y) {
    // The Node and Event modules are loaded and ready to use.
});

YUI().use('datasource', function (Y) {
    // DataSource is available and ready for use
    var myDataSource = new Y.DataSource.Get({
        source: "http://localhost/seeu/ws_schools.psp?"
    });
    myDataSource.plug({fn: Y.Plugin.DataSourceJSONSchema, cfg: {
        schema: {
            resultListLocator: "Result",
            resultFields: ["Name"]
        }
    }});
    myDataSource.sendRequest({
        request: "",
        on: {
            success: function(e){
                alert(e.response);
            },
            failure: function(e){
                alert(e.error.message);
            }
        }
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
	map.setView(new L.LatLng(-34.929, 138.6010),6);
	map.addLayer(streetMapLayer);

	L.marker([-34.933, 138.602]).addTo(map).bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

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


