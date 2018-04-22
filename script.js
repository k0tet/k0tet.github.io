$(document).on("click", "a[href]", function (event) {
    if ((event.target.host === location.host) && (event.target.pathname.substr(0,9) !== "/content/")) {
        event.preventDefault();
        var page = $(this).attr("href");
        history.pushState({page: page}, "", page);
		renderPage(page);
	}
});

window.addEventListener("popstate", function (event) {
    renderPage(event.state.page);
});

var page = "/";
if (sessionStorage.path) {
	page = sessionStorage.path;
	delete sessionStorage.path;
} else if (location.hash.substr(0,2) === "#!") {
	page = location.hash.substr(2);
}

history.replaceState({page: page}, "", page);

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

  renderPage(page);
});

function renderPage(page) {
      if (page.substr(0,1) == "/") {
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

      $("#content-container").load("/content/" + page + ".html", function(response, status, xhr) {
		  // check status and display error if load failed;
          document.title = "K0TET :: " + $("#content-container h3").first().text();
          updateWebStats( page + ".html");
      });
    }


  
function updateWebStats(page) {
    if (typeof ga !== 'function') {
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    
    }
    
    ga('create', 'UA-12911574-9', 'auto');
    ga('send', 'pageview', page);
}