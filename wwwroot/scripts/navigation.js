$(function() {
  $(".toggle-menu-button").click(function() {
    $(this).toggleClass("active");
    $(".menu-drawer").toggleClass("open");
    console.log("menu was toogled");
  });
});
