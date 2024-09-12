// Get all the sections with a data-brand-target attribute
const brandSections = document.querySelectorAll('[data-brand-target]');

brandSections.forEach(brandSection => {
  // Create a ScrollTrigger for each section
  ScrollTrigger.create({
    trigger: brandSection,
    start: 'top top', // When the top of the section hits the top of the viewport
    end: 'bottom bottom', // When the bottom of the section leaves the bottom of the viewport
    onEnter: () => changeBrand(brandSection), // Change the brand when entering the section
    onLeaveBack: () => changeBrand(brandSection.previousElementSibling), // Change the brand back when leaving the section upwards
  });
});

function changeBrand(brandSection) {
  // Change the data-brand attribute to the value of data-brand-target
  document.documentElement.setAttribute('data-brand', brandSection.getAttribute('data-brand-target'));
}