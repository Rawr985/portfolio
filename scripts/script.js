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

    // Initialize EmailJS with your public key
    emailjs.init('Wd_Hy0Hs0Hs0Hs0H', { publicKey: 'Wd_Hy0Hs0Hs0Hs0H' });

    // Form Submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        const formData = {
            from_name: contactForm.querySelector('input[type="text"]').value,
            from_email: contactForm.querySelector('input[type="email"]').value,
            message: contactForm.querySelector('textarea').value,
            to_email: 'rawr985@proton.me'
        };

        try {
            await emailjs.send('service_portfolio', 'template_contact', formData, 'Wd_Hy0Hs0Hs0Hs0H');
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } catch (error) {
            console.error('Error:', error);
            alert('Sorry, there was an error sending your message. Please try again later.');
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
});