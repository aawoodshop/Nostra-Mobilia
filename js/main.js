document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(el => observer.observe(el));

    // Modal Logic
    const modalOverlay = document.querySelector('.modal-overlay');
    if (modalOverlay) {
        const closeModalBtn = modalOverlay.querySelector('.close-modal');
        const modalForm = modalOverlay.querySelector('.modal-form');

        // Open Modal
        window.openModal = function () {
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        };

        // Close Modal
        function closeModal() {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        closeModalBtn.addEventListener('click', closeModal);

        // Close on outside click
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });

        // Handle Form Submit
        modalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate API call
            const btn = modalForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Sending...';

            setTimeout(() => {
                alert('Thank you! Your quote request has been sent. We will contact you shortly.');
                modalForm.reset();
                closeModal();
                btn.textContent = originalText;
            }, 1000);
        });
    }

    // Attach openModal to buttons dynamically if needed, 
    // or rely on onclick="openModal()" in HTML
});
