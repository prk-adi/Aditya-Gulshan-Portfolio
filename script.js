// Loading Animation
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
    }, 1500);
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const hoverElements = document.querySelectorAll('a, button, .project-card, .hover-effect');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Add slight delay to follower for smooth trailing effect
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Cursor hover effects
hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        cursorFollower.classList.add('active');
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        cursorFollower.classList.remove('active');
    });
});

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Parallax Effect
document.addEventListener('mousemove', parallax);
function parallax(e) {
    const parallaxImage = document.querySelector('.parallax-image');
    if (parallaxImage) {
        const x = (window.innerWidth - e.pageX * 0.5) / 100;
        const y = (window.innerHeight - e.pageY * 0.5) / 100;
        parallaxImage.style.transform = `translateX(${x}px) translateY(${y}px)`;
    }
}

// Text animation on scroll
const animateText = (element) => {
    const text = element.textContent;
    element.textContent = '';
    
    for (let i = 0; i < text.length; i++) {
        setTimeout(() => {
            element.textContent += text[i];
        }, i * 100);
    }
};

const animatedTextElements = document.querySelectorAll('.text-animate');
animatedTextElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        animateText(element);
    });
});

// Scroll reveal animation
ScrollReveal().reveal('.project-card, .about-image, .contact-info', {
    origin: 'bottom',
    distance: '60px',
    duration: 1000,
    delay: 200,
    interval: 200,
    reset: true
});

// Project card tilt effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const x = e.offsetX;
        const y = e.offsetY;
        const { width, height } = card.getBoundingClientRect();
        const rotateY = (x - width / 2) / 20;
        const rotateX = (height / 2 - y) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate Links
    links.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Hamburger Animation
    hamburger.classList.toggle('toggle');
});

// Close mobile menu when clicking a link
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('toggle');
        links.forEach(link => {
            link.style.animation = '';
        });
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 0);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', { name, email });
    
    // Show success message
    alert(`Thanks for your message, ${name}! I'll get back to you soon.`);
    contactForm.reset();
});