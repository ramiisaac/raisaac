(function () {
    function loadScript(url, callback) {
      try {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
  
        script.onload = function () {
          console.log(url + ' loaded');
          callback();
        };
  
        script.onerror = function () {
          throw new Error('Could not load ' + url);
        };
  
        document.head.appendChild(script);
      } catch (error) {
        console.error('Failed to load script: ', error);
      }
    }
  
    function initDescrambleAnimation() {
      try {
        document.querySelectorAll('[motion="descramble"]').forEach(el => {
          new SplitType(el, {
            types: 'words, chars',
            tagName: 'span'
          });
  
          el.querySelectorAll('.char').forEach((char) => {
            char.setAttribute('letter', char.textContent);
          });
  
          el.addEventListener('mouseenter', () => animateChars(el));
          el.addEventListener('mouseleave', () => resetChars(el));
        });
      } catch (error) {
        console.error('Failed to initialize descramble animation: ', error);
      }
    }
  
    function getRandomLetter() {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      return characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    function animateChars(el) {
      try {
        let chars = el.querySelectorAll('.char');
        let steps = chars.length;
        let intervalDuration = 200 / steps;
  
        function scramble() {
          Array.from(chars).forEach((char, index) => {
            if (index < steps) {
              char.textContent = getRandomLetter(1);
            }
          });
  
          steps--;
  
          if (steps < 0) {
            clearInterval(el.scrambleInterval);
            resetChars(el);
          }
        }
  
        clearInterval(el.scrambleInterval);
        el.scrambleInterval = setInterval(scramble, intervalDuration);
      } catch (error) {
        console.error('Failed to animate characters: ', error);
      }
    }
  
    function resetChars(el) {
      try {
        clearInterval(el.scrambleInterval);
        el.querySelectorAll('.char').forEach((char) => {
          char.textContent = char.getAttribute('letter');
        });
      } catch (error) {
        console.error('Failed to reset characters: ', error);
      }
    }
  
    loadScript('https://unpkg.com/split-type', initDescrambleAnimation);
  
  })();
  