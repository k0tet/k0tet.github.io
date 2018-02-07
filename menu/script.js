$(document).ready(function() {
  $(window).on('hashchange',
    function () {
      var page = document.location.hash.substring(1);
      if (page.startsWith("!")) {
          page = page.substr(1);
      }
      var section = page.split("/")[0];
      if (section === "" || !$(".menu-button[data-menu=" + section + "]").length) {
        page = "home";
        section = "home";
      }

      if (page === section) {
          page = page + "/index";
      }
      
      $(".menu-button").removeClass("active");
      $(".menu-button[data-menu=" + section + "]").addClass("active");

      $(".menu-image").hide();
      $activeImage = $(".menu-image[data-menu=" + section + "]").show();

      $("#content-container").load(page + ".html");
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
