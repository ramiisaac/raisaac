function updateCurrentTime() {

  // Define time formatting options for desired output "5:21PM"
    const timeOptions = {
      timeZone: "America/Los_Angeles",
      hour12: true,
      hour: "numeric",
      minute: "2-digit"
    };
  
    // Format current time according to options
    const formattedTime = new Date().toLocaleTimeString("en-US", timeOptions);
  
    const timeElement = document.querySelector(".hack23-time-version1");
    if (timeElement) timeElement.textContent = formattedTime;
  }
  
  // Update time immediately when the script runs
  updateCurrentTime();
  
  // Set up an interval to update the time every 60 seconds (1 minute)
  setInterval(updateCurrentTime, 60000);
  