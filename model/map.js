"use strict";

class Map {
  constructor() {
    this.mapWidget;
    this._shownMarkers = [];
    this.infoWindow;
    this.markerStyle_default = Map.makeMarkerIcon("0091ff");
    this.markerStyle_hoveredOver = Map.makeMarkerIcon("ffff24");
    this._defaultCenter = { lat: 41.878114, lng: -87.629798 };
    this._defaultZoom = 12;
    //Method binding to the instance
    this.hideMarkers = this.hideMarkers.bind(this);
    this.showMarkers = this.showMarkers.bind(this);
    this.createInfoWindow = this.createInfoWindow.bind(this);
    this.resetView = this.resetView.bind(this);
    this.resetView = this.toggleMarkerSelection.bind(this);

    //Initialize map
    this.mapWidget = new google.maps.Map($("#map")[0], {
      center: this._defaultCenter,
      zoom: this._defaultZoom,
      mapTypeControl: false,
      styles: [
        {
          elementType: "geometry",
          stylers: [
            {
              hue: "#ff4400"
            },
            {
              saturation: -68
            },
            {
              lightness: -4
            },
            {
              gamma: 0.72
            }
          ]
        },
        {
          featureType: "road",
          elementType: "labels.icon"
        },
        {
          featureType: "landscape.man_made",
          elementType: "geometry",
          stylers: [
            {
              hue: "#0077ff"
            },
            {
              gamma: 3.1
            }
          ]
        },
        {
          featureType: "water",
          stylers: [
            {
              hue: "#00ccff"
            },
            {
              gamma: 0.44
            },
            {
              saturation: -33
            }
          ]
        },
        {
          featureType: "poi.park",
          stylers: [
            {
              hue: "#44ff00"
            },
            {
              saturation: -23
            }
          ]
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [
            {
              hue: "#007fff"
            },
            {
              gamma: 0.77
            },
            {
              saturation: 65
            },
            {
              lightness: 99
            }
          ]
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [
            {
              gamma: 0.11
            },
            {
              weight: 5.6
            },
            {
              saturation: 99
            },
            {
              hue: "#0091ff"
            },
            {
              lightness: -86
            }
          ]
        },
        {
          featureType: "transit.line",
          elementType: "geometry",
          stylers: [
            {
              lightness: -48
            },
            {
              hue: "#ff5e00"
            },
            {
              gamma: 1.2
            },
            {
              saturation: -23
            }
          ]
        },
        {
          featureType: "transit",
          elementType: "labels.text.stroke",
          stylers: [
            {
              saturation: -64
            },
            {
              hue: "#ff9100"
            },
            {
              lightness: 16
            },
            {
              gamma: 0.47
            },
            {
              weight: 2.7
            }
          ]
        }
      ]
    });
  }
  

  /**Reset the map's view (center and zoom level) */
  resetView() {
    this.mapWidget.setCenter(this._defaultCenter);
    this.mapWidget.setZoom(this._defaultZoom);
  }

  /**
   *Hides all markers which are currently displayed on the map.
   */
  hideMarkers() {
    this._shownMarkers.forEach(marker => {
      marker.setMap(null);
    });
  }
  

  //Set's up sets markers 'selected' behavior - open info window and animates it.
  toggleMarkerSelection(marker){
    marker.setIcon(this.markerStyle_default);
  if (marker.getAnimation() === null) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    marker.infoWindow = this.createInfoWindow(marker);
    
    google.maps.event.addListener(marker.infoWindow,'closeclick',()=>{
      this.toggleMarkerSelection(marker)}
   );
   marker.infoWindow.open(this.mapWidget, marker);
  } else {
    marker.setAnimation(null);
    marker.infoWindow.close();
  }

  }

  /**
   * Shows provided list of markers on this map.
   * It also fits all the provided markers to map bounds.
   * Each marker is set up with events for hoever over and click.
   * @param {[]} markers - Array of markers to show.
   */
  showMarkers(markers) {
    //Make sure to hide all the markers and clear the the marker list
    this.hideMarkers(this._shownMarkers);
    this._shownMarkers = [];
    var bounds = new google.maps.LatLngBounds();
    markers.forEach(marker => {
      bounds.extend(marker.position);
      marker.addListener("click", ()=>{this.toggleMarkerSelection(marker)});
      
      marker.addListener("mouseover", () => {
        marker.setIcon(this.markerStyle_hoveredOver);
      });
      marker.addListener("mouseout", () => {
        marker.setIcon(this.markerStyle_default);
      });
      this._shownMarkers.push(marker);
      marker.setMap(this.mapWidget);
    });

    return this._shownMarkers;
  }


  /**
   * Populates this Map's infowindow with information provided in the marker.
   * @param {Object} marker - Marker
   */
  createInfoWindow(marker) {
    this.infoWindow = new google.maps.InfoWindow({ content: null });
    this.infoWindow.marker = marker;
    this.infoWindow.setContent(
      `<h1>${marker.title}</h1>
      <article>
        <p>${marker.description ? marker.description : ""}</p>
        <img src=${marker.photoUrl}>
      </article>`
    );
    return this.infoWindow;
  }

  // This function takes in a COLOR, and then creates a new marker
  // icon of that color. The icon will be 21 px wide by 34 high, have an origin
  // of 0, 0 and be anchored at 10, 34).
  // Because this method does not modify the state of the object, it's a static method.
  static makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
      "http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|" +
        markerColor +
        "|40|_|%E2%80%A2",
      new google.maps.Size(21, 34),
      new google.maps.Point(0, 0),
      new google.maps.Point(10, 34),
      new google.maps.Size(21, 34)
    );
    return markerImage;
  }

  /**
   * Uses google.maps.Marker to create and return a marker.
   * @param {string} position
   * @param { object} google.maps.Map if null, it wont be displayed right away
   * @param {string} title
   * @param {*} icon
   * @param {string} id
   * @param {string} fourSquareID
   */
  static createMarker(position, map, title, icon, fourSquareID) {
    var marker = new google.maps.Marker({
      position: position,
      map: null, //seting this to null and map controls marker visability
      title: title,
      icon: icon,
      animation: google.maps.Animation.DROP
    });
    //Populate marker information with data from foursquare
    getVenueInfo(fourSquareID, responseObject => {
      marker.description = responseObject.description;
      marker.photoUrl = `${responseObject.bestPhoto.prefix}width300${
        responseObject.bestPhoto.suffix
      }`;
    });

    return marker;
  }

  toggleBounce() {
    
  }

}
