(function () {
    // Function to dynamically load external scripts
    function loadScript(url, callback) {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
  
      script.onload = function () {
        console.log(url + ' loaded');
        callback();
      };
  
      script.onerror = function () {
        console.error('Could not load ' + url);
      };
  
      document.head.appendChild(script);
    }
  
    // Initialize page transition animations using GSAP
    function initializePageTransitions() {
      // Ensure GSAP is available before proceeding
      if (typeof gsap === 'undefined') {
        return console.error('GSAP is not available.');
      }
  
      // Select all anchor (<a>) tags that do not have a target="_blank" attribute.
      const links = document.querySelectorAll('a:not([target="_blank"])');
  
      // Select the transition cover and page name text elements
      const transitionCover = document.querySelector('.transition-cover');
      const pageNameText = transitionCover.querySelector('.transition-text');
  
      // Function to handle the start of the transition animation
      const startTransitionAnimation = (nextPageName, targetURL) => {
        pageNameText.textContent = nextPageName;
        gsap.set(transitionCover, { y: "-100%", display: "flex", autoAlpha: 1 });
        gsap.set(pageNameText, { autoAlpha: 0 });
  
        gsap.to(transitionCover, {
          duration: 1,
          y: "0%",
          ease: "power3.out",
          onComplete: () => {
            gsap.to(pageNameText, {
              duration: 0.5,
              autoAlpha: 1,
              onComplete: () => window.location.href = targetURL
            });
          }
        });
      };
  
      // Function to handle the end of the transition animation
      const endTransitionAnimation = () => {
        const transitionName = sessionStorage.getItem('nextPageTransitionName');
        pageNameText.textContent = transitionName;
  
        gsap.set(transitionCover, { y: "0%", display: "flex", autoAlpha: 1 });
        gsap.to(pageNameText, {
          duration: 0.5,
          autoAlpha: 1,
          ease: "power3.out",
          onComplete: () => {
            gsap.to(transitionCover, {
              duration: 1,
              y: "-100%",
              ease: "power3.inOut",
              onComplete: () => gsap.set(transitionCover, { display: "none" })
            });
          }
        });
      };
  
      // Check for stored transition name and apply ending animation if present
      if (sessionStorage.getItem('nextPageTransitionName')) {
        endTransitionAnimation();
        sessionStorage.removeItem('nextPageTransitionName');
      }
  
      // Attach event listeners to links for starting the transition
      links.forEach((link) => {
        link.addEventListener('click', (e) => {
          const nextPageName = link.getAttribute('data-page-name');
          if (nextPageName) {
            e.preventDefault();
            sessionStorage.setItem('nextPageTransitionName', nextPageName);
            startTransitionAnimation(nextPageName, link.href);
          }
        });
      });
    }
  
    // Load GSAP and initialize page transitions after GSAP has loaded
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
      initializePageTransitions);
  
  })();
  