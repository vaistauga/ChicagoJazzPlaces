"use strict";
/* global  $ */
/* eslint-disable no-unused-vars */
$(function() {
  $(".toggle-menu-button").click(function() {
    $(this).toggleClass("active");
    $(".menu-drawer").toggleClass("open");
    console.log("menu was toogled");
  });
});

$(function() {
  $(window).resize(function() {
    if (
      window.innerWidth > 700 &&
      !$(".toggle-menu-button").hasClass("active")
    ) {
      $(".toggle-menu-button").addClass("active");
      $(".menu-drawer").addClass("open");
    } else if (window.innerWidth <= 700) {
      $(".toggle-menu-button").removeClass("active");
      $(".menu-drawer").removeClass("open");
    }
  });
});
