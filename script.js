// Three.js Background Scene
let scene, camera, renderer, particles;

function initThreeJS() {
    const canvas = document.getElementById('three-canvas');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Create particle system
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];
    
    for (let i = 0; i < 5000; i++) {
        vertices.push(
            (Math.random() - 0.5) * 2000,
            (Math.random() - 0.5) * 2000,
            (Math.random() - 0.5) * 2000
        );
        
        const color = new THREE.Color();
        color.setHSL(Math.random() * 0.3 + 0.5, 0.7, 0.5);
        colors.push(color.r, color.g, color.b);
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 3,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
    
    camera.position.z = 300;
    
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    
    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.001;
    
    // Mouse parallax effect
    const mouseX = (window.mouseX || 0) * 0.0005;
    const mouseY = (window.mouseY || 0) * 0.0005;
    
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    
    renderer.render(scene, camera);
}

// Improved Custom Cursor
const cursor = document.querySelector('.cursor');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let isMoving = false;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    window.mouseX = e.clientX - window.innerWidth / 2;
    window.mouseY = e.clientY - window.innerHeight / 2;
    isMoving = true;
});

function updateCursor() {
    if (isMoving && cursor) {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        cursor.style.transform = `translate3d(${cursorX - 30}px, ${cursorY - 30}px, 0)`;
        
        // Reset moving flag
        if (Math.abs(mouseX - cursorX) < 0.1 && Math.abs(mouseY - cursorY) < 0.1) {
            isMoving = false;
        }
    }
    
    requestAnimationFrame(updateCursor);
}

if (window.innerWidth > 768) {
    updateCursor();
}

// Simple cursor hover effects (desktop only)
if (window.innerWidth > 768) {
    const cursorInner = document.querySelector('.cursor-inner');
    if (cursorInner) {
        document.querySelectorAll('a, button, .project-card, .contribution-card, .skill-category').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorInner.style.transform = 'scale(1.5) rotate(45deg)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursorInner.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    }
}

// Loader Animation
const loader = document.querySelector('.loader');
const loaderText = document.querySelector('.loader-text');

setTimeout(() => {
    anime({
        targets: loader,
        opacity: 0,
        duration: 1000,
        easing: 'easeOutCubic',
        complete: () => {
            loader.style.display = 'none';
            initAnimations();
        }
    });
}, 3000);

// Main Animation Timeline
function initAnimations() {
    // Hero animations
    anime.timeline()
        .add({
            targets: '.hero-subtitle',
            opacity: [0, 1],
            translateZ: [-50, 0],
            rotateX: [45, 0],
            duration: 1000,
            easing: 'easeOutCubic'
        })
        .add({
            targets: '.hero-title',
            opacity: [0, 1],
            translateZ: [-100, 0],
            rotateX: [90, 0],
            duration: 1200,
            easing: 'easeOutCubic'
        }, '-=500')
        .add({
            targets: '.hero-description',
            opacity: [0, 1],
            translateZ: [-30, 0],
            rotateX: [30, 0],
            duration: 1000,
            easing: 'easeOutCubic'
        }, '-=800')
        .add({
            targets: '.hero-cta',
            opacity: [0, 1],
            translateZ: [-20, 0],
            rotateX: [20, 0],
            duration: 1000,
            easing: 'easeOutCubic'
        }, '-=600');

    // Initialize Three.js after loader
    initThreeJS();
}

// Improved scroll-triggered animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -20px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add small delay for smoother animation
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, 50);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Simple hover effects without anime.js for better performance
document.querySelectorAll('.contribution-card, .skill-category').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateZ(10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateZ(0)';
    });
});

// Simple project card hover
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateZ(20px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateZ(0) scale(1)';
    });
});

// Simple form animations
document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
    input.addEventListener('focus', () => {
        input.style.transform = 'translateZ(10px)';
    });
    
    input.addEventListener('blur', () => {
        input.style.transform = 'translateZ(0)';
    });
});

// Smooth scroll for navigation
document.querySelectorAll('.nav-links a, .hero-cta').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll progress indicator
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            document.querySelector('.scroll-progress').style.width = scrolled + '%';
            ticking = false;
        });
        ticking = true;
    }
});

// Window resize handler
window.addEventListener('resize', () => {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});

// Navigation scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const nav = document.querySelector('.nav');
    
    if (currentScroll > 100) {
        nav.style.background = 'rgba(10, 10, 10, 0.95)';
        nav.style.backdropFilter = 'blur(30px)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.05)';
        nav.style.backdropFilter = 'blur(20px)';
    }
    
    lastScroll = currentScroll;
});

// Add random floating star particles
function createFloatingParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '8px';
    particle.style.height = '8px';
    particle.style.background = 'linear-gradient(45deg, #00d4ff, #8b5cf6)';
    particle.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1';
    particle.style.boxShadow = '0 0 15px rgba(0, 212, 255, 0.7)';
    
    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight + 10;
    
    particle.style.left = startX + 'px';
    particle.style.top = startY + 'px';
    
    document.body.appendChild(particle);
    
    anime({
        targets: particle,
        translateY: -window.innerHeight - 100,
        translateX: (Math.random() - 0.5) * 300,
        rotate: '360deg',
        scale: [0, 1, 0],
        opacity: [0, 1, 0],
        duration: Math.random() * 3000 + 2000,
        easing: 'easeOutCubic',
        complete: () => particle.remove()
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-open');
}

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('mobile-open');
    });
});

// Create particles periodically (only on desktop for performance)
if (window.innerWidth > 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(createFloatingParticle, 4000);
}