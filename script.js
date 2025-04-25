document.addEventListener('DOMContentLoaded', function() {
    // Loading Animation
    const loader = document.querySelector('.loader');
    if (loader) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
            }, 1500);
        });
    }

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const hoverElements = document.querySelectorAll('a, button, .project-card, .hover-effect');

    if (cursor && cursorFollower) {
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
    }

    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // Parallax Effect
    const parallaxImage = document.querySelector('.parallax-image');
    if (parallaxImage) {
        document.addEventListener('mousemove', function parallax(e) {
            const x = (window.innerWidth - e.pageX * 0.5) / 100;
            const y = (window.innerHeight - e.pageY * 0.5) / 100;
            parallaxImage.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    }

    // Text animation on hover
    const animatedTextElements = document.querySelectorAll('.text-animate');
    const animateText = (element) => {
        const text = element.textContent;
        element.textContent = '';
        
        for (let i = 0; i < text.length; i++) {
            setTimeout(() => {
                element.textContent += text[i];
            }, i * 100);
        }
    };

    animatedTextElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            animateText(element);
        });
    });

    // Scroll reveal animation
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('.project-card, .about-image, .contact-info', {
            origin: 'bottom',
            distance: '60px',
            duration: 1000,
            delay: 200,
            interval: 200,
            reset: true
        });
    }

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

    // Mobile Navigation Toggle (consolidated version)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Animate Links
            navItems.forEach((item, index) => {
                if (item.style.animation) {
                    item.style.animation = '';
                } else {
                    item.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                navItems.forEach(item => {
                    item.style.animation = '';
                });
            });
        });
    }

    // Header scroll effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 0);
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
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                    navItems.forEach(item => {
                        item.style.animation = '';
                    });
                }
            }
        });
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(contactForm);
            const name = formData.get('name') || '';
            const email = formData.get('email') || '';
            const message = formData.get('message') || '';
            
            // Validate form
            if (!name.trim() || !email.trim() || !message.trim()) {
                alert('Please fill in all fields');
                return;
            }
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            alert(`Thanks for your message, ${name}! I'll get back to you soon.`);
            contactForm.reset();
        });
    }

    // Feedback link handler
    document.querySelectorAll('.feedback-link').forEach(link => {
        link.addEventListener('click', (e) => {
            if (!link.getAttribute('target')) {
                e.preventDefault();
                const href = link.getAttribute('href');
                // You can add animation before redirecting
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            }
        });
    });

    // Email link click handler
    const emailLink = document.querySelector('.email-link');
    if (emailLink) {
        emailLink.addEventListener('click', (e) => {
            e.preventDefault();
            const email = 'gulshanadity@gmail.com';
            const subject = 'Portfolio Inquiry';
            const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
            
            // Animation before opening email client
            const icon = emailLink.querySelector('i');
            if (icon) {
                icon.classList.add('animate__animated', 'animate__rubberBand');
                setTimeout(() => {
                    icon.classList.remove('animate__animated', 'animate__rubberBand');
                }, 1000);
            }
            
            window.location.href = mailtoLink;
        });
    }

    // Update copyright year automatically
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Smooth scroll for footer links
    document.querySelectorAll('.footer-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
