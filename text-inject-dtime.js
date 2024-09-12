// Easy configuration
const businessHours = {
    start: 9, // Business hours start at9 AM
    end: 17, // Business hours end at 5 PM
  };
  const colors = {
    businessHours: 'green',
    outsideBusinessHours: 'red'
  };
  
  // Find all elements with 'ms-code-online-wrapper' attribute
  const wrappers = document.querySelectorAll('[ms-code-online-wrapper]');
  wrappers.forEach(wrapper => {
    const timeZone = wrapper.getAttribute('ms-code-online-wrapper');
    const dot = wrapper.querySelector('[ms-code-online="dot"]');
    const timeSpan = wrapper.querySelector('[ms-code-online="time"]');
    const timeZoneSpan = wrapper.querySelector(
      '[ms-code-online="timezone"]'); // For displaying the timezone
  
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: timeZone,
      timeZoneName: 'short'
    });
    const formattedTime = formatter.format(now);
  
    // Split the formatted time to display time and time zone separately
    if (timeSpan) timeSpan.textContent = formattedTime.split(', ')[0];
    if (timeZoneSpan) timeZoneSpan.textContent = formattedTime.split(', ')[1];
  
    // Determine if the current hour is within business hours
    const currentHour = parseInt(now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      hour12: false,
      timeZone: timeZone
    }), 10);
  
    const isBusinessHour = currentHour >= businessHours.start && currentHour < businessHours
      .end;
  
    // Update the dot color based only on the business hours time
    if (dot) {
      dot.style.backgroundColor = isBusinessHour ? colors.businessHours : colors
        .outsideBusinessHours;
    }
  });
  