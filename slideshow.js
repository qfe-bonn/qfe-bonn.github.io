// Slideshow

  const imagePaths = [
    'images/ss1.jpg',
    'images/ss2.jpg',
    'images/ss3.jpg'
  ];

  let currentIndex = 0;
  const heroImage = document.querySelector('.hero-image');

  function changeImage() {
    currentIndex = (currentIndex + 1) % imagePaths.length;
    heroImage.classList.remove('fade');
    void heroImage.offsetWidth; // trigger reflow to restart animation
    heroImage.src = imagePaths[currentIndex];
    heroImage.classList.add('fade');
  }

  setInterval(changeImage, 7000); // Change every 5 seconds