// Try block to handle potential errors
try {
    // Get the current page name from the URL, or default to "Home" if no page name is found
    const currentPage = window.location.pathname.split("/").pop() || "Home";
  
    // Select the HTML element with the class '.page-name'
    const pageNameElement = document.querySelector('.page-name');
  
    // If the element is not found, throw an error
    if (!pageNameElement) {
      throw new Error("Element with class '.page-name' not found.");
    }
  
    // Set the text content of the selected element to the current page name
    pageNameElement.textContent = currentPage;
  
    // Catch block to handle any errors that occur within the try block
  } catch (error) {
    // Log the error message to the console
    console.error("Failed to update page name: ", error);
  }
  