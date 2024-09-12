import { gsap } from "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js";
import { ScrollTrigger } from "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/ScrollTrigger.min.js";

gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll(".section").forEach((section) => {
  const sectionTheme = section.getAttribute("data-theme");

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top bottom",
      end: "top top",
      scrub: true
    }
  });

  let tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "bottom bottom",
      end: "bottom top",
      scrub: true
    }
  });

  const clipPathStart = sectionTheme === 'dark' ?
    "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" :
    "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
  const clipPathEnd = sectionTheme === 'dark' ? "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" :
    "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

  tl.fromTo(".columns:not(.1st)", { clipPath: clipPathStart }, {
    clipPath: clipPathEnd,
    ease: "none"
  });
  tl2.fromTo(".columns:not(.1st)", { clipPath: clipPathStart }, {
    clipPath: clipPathEnd,
    ease: "none"
  });

  // Add different animations for .columns with class .1st
  tl.fromTo(
    ".columns.1st", { /* your animation properties */ }, { /* your animation properties */ });
  tl2.fromTo(
    ".columns.1st", { /* your animation properties */ }, { /* your animation properties */ });
});
