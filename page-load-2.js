// Import GSAP if you're using a module bundler.
// Remember, modules require additional tooling to work in a browser environment.
// import { gsap } from 'gsap';

const init = () => {
    // get references to the elements we want to animate
    const titleTexts = document.querySelectorAll(".title-text");
    const titleWrap = titleTexts[0].parentNode;
    const headlineRows = document.querySelectorAll(".headline-row");
  
    const tl = gsap.timeline({
      onComplete: () => {
        // allow scroll when animation completes
        gsap.set("body", { overflow: "auto" });
      },
    });
  
    // prevent flash of .main-wrapper container on load
    // works in tandem with <style> in page settings code
    gsap.set(".main-wrapper", { visibility: "visible" });
  
    gsap.registerEffect({
      name: "swingUp",
      effect: (targets, config) => {
        return gsap.from(targets, {
          duration: config.duration,
          autoAlpha: 0, // FOUC - visibility -> visible when opacity > 0
          yPercent: 100,
          rotateZ: 15,
          stagger: 0.2,
          ease: "power3.out",
        });
      },
      defaults: { duration: 0.5 },
      extendTimeline: true, // allows nice timeline syntax
    });
  
    tl
      // swing up "RESTOCK"
      .swingUp(titleTexts[0])
      // move title wrap up 33% y direction
      .fromTo(titleWrap, { yPercent: 66 }, { yPercent: 33, duration: 0.5 })
      // swing up "REORDER"
      .swingUp(titleTexts[1], "<+0.1")
      .from(
        ".icon",
        {
          xPercent: -100,
          autoAlpha: 0,
          stagger: { from: "end", each: 0.2 },
        },
        "<+0.1"
      )
      // move title wrap up to its zero position
      .to(titleWrap, { yPercent: 0, duration: 1 }, "<+0.5")
      // swing up "REPEAT"
      .swingUp(titleTexts[2], { duration: 1 }, "<+0.1")
      // bring main-wrapper container into view and animate border-radius
      .from(".main-wrapper", {
        yPercent: 100,
        borderRadius: "8vw",
        duration: 0.8,
        delay: 0.8,
      })
      // swing up text in each headline row with stagger
      .swingUp(headlineRows[0].childNodes, "-=0.2")
      .swingUp(headlineRows[1].childNodes, "<+0.1")
      .swingUp(headlineRows[2].childNodes, "<+0.1");
  }
  
  // Export the function so that it can be imported elsewhere.
  // export default init;
  
  window.addEventListener("load", init);
  