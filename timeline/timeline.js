document.addEventListener('DOMContentLoaded', function() {
  // Scroll animation for timeline items
  const timelineItems = document.querySelectorAll('.animate-on-scroll');
  
  // Create Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // If the element is in the viewport
      if (entry.isIntersecting) {
        // Add the visible class
        entry.target.classList.add('visible');
        // Unobserve the element after it's been animated
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null, // Use the viewport as the root
    rootMargin: '0px', // No margin
    threshold: 0.1 // Trigger when 10% of the element is visible
  });
  
  // Observe each timeline item
  timelineItems.forEach(item => {
    observer.observe(item);
  });
});