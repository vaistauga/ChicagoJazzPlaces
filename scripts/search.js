/*



 function textSearchPlaces() {
    var bounds = mainViewModel.map.mapWidget.getBounds();
    mainViewModel.map.hideMarkers();
    var placesService = new google.maps.places.PlacesService(
      mainViewModel.map.mapWidget
    );
    placesService.textSearch(
      {
        query: $("#zoomToAreaTextID")
          .first()
          .val(),
        bounds: bounds
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.Ok) {
          var markers = [];
          results.forEach(place => {
            var marker = Map.createMarker(
              place.geometry.location,
              null,
              place.name,
              place.icon,
              place.id
            );
            markers.push(marker);
          });
          mainViewModel.markersDisplayed(markers);
        }
      }
    );
  }

  // When user pick a places from the searchBox, clear all current markers and add the markers from the searchBox 
  searchBox.addListener("places_changed", () => {
    var markers = [];
    mainViewModel.map.hideMarkers();
    var places = searchBox.getPlaces();
    if (places.length == 0) {
      alert("Error: no place like this fount");
    } else {
      places.forEach(place => {
        var marker = Map.createMarker(
          place.geometry.location,
          null,
          place.name,
          place.icon
        );
        markers.push(marker);
      });
      mainViewModel.markersDisplayed(markers);
    }
  });


    //Searchbox component is the thing that show sugestions as one types into the searchbox.
   // Notice tha this component and the text search components are handled seperatly.
  var searchBox = new google.maps.places.SearchBox($("#zoomToAreaTextID")[0]);

  /Set the searchbox bounds to the screen on load. This is a 'soft' restriction that should keep the results within Chicago.
   * because the map loads async, I have to wait for it to be loaded before using it's getBounds().  Add listender once get's called only once. 
  google.maps.event.addListenerOnce(
    mainViewModel.map.mapWidget,
    "tilesloaded",
    () => {
      searchBox.setBounds(mainViewModel.map.mapWidget.getBounds());
    }
  );
  
*/
