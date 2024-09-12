// code.js

// Function to initialize code blocks
export const initializeCodeBlocks = () => {
    try {
      // Select all elements with a class that includes "language-"
      document.querySelectorAll('[class*="language-"]').forEach((el) => {
        // Extract the language from the class name
        const lang = el.className.match(/language-(\w+)/)[1];
        // If no language is found, throw an error
        if (!lang) {
          throw new Error("Language not found in class name.");
        }
        // Find the closest parent with class ".code_wrapper" and select the ".code_block-lang" element
        const codeBlockLang = el
          .closest(".code_wrapper")
          .querySelector(".code_block-lang");
        // If no such element is found, throw an error
        if (!codeBlockLang) {
          throw new Error("Element with class '.code_block-lang' not found.");
        }
        // Set the text content of the code block language element to the extracted language
        codeBlockLang.textContent = lang;
      });
  
      // Select all elements with class ".code_copy"
      document.querySelectorAll(".code_copy").forEach((button) => {
        // Add a click event listener to each button
        button.addEventListener("click", function () {
          // Find the closest parent with class ".code_container"
          let codeContainer = this.closest(".code_container");
          // If no such element is found, throw an error
          if (!codeContainer) {
            throw new Error("Element with class '.code_container' not found.");
          }
          // Select the "pre code" element within the code container
          let codeElement = codeContainer.querySelector("pre code");
          // If no such element is found, throw an error
          if (!codeElement) {
            throw new Error("Element 'pre code' not found.");
          }
          // Clone the code element
          let clonedCodeElement = codeElement.cloneNode(true);
  
          // Remove text content of all .linenumber elements within the cloned code element
          clonedCodeElement
            .querySelectorAll(".linenumber")
            .forEach((linenumber) => {
              linenumber.textContent = "";
            });
  
          // Get the text content of the modified code element
          let code = clonedCodeElement.textContent;
          // Copy the code to clipboard
          copyToClipboard(code, this);
        });
      });
    } catch (err) {
      // Log any errors that occur during the initialization of code blocks
      console.error("Failed to initialize code blocks: ", err);
    }
  };
  
  // Function to copy text to clipboard and update the button icon
  const copyToClipboard = (text, button) => {
    // Write the text to the clipboard
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Select the copy and checkmark icons within the button
        let copyIcon = button.querySelector(".icon_copy");
        let checkmarkIcon = button.querySelector(".icon_checkmark");
  
        // If either icon is not found, throw an error
        if (!copyIcon || !checkmarkIcon) {
          throw new Error("Copy or checkmark icon not found.");
        }
  
        // Hide the copy icon and show the checkmark icon
        copyIcon.style.display = "none";
        checkmarkIcon.style.display = "block";
        checkmarkIcon.classList.add("fade-out");
  
        // After a short delay, switch the icons back
        setTimeout(() => {
          checkmarkIcon.classList.remove("fade-out");
          checkmarkIcon.style.display = "none";
          copyIcon.style.display = "block";
        }, 1000); // Adjust the time as needed
      })
      .catch((err) => {
        // Log any errors that occur during the copy to clipboard operation
        console.error("Failed to copy: ", err);
      });
  };

  