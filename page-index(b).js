// Ensure DOM is fully loaded
$(document).ready(function () {
    // Update project number format
    const mama = document.querySelector('#projects');
    const numbers = mama.querySelectorAll('.pl-project-number');
    numbers.forEach((project, index) => {
      project.textContent = index < 9 ? `(0${index + 1})` : `(${index + 1})`;
    });
  
    // Remove 'load-active' class on click
    $(".load-active").click(function () {
      $(this).removeClass("load-active");
    });
  
    // Function to play two videos concurrently
    const playTwoVideos = (id1, id2, buttonId) => {
      const video1 = document.getElementById(id1);
      const video2 = document.getElementById(id2);
      const button = document.getElementById(buttonId);
      button.onclick = event => {
        event.preventDefault();
        video1.play().then(_ => video2.play());
      };
    };
  
    // Call the function with specific IDs
    playTwoVideos('video1', 'video2', 'play-button');
  
    // Video hover play and pause
    $(".pl-hover-video").on("mouseover", function () {
      this.play();
    });
    $(".pl-hover-video").on("mouseleave", function () {
      this.pause();
    });
  
    // Animations and class toggles for 'front' and 'back' paths
    $('.front path, .back path').each(function (i) {
      var isFront = $(this).closest('.front').length;
      $(this).delay(i * 150).velocity({
        opacity: isFront ? '0' : '1'
      }, {
        duration: 500,
        easing: 'ease',
        loop: true,
        delay: 5000
      });
    });
  
    setInterval(function () {
      $('.front, .back').toggleClass('noevents');
    }, 5000);
  
    // Initially set awards sections to hidden and maintain height
    $('.pl-cms-awards').each(function () {
      $(this).height(function (i, val) {
        return val;
      }).addClass("hidden-cms");
    });
  
    // Handle '.pl-cms-open' click to reveal content with animations
    $(".pl-cms-open").click(function () {
      $('.pl-cms-open').next().not($(this)).addClass("hidden-cms").find(".pl-list-item")
        .velocity({
          opacity: '0',
          translateY: '50px'
        }, {});
      $(this).next().removeClass("hidden-cms").find(".pl-list-item").each(function (i) {
        $(this).delay(i * 50).velocity({
          opacity: '1',
          translateY: '0px'
        }, {
          easing: 'linear'
        });
      });
    });
  });
  