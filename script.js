
// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    createFloatingElements();
    setupWishButtons();
    setupPhotoModals();
    setupSparkleEffect();
    animateSpecialMessage();
    setupScrollAnimations();
    setupCountdown();
    setupSurpriseButton();
    
    // Show birthday animation on load
    setTimeout(() => {
        createConfetti(window.innerWidth/2, 100);
        createFireworks(5);
    }, 1000);
});

// ========== FLOATING ELEMENTS BACKGROUND ==========
function createFloatingElements() {
    const container = document.getElementById('floatingElements');
    const heartCount = 15;
    const balloonCount = 8;
    const giftCount = 5;
    
    // Create floating hearts
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.fontSize = (Math.random() * 15 + 8) + 'px';
        container.appendChild(heart);
    }
    
    // Create floating balloons
    for (let i = 0; i < balloonCount; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'floating-balloon';
        balloon.style.left = Math.random() * 100 + 'vw';
        balloon.style.animationDuration = (Math.random() * 15 + 15) + 's';
        balloon.style.animationDelay = Math.random() * 10 + 's';
        balloon.style.backgroundColor = getRandomBalloonColor();
        
        const string = document.createElement('div');
        string.className = 'balloon-string';
        balloon.appendChild(string);
        
        container.appendChild(balloon);
    }
    
    // Create floating gifts
    for (let i = 0; i < giftCount; i++) {
        const gift = document.createElement('div');
        gift.className = 'floating-gift';
        gift.innerHTML = '🎁';
        gift.style.left = Math.random() * 100 + 'vw';
        gift.style.animationDuration = (Math.random() * 20 + 20) + 's';
        gift.style.animationDelay = Math.random() * 10 + 's';
        gift.style.color = getRandomBalloonColor();
        container.appendChild(gift);
    }
}

function getRandomBalloonColor() {
    const colors = [
        '#ff6b6b', '#6b5b95', '#ffb347', '#00b09b', 
        '#ff8e8e', '#8e7dbe', '#ffcc33', '#96c93d'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// ========== WISH BUTTONS FUNCTIONALITY ==========
function setupWishButtons() {
    const wishButtons = document.querySelectorAll('.wish-btn');
    
    wishButtons.forEach(button => {
        button.addEventListener('click', function() {
            const wishType = this.getAttribute('data-wish');
            const modal = document.getElementById(`${wishType}WishModal`);
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                createConfetti(window.innerWidth/2, window.innerHeight/2);
                createFireworks(3);
            }
        });
    });
    
    // Close buttons for all wish modals
    const closeButtons = document.querySelectorAll('.close-wish-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.wish-modal-overlay');
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close when clicking outside modal
    const modals = document.querySelectorAll('.wish-modal-overlay');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    });
}

