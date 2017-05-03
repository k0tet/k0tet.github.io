$( document ).ready(function() {
  $(".menu-button[data-menu=home]").addClass("active");
  $(".menu-image").hide();
  $activeImage = $(".menu-image[data-menu=home]").show();
  $("#content-container").load("home/index.html");

  $(".menu-button").click(
    function () {
      $(".menu-button").removeClass("active");
      $(this).addClass("active");

      $(".menu-image").hide();
      $activeImage = $(".menu-image[data-menu=" + $(this).data("menu") + "]").show();

      $("#content-container").load($(this).data("menu") + "/index.html");
    }
  );

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
});
