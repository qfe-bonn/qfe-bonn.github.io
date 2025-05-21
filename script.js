document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      
      // Update aria-expanded attribute for accessibility
      const isExpanded = mainNav.classList.contains('active');
      mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = mainNav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
  
  // Tabs functionality
  const tabTriggers = document.querySelectorAll('.tab-trigger');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      // Remove active class from all triggers and contents
      tabTriggers.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked trigger
      trigger.classList.add('active');
      
      // Show corresponding content
      const tabId = trigger.getAttribute('data-tab');
      document.getElementById(`${tabId}-tab`).classList.add('active');
    });
  });
  
  // Form submission (prevent default for demo)
  const membershipForm = document.querySelector('.membership-form');
  if (membershipForm) {
    const submitButton = membershipForm.closest('.card').querySelector('.btn-primary');
    submitButton.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Form submitted successfully! (This is a demo)');
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for header
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add active class to current page in navigation
  const currentPage = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.style.fontWeight = '700';
      link.style.color = 'var(--primary)';
    }
  });
});