// ========== PHOTO MODAL FUNCTIONALITY ==========
function setupPhotoModals() {
    const photoItems = document.querySelectorAll('.photo-item');
    
    photoItems.forEach(item => {
        item.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
}

// ========== SPARKLE EFFECT ==========
function setupSparkleEffect() {
    document.addEventListener('mousemove', function(e) {
        if (Math.random() > 0.9) { // Only create sparkles occasionally
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = e.pageX + 'px';
            sparkle.style.top = e.pageY + 'px';
            sparkle.style.backgroundColor = `hsl(${Math.random() * 60 + 330}, 100%, 70%)`;
            
            document.body.appendChild(sparkle);
            
            // Animate sparkle
            const size = Math.random() * 8 + 3;
            const animation = [
                { transform: 'scale(0)', opacity: 0 },
                { transform: `scale(${size})`, opacity: 0.8 },
                { transform: 'scale(0)', opacity: 0 }
            ];
            
            const timing = {
                duration: 800,
                iterations: 1
            };
            
            sparkle.animate(animation, timing);
            
            // Remove sparkle after animation
            setTimeout(() => {
                sparkle.remove();
            }, timing.duration);
        }
    });
}

// ========== SPECIAL MESSAGE ANIMATION ==========
function animateSpecialMessage() {
    const words = document.querySelectorAll('.special-message span');
    
    words.forEach((word, index) => {
        // Staggered animation
        word.style.animation = `floatUp 3s ease-in-out ${index * 0.1}s infinite`;
        
        // Random color change on hover
        word.addEventListener('mouseover', () => {
            const colors = ['#ff0066', '#9900cc', '#ff6600', '#00cc99'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            word.style.color = randomColor;
            word.style.textShadow = `0 0 5px ${randomColor}`;
        });
        
        word.addEventListener('mouseout', () => {
            word.style.color = '';
            word.style.textShadow = '';
        });
    });
}

// ========== SCROLL ANIMATIONS ==========
function setupScrollAnimations() {
    const animateElements = document.querySelectorAll('.wish-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

  // ========== COUNTDOWN TIMER WITH BUTTON ==========
  function setupCountdown() {
    const startBtn = document.getElementById('startCountdownBtn');
    const countdownContainer = document.getElementById('countdown');
    const countdownComplete = document.getElementById('countdownComplete');
    const instruction = document.querySelector('.countdown-instruction');
    
    startBtn.addEventListener('click', function() {
        // Hide button and show countdown
        this.style.display = 'none';
        instruction.style.display = 'none';
        countdownContainer.style.display = 'flex';
        
        // Set the countdown duration (10 seconds from now)
        const countdownDate = new Date().getTime() + 10000; // 10 seconds later
        
        // Update the countdown every 1 second
        const countdown = setInterval(function() {
            const now = new Date().getTime();
            const distance = countdownDate - now;
            
            // Time calculations for seconds
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Display the result
            document.getElementById("seconds").innerHTML = Math.floor(seconds).toString().padStart(2, '0');
            
            // If the countdown is finished
            if (distance < 0) {
                clearInterval(countdown);
                countdownContainer.style.display = 'none';
                countdownComplete.style.display = 'block';
                
                // Create celebration effects
                createFireworks(10);
                createConfetti(window.innerWidth/2, 100);
                
                // Play a sound if you want (uncomment if you add a sound)
                // const audio = new Audio('birthday-song.mp3');
                // audio.play();
            }
        }, 1000);
    });
}

// Update the DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    createFloatingElements();
    setupWishButtons();
    setupPhotoModals();
    setupSparkleEffect();
    animateSpecialMessage();
    setupScrollAnimations();
    setupCountdown(); // This is the updated function
    setupSurpriseButton();
    
    // Show birthday animation on load
    setTimeout(() => {
        createConfetti(window.innerWidth/2, 100);
        createFireworks(5);
    }, 1000);
});

// Rest of the JavaScript remains the same

// ========== SURPRISE BUTTON ==========
function setupSurpriseButton() {
    const surpriseBtn = document.getElementById('surpriseBtn');
    
    if (surpriseBtn) {
        surpriseBtn.addEventListener('click', function() {
            // Create lots of fireworks
            createFireworks(15);
            
            // Create confetti
            createConfetti(window.innerWidth/2, window.innerHeight/2);
            
            // Shake the button
            this.style.animation = 'shake 0.5s';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
            
            // Show a random wish modal
            const wishTypes = ['fun', 'sweet', 'funny', 'inspirational'];
            const randomWish = wishTypes[Math.floor(Math.random() * wishTypes.length)];
            const modal = document.getElementById(`${randomWish}WishModal`);
            
            if (modal) {
                setTimeout(() => {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }, 1000);
            }
        });
    }
}

// ========== CONFETTI EFFECT ==========
function createConfetti(x, y) {
    const colors = ['#ff6b6b', '#6b5b95', '#ffb3b3', '#8e7dbe', '#ff9999', '#ffd700'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = (x || Math.random() * window.innerWidth) + 'px';
        confetti.style.top = (y || Math.random() * window.innerHeight) + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = (Math.random() * 8 + 3) + 'px';
        confetti.style.height = (Math.random() * 8 + 3) + 'px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        
        document.body.appendChild(confetti);
        
        // Random animation
        const angle = Math.random() * 360;
        const distance = Math.random() * 150 + 50;
        const animation = [
            { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
            { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ];
        
        const timing = {
            duration: Math.random() * 1500 + 1000,
            iterations: 1
        };
        
        confetti.animate(animation, timing);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, timing.duration);
    }
}

// ========== FIREWORKS EFFECT ==========
function createFireworks(count) {
    const container = document.getElementById('fireworksContainer');
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight / 2;
            createFirework(x, y);
        }, i * 300);
    }
}

function createFirework(x, y) {
    const container = document.getElementById('fireworksContainer');
    const colors = ['#ff6b6b', '#6b5b95', '#ffd700', '#ff8e8e', '#8e7dbe', '#ffcc33'];
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Random size
        const size = Math.random() * 5 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        container.appendChild(particle);
        
        // Random end position
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        const xEnd = Math.cos(angle) * distance;
        const yEnd = Math.sin(angle) * distance;
        
        // Animate
        const animation = [
            { 
                transform: 'translate(0, 0) scale(0)', 
                opacity: 1 
            },
            { 
                transform: `translate(${xEnd}px, ${yEnd}px) scale(1)`, 
                opacity: 0 
            }
        ];
        
        const timing = {
            duration: 1000,
            iterations: 1,
            easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
        };
        
        particle.animate(animation, timing);
        
        // Remove after animation
        setTimeout(() => {
            particle.remove();
        }, timing.duration);
    }
}
