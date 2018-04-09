"use strict";
/* global places, ko, $ */
/* eslint-disable no-unused-vars */

var map;

function googleScriptFailedLoading() {
  $("#map").html("Wops, Google map could not load");
}

function googleScriptLoaded() {
  map = new Map();
  var viewModel = new MainViewModel();
  ko.applyBindings(viewModel);
}

function MainViewModel() {
  let self = this;

  self.toogleMenu = ko.observable(false);
  /**
   * Pulls data from the location database, creates marker for each location.
   * Each marker is set up with on click events and an info field from the database.
   * In the future the places.js should be be included in a database*/
  self.markersFavorites = () => {
    var markers = [];
    places.forEach(place => {
      var marker = Map.createMarker(
        place.position,
        null,
        place.title,
        map.markerStyle_default,
        place.fourSquareId
      );
      markers.push(marker);
    });
    return markers;
  };

  //text entered into a filter field
  self.currentFilter = ko.observable();

  //displays favorite markers that were filtered by current filter.
  self.markersDisplayed = ko.computed(function() {
    //console.log(!self.currentFilter());
    if (!self.currentFilter()) {
      //console.log(self.markersFavorites());
      return self.markersFavorites();
    } else {
      return ko.utils.arrayFilter(self.markersFavorites(), function(marker) {
        return marker.title
          .toLowerCase()
          .includes(self.currentFilter().toLowerCase());
      });
    }
  });

  //When markersDisplayed changes, map should update the markers it's showing
  self.markersDisplayed.subscribe(() => {
    map.showMarkers(self.markersDisplayed());
  });

  self.currentFilter.valueHasMutated(); //Force the self.markersDisplayed to recalculate when first loaded
}
