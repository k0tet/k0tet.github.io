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
      
      updateWebStats( page + ".html");
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

function updateWebStats(page) {
    if (typeof ga !== 'function') {
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    
        ga('create', 'UA-12911574-9', 'auto');
    } else {
        console.log("ga exists, yeah!")
    }
    
    ga('send', 'pageview', page);
}