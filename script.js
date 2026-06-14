// =========================================
// Custom Cursor
// =========================================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    document.querySelectorAll('a, button, .pill, .project-card, .info-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform += ' scale(2)';
            cursorFollower.style.opacity = '0.5';
        });
        el.addEventListener('mouseleave', () => {
            cursorFollower.style.opacity = '1';
        });
    });
}

// =========================================
// Mobile Menu
// =========================================
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('open');
    });
});

// =========================================
// Sticky Header
// =========================================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
    updateActiveNav();
});

// =========================================
// Active Nav Link
// =========================================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 120) {
            current = section.getAttribute('id');
        }
    });
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
}

// =========================================
// Scroll Reveal
// =========================================
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Stagger children in the same parent
            const siblings = entry.target.parentElement.querySelectorAll('.reveal');
            let delay = 0;
            siblings.forEach((sib, idx) => {
                if (sib === entry.target) delay = idx * 80;
            });
            setTimeout(() => {
                entry.target.classList.add('active');
            }, delay);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
});

revealEls.forEach(el => observer.observe(el));

// =========================================
// Trigger initial reveal for hero
// =========================================
window.addEventListener('load', () => {
    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('active'), i * 120);
    });
});
