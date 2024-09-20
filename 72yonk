<script>
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event fired');

  // ***********************
  // Color Utilities
  // ***********************

  function hslToHex(h, s, l) {
    console.log(`Converting HSL to Hex: h=${h}, s=${s}, l=${l}`);
    const hex = hsluv.hsluvToHex([h, s, l]);
    console.log('Converted Hex:', hex);
    return hex;
  }

  function generateColorSystem(hueA, saturationB, hueC, isLight) {
    console.log(
      `Generating color system: hueA=${hueA}, saturationB=${saturationB}, hueC=${hueC}, isLight=${isLight}`
    );
    const surfaceLightness = isLight ? [99, 97.5, 95.5, 94, 89, 85, 81] : [4, 7.5, 9, 16, 20, 24, 32];
    const elevatedLightness = isLight ? [70, 54.5, 41, 31.5, 25.5, 21.5, 20] : [43, 58.5, 72, 81.5, 88, 91.5, 93];
    const accentSaturation = isLight ? [5, 6.5, 12.5, 43.5, 64, 69, 70] : [7, 8.5, 14.5, 41.5, 64.5, 67, 70.5];
    const accentLightness = isLight ? [96, 91.5, 80, 61.5, 44, 33.5, 30] : [12, 18, 24.5, 35.5, 44.5, 56.5, 60];
    const alertHue = 5;
    const warnHue = 55;

    const colorSystem = {
      surface: surfaceLightness.map(l => hslToHex(hueA, saturationB, l)),
      elevated: elevatedLightness.map(l => hslToHex(hueA, saturationB, l)),
      accent: accentLightness.map((l, i) => hslToHex(hueC, accentSaturation[i], l)),
      alert: {
        contBg: hslToHex(alertHue, accentSaturation[4], accentLightness[4]),
        contBgHover: hslToHex(alertHue, accentSaturation[5], accentLightness[5]),
        bgBase: hslToHex(alertHue, saturationB, surfaceLightness[3]),
        text: hslToHex(alertHue, saturationB, 86.5),
      },
      warn: {
        contBg: hslToHex(warnHue, accentSaturation[4], accentLightness[4]),
        contBgHover: hslToHex(warnHue, accentSaturation[5], accentLightness[5]),
        bgBase: hslToHex(warnHue, saturationB, surfaceLightness[3]),
        text: hslToHex(warnHue, saturationB, 86.5),
      },
      gradient: {
        base: `linear-gradient(to bottom, ${hslToHex(hueA, saturationB, surfaceLightness[0])} 100%, ${hslToHex(hueA, saturationB, surfaceLightness[0])} 0%)`,
        baseHigh: `linear-gradient(to bottom, ${hslToHex(hueA, saturationB, surfaceLightness[1])} 100%, ${hslToHex(hueA, saturationB, surfaceLightness[0])} 0%)`,
        baseHighest: `linear-gradient(to bottom, ${hslToHex(hueA, saturationB, surfaceLightness[2])} 100%, ${hslToHex(hueA, saturationB, surfaceLightness[3])} 0%)`,
      },
      effect: {
        shadow: hslToHex(200, saturationB, 1),
        light: hslToHex(200, saturationB, elevatedLightness[6]),
        overlay: `${hslToHex(hueA, saturationB, surfaceLightness[0])}e6`,
      },
    };
    console.log('Generated color system:', colorSystem);
    return colorSystem;
  }

  // ***********************
  // Cookie Utilities
  // ***********************

  function setCookie(name, value, days) {
    console.log(`Setting cookie: ${name}=${value}, days=${days}`);
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  function getCookie(name) {
    console.log(`Getting cookie: ${name}`);
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) {
        console.log(`Found cookie: ${name}=${c.substring(nameEQ.length, c.length)}`);
        return c.substring(nameEQ.length, c.length);
      }
    }
    console.log(`Cookie not found: ${name}`);
    return null;
  }

  // ***********************
  // Theme Manager
  // ***********************

  function applyColorSystem() {
    console.log('Applying color system');
    const root = document.documentElement;
    const isLight = root.getAttribute('data-theme') !== 'dark';
    const hueA = parseInt(root.style.getPropertyValue('--hue-a') || 246);
    const saturationB = parseInt(root.style.getPropertyValue('--saturation-b') || 30);
    const hueC = parseInt(root.style.getPropertyValue('--hue-c') || 220);

    const colorSystem = generateColorSystem(hueA, saturationB, hueC, isLight);

    for (const [category, colors] of Object.entries(colorSystem)) {
      if (Array.isArray(colors)) {
        colors.forEach((color, index) => {
          root.style.setProperty(`--scale--${category}--${index}`, color);
          root.style.setProperty(`--labels--${category}-${index}-hex`, color.slice(1));
        });
      } else {
        for (const [subCategory, color] of Object.entries(colors)) {
          root.style.setProperty(`--semantic--${category}-${subCategory}`, color);
        }
      }
    }
    console.log('Color system applied');
  }

  function updateSeedColors(hueA, saturationB, hueC) {
    console.log(`Updating seed colors: hueA=${hueA}, saturationB=${saturationB}, hueC=${hueC}`);
    const root = document.documentElement;
    root.style.setProperty('--hue-a', hueA);
    root.style.setProperty('--saturation-b', saturationB);
    root.style.setProperty('--hue-c', hueC);
    setCookie('hueA', hueA, 365);
    setCookie('saturationB', saturationB, 365);
    setCookie('hueC', hueC, 365);
    applyColorSystem();
  }

  function setTheme(theme) {
    console.log(`Setting theme: ${theme}`);
    document.documentElement.setAttribute('data-theme', theme);
    setCookie('theme', theme, 365);
    applyColorSystem();
  }

  function setBrand(brand) {
    console.log(`Setting brand: ${brand}`);
    document.documentElement.setAttribute('data-brand', brand);

    const brandColors = {
      brand1: {
        hueA: 200,
        saturationB: 25,
        hueC: 30
      },
      brand2: {
        hueA: 150,
        saturationB: 30,
        hueC: 60
      },
      brand3: {
        hueA: 300,
        saturationB: 20,
        hueC: 180
      },
      // Add more brands if needed
    };

    // Check if pre-computed scales exist for this brand
    const preComputedScales = document.querySelector(`style[data-brand="${brand}"]`);
    if (preComputedScales) {
      console.log(`Using pre-computed scales for brand: ${brand}`);
      applyPreComputedScales(brand);
    } else {
      console.log(`Generating dynamic colors for brand: ${brand}`);
      const { hueA, saturationB, hueC } = brandColors[brand] || brandColors.brand1;
      updateSeedColors(hueA, saturationB, hueC);
    }
  }

  function applyPreComputedScales(brand) {
    console.log(`Applying pre-computed scales for brand: ${brand}`);
    const root = document.documentElement;
    const isLight = root.getAttribute('data-theme') !== 'dark';
    const selector = isLight ? `[data-brand="${brand}"]` : `[data-theme="dark"][data-brand="${brand}"]`;

    // Look for the style element containing the pre-computed scales
    const styleElements = document.querySelectorAll('style');

    let foundStyles = false;

    for (let styleElement of styleElements) {
      const cssText = styleElement.textContent;
      const regex = new RegExp(`${selector}\\s*{([^}]*)}`, 'g');
      let match;
      while ((match = regex.exec(cssText)) !== null) {
        foundStyles = true;
        const properties = match[1];
        const colorProperties = properties.match(/--[^:]+:\s*[^;]+/g);
        if (colorProperties) {
          colorProperties.forEach(prop => {
            const [name, value] = prop.split(':').map(s => s.trim());
            root.style.setProperty(name, value);
          });
          console.log(`Applied ${colorProperties.length} color properties for brand: ${brand}`);
        } else {
          console.log(`No color properties found for brand: ${brand}`);
        }
      }
    }
    if (!foundStyles) {
      console.log(`No styles found for selector: ${selector}`);
    }
  }

  // ***********************
  // Animation Manager
  // ***********************

  function animateSideNav(section, timeline) {
    console.log('Animating side nav for section:', section);
    const sectionTheme = section.getAttribute("data-theme");
    const sectionBrand = section.getAttribute("data-brand");

    const darkSideNav = document.querySelector('.side-nav.is-dark');
    const lightSideNav = document.querySelector('.side-nav.is-light');

    if (sectionTheme === 'light') {
      timeline.to(darkSideNav, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        ease: "none"
      }, 0);
      timeline.to(lightSideNav, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "none"
      }, 0);
    } else {
      timeline.to(lightSideNav, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        ease: "none"
      }, 0);
      timeline.to(darkSideNav, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "none"
      }, 0);
    }

    if (sectionBrand) {
      timeline.to([lightSideNav, darkSideNav], {
        onStart: () => setBrand(sectionBrand),
        onReverseComplete: () => setBrand(document.documentElement.getAttribute('data-brand') || 'brand1')
      }, 0);
    }
  }

  function initSideNavAnimation() {
    console.log('Initializing side nav animation');
    document.querySelectorAll("section[data-theme], section[data-brand]").forEach(section => {
      const tlEnter = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top top",
          scrub: true,
          onEnter: () => setTheme(section.getAttribute("data-theme")),
          onEnterBack: () => setTheme(section.getAttribute("data-theme")),
          onLeave: () => setTheme(document.documentElement.getAttribute('data-theme')),
          onLeaveBack: () => setTheme(document.documentElement.getAttribute('data-theme'))
        }
      });

      animateSideNav(section, tlEnter);

      const tlLeave = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "bottom bottom",
          end: "bottom top",
          scrub: true,
          onEnter: () => setTheme(section.getAttribute("data-theme")),
          onEnterBack: () => setTheme(section.getAttribute("data-theme")),
          onLeave: () => setTheme(document.documentElement.getAttribute('data-theme')),
          onLeaveBack: () => setTheme(document.documentElement.getAttribute('data-theme'))
        }
      });

      animateSideNav(section, tlLeave);
    });
  }

  function initColorScroll() {
    console.log('Initializing color scroll');
    document.querySelectorAll('section[colorscroll-theme], section[colorscroll-brand]').forEach(
      section => {
        const themes = section.getAttribute('colorscroll-theme');
        const brands = section.getAttribute('colorscroll-brand');
        const speed = parseFloat(section.getAttribute('colorscroll-speed')) || 0.6;
        const ease = section.getAttribute('colorscroll-ease') || 'power1.out';
        const offset = parseInt(section.getAttribute('colorscroll-offset')) || 50;

        if (themes) {
          const themeArray = themes.split(',').map(theme => theme.trim());
          console.log('Color scroll themes:', themeArray);

          gsap.to(section, {
            scrollTrigger: {
              trigger: section,
              start: `top+=${offset} center`,
              end: `bottom-=${offset} center`,
              onEnter: () => setTheme(themeArray[0]),
              onEnterBack: () => setTheme(themeArray[0]),
              onLeave: () => setTheme(themeArray[1]),
              onLeaveBack: () => setTheme(themeArray[1]),
              scrub: true,
            },
            duration: speed,
            ease: ease,
          });
        }

        if (brands) {
          const brandArray = brands.split(',').map(brand => brand.trim());
          console.log('Color scroll brands:', brandArray);

          gsap.to(section, {
            scrollTrigger: {
              trigger: section,
              start: `top+=${offset} center`,
              end: `bottom-=${offset} center`,
              onEnter: () => setBrand(brandArray[0]),
              onEnterBack: () => setBrand(brandArray[0]),
              onLeave: () => setBrand(brandArray[1]),
              onLeaveBack: () => setBrand(brandArray[1]),
              scrub: true,
            },
            duration: speed,
            ease: ease,
          });
        }
      });
  }

  // ***********************
  // Main Initialization
  // ***********************

  gsap.registerPlugin(ScrollTrigger);
  console.log('GSAP ScrollTrigger registered');

  // Initialize Lenis
  const lenis = new Lenis({
    duration: 2.5,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 0.5,
    smoothTouch: false,
    touchMultiplier: 1,
    infinite: false,
  });
  console.log('Lenis initialized with config:', lenis);

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(time => lenis.raf(time * 1000));
  console.log('GSAP and ScrollTrigger initialized');

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const targetElement = document.querySelector(anchor.getAttribute('href'));
      console.log('Anchor clicked, target element:', targetElement);
      if (targetElement) lenis.scrollTo(targetElement);
    });
  });

  // Initialize brand colors from existing data-brand attributes or pre-computed scales
  document.querySelectorAll('[data-brand]').forEach(element => {
    const dataBrand = element.getAttribute('data-brand');
    if (document.querySelector(`style[data-brand="${dataBrand}"]`)) {
      console.log(`Applying pre-computed scales for brand: ${dataBrand}`);
      setBrand(dataBrand);
    } else {
      const hueA = parseInt(element.getAttribute('data-hue-a') || 200);
      const saturationB = parseInt(element.getAttribute('data-saturation-b') || 25);
      const hueC = parseInt(element.getAttribute('data-hue-c') || 30);
      updateSeedColors(hueA, saturationB, hueC);
    }
  });

  const savedTheme = getCookie('theme');
  const savedHueA = getCookie('hueA');
  const savedSaturationB = getCookie('saturationB');
  const savedHueC = getCookie('hueC');

  if (savedTheme) {
    console.log(`Applying saved theme: ${savedTheme}`);
    setTheme(savedTheme);
  }
  if (savedHueA && savedSaturationB && savedHueC) {
    console.log(
      `Applying saved seed colors: hueA=${savedHueA}, saturationB=${savedSaturationB}, hueC=${savedHueC}`
    );
    updateSeedColors(parseInt(savedHueA), parseInt(savedSaturationB), parseInt(savedHueC));
  }

  applyColorSystem();
  initColorScroll();
  initSideNavAnimation();

  console.log('All initializations complete');
});
</script>
