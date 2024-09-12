// lenis.js
Portfolio.lenis = {
  init: function() {
      let lenis = new LocomotiveScroll({
          lerp: 0.1,
          wheelMultiplier: 0.7,
          gestureOrientation: "vertical",
          normalizeWheel: false,
          smoothTouch: false,
      });

      function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // Event listeners for Lenis controls
      $("[data-lenis-start]").on("click", function () {
          lenis.start();
      });
      $("[data-lenis-stop]").on("click", function () {
          lenis.stop();
      });
      $("[data-lenis-toggle]").on("click", function () {
          $(this).toggleClass("stop-scroll");
          if ($(this).hasClass("stop-scroll")) {
              lenis.stop();
          } else {
              lenis.start();
          }
      });

      // Text animation setup
      let typeSplit = new SplitType(".text-style-subheading, .heading-style-h1", {
          types: "words, chars",
          tagName: "span",
      });

      // Animate text on page load
      function pageLoad() {
          let tl = gsap.timeline({ delay: 2.05 });
          tl.from(".text-style-subheading .word", {
              y: "220%",
              stagger: { each: 0.1 },
              ease: "power4.out",
              duration: 1.2,
          });
          tl.from(
              ".heading-style-h1 .word",
              {
                  y: "220%",
                  stagger: { each: 0.1 },
                  ease: "power4.out",
                  duration: 1.2,
              },
              0
          );
      }
      pageLoad();
  }
};


// // Function to dynamically load a script and execute a callback function once it's loaded
// function loadScript(src, callback) {
//     const script = document.createElement("script");
//     script.src = src;
//     script.onload = () => callback();
//     document.head.appendChild(script);
//   }
  
//   // Load scripts sequentially with callbacks to ensure order
//   loadScript("https://unpkg.com/split-type", () => {
//     loadScript(
//       "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/gsap.min.js",
//       () => {
//         loadScript(
//           "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/ScrollTrigger.min.js",
//           () => {
//             loadScript(
//               "https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.23/bundled/lenis.min.js",
//               () => {
//                 // After all scripts are loaded, execute the main logic
//                 executeMainLogic();
//               }
//             );
//           }
//         );
//       }
//     );
//   });
  
//   function executeMainLogic() {
//     // LENIS SMOOTH SCROLL setup
//     let lenis = new Lenis({
//       lerp: 0.1,
//       wheelMultiplier: 0.7,
//       gestureOrientation: "vertical",
//       normalizeWheel: false,
//       smoothTouch: false,
//     });
  
//     function raf(time) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }
//     requestAnimationFrame(raf);
  
//     // Other interactions (assuming jQuery is already loaded, if not, it should be loaded as well)
//     $("[data-lenis-start]").on("click", function () {
//       lenis.start();
//     });
//     $("[data-lenis-stop]").on("click", function () {
//       lenis.stop();
//     });
//     $("[data-lenis-toggle]").on("click", function () {
//       $(this).toggleClass("stop-scroll");
//       if ($(this).hasClass("stop-scroll")) {
//         lenis.stop();
//       } else {
//         lenis.start();
//       }
//     });
  
//     // Text animation setup
//     let typeSplit = new SplitType(".text-style-subheading, .heading-style-h1", {
//       types: "words, chars",
//       tagName: "span",
//     });
  
//     // Animate text on page load
//     function pageLoad() {
//       let tl = gsap.timeline({ delay: 2.05 });
//       tl.from(".text-style-subheading .word", {
//         y: "220%",
//         stagger: { each: 0.1 },
//         ease: "power4.out",
//         duration: 1.2,
//       });
//       tl.from(
//         ".heading-style-h1 .word",
//         {
//           y: "220%",
//           stagger: { each: 0.1 },
//           ease: "power4.out",
//           duration: 1.2,
//         },
//         0
//       );
//     }
//     pageLoad();
//   }
  