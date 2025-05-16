document.addEventListener('DOMContentLoaded', function() {
    const presentation = document.getElementById('presentation');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slideCounter = document.getElementById('slideCounter');
    const progressBar = document.getElementById('progressBar');
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Initialize first slide
    updateSlideCounter();
    updateProgressBar();

    // Navigation functions
    function goToSlide(index) {
        if (index < 0 || index >= totalSlides) return;
        
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Add active class to new slide
        slides[index].classList.add('active');
        
        // Update current slide index
        currentSlide = index;
        
        // Update UI elements
        updateSlideCounter();
        updateProgressBar();
        
        // Update button states
        updateButtonStates();
    }

    function updateSlideCounter() {
        slideCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;
    }

    function updateProgressBar() {
        const progress = ((currentSlide + 1) / totalSlides) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function updateButtonStates() {
        prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentSlide === totalSlides - 1 ? '0.5' : '1';
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            goToSlide(currentSlide - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) {
            goToSlide(currentSlide + 1);
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            if (currentSlide > 0) {
                goToSlide(currentSlide - 1);
            }
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            if (currentSlide < totalSlides - 1) {
                goToSlide(currentSlide + 1);
            }
        }
    });

    // Touch navigation for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;

    presentation.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    presentation.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left
                if (currentSlide < totalSlides - 1) {
                    goToSlide(currentSlide + 1);
                }
            } else {
                // Swipe right
                if (currentSlide > 0) {
                    goToSlide(currentSlide - 1);
                }
            }
        }
    }

    // Initialize button states
    updateButtonStates();

    // Animate decorative elements
    const decorations = document.querySelectorAll('.shape-decoration');
    decorations.forEach(decoration => {
        decoration.style.transition = 'all 2s ease';
        setInterval(() => {
            decoration.style.transform = `translate(${30 + Math.sin(Date.now() / 3000) * 5}%, ${30 + Math.cos(Date.now() / 3000) * 5}%)`;
        }, 50);
    });
}); 