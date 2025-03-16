document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-bs-theme', newTheme);
        themeIcon.className = `fas fa-${newTheme === 'dark' ? 'moon' : 'sun'}`;
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animate Progress Bars on Scroll
    const progressBars = document.querySelectorAll('.progress-bar');
    const animateProgressBars = () => {
        progressBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
            if (isVisible && !bar.classList.contains('animated')) {
                const width = bar.parentElement.previousElementSibling.querySelector('span:last-child').textContent;
                bar.style.width = '0';
                bar.classList.add('animated');
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
        });
    };

    // Initial animation
    animateProgressBars();

    // Animate on scroll
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                animateProgressBars();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    // Form Submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
});