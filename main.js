// Smooth scroll for anchor links with navbar offset, and collapse navbar on mobile after click
document.querySelectorAll('a.nav-link[href^="#"], a.btn[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      const yOffset = document.querySelector('.navbar').offsetHeight || 70;
      const yPos = target.getBoundingClientRect().top + window.pageYOffset - yOffset + 1;
      window.scrollTo({ top: yPos, behavior: 'smooth' });
      // Collapse navbar on mobile
      const navbarToggler = document.querySelector('.navbar-toggler');
      const navbarCollapse = document.getElementById('navbarNav');
      if (navbarToggler && window.getComputedStyle(navbarToggler).display !== "none" && navbarCollapse.classList.contains('show')) {
        navbarToggler.click();
      }
    }
  });
});

// Scrollspy: highlight nav as scrolling
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
  const offset = (document.querySelector('.navbar')?.offsetHeight || 70) + 8;
  let currentId = "";
  sections.forEach(section => {
    if (section.offsetTop - offset <= scrollPos) {
      currentId = section.id;
    }
  });
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    if (link.getAttribute('href') === `#${currentId}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

// Contact form validation and feedback
document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const message = form.querySelector('#message');
      const alertBox = document.getElementById('formAlert');
      let valid = true, msg = "";
      // Name validation
      if (!name.value.trim()) {
        valid = false;
        name.classList.add('is-invalid');
        msg = "Please enter your name.";
      } else {
        name.classList.remove('is-invalid');
      }
      // Email validation (simple regex)
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailPattern.test(email.value.trim())) {
        valid = false;
        email.classList.add('is-invalid');
        msg = "Please enter a valid email address.";
      } else {
        email.classList.remove('is-invalid');
      }
      // Message validation
      if (!message.value.trim()) {
        valid = false;
        message.classList.add('is-invalid');
        msg = "Please enter a message.";
      } else {
        message.classList.remove('is-invalid');
      }
      if(valid){
        alertBox.style.display = 'block';
        alertBox.className = 'alert alert-success';
        alertBox.textContent = 'Thank you for contacting us! We will get back to you soon.';
        form.reset();
      } else {
        alertBox.style.display = 'block';
        alertBox.className = 'alert alert-danger';
        alertBox.textContent = msg;
      }
      setTimeout(() => { alertBox.style.display = 'none'; }, 4000);
    });
  }
});

// Optional: Pure JS lightbox for gallery images
document.addEventListener('click', function(e){
  if(e.target.matches('#gallery img')) {
    const imgSrc = e.target.getAttribute('src');
    const lightbox = document.createElement('div');
    lightbox.style.position = 'fixed';
    lightbox.style.top = 0;
    lightbox.style.left = 0;
    lightbox.style.width = '100vw';
    lightbox.style.height = '100vh';
    lightbox.style.background = 'rgba(0,0,0,0.88)';
    lightbox.style.display = 'flex';
    lightbox.style.alignItems = 'center';
    lightbox.style.justifyContent = 'center';
    lightbox.style.cursor = 'zoom-out';
    lightbox.style.zIndex = 2000;
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = e.target.alt || "";
    img.style.maxWidth = '90vw';
    img.style.maxHeight = '90vh';
    img.style.borderRadius = '1rem';
    img.style.boxShadow = '0 8px 32px rgba(0,0,0,0.33)';
    lightbox.appendChild(img);
    lightbox.addEventListener('click', () => document.body.removeChild(lightbox));
    document.body.appendChild(lightbox);
  }
});