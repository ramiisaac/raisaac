// Function to update the scroll progress
function updateScrollProgress() {
    try {
      // Calculate the scrollTop, scrollHeight, and clientHeight
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
  
      // Calculate the total scrollable distance
      const totalScrollableDistance = scrollHeight - clientHeight;
  
      // Calculate the current scroll percentage
      const scrollPercentage = (scrollTop / totalScrollableDistance) * 100;
  
      // Update the text content of the element with the ID 'nav_progress-number' with the rounded scroll percentage
      const progressElement = document.getElementById("nav_progress-number");
      if (!progressElement) {
        throw new Error("Element with ID 'nav_progress-number' not found.");
      }
      progressElement.textContent = `${Math.round(scrollPercentage)}`;
    } catch (error) {
      console.error("Failed to update scroll progress: ", error);
    }
  }
  
  // Listen for the scroll event on the window and call updateScrollProgress function
  window.addEventListener("scroll", updateScrollProgress);
  
  // Update the progress on page load in case the initial scroll position is not at the top
  try {
    updateScrollProgress();
  } catch (error) {
    console.error("Failed to update scroll progress on page load: ", error);
  }
  