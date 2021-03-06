"use strict";
/* global $ */
/* eslint-disable no-unused-vars */
/**
 *This function uses JSON-P AJAX to grab iformation about venue from FourSquare API
 * @param {string} venueId FourSquare venue ID
 * @returns {Object} venue Object
 */
function getVenueInfo(venueId, callBack) {
  let clientId = "PUW4TH1RMKSDL2O45IT20FXNR5NCE2PIOFLGXBLDP2HVPJCZ"; //This should be server side code
  let clientSecret = "DTPUNZULSNE3XJMSBG4G5DJFCEKVXMKL3XKLX023OGD3GHCV"; //This should be server side code
  var settings = {
    async: false,
    crossDomain: true,
    url: `https://api.foursquare.com/v2/venues/${venueId}?client_id=${clientId}&client_secret=${clientSecret}&v=20180401`,
    method: "GET",
    headers: {},
    dataType: "jsonp",

    timeout: 5000,
    error: function(x, t, m) {
      if(t==="timeout") {alert("Could not load data from FourSquare API")
     }
    }
  }

  $.ajax(settings).done(response => {
    callBack(response.response.venue);
  });
}