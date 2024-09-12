// Get all the sections with a data-theme-target attribute
const themeSections = document.querySelectorAll('[data-theme-target]');

themeSections.forEach(themeSection => {
  // Create a ScrollTrigger for each section
  ScrollTrigger.create({
    trigger: themeSection,
    start: 'top top', // When the top of the section hits the top of the viewport
    end: 'bottom bottom', // When the bottom of the section leaves the bottom of the viewport
    onEnter: () => changeTheme(themeSection), // Change the theme when entering the section
    onLeaveBack: () => changeTheme(themeSection.previousElementSibling), // Change the theme back when leaving the section upwards
  });
});

function changeTheme(themeSection) {
  // Change the data-theme attribute to the value of data-theme-target
  document.documentElement.setAttribute('data-theme', themeSection.getAttribute('data-theme-target'));
}