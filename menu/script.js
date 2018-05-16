$(document).ready(function() {
  $(".menu-button").hover(
    function () {
      $activeImage.hide();
      $(".menu-image[data-menu=" + $(this).data("menu") + "]").show();
    },
    function () {
      $(".menu-image[data-menu=" + $(this).data("menu") + "]").hide();
      $activeImage.show();
    }
  );

  var section = location.pathname.split("/")[1];
  if (section === "") {
      section = "home"
  }
  $(".menu-button").removeClass("active");
  $(".menu-button[data-menu=" + section + "]").addClass("active");

  $(".menu-image").hide();
  $activeImage = $(".menu-image[data-menu=" + section + "]").show();
  if ($activeImage.length === 0) {
    $activeImage = $(".menu-image[data-menu=home]").show();
  }
});

