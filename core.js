// core.js

// Create a global namespace for our project
window.Portfolio = window.Portfolio || {};

// Function to load external scripts
Portfolio.loadScript = function(url, callback) {
    const script = document.createElement('script');
    script.src = url;
    script.onload = callback;
    document.head.appendChild(script);
};

// Function to check if all required dependencies are loaded
Portfolio.checkDependencies = function(dependencies, callback) {
    const allLoaded = dependencies.every(dep => window[dep]);
    if (allLoaded) {
        callback();
    } else {
        console.error("Required libraries are not loaded:", dependencies.filter(dep => !window[dep]));
    }
};

// Load external libraries
Portfolio.loadScript('https://cdn.jsdelivr.net/npm/gsap@3.9.1/dist/gsap.min.js', () => {
    Portfolio.loadScript('https://cdn.jsdelivr.net/npm/gsap@3.9.1/dist/ScrollTrigger.min.js', () => {
        Portfolio.loadScript('https://cdn.jsdelivr.net/npm/locomotive-scroll@4.1.3/dist/locomotive-scroll.min.js', () => {
            Portfolio.loadScript('https://unpkg.com/split-type', () => {
                Portfolio.initializeAll();
            });
        });
    });
});

// Initialize all modules
Portfolio.initializeAll = function() {
    Portfolio.checkDependencies(['gsap', 'ScrollTrigger', 'LocomotiveScroll', 'SplitType'], () => {
        Portfolio.colorScroll.init();
        Portfolio.lenis.init();
        Portfolio.textDescramble.init();
        Portfolio.pageTransition.init();
        Portfolio.codeSnippets.init();
        Portfolio.scrollProgress.init();
        Portfolio.timeInjection.init();
    });
};
