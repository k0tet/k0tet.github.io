$(document).ready(function() {
  $(window).on('hashchange',
    function () {
      var page = document.location.hash.substring(1);
      if (page == "" || !$(".menu-button[data-menu=" + page + "]").length) {
        page = "home";
      }

      $(".menu-button").removeClass("active");
      $(".menu-button[data-menu=" + page + "]").addClass("active");

      $(".menu-image").hide();
      $activeImage = $(".menu-image[data-menu=" + page + "]").show();

      $("#content-container").load(page + "/index.html");
    }
  ).trigger('hashchange');

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
