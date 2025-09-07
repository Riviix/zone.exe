// Portfolio JavaScript - Riviix
document.addEventListener('DOMContentLoaded', function() {
    // Dynamic Theme System based on time
    initializeDynamicTheme();
    // Loading Screen Animation
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const progressFill = document.querySelector('.progress-fill');
    
    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Hide loading screen after completion
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                mainContent.classList.remove('hidden');
                
                // Initialize animations
                initializeAnimations();
            }, 500);
        }
        progressFill.style.width = progress + '%';
    }, 200);

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(42, 42, 42, 0.3)';
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    // Intersection Observer for animations
    function initializeAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    
                    // Animate skill bars
                    if (entry.target.classList.contains('skill-progress')) {
                        const width = entry.target.getAttribute('data-width');
                        setTimeout(() => {
                            entry.target.style.width = width;
                        }, 300);
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.skill-card, .project-card, .stat, .contact-method');
        animatedElements.forEach(el => observer.observe(el));

        // Observe skill progress bars
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => observer.observe(bar));
    }

    // Typing effect for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                // Check if we're at the word "Riviix" to add the highlight span
                if (text.substring(i, i + 6) === 'Riviix') {
                    element.innerHTML += '<span class="highlight">Riviix</span>';
                    i += 6;
                } else {
                    element.innerHTML += text.charAt(i);
                    i++;
                }
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing effect after loading
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        const originalText = heroTitle.textContent; // Use textContent instead of innerHTML
        typeWriter(heroTitle, originalText, 50);
    }, 2000);

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const codeWindow = document.querySelector('.code-window');
        
        if (hero && codeWindow) {
            const rate = scrolled * -0.5;
            codeWindow.style.transform = `translateY(${rate}px)`;
        }
    });

    // Skill cards hover effect
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Project cards interaction
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px)';
            }, 150);
        });
    });

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Por favor, completa todos los campos', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('¡Mensaje enviado correctamente!', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4ecdc4' : type === 'error' ? '#ff6b6b' : '#00d4ff'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Cursor trail effect
    let mouseX = 0, mouseY = 0;
    let ballX = 0, ballY = 0;
    const speed = 0.1;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        ballX += (mouseX - ballX) * speed;
        ballY += (mouseY - ballY) * speed;
        
        // Create cursor trail
        if (Math.abs(mouseX - ballX) > 1 || Math.abs(mouseY - ballY) > 1) {
            const trail = document.createElement('div');
            trail.style.cssText = `
                position: fixed;
                left: ${ballX}px;
                top: ${ballY}px;
                width: 4px;
                height: 4px;
                background: var(--primary-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                opacity: 0.6;
            `;
            document.body.appendChild(trail);
            
            // Fade out and remove
            setTimeout(() => {
                trail.style.transition = 'opacity 0.5s ease';
                trail.style.opacity = '0';
                setTimeout(() => {
                    if (trail.parentNode) {
                        trail.parentNode.removeChild(trail);
                    }
                }, 500);
            }, 100);
        }
        
        requestAnimationFrame(animate);
    }
    animate();

    // Particle background effect
    function createParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
        document.body.appendChild(particleContainer);

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: var(--primary-color);
                border-radius: 50%;
                opacity: 0.3;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${5 + Math.random() * 10}s linear infinite;
            `;
            particleContainer.appendChild(particle);
        }

        // Add floating animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
                10% { opacity: 0.3; }
                90% { opacity: 0.3; }
                100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize particles after loading
    setTimeout(createParticles, 1000);

    // Button click effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: var(--primary-color);
        color: var(--bg-primary);
        font-size: 1.5rem;
        font-weight: bold;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 212, 255, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    // Initialize everything
    console.log('🚀 Portfolio Riviix cargado correctamente');
    
    // Initialize games
    initializeGames();
});

// Dynamic Theme System
function initializeDynamicTheme() {
    const currentHour = new Date().getHours();
    const body = document.body;
    
    // Remove existing theme classes
    body.classList.remove('theme-morning', 'theme-afternoon', 'theme-evening', 'theme-night');
    
    if (currentHour >= 6 && currentHour < 12) {
        // Morning (6:00 - 11:59) - Alegre y energético
        body.classList.add('theme-morning');
        console.log('🌅 Tema matutino activado');
    } else if (currentHour >= 12 && currentHour < 17) {
        // Afternoon (12:00 - 16:59) - Día brillante
        body.classList.add('theme-afternoon');
        console.log('☀️ Tema vespertino activado');
    } else if (currentHour >= 17 && currentHour < 21) {
        // Evening (17:00 - 20:59) - Atardecer anaranjado
        body.classList.add('theme-evening');
        console.log('🌅 Tema atardecer activado');
    } else {
        // Night (21:00 - 5:59) - Noche lluviosa
        body.classList.add('theme-night');
        console.log('🌙 Tema nocturno activado');
    }
    
    // Add weather effects for night theme
    if (body.classList.contains('theme-night')) {
        createRainEffect();
    }
}

// Rain Effect for Night Theme
function createRainEffect() {
    const rainContainer = document.createElement('div');
    rainContainer.className = 'rain-container';
    rainContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    // Create rain drops
    for (let i = 0; i < 100; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.cssText = `
            position: absolute;
            width: 2px;
            height: ${Math.random() * 20 + 10}px;
            background: linear-gradient(to bottom, transparent, rgba(0, 255, 255, 0.3), transparent);
            left: ${Math.random() * 100}%;
            top: -20px;
            animation: rainFall ${Math.random() * 2 + 1}s linear infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        rainContainer.appendChild(drop);
    }
    
    document.body.appendChild(rainContainer);
    
    // Add rain animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainFall {
            0% { transform: translateY(-100vh); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Games System
function initializeGames() {
    // Game launch buttons
    const gameLaunchBtns = document.querySelectorAll('.game-launch-btn');
    gameLaunchBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const gameCard = this.closest('.game-card');
            const gameType = gameCard.getAttribute('data-game');
            
            if (gameType === 'paint') {
                openPaintGame();
            } else if (gameType === 'snake') {
                openSnakeGame();
            } else if (gameType === 'chess') {
                openChessGame();
            }
        });
    });
    
    // Close game modals
    const closeGameBtns = document.querySelectorAll('.close-game-btn');
    closeGameBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.game-modal');
            modal.classList.add('hidden');
            
            // Cleanup snake game if it's running
            if (modal.id === 'snake-modal' && window.snakeCleanup) {
                window.snakeCleanup();
            }
        });
    });
    
    // Close modal on background click
    const gameModals = document.querySelectorAll('.game-modal');
    gameModals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.add('hidden');
                
                // Cleanup snake game if it's running
                if (this.id === 'snake-modal' && window.snakeCleanup) {
                    window.snakeCleanup();
                }
            }
        });
    });
}

// Paint Game
function openPaintGame() {
    const paintModal = document.getElementById('paint-modal');
    paintModal.classList.remove('hidden');
    
    // Initialize paint canvas
    initializePaintCanvas();
    
    // Resize canvas after modal is shown
    setTimeout(() => {
        const canvas = document.getElementById('paint-canvas');
        if (canvas) {
            // Trigger resize after modal animation
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, 100);
        }
    }, 50);
}

// Snake Game Implementation
function initializeSnakeGame() {
    const canvas = document.getElementById('snake-canvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('snake-score');
    const highScoreElement = document.getElementById('snake-high-score');
    const levelElement = document.getElementById('snake-level');
    const weatherElement = document.getElementById('snake-weather');
    const statusElement = document.getElementById('snake-status');
    const startBtn = document.getElementById('snake-start-btn');
    const pauseBtn = document.getElementById('snake-pause-btn');
    const resetBtn = document.getElementById('snake-reset-btn');
    
    // Game variables
    const gridSize = 20;
    const tileCount = canvas.width / gridSize;
    
    let snake = [
        {x: 10, y: 10}
    ];
    let food = {};
    let specialFoods = []; // Array for special power-ups
    let dx = 0;
    let dy = 0;
    let score = 0;
    let level = 1;
    let highScore = localStorage.getItem('snakeHighScore') || 0;
    let gameRunning = false;
    let gamePaused = false;
    let gameLoop;
    let weatherEffect = null;
    let weatherInterval = null;
    let timeOfDay = 'morning'; // morning, afternoon, evening, night
    let currentWeather = 'sunny'; // sunny, rainy, snowy
    let gameSpeed = 150;
    let slowTimeActive = false;
    let extraLives = 0;
    let multiFoodActive = false;
    
    // Initialize high score and level
    highScoreElement.textContent = highScore;
    levelElement.textContent = level;
    
    // Determine time of day based on current time
    function updateTimeOfDay() {
        const hour = new Date().getHours();
        if (hour >= 6 && hour < 12) {
            timeOfDay = 'morning';
        } else if (hour >= 12 && hour < 17) {
            timeOfDay = 'afternoon';
        } else if (hour >= 17 && hour < 21) {
            timeOfDay = 'evening';
        } else {
            timeOfDay = 'night';
        }
        updateWeatherDisplay();
    }
    
    // Update weather based on level and random chance
    function updateWeather() {
        const weatherChance = Math.random();
        
        if (level >= 3 && weatherChance < 0.3) {
            currentWeather = 'rainy';
        } else if (level >= 5 && weatherChance < 0.2) {
            currentWeather = 'snowy';
        } else {
            currentWeather = 'sunny';
        }
        
        updateWeatherDisplay();
        startWeatherEffect();
    }
    
    // Update weather display
    function updateWeatherDisplay() {
        let weatherText = '';
        let weatherIcon = '';
        
        if (currentWeather === 'rainy') {
            weatherIcon = '🌧️';
            weatherText = 'Lluvia';
        } else if (currentWeather === 'snowy') {
            weatherIcon = '❄️';
            weatherText = 'Nieve';
        } else {
            if (timeOfDay === 'morning') {
                weatherIcon = '☀️';
                weatherText = 'Soleado';
            } else if (timeOfDay === 'afternoon') {
                weatherIcon = '☀️';
                weatherText = 'Soleado';
            } else if (timeOfDay === 'evening') {
                weatherIcon = '🌅';
                weatherText = 'Atardecer';
            } else {
                weatherIcon = '🌙';
                weatherText = 'Noche';
            }
        }
        
        weatherElement.textContent = `${weatherIcon} ${weatherText}`;
    }
    
    // Start weather effects
    function startWeatherEffect() {
        clearWeatherEffect();
        
        if (currentWeather === 'rainy') {
            createRainEffect();
        } else if (currentWeather === 'snowy') {
            createSnowEffect();
        }
    }
    
    // Create rain effect
    function createRainEffect() {
        weatherInterval = setInterval(() => {
            for (let i = 0; i < 3; i++) {
                const drop = document.createElement('div');
                drop.className = 'rain-drop weather-effect';
                drop.style.left = Math.random() * 400 + 'px';
                drop.style.animationDuration = (Math.random() * 0.5 + 0.5) + 's';
                document.querySelector('.snake-canvas-container').appendChild(drop);
                
                setTimeout(() => {
                    if (drop.parentNode) {
                        drop.parentNode.removeChild(drop);
                    }
                }, 1000);
            }
        }, 100);
    }
    
    // Create snow effect
    function createSnowEffect() {
        weatherInterval = setInterval(() => {
            for (let i = 0; i < 2; i++) {
                const flake = document.createElement('div');
                flake.className = 'snow-flake weather-effect';
                flake.style.left = Math.random() * 400 + 'px';
                flake.style.animationDuration = (Math.random() * 2 + 2) + 's';
                document.querySelector('.snake-canvas-container').appendChild(flake);
                
                setTimeout(() => {
                    if (flake.parentNode) {
                        flake.parentNode.removeChild(flake);
                    }
                }, 3000);
            }
        }, 200);
    }
    
    // Clear weather effects
    function clearWeatherEffect() {
        if (weatherInterval) {
            clearInterval(weatherInterval);
            weatherInterval = null;
        }
        document.querySelectorAll('.weather-effect').forEach(el => el.remove());
    }
    
    // Update level based on score
    function updateLevel() {
        const newLevel = Math.floor(score / 50) + 1;
        if (newLevel > level) {
            level = newLevel;
            levelElement.textContent = level;
            
            // Increase game speed slightly
            gameSpeed = Math.max(80, 150 - (level * 5));
            
            // Update weather
            updateWeather();
            
            // Show level up message
            statusElement.textContent = `¡Nivel ${level}! Velocidad aumentada`;
            setTimeout(() => {
                if (gameRunning) {
                    statusElement.textContent = '¡Jugando! Presiona una tecla de dirección para empezar a mover';
                }
            }, 2000);
        }
    }
    
    // Generate random food position
    function generateFood() {
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount),
            type: 'normal'
        };
        
        // Make sure food doesn't spawn on snake
        for (let segment of snake) {
            if (segment.x === food.x && segment.y === food.y) {
                generateFood();
                return;
            }
        }
        
        // Generate special foods occasionally
        if (Math.random() < 0.05) { // 5% chance
            generateSpecialFood();
        }
    }
    
    // Generate special power-up food
    function generateSpecialFood() {
        const specialTypes = ['rainbow', 'life', 'multi'];
        const randomType = specialTypes[Math.floor(Math.random() * specialTypes.length)];
        
        let specialFood = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount),
            type: randomType,
            timeLeft: 300 // 5 seconds at 60fps
        };
        
        // Make sure special food doesn't spawn on snake or normal food
        let validPosition = false;
        while (!validPosition) {
            validPosition = true;
            for (let segment of snake) {
                if (segment.x === specialFood.x && segment.y === specialFood.y) {
                    validPosition = false;
                    break;
                }
            }
            if (validPosition && specialFood.x === food.x && specialFood.y === food.y) {
                validPosition = false;
            }
            if (!validPosition) {
                specialFood.x = Math.floor(Math.random() * tileCount);
                specialFood.y = Math.floor(Math.random() * tileCount);
            }
        }
        
        specialFoods.push(specialFood);
    }
    
    // Draw game elements
    function drawGame() {
        // Clear canvas with environmental background
        drawBackground();
        
        // Draw snake with neon effect
        snake.forEach((segment, index) => {
            if (index === 0) {
                // Head with special effect
                ctx.fillStyle = '#00ff88';
                ctx.shadowColor = '#00ff88';
                ctx.shadowBlur = 10;
            } else {
                // Body
                ctx.fillStyle = '#00ffff';
                ctx.shadowColor = '#00ffff';
                ctx.shadowBlur = 5;
            }
            
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
        });
        
        // Draw normal food with pulsing effect
        ctx.fillStyle = '#ff0080';
        ctx.shadowColor = '#ff0080';
        ctx.shadowBlur = 15;
        const pulse = Math.sin(Date.now() * 0.01) * 2 + 2;
        ctx.fillRect(food.x * gridSize + pulse, food.y * gridSize + pulse, gridSize - 4 - pulse, gridSize - 4 - pulse);
        
        // Draw special foods
        specialFoods.forEach((specialFood, index) => {
            specialFood.timeLeft--;
            if (specialFood.timeLeft <= 0) {
                specialFoods.splice(index, 1);
                return;
            }
            
            let color, shadowColor;
            switch(specialFood.type) {
                case 'rainbow':
                    color = `hsl(${(Date.now() * 0.1) % 360}, 100%, 50%)`;
                    shadowColor = color;
                    break;
                case 'life':
                    color = '#ff0000';
                    shadowColor = '#ff0000';
                    break;
                case 'multi':
                    color = '#ffff00';
                    shadowColor = '#ffff00';
                    break;
            }
            
            ctx.fillStyle = color;
            ctx.shadowColor = shadowColor;
            ctx.shadowBlur = 20;
            const specialPulse = Math.sin(Date.now() * 0.02) * 3 + 3;
            ctx.fillRect(specialFood.x * gridSize + specialPulse, specialFood.y * gridSize + specialPulse, 
                        gridSize - 6 - specialPulse, gridSize - 6 - specialPulse);
        });
        
        // Reset shadow
        ctx.shadowBlur = 0;
    }
    
    
    // Draw environmental background
    function drawBackground() {
        // Get ground color based on time and weather
        const groundColor = getGroundColor();
        ctx.fillStyle = groundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add atmospheric lighting effects
        drawAtmosphericLighting();
    }
    
    // Draw atmospheric lighting effects
    function drawAtmosphericLighting() {
        if (timeOfDay === 'night') {
            drawMoonlightEffect();
            applyPageAtmosphere('night');
        } else if (timeOfDay === 'evening') {
            drawSunsetEffect();
            applyPageAtmosphere('evening');
        } else if (timeOfDay === 'morning') {
            drawDawnEffect();
            applyPageAtmosphere('morning');
        }
        
        if (currentWeather === 'rainy') {
            drawRainyAtmosphere();
            applyPageAtmosphere('rainy');
        } else if (currentWeather === 'snowy') {
            drawSnowyAtmosphere();
            applyPageAtmosphere('snowy');
        }
    }
    
    // Apply atmospheric effects to the entire page
    function applyPageAtmosphere(type) {
        const modal = document.getElementById('snake-modal');
        const container = document.querySelector('.snake-game-container');
        
        // Remove existing atmosphere classes
        modal.classList.remove('atmosphere-night', 'atmosphere-evening', 'atmosphere-morning', 'atmosphere-rainy', 'atmosphere-snowy');
        container.classList.remove('atmosphere-night', 'atmosphere-evening', 'atmosphere-morning', 'atmosphere-rainy', 'atmosphere-snowy');
        
        // Apply new atmosphere class
        if (type === 'night') {
            modal.classList.add('atmosphere-night');
            container.classList.add('atmosphere-night');
        } else if (type === 'evening') {
            modal.classList.add('atmosphere-evening');
            container.classList.add('atmosphere-evening');
        } else if (type === 'morning') {
            modal.classList.add('atmosphere-morning');
            container.classList.add('atmosphere-morning');
        } else if (type === 'rainy') {
            modal.classList.add('atmosphere-rainy');
            container.classList.add('atmosphere-rainy');
        } else if (type === 'snowy') {
            modal.classList.add('atmosphere-snowy');
            container.classList.add('atmosphere-snowy');
        }
    }
    
    // Draw moonlight effect with RTX-style lighting
    function drawMoonlightEffect() {
        // Create gradient for moonlight
        const gradient = ctx.createRadialGradient(
            canvas.width * 0.3, canvas.height * 0.2, 0,
            canvas.width * 0.3, canvas.height * 0.2, canvas.width * 0.8
        );
        
        gradient.addColorStop(0, 'rgba(173, 216, 230, 0.08)'); // Light blue center
        gradient.addColorStop(0.3, 'rgba(135, 206, 250, 0.04)'); // Sky blue
        gradient.addColorStop(0.6, 'rgba(70, 130, 180, 0.02)'); // Steel blue
        gradient.addColorStop(1, 'rgba(25, 25, 112, 0.005)'); // Midnight blue
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add moonlight shimmer
        drawShimmerEffect('rgba(173, 216, 230, 0.15)');
    }
    
    // Draw sunset effect
    function drawSunsetEffect() {
        const gradient = ctx.createRadialGradient(
            canvas.width * 0.7, canvas.height * 0.3, 0,
            canvas.width * 0.7, canvas.height * 0.3, canvas.width * 0.9
        );
        
        gradient.addColorStop(0, 'rgba(255, 140, 0, 0.06)'); // Orange center
        gradient.addColorStop(0.4, 'rgba(255, 69, 0, 0.04)'); // Red orange
        gradient.addColorStop(0.7, 'rgba(139, 69, 19, 0.02)'); // Saddle brown
        gradient.addColorStop(1, 'rgba(101, 67, 33, 0.005)'); // Dark brown
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add sunset glow
        drawShimmerEffect('rgba(255, 140, 0, 0.1)');
    }
    
    // Draw dawn effect
    function drawDawnEffect() {
        const gradient = ctx.createRadialGradient(
            canvas.width * 0.2, canvas.height * 0.1, 0,
            canvas.width * 0.2, canvas.height * 0.1, canvas.width * 0.7
        );
        
        gradient.addColorStop(0, 'rgba(255, 228, 196, 0.05)'); // Bisque center
        gradient.addColorStop(0.3, 'rgba(255, 218, 185, 0.03)'); // Peach puff
        gradient.addColorStop(0.6, 'rgba(255, 192, 203, 0.015)'); // Pink
        gradient.addColorStop(1, 'rgba(255, 182, 193, 0.005)'); // Light pink
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add dawn shimmer
        drawShimmerEffect('rgba(255, 228, 196, 0.08)');
    }
    
    // Draw shimmer effect for atmospheric lighting
    function drawShimmerEffect(color) {
        const time = Date.now() * 0.0003; // Much slower movement
        const shimmerCount = 3; // Much fewer particles
        
        for (let i = 0; i < shimmerCount; i++) {
            const x = (Math.sin(time * 0.2 + i * 2.5) * 0.3 + 0.5) * canvas.width;
            const y = (Math.cos(time * 0.15 + i * 3.1) * 0.3 + 0.5) * canvas.height;
            const size = 60 + Math.sin(time * 0.1 + i) * 20; // Larger, slower size change
            const opacity = 0.15 + Math.sin(time * 0.05 + i * 1.5) * 0.1; // Subtle opacity change
            
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
            gradient.addColorStop(0, color.replace('0.3', opacity.toString()));
            gradient.addColorStop(0.6, color.replace('0.3', (opacity * 0.4).toString()));
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(x - size, y - size, size * 2, size * 2);
        }
    }
    
    // Draw rainy atmosphere
    function drawRainyAtmosphere() {
        // Add misty overlay
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, 'rgba(135, 206, 235, 0.1)'); // Sky blue
        gradient.addColorStop(0.5, 'rgba(176, 196, 222, 0.05)'); // Light steel blue
        gradient.addColorStop(1, 'rgba(119, 136, 153, 0.02)'); // Light slate gray
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // Draw snowy atmosphere
    function drawSnowyAtmosphere() {
        // Add cold mist
        const gradient = ctx.createRadialGradient(
            canvas.width * 0.5, canvas.height * 0.5, 0,
            canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.8
        );
        
        gradient.addColorStop(0, 'rgba(240, 248, 255, 0.08)'); // Alice blue
        gradient.addColorStop(0.5, 'rgba(230, 230, 250, 0.04)'); // Lavender
        gradient.addColorStop(1, 'rgba(220, 220, 220, 0.01)'); // Gainsboro
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // Get ground color based on time and weather
    function getGroundColor() {
        if (currentWeather === 'snowy') {
            return '#F0F8FF'; // Light snowy ground with blue tint
        }
        
        let baseColor;
        if (timeOfDay === 'morning') {
            baseColor = '#1B3B1B'; // Very dark green ground
        } else if (timeOfDay === 'afternoon') {
            baseColor = '#2D4A2D'; // Dark green ground
        } else if (timeOfDay === 'evening') {
            baseColor = '#4A2C17'; // Dark brown ground
        } else { // night
            baseColor = '#0F0F23'; // Very dark blue ground
        }
        
        if (currentWeather === 'rainy') {
            // Darker and more saturated when raining
            return adjustColorBrightness(baseColor, -30);
        }
        
        return baseColor;
    }
    
    // Adjust color brightness
    function adjustColorBrightness(color, amount) {
        const num = parseInt(color.replace("#", ""), 16);
        const r = Math.max(0, Math.min(255, ((num >> 16) & 255) + amount));
        const g = Math.max(0, Math.min(255, ((num >> 8) & 255) + amount));
        const b = Math.max(0, Math.min(255, (num & 255) + amount));
        return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
    }
    
    // Move snake
    function moveSnake() {
        // Don't move if no direction is set
        if (dx === 0 && dy === 0) {
            return;
        }
        
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};
        
        // Check wall collision
        if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
            gameOver();
            return;
        }
        
        // Check self collision
        for (let segment of snake) {
            if (head.x === segment.x && head.y === segment.y) {
                gameOver();
                return;
            }
        }
        
        snake.unshift(head);
        
        // Check food collision
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            scoreElement.textContent = score;
            updateLevel();
            generateFood();
        } else {
            snake.pop();
        }
        
        // Check special food collisions
        specialFoods.forEach((specialFood, index) => {
            if (head.x === specialFood.x && head.y === specialFood.y) {
                handleSpecialFood(specialFood.type);
                specialFoods.splice(index, 1);
            }
        });
    }
    
    // Handle special food effects
    function handleSpecialFood(type) {
        switch(type) {
            case 'rainbow':
                // Slow time for 30 seconds
                slowTimeActive = true;
                gameSpeed = Math.max(50, gameSpeed * 2);
                statusElement.textContent = '🌈 ¡Tiempo lento activado por 30 segundos!';
                setTimeout(() => {
                    slowTimeActive = false;
                    gameSpeed = Math.max(80, 150 - (level * 5));
                    if (gameRunning) {
                        statusElement.textContent = '¡Jugando! Presiona una tecla de dirección para empezar a mover';
                    }
                }, 30000);
                break;
                
            case 'life':
                // Extra life
                extraLives++;
                statusElement.textContent = `❤️ ¡Vida extra! Total: ${extraLives + 1}`;
                setTimeout(() => {
                    if (gameRunning) {
                        statusElement.textContent = '¡Jugando! Presiona una tecla de dirección para empezar a mover';
                    }
                }, 2000);
                break;
                
            case 'multi':
                // Spawn more food
                multiFoodActive = true;
                for (let i = 0; i < 3; i++) {
                    generateFood();
                }
                statusElement.textContent = '🍎 ¡Más comida apareció!';
                setTimeout(() => {
                    multiFoodActive = false;
                    if (gameRunning) {
                        statusElement.textContent = '¡Jugando! Presiona una tecla de dirección para empezar a mover';
                    }
                }, 2000);
                break;
        }
    }
    
    // Game over
    function gameOver() {
        // Check for extra lives
        if (extraLives > 0) {
            extraLives--;
            statusElement.textContent = `❤️ ¡Vida extra usada! Vidas restantes: ${extraLives}`;
            
            // Remove last segment of snake
            if (snake.length > 1) {
                snake.pop();
            }
            
            // Continue game
            return;
        }
        
        // No extra lives, game over
        gameRunning = false;
        gamePaused = false;
        clearInterval(gameLoop);
        clearWeatherEffect();
        
        if (score > highScore) {
            highScore = score;
            highScoreElement.textContent = highScore;
            localStorage.setItem('snakeHighScore', highScore);
        }
        
        statusElement.textContent = '¡Game Over! Presiona Reiniciar para jugar de nuevo';
        startBtn.textContent = 'Iniciar Juego';
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        pauseBtn.textContent = 'Pausar';
    }
    
    // Game loop
    function gameStep() {
        if (gameRunning && !gamePaused) {
            moveSnake();
            drawGame();
        }
    }
    
    // Start game
    function startGame() {
        if (!gameRunning) {
            // Reset game
            snake = [{x: 10, y: 10}];
            dx = 0;
            dy = 0;
            score = 0;
            level = 1;
            extraLives = 0;
            specialFoods = [];
            scoreElement.textContent = score;
            levelElement.textContent = level;
            gameSpeed = 150;
            
            // Initialize time and weather
            updateTimeOfDay();
            updateWeather();
            
            generateFood();
            
            gameRunning = true;
            gamePaused = false;
            
            startBtn.textContent = 'Jugando...';
            startBtn.disabled = true;
            pauseBtn.disabled = false;
            statusElement.textContent = '¡Jugando! Presiona una tecla de dirección para empezar a mover';
            
            gameLoop = setInterval(gameStep, gameSpeed);
            drawGame();
        }
    }
    
    // Pause/Resume game
    function togglePause() {
        if (gameRunning) {
            gamePaused = !gamePaused;
            if (gamePaused) {
                pauseBtn.textContent = 'Reanudar';
                statusElement.textContent = 'Juego pausado - Presiona Reanudar';
            } else {
                pauseBtn.textContent = 'Pausar';
                statusElement.textContent = '¡Jugando! Presiona una tecla de dirección para empezar a mover';
            }
        }
    }
    
    // Reset game
    function resetGame() {
        gameRunning = false;
        gamePaused = false;
        clearInterval(gameLoop);
        clearWeatherEffect();
        
        snake = [{x: 10, y: 10}];
        dx = 0;
        dy = 0;
        score = 0;
        level = 1;
        extraLives = 0;
        specialFoods = [];
        gameSpeed = 150;
        slowTimeActive = false;
        multiFoodActive = false;
        
        scoreElement.textContent = score;
        levelElement.textContent = level;
        
        // Reset time and weather
        updateTimeOfDay();
        updateWeather();
        
        generateFood();
        
        startBtn.textContent = 'Iniciar Juego';
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        pauseBtn.textContent = 'Pausar';
        statusElement.textContent = 'Presiona ESPACIO o Iniciar para empezar';
        
        drawGame();
    }
    
    // Keyboard controls
    function handleKeyPress(e) {
        const key = e.key.toLowerCase();
        
        // Handle space key for start/pause regardless of game state
        if (key === ' ') {
            e.preventDefault();
            if (gameRunning) {
                togglePause();
            } else {
                startGame();
            }
            return;
        }
        
        // Only handle movement keys when game is running and not paused
        if (!gameRunning || gamePaused) return;
        
        switch(key) {
            case 'w':
            case 'arrowup':
                if (dy !== 1) {
                    dx = 0;
                    dy = -1;
                }
                break;
            case 's':
            case 'arrowdown':
                if (dy !== -1) {
                    dx = 0;
                    dy = 1;
                }
                break;
            case 'a':
            case 'arrowleft':
                if (dx !== 1) {
                    dx = -1;
                    dy = 0;
                }
                break;
            case 'd':
            case 'arrowright':
                if (dx !== -1) {
                    dx = 1;
                    dy = 0;
                }
                break;
        }
    }
    
    // Event listeners
    startBtn.addEventListener('click', startGame);
    pauseBtn.addEventListener('click', togglePause);
    resetBtn.addEventListener('click', resetGame);
    
    // Keyboard event listener
    document.addEventListener('keydown', handleKeyPress);
    
    // Initial setup
    generateFood();
    drawGame();
    
    // Cleanup function for when modal closes
    const cleanup = () => {
        clearInterval(gameLoop);
        document.removeEventListener('keydown', handleKeyPress);
    };
    
    // Store cleanup function for later use
    window.snakeCleanup = cleanup;
}

// Snake Game
function openSnakeGame() {
    const snakeModal = document.getElementById('snake-modal');
    snakeModal.classList.remove('hidden');
    
    // Initialize snake game
    initializeSnakeGame();
}

// Chess Game
function openChessGame() {
    const chessModal = document.getElementById('chess-modal');
    chessModal.classList.remove('hidden');
    
    // Initialize chess game
    initializeChessGame();
}

// Chess Game Implementation
function initializeChessGame() {
    const board = document.getElementById('chess-board');
    const statusElement = document.getElementById('chess-status');
    const turnElement = document.getElementById('chess-turn');
    const newGameBtn = document.getElementById('chess-new-game');
    const undoBtn = document.getElementById('chess-undo');
    const hintBtn = document.getElementById('chess-hint');
    const analyzeBtn = document.getElementById('chess-analyze');
    
    // Game state
    let gameBoard = [];
    let currentPlayer = 'white';
    let selectedSquare = null;
    let gameHistory = [];
    let isGameOver = false;
    let gameStatus = 'playing'; // 'playing', 'check', 'checkmate', 'stalemate', 'draw'
    let enPassantTarget = null;
    let castlingRights = {
        white: { king: true, queen: true },
        black: { king: true, queen: true }
    };
    let halfMoveClock = 0;
    let fullMoveNumber = 1;
    let aiElo = 800; // AI difficulty level
    
    // Initialize board
    initializeBoard();
    renderBoard();
    
    // Event listeners
    newGameBtn.addEventListener('click', startNewGame);
    undoBtn.addEventListener('click', undoMove);
    hintBtn.addEventListener('click', showHint);
    analyzeBtn.addEventListener('click', analyzePosition);
    
    // Difficulty slider
    const difficultySlider = document.getElementById('ai-difficulty');
    const eloDisplay = document.getElementById('ai-elo-display');
    
    difficultySlider.addEventListener('input', updateAIDifficulty);
    updateAIDifficulty(); // Initialize display
    
    // Update AI difficulty
    function updateAIDifficulty() {
        aiElo = parseInt(difficultySlider.value);
        eloDisplay.textContent = `${aiElo} ELO`;
        
        // Update level labels with visual feedback
        const levelLabels = document.querySelectorAll('.level-label');
        levelLabels.forEach((label, index) => {
            label.classList.remove('active');
        });
        
        // Highlight appropriate level
        if (aiElo <= 400) {
            levelLabels[0].classList.add('active');
        } else if (aiElo <= 800) {
            levelLabels[1].classList.add('active');
        } else if (aiElo <= 1400) {
            levelLabels[2].classList.add('active');
        } else {
            levelLabels[3].classList.add('active');
        }
    }
    
    // Initialize board with starting position
    function initializeBoard() {
        gameBoard = [
            ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
        ];
        
        // Randomize starting player
        currentPlayer = Math.random() < 0.5 ? 'white' : 'black';
        
        selectedSquare = null;
        gameHistory = [];
        isGameOver = false;
        gameStatus = 'playing';
        enPassantTarget = null;
        castlingRights = {
            white: { king: true, queen: true },
            black: { king: true, queen: true }
        };
        halfMoveClock = 0;
        fullMoveNumber = 1;
        updateStatus();
        
        // If AI starts, make its move
        if (currentPlayer !== 'white') {
            setTimeout(() => makeAIMove(), 1000);
        }
    }
    
    // Render the chess board
    function renderBoard() {
        board.innerHTML = '';
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.className = `chess-square ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
                square.dataset.row = row;
                square.dataset.col = col;
                
                const piece = gameBoard[row][col];
                if (piece) {
                    const pieceElement = document.createElement('span');
                    pieceElement.className = `chess-piece ${piece === piece.toUpperCase() ? 'white' : 'black'}`;
                    pieceElement.textContent = getPieceSymbol(piece);
                    square.appendChild(pieceElement);
                }
                
                square.addEventListener('click', () => handleSquareClick(row, col));
                board.appendChild(square);
            }
        }
        
        // Highlight kings in check
        highlightKingsInCheck();
    }
    
    // Get piece symbol
    function getPieceSymbol(piece) {
        const symbols = {
            'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
            'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
        };
        return symbols[piece] || '';
    }
    
    // Highlight kings in check
    function highlightKingsInCheck() {
        // Check white king
        if (isInCheck('white')) {
            const whiteKing = findKing('white');
            if (whiteKing) {
                const square = document.querySelector(`[data-row="${whiteKing.row}"][data-col="${whiteKing.col}"]`);
                if (square) {
                    square.classList.add('in-check');
                }
            }
        }
        
        // Check black king
        if (isInCheck('black')) {
            const blackKing = findKing('black');
            if (blackKing) {
                const square = document.querySelector(`[data-row="${blackKing.row}"][data-col="${blackKing.col}"]`);
                if (square) {
                    square.classList.add('in-check');
                }
            }
        }
    }
    
    // Handle square click
    function handleSquareClick(row, col) {
        if (isGameOver) return;
        
        // Only allow human player to move (always white pieces)
        if (currentPlayer !== 'white') return;
        
        const piece = gameBoard[row][col];
        
        if (selectedSquare) {
            // Try to move piece
            if (isValidMove(selectedSquare.row, selectedSquare.col, row, col)) {
                makeMove(selectedSquare.row, selectedSquare.col, row, col);
                selectedSquare = null;
                clearHighlights();
                
                if (!isGameOver) {
                    currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
                    updateStatus();
                    
                    // AI move after a short delay (if it's AI's turn)
                    if (currentPlayer !== 'white') {
                        setTimeout(() => makeAIMove(), 1000);
                    }
                }
            } else {
                // Select new piece
                if (piece && isHumanPiece(piece)) {
                    selectSquare(row, col);
                } else {
                    selectedSquare = null;
                    clearHighlights();
                }
            }
        } else {
            // Select piece
            if (piece && isHumanPiece(piece)) {
                selectSquare(row, col);
            }
        }
    }
    
    // Select square
    function selectSquare(row, col) {
        selectedSquare = { row, col };
        clearHighlights();
        
        // Highlight selected square
        const square = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        square.classList.add('selected');
        
        // Highlight possible moves
        const possibleMoves = getPossibleMoves(row, col);
        possibleMoves.forEach(move => {
            const moveSquare = document.querySelector(`[data-row="${move.row}"][data-col="${move.col}"]`);
            moveSquare.classList.add('possible-move');
        });
    }
    
    // Clear highlights
    function clearHighlights() {
        document.querySelectorAll('.chess-square').forEach(square => {
            square.classList.remove('selected', 'possible-move', 'last-move');
        });
    }
    
    // Check if piece belongs to current player
    function isPlayerPiece(piece) {
        if (currentPlayer === 'white') {
            return piece === piece.toUpperCase();
        } else {
            return piece === piece.toLowerCase();
        }
    }
    
    // Check if piece belongs to human player (always white pieces)
    function isHumanPiece(piece) {
        return piece === piece.toUpperCase();
    }
    
    // Get possible moves for a piece
    function getPossibleMoves(row, col) {
        const piece = gameBoard[row][col];
        const moves = [];
        
        // Basic move validation (simplified)
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                if (isValidMove(row, col, r, c)) {
                    moves.push({ row: r, col: c });
                }
            }
        }
        
        return moves;
    }
    
    // Check if move is valid (complete chess rules)
    function isValidMove(fromRow, fromCol, toRow, toCol) {
        const piece = gameBoard[fromRow][fromCol];
        const targetPiece = gameBoard[toRow][toCol];
        
        // Can't move to same square
        if (fromRow === toRow && fromCol === toCol) return false;
        
        // Can't capture own piece
        if (targetPiece && isPlayerPiece(targetPiece)) return false;
        
        const rowDiff = Math.abs(toRow - fromRow);
        const colDiff = Math.abs(toCol - fromCol);
        const isWhite = piece === piece.toUpperCase();
        
        let isValidBasicMove = false;
        
        switch (piece.toLowerCase()) {
            case 'p': // Pawn
                if (isWhite) { // White pawn
                    // Move forward one square
                    if (fromRow - toRow === 1 && colDiff === 0 && !targetPiece) isValidBasicMove = true;
                    // Move forward two squares from starting position
                    else if (fromRow === 6 && fromRow - toRow === 2 && colDiff === 0 && !targetPiece && isPathClear(fromRow, fromCol, toRow, toCol)) isValidBasicMove = true;
                    // Capture diagonally
                    else if (fromRow - toRow === 1 && colDiff === 1 && targetPiece) isValidBasicMove = true;
                    // En passant
                    else if (fromRow === 3 && fromRow - toRow === 1 && colDiff === 1 && !targetPiece && enPassantTarget && enPassantTarget.row === toRow && enPassantTarget.col === toCol) isValidBasicMove = true;
                } else { // Black pawn
                    // Move forward one square
                    if (toRow - fromRow === 1 && colDiff === 0 && !targetPiece) isValidBasicMove = true;
                    // Move forward two squares from starting position
                    else if (fromRow === 1 && toRow - fromRow === 2 && colDiff === 0 && !targetPiece && isPathClear(fromRow, fromCol, toRow, toCol)) isValidBasicMove = true;
                    // Capture diagonally
                    else if (toRow - fromRow === 1 && colDiff === 1 && targetPiece) isValidBasicMove = true;
                    // En passant
                    else if (fromRow === 4 && toRow - fromRow === 1 && colDiff === 1 && !targetPiece && enPassantTarget && enPassantTarget.row === toRow && enPassantTarget.col === toCol) isValidBasicMove = true;
                }
                break;
                
            case 'r': // Rook
                isValidBasicMove = (rowDiff === 0 || colDiff === 0) && isPathClear(fromRow, fromCol, toRow, toCol);
                break;
                
            case 'n': // Knight
                isValidBasicMove = (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
                break;
                
            case 'b': // Bishop
                isValidBasicMove = rowDiff === colDiff && isPathClear(fromRow, fromCol, toRow, toCol);
                break;
                
            case 'q': // Queen
                isValidBasicMove = (rowDiff === colDiff || rowDiff === 0 || colDiff === 0) && 
                       isPathClear(fromRow, fromCol, toRow, toCol);
                break;
                       
            case 'k': // King
                // Normal king move
                if (rowDiff <= 1 && colDiff <= 1) isValidBasicMove = true;
                // Castling
                else if (rowDiff === 0 && colDiff === 2) {
                    isValidBasicMove = isValidCastling(fromRow, fromCol, toRow, toCol);
                }
                break;
        }
        
        // If basic move is valid, check if it would put own king in check
        if (isValidBasicMove) {
            return !wouldBeInCheckAfterMove(fromRow, fromCol, toRow, toCol);
        }
        
        return false;
    }
    
    // Check if castling is valid
    function isValidCastling(fromRow, fromCol, toRow, toCol) {
        const isWhite = currentPlayer === 'white';
        const kingRow = isWhite ? 7 : 0;
        
        if (fromRow !== kingRow) return false;
        
        // Check if king has moved
        if (!castlingRights[currentPlayer].king) return false;
        
        // Check if rook has moved
        const isKingside = toCol === 6;
        if (isKingside && !castlingRights[currentPlayer].king) return false;
        if (!isKingside && !castlingRights[currentPlayer].queen) return false;
        
        // Check if squares are empty
        const rookCol = isKingside ? 7 : 0;
        const pathCols = isKingside ? [5, 6] : [1, 2, 3];
        
        for (let col of pathCols) {
            if (gameBoard[kingRow][col] !== '') return false;
        }
        
        // Check if king is in check
        if (isInCheck(currentPlayer)) return false;
        
        // Check if any square in the path is under attack
        for (let col of pathCols) {
            if (isSquareUnderAttack(kingRow, col, currentPlayer)) return false;
        }
        
        return true;
    }
    
    // Check if path is clear
    function isPathClear(fromRow, fromCol, toRow, toCol) {
        const rowStep = toRow > fromRow ? 1 : toRow < fromRow ? -1 : 0;
        const colStep = toCol > fromCol ? 1 : toCol < fromCol ? -1 : 0;
        
        let r = fromRow + rowStep;
        let c = fromCol + colStep;
        
        while (r !== toRow || c !== toCol) {
            if (gameBoard[r][c] !== '') return false;
            r += rowStep;
            c += colStep;
        }
        
        return true;
    }
    
    // Make a move
    function makeMove(fromRow, fromCol, toRow, toCol) {
        const piece = gameBoard[fromRow][fromCol];
        const capturedPiece = gameBoard[toRow][toCol];
        const isWhite = piece === piece.toUpperCase();
        
        // Save move to history
        const moveData = {
            from: { row: fromRow, col: fromCol },
            to: { row: toRow, col: toCol },
            piece: piece,
            captured: capturedPiece,
            enPassantTarget: enPassantTarget,
            castlingRights: JSON.parse(JSON.stringify(castlingRights)),
            halfMoveClock: halfMoveClock,
            fullMoveNumber: fullMoveNumber
        };
        
        gameHistory.push(moveData);
        
        // Handle special moves
        if (piece.toLowerCase() === 'p') {
            // En passant capture
            if (enPassantTarget && toRow === enPassantTarget.row && toCol === enPassantTarget.col) {
                const capturedPawnRow = isWhite ? toRow + 1 : toRow - 1;
                gameBoard[capturedPawnRow][toCol] = '';
            }
            
            // Set en passant target for next move
            if (Math.abs(toRow - fromRow) === 2) {
                enPassantTarget = { row: (fromRow + toRow) / 2, col: toCol };
            } else {
                enPassantTarget = null;
            }
            
            // Pawn promotion (simplified - always promote to queen)
            if ((isWhite && toRow === 0) || (!isWhite && toRow === 7)) {
                gameBoard[toRow][toCol] = isWhite ? 'Q' : 'q';
            } else {
                gameBoard[toRow][toCol] = piece;
            }
        } else {
            gameBoard[toRow][toCol] = piece;
            enPassantTarget = null;
        }
        
        // Handle castling
        if (piece.toLowerCase() === 'k' && Math.abs(toCol - fromCol) === 2) {
            const isKingside = toCol === 6;
            const rookCol = isKingside ? 7 : 0;
            const newRookCol = isKingside ? 5 : 3;
            
            gameBoard[toRow][newRookCol] = gameBoard[toRow][rookCol];
            gameBoard[toRow][rookCol] = '';
        }
        
        gameBoard[fromRow][fromCol] = '';
        
        // Update castling rights
        if (piece.toLowerCase() === 'k') {
            castlingRights[currentPlayer].king = false;
            castlingRights[currentPlayer].queen = false;
        } else if (piece.toLowerCase() === 'r') {
            if (fromRow === (isWhite ? 7 : 0)) {
                if (fromCol === 0) {
                    castlingRights[currentPlayer].queen = false;
                } else if (fromCol === 7) {
                    castlingRights[currentPlayer].king = false;
                }
            }
        }
        
        // Update move counters
        if (capturedPiece || piece.toLowerCase() === 'p') {
            halfMoveClock = 0;
        } else {
            halfMoveClock++;
        }
        
        if (currentPlayer === 'black') {
            fullMoveNumber++;
        }
        
        // Update UI
        renderBoard();
        
        // Highlight last move
        const fromSquare = document.querySelector(`[data-row="${fromRow}"][data-col="${fromCol}"]`);
        const toSquare = document.querySelector(`[data-row="${toRow}"][data-col="${toCol}"]`);
        fromSquare.classList.add('last-move');
        toSquare.classList.add('last-move');
        
        // Check for game over
        checkGameOver();
        
        // Enable undo button
        undoBtn.disabled = false;
    }
    
    // Make AI move (ELO-based intelligence)
    function makeAIMove() {
        const aiPlayer = currentPlayer; // AI plays as current player
        const moves = getAllPossibleMoves(aiPlayer);
        if (moves.length > 0) {
            let selectedMove;
            
            // Calculate AI intelligence based on ELO
            const intelligence = calculateAIIntelligence(aiElo);
            
            if (intelligence.level === 'beginner') {
                selectedMove = getBeginnerMove(moves, aiPlayer);
            } else if (intelligence.level === 'intermediate') {
                selectedMove = getIntermediateMove(moves, aiPlayer);
            } else if (intelligence.level === 'advanced') {
                selectedMove = getAdvancedMove(moves, aiPlayer);
            } else {
                selectedMove = getMasterMove(moves, aiPlayer);
            }
            
            // Add thinking delay based on ELO
            const thinkingTime = Math.max(500, 2000 - (aiElo / 2));
            
            setTimeout(() => {
                makeMove(selectedMove.from.row, selectedMove.from.col, selectedMove.to.row, selectedMove.to.col);
                
                // Switch to human player
                currentPlayer = aiPlayer === 'white' ? 'black' : 'white';
                updateStatus();
            }, thinkingTime);
        } else {
            // AI has no legal moves - check for checkmate or stalemate
            checkGameOver();
        }
    }
    
    // Calculate AI intelligence level based on ELO
    function calculateAIIntelligence(elo) {
        if (elo <= 400) {
            return { level: 'beginner', accuracy: 0.3, depth: 1 };
        } else if (elo <= 800) {
            return { level: 'intermediate', accuracy: 0.6, depth: 2 };
        } else if (elo <= 1400) {
            return { level: 'advanced', accuracy: 0.8, depth: 3 };
        } else {
            return { level: 'master', accuracy: 0.95, depth: 4 };
        }
    }
    
    // Beginner AI: Random moves with basic safety
    function getBeginnerMove(moves, aiPlayer) {
        // If in check, prioritize escaping
        if (isInCheck(aiPlayer)) {
            const checkEscapingMoves = moves.filter(move => {
                const originalPiece = gameBoard[move.to.row][move.to.col];
                const movingPiece = gameBoard[move.from.row][move.from.col];
                
                gameBoard[move.to.row][move.to.col] = movingPiece;
                gameBoard[move.from.row][move.from.col] = '';
                
                const stillInCheck = isInCheck(aiPlayer);
                
                gameBoard[move.from.row][move.from.col] = movingPiece;
                gameBoard[move.to.row][move.to.col] = originalPiece;
                
                return !stillInCheck;
            });
            
            if (checkEscapingMoves.length > 0) {
                return checkEscapingMoves[Math.floor(Math.random() * checkEscapingMoves.length)];
            }
        }
        
        // Random move with 30% chance of being good
        if (Math.random() < 0.3) {
            const capturingMoves = moves.filter(move => gameBoard[move.to.row][move.to.col] !== '');
            if (capturingMoves.length > 0) {
                return capturingMoves[Math.floor(Math.random() * capturingMoves.length)];
            }
        }
        
        return moves[Math.floor(Math.random() * moves.length)];
    }
    
    // Intermediate AI: Basic strategy
    function getIntermediateMove(moves, aiPlayer) {
        // If in check, prioritize escaping
        if (isInCheck(aiPlayer)) {
            const checkEscapingMoves = moves.filter(move => {
                const originalPiece = gameBoard[move.to.row][move.to.col];
                const movingPiece = gameBoard[move.from.row][move.from.col];
                
                gameBoard[move.to.row][move.to.col] = movingPiece;
                gameBoard[move.from.row][move.from.col] = '';
                
                const stillInCheck = isInCheck(aiPlayer);
                
                gameBoard[move.from.row][move.from.col] = movingPiece;
                gameBoard[move.to.row][move.to.col] = originalPiece;
                
                return !stillInCheck;
            });
            
            if (checkEscapingMoves.length > 0) {
                return checkEscapingMoves[Math.floor(Math.random() * checkEscapingMoves.length)];
            }
        }
        
        // Prioritize captures and center control
        const capturingMoves = moves.filter(move => gameBoard[move.to.row][move.to.col] !== '');
        if (capturingMoves.length > 0) {
            return capturingMoves[Math.floor(Math.random() * capturingMoves.length)];
        }
        
        // Prefer center moves
        const centerMoves = moves.filter(move => {
            const centerDistance = Math.abs(move.to.row - 3.5) + Math.abs(move.to.col - 3.5);
            return centerDistance < 4;
        });
        
        if (centerMoves.length > 0) {
            return centerMoves[Math.floor(Math.random() * centerMoves.length)];
        }
        
        return moves[Math.floor(Math.random() * moves.length)];
    }
    
    // Advanced AI: Better strategy and piece values
    function getAdvancedMove(moves, aiPlayer) {
        // If in check, prioritize escaping
        if (isInCheck(aiPlayer)) {
            const checkEscapingMoves = moves.filter(move => {
                const originalPiece = gameBoard[move.to.row][move.to.col];
                const movingPiece = gameBoard[move.from.row][move.from.col];
                
                gameBoard[move.to.row][move.to.col] = movingPiece;
                gameBoard[move.from.row][move.from.col] = '';
                
                const stillInCheck = isInCheck(aiPlayer);
                
                gameBoard[move.from.row][move.from.col] = movingPiece;
                gameBoard[move.to.row][move.to.col] = originalPiece;
                
                return !stillInCheck;
            });
            
            if (checkEscapingMoves.length > 0) {
                return checkEscapingMoves[Math.floor(Math.random() * checkEscapingMoves.length)];
            }
        }
        
        // Evaluate moves based on piece values and position
        const evaluatedMoves = moves.map(move => ({
            move: move,
            score: evaluateMove(move, aiPlayer)
        }));
        
        // Sort by score (higher is better)
        evaluatedMoves.sort((a, b) => b.score - a.score);
        
        // Choose from top moves with some randomness
        const topMoves = evaluatedMoves.slice(0, Math.max(1, Math.floor(evaluatedMoves.length * 0.3)));
        return topMoves[Math.floor(Math.random() * topMoves.length)].move;
    }
    
    // Master AI: Advanced evaluation and lookahead
    function getMasterMove(moves, aiPlayer) {
        // If in check, prioritize escaping
        if (isInCheck(aiPlayer)) {
            const checkEscapingMoves = moves.filter(move => {
                const originalPiece = gameBoard[move.to.row][move.to.col];
                const movingPiece = gameBoard[move.from.row][move.from.col];
                
                gameBoard[move.to.row][move.to.col] = movingPiece;
                gameBoard[move.from.row][move.from.col] = '';
                
                const stillInCheck = isInCheck(aiPlayer);
                
                gameBoard[move.from.row][move.from.col] = movingPiece;
                gameBoard[move.to.row][move.to.col] = originalPiece;
                
                return !stillInCheck;
            });
            
            if (checkEscapingMoves.length > 0) {
                return checkEscapingMoves[Math.floor(Math.random() * checkEscapingMoves.length)];
            }
        }
        
        // Advanced evaluation with lookahead
        const evaluatedMoves = moves.map(move => ({
            move: move,
            score: evaluateMoveAdvanced(move, aiPlayer)
        }));
        
        // Sort by score (higher is better)
        evaluatedMoves.sort((a, b) => b.score - a.score);
        
        // Choose from top moves with minimal randomness
        const topMoves = evaluatedMoves.slice(0, Math.max(1, Math.floor(evaluatedMoves.length * 0.1)));
        return topMoves[Math.floor(Math.random() * topMoves.length)].move;
    }
    
    // Basic move evaluation
    function evaluateMove(move, aiPlayer) {
        let score = 0;
        const targetPiece = gameBoard[move.to.row][move.to.col];
        
        // Piece values
        const pieceValues = { 'p': 1, 'n': 3, 'b': 3, 'r': 5, 'q': 9, 'k': 100 };
        
        // Capture bonus
        if (targetPiece) {
            const pieceValue = pieceValues[targetPiece.toLowerCase()] || 0;
            score += pieceValue * 10;
        }
        
        // Center control bonus
        const centerDistance = Math.abs(move.to.row - 3.5) + Math.abs(move.to.col - 3.5);
        score += (8 - centerDistance) * 2;
        
        // Development bonus (move pieces from starting position)
        const piece = gameBoard[move.from.row][move.from.col];
        if (piece.toLowerCase() === 'n' || piece.toLowerCase() === 'b') {
            const startingRow = aiPlayer === 'white' ? 7 : 0;
            if (move.from.row === startingRow) {
                score += 5;
            }
        }
        
        return score;
    }
    
    // Advanced move evaluation
    function evaluateMoveAdvanced(move, aiPlayer) {
        let score = evaluateMove(move, aiPlayer);
        
        // Look ahead one move
        const originalPiece = gameBoard[move.to.row][move.to.col];
        const movingPiece = gameBoard[move.from.row][move.from.col];
        
        // Make the move temporarily
        gameBoard[move.to.row][move.to.col] = movingPiece;
        gameBoard[move.from.row][move.from.col] = '';
        
        // Check if this move puts opponent in check
        const opponent = aiPlayer === 'white' ? 'black' : 'white';
        if (isInCheck(opponent)) {
            score += 20;
        }
        
        // Check if this move creates threats
        const opponentMoves = getAllPossibleMoves(opponent);
        const threats = opponentMoves.filter(oppMove => {
            const oppTargetPiece = gameBoard[oppMove.to.row][oppMove.to.col];
            return oppTargetPiece && oppTargetPiece !== oppTargetPiece.toLowerCase();
        });
        
        if (threats.length > 0) {
            score -= 10; // Penalty for creating threats
        }
        
        // Restore the board
        gameBoard[move.from.row][move.from.col] = movingPiece;
        gameBoard[move.to.row][move.to.col] = originalPiece;
        
        return score;
    }
    
    // Get all possible moves for a player
    function getAllPossibleMoves(player) {
        const moves = [];
        const isPlayerPiece = (piece) => {
            if (player === 'white') {
                return piece === piece.toUpperCase();
            } else {
                return piece === piece.toLowerCase();
            }
        };
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = gameBoard[row][col];
                if (piece && isPlayerPiece(piece)) {
                    for (let r = 0; r < 8; r++) {
                        for (let c = 0; c < 8; c++) {
                            if (isValidMove(row, col, r, c)) {
                                moves.push({
                                    from: { row, col },
                                    to: { row: r, col: c }
                                });
                            }
                        }
                    }
                }
            }
        }
        
        return moves;
    }
    
    // Check if king is in check
    function isInCheck(player) {
        const kingPos = findKing(player);
        if (!kingPos) return false;
        
        const opponent = player === 'white' ? 'black' : 'white';
        const opponentPieces = getAllPieces(opponent);
        
        for (let piece of opponentPieces) {
            // Check if opponent piece can attack the king (without considering check)
            if (canPieceAttackSquare(piece.row, piece.col, kingPos.row, kingPos.col)) {
                return true;
            }
        }
        
        return false;
    }
    
    // Check if a piece can attack a square (without considering check rules)
    function canPieceAttackSquare(fromRow, fromCol, toRow, toCol) {
        const piece = gameBoard[fromRow][fromCol];
        const targetPiece = gameBoard[toRow][toCol];
        
        // Can't attack same square
        if (fromRow === toRow && fromCol === toCol) return false;
        
        const rowDiff = Math.abs(toRow - fromRow);
        const colDiff = Math.abs(toCol - fromCol);
        const isWhite = piece === piece.toUpperCase();
        
        switch (piece.toLowerCase()) {
            case 'p': // Pawn
                if (isWhite) { // White pawn
                    return (fromRow - toRow === 1 && colDiff === 1) || // Diagonal capture
                           (fromRow === 3 && fromRow - toRow === 1 && colDiff === 1 && enPassantTarget && 
                            enPassantTarget.row === toRow && enPassantTarget.col === toCol); // En passant
                } else { // Black pawn
                    return (toRow - fromRow === 1 && colDiff === 1) || // Diagonal capture
                           (fromRow === 4 && toRow - fromRow === 1 && colDiff === 1 && enPassantTarget && 
                            enPassantTarget.row === toRow && enPassantTarget.col === toCol); // En passant
                }
                
            case 'r': // Rook
                return (rowDiff === 0 || colDiff === 0) && isPathClear(fromRow, fromCol, toRow, toCol);
                
            case 'n': // Knight
                return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
                
            case 'b': // Bishop
                return rowDiff === colDiff && isPathClear(fromRow, fromCol, toRow, toCol);
                
            case 'q': // Queen
                return (rowDiff === colDiff || rowDiff === 0 || colDiff === 0) && 
                       isPathClear(fromRow, fromCol, toRow, toCol);
                       
            case 'k': // King
                return rowDiff <= 1 && colDiff <= 1;
        }
        
        return false;
    }
    
    // Find king position
    function findKing(player) {
        const king = player === 'white' ? 'K' : 'k';
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (gameBoard[row][col] === king) {
                    return { row, col };
                }
            }
        }
        return null;
    }
    
    // Get all pieces for a player
    function getAllPieces(player) {
        const pieces = [];
        const isPlayerPiece = (piece) => {
            if (player === 'white') {
                return piece === piece.toUpperCase();
            } else {
                return piece === piece.toLowerCase();
            }
        };
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = gameBoard[row][col];
                if (piece && isPlayerPiece(piece)) {
                    pieces.push({ row, col, piece });
                }
            }
        }
        
        return pieces;
    }
    
    // Check if move would put king in check
    function wouldBeInCheckAfterMove(fromRow, fromCol, toRow, toCol) {
        const originalPiece = gameBoard[toRow][toCol];
        const movingPiece = gameBoard[fromRow][fromCol];
        const movingPlayer = movingPiece === movingPiece.toUpperCase() ? 'white' : 'black';
        
        // Make the move temporarily
        gameBoard[toRow][toCol] = movingPiece;
        gameBoard[fromRow][fromCol] = '';
        
        const inCheck = isInCheck(movingPlayer);
        
        // Restore the board
        gameBoard[fromRow][fromCol] = movingPiece;
        gameBoard[toRow][toCol] = originalPiece;
        
        return inCheck;
    }
    
    // Check if a square is under attack by opponent
    function isSquareUnderAttack(row, col, player) {
        const opponent = player === 'white' ? 'black' : 'white';
        const opponentPieces = getAllPieces(opponent);
        
        for (let piece of opponentPieces) {
            if (canPieceAttackSquare(piece.row, piece.col, row, col)) {
                return true;
            }
        }
        
        return false;
    }
    
    // Check if path is clear and not under attack
    function isPathClearAndSafe(fromRow, fromCol, toRow, toCol, player) {
        const rowStep = toRow > fromRow ? 1 : toRow < fromRow ? -1 : 0;
        const colStep = toCol > fromCol ? 1 : toCol < fromCol ? -1 : 0;
        
        let currentRow = fromRow + rowStep;
        let currentCol = fromCol + colStep;
        
        while (currentRow !== toRow || currentCol !== toCol) {
            // Check if square is occupied
            if (gameBoard[currentRow][currentCol] !== '') {
                return false;
            }
            
            // Check if square is under attack
            if (isSquareUnderAttack(currentRow, currentCol, player)) {
                return false;
            }
            
            currentRow += rowStep;
            currentCol += colStep;
        }
        
        return true;
    }
    
    // Check for game over
    function checkGameOver() {
        const moves = getAllPossibleMoves(currentPlayer);
        const inCheck = isInCheck(currentPlayer);
        
        if (moves.length === 0) {
            isGameOver = true;
            if (inCheck) {
                gameStatus = 'checkmate';
                const winner = currentPlayer === 'white' ? 'IA' : 'Jugador';
                statusElement.textContent = `¡Jaque mate! ${winner} gana`;
            } else {
                gameStatus = 'stalemate';
                statusElement.textContent = '¡Ahogado! Empate';
            }
        } else if (inCheck) {
            gameStatus = 'check';
            const playerName = currentPlayer === 'white' ? 'Jugador' : 'IA';
            statusElement.textContent = `¡Jaque! ${playerName} está en jaque`;
        } else {
            gameStatus = 'playing';
        }
        
        // Check for draw conditions
        if (halfMoveClock >= 50) {
            isGameOver = true;
            gameStatus = 'draw';
            statusElement.textContent = 'Empate por regla de 50 movimientos';
        }
    }
    
    // Update status
    function updateStatus() {
        const isHumanTurn = currentPlayer === 'white';
        turnElement.textContent = isHumanTurn ? 'Jugador' : 'IA';
        
        if (!isGameOver) {
            if (isInCheck(currentPlayer)) {
                statusElement.textContent = `¡Jaque! ${isHumanTurn ? 'Jugador' : 'IA'} está en jaque`;
            } else {
                statusElement.textContent = `Turno de ${isHumanTurn ? 'Jugador' : 'IA'}`;
            }
        }
    }
    
    // Start new game
    function startNewGame() {
        initializeBoard();
        renderBoard();
        undoBtn.disabled = true;
    }
    
    // Undo last move
    function undoMove() {
        if (gameHistory.length > 0) {
            const lastMove = gameHistory.pop();
            
            // Restore board position
            gameBoard[lastMove.from.row][lastMove.from.col] = lastMove.piece;
            gameBoard[lastMove.to.row][lastMove.to.col] = lastMove.captured;
            
            // Restore special move data
            enPassantTarget = lastMove.enPassantTarget;
            castlingRights = lastMove.castlingRights;
            halfMoveClock = lastMove.halfMoveClock;
            fullMoveNumber = lastMove.fullMoveNumber;
            
            // Handle castling undo
            if (lastMove.piece.toLowerCase() === 'k' && Math.abs(lastMove.to.col - lastMove.from.col) === 2) {
                const isKingside = lastMove.to.col === 6;
                const rookCol = isKingside ? 7 : 0;
                const newRookCol = isKingside ? 5 : 3;
                
                gameBoard[lastMove.from.row][rookCol] = gameBoard[lastMove.from.row][newRookCol];
                gameBoard[lastMove.from.row][newRookCol] = '';
            }
            
            // Handle en passant undo
            if (lastMove.piece.toLowerCase() === 'p' && lastMove.captured === '' && 
                lastMove.to.col !== lastMove.from.col) {
                const isWhite = lastMove.piece === lastMove.piece.toUpperCase();
                const capturedPawnRow = isWhite ? lastMove.to.row + 1 : lastMove.to.row - 1;
                gameBoard[capturedPawnRow][lastMove.to.col] = isWhite ? 'p' : 'P';
            }
            
            currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
            isGameOver = false;
            gameStatus = 'playing';
            
            renderBoard();
            updateStatus();
            
            if (gameHistory.length === 0) {
                undoBtn.disabled = true;
            }
        }
    }
    
    // Show hint
    function showHint() {
        const moves = getAllPossibleMoves(currentPlayer);
        if (moves.length > 0) {
            const randomMove = moves[Math.floor(Math.random() * moves.length)];
            const fromSquare = document.querySelector(`[data-row="${randomMove.from.row}"][data-col="${randomMove.from.col}"]`);
            const toSquare = document.querySelector(`[data-row="${randomMove.to.row}"][data-col="${randomMove.to.col}"]`);
            
            fromSquare.classList.add('selected');
            toSquare.classList.add('possible-move');
            
            setTimeout(() => {
                fromSquare.classList.remove('selected');
                toSquare.classList.remove('possible-move');
            }, 2000);
        }
    }
    
    // Analyze position
    function analyzePosition() {
        const moves = getAllPossibleMoves(currentPlayer);
        statusElement.textContent = `Posibles movimientos: ${moves.length}`;
        
        setTimeout(() => {
            if (!isGameOver) {
                updateStatus();
            }
        }, 3000);
    }
}

function initializePaintCanvas() {
    const canvas = document.getElementById('paint-canvas');
    const ctx = canvas.getContext('2d');
    const brushSizeSlider = document.getElementById('brush-size');
    const brushSizeValue = document.getElementById('brush-size-value');
    const brushColorPicker = document.getElementById('brush-color');
    const clearBtn = document.getElementById('clear-canvas');
    const saveBtn = document.getElementById('save-canvas');
    const undoBtn = document.getElementById('undo-shape');
    const brushToolBtn = document.getElementById('brush-tool');
    const eraserToolBtn = document.getElementById('eraser-tool');
    const shapeToolBtn = document.getElementById('shape-tool');
    const textToolBtn = document.getElementById('text-tool');
    const brushTypeSelect = document.getElementById('brush-type');
    const canvasSizeSelect = document.getElementById('canvas-size');
    const shapeTypeSelect = document.getElementById('shape-type');
    const shapeSelector = document.getElementById('shape-selector');
    const shapeCounter = document.getElementById('shape-counter');
    
    let isDrawing = false;
    let currentBrushSize = 5;
    let currentColor = '#00ffff';
    let isEraser = false;
    let lastX = 0;
    let lastY = 0;
    let currentTool = 'brush';
    let currentBrushType = 'round';
    let isDrawingShape = false;
    let shapeStartX = 0;
    let shapeStartY = 0;
    let currentShape = 'rectangle';
    let shapes = []; // Array to store all drawn shapes
    let isPreviewMode = false;
    
    // Set initial canvas background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Auto-resize canvas to fit container
    function resizeCanvas() {
        const container = canvas.parentElement;
        const containerWidth = container.clientWidth - 40; // Account for padding
        const availableHeight = window.innerHeight - 200; // Account for header, toolbar, and padding
        const containerHeight = Math.min(availableHeight, 800); // Max height
        
        // Calculate scale to fit container while maintaining aspect ratio
        const scaleX = containerWidth / canvas.width;
        const scaleY = containerHeight / canvas.height;
        const scale = Math.min(scaleX, scaleY, 1); // Don't scale up
        
        const newWidth = canvas.width * scale;
        const newHeight = canvas.height * scale;
        
        canvas.style.width = newWidth + 'px';
        canvas.style.height = newHeight + 'px';
        
        // Center the canvas
        canvas.style.display = 'block';
        canvas.style.margin = '0 auto';
    }
    
    // Initial resize
    resizeCanvas();
    
    // Initialize shape counter
    updateShapeCounter();
    
    // Resize on window resize
    window.addEventListener('resize', resizeCanvas);
    
    // Function to update shape counter
    function updateShapeCounter() {
        shapeCounter.textContent = `Formas: ${shapes.length}`;
    }
    
    // Function to redraw all shapes
    function redrawAllShapes() {
        // Clear canvas
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Redraw all shapes
        shapes.forEach(shape => {
            drawShapeFromData(shape);
        });
        
        // Update counter
        updateShapeCounter();
    }
    
    // Function to draw a shape from stored data
    function drawShapeFromData(shape) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = shape.color;
        ctx.fillStyle = shape.color;
        ctx.lineWidth = shape.lineWidth;
        ctx.shadowColor = shape.color;
        ctx.shadowBlur = shape.lineWidth / 3;
        
        if (shape.type === 'rectangle') {
            ctx.strokeRect(shape.startX, shape.startY, shape.width, shape.height);
        } else if (shape.type === 'circle') {
            ctx.beginPath();
            ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
            ctx.stroke();
        } else if (shape.type === 'line') {
            ctx.beginPath();
            ctx.moveTo(shape.startX, shape.startY);
            ctx.lineTo(shape.endX, shape.endY);
            ctx.stroke();
        }
    }
    
    // Brush size slider
    brushSizeSlider.addEventListener('input', function() {
        currentBrushSize = this.value;
        brushSizeValue.textContent = this.value + 'px';
    });
    
    // Color picker
    brushColorPicker.addEventListener('change', function() {
        currentColor = this.value;
    });
    
    // Undo last shape
    undoBtn.addEventListener('click', function() {
        if (shapes.length > 0) {
            shapes.pop(); // Remove last shape
            redrawAllShapes(); // Redraw remaining shapes
        }
    });
    
    // Clear canvas
    clearBtn.addEventListener('click', function() {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        shapes = []; // Clear shapes array
        updateShapeCounter(); // Update counter
    });
    
    // Save canvas
    saveBtn.addEventListener('click', function() {
        const link = document.createElement('a');
        link.download = 'paint-artwork-' + Date.now() + '.png';
        link.href = canvas.toDataURL();
        link.click();
    });
    
    // Tool selection
    const toolButtons = document.querySelectorAll('.tool-btn');
    toolButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all tools
            toolButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked tool
            this.classList.add('active');
            
            currentTool = this.getAttribute('data-tool');
            isEraser = currentTool === 'eraser';
            isDrawingShape = currentTool === 'shape';
            
            // Show/hide shape selector
            if (currentTool === 'shape') {
                shapeSelector.style.display = 'flex';
            } else {
                shapeSelector.style.display = 'none';
            }
            
            // Update cursor
            if (currentTool === 'text') {
                canvas.style.cursor = 'text';
            } else if (currentTool === 'shape') {
                canvas.style.cursor = 'crosshair';
            } else {
                canvas.style.cursor = 'crosshair';
            }
        });
    });
    
    // Brush type selection
    brushTypeSelect.addEventListener('change', function() {
        currentBrushType = this.value;
    });
    
    // Shape type selection
    shapeTypeSelect.addEventListener('change', function() {
        currentShape = this.value;
    });
    
    // Canvas size selection
    canvasSizeSelect.addEventListener('change', function() {
        const [width, height] = this.value.split('x').map(Number);
        canvas.width = width;
        canvas.height = height;
        
        // Clear and redraw with white background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);
        
        // Resize canvas to fit container
        resizeCanvas();
    });
    
    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Touch events for mobile
    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('touchmove', handleTouch);
    canvas.addEventListener('touchend', stopDrawing);
    
    function startDrawing(e) {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (currentTool === 'shape') {
            isDrawingShape = true;
            shapeStartX = x;
            shapeStartY = y;
        } else if (currentTool === 'text') {
            const text = prompt('Ingresa el texto:');
            if (text) {
                ctx.font = `${currentBrushSize * 3}px Arial`;
                ctx.fillStyle = currentColor;
                ctx.shadowColor = currentColor;
                ctx.shadowBlur = currentBrushSize / 2;
                ctx.fillText(text, x, y);
            }
        } else {
            lastX = x;
            lastY = y;
            draw(e);
        }
    }
    
    function draw(e) {
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (currentTool === 'eraser') {
            // Eraser mode
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, currentBrushSize / 2, 0, Math.PI * 2);
            ctx.fill();
        } else if (currentTool === 'brush') {
            // Brush mode with different brush types
            ctx.globalCompositeOperation = 'source-over';
            ctx.shadowColor = currentColor;
            ctx.shadowBlur = currentBrushSize / 3;
            
            if (currentBrushType === 'round') {
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.lineWidth = currentBrushSize;
                ctx.strokeStyle = currentColor;
                
                if (lastX === 0 && lastY === 0) {
                    ctx.beginPath();
                    ctx.arc(x, y, currentBrushSize / 2, 0, Math.PI * 2);
                    ctx.fillStyle = currentColor;
                    ctx.fill();
                } else {
                    ctx.beginPath();
                    ctx.moveTo(lastX, lastY);
                    ctx.lineTo(x, y);
                    ctx.stroke();
                }
            } else if (currentBrushType === 'square') {
                ctx.fillStyle = currentColor;
                ctx.fillRect(x - currentBrushSize/2, y - currentBrushSize/2, currentBrushSize, currentBrushSize);
            } else if (currentBrushType === 'spray') {
                // Spray effect
                for (let i = 0; i < 10; i++) {
                    const offsetX = (Math.random() - 0.5) * currentBrushSize;
                    const offsetY = (Math.random() - 0.5) * currentBrushSize;
                    ctx.fillStyle = currentColor;
                    ctx.beginPath();
                    ctx.arc(x + offsetX, y + offsetY, 1, 0, Math.PI * 2);
                    ctx.fill();
                }
            } else if (currentBrushType === 'marker') {
                // Marker effect with transparency
                ctx.globalAlpha = 0.3;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.lineWidth = currentBrushSize;
                ctx.strokeStyle = currentColor;
                
                if (lastX === 0 && lastY === 0) {
                    ctx.beginPath();
                    ctx.arc(x, y, currentBrushSize / 2, 0, Math.PI * 2);
                    ctx.fillStyle = currentColor;
                    ctx.fill();
                } else {
                    ctx.beginPath();
                    ctx.moveTo(lastX, lastY);
                    ctx.lineTo(x, y);
                    ctx.stroke();
                }
                ctx.globalAlpha = 1;
            }
            
            lastX = x;
            lastY = y;
        } else if (currentTool === 'shape') {
            // Shape drawing with preview
            if (isDrawingShape) {
                // Redraw all existing shapes
                redrawAllShapes();
                
                // Draw current shape preview
                drawShapePreview(shapeStartX, shapeStartY, x, y);
            }
        } else if (currentTool === 'text') {
            // Text tool - handled in mouseup
        }
    }
    
    // Function to draw shape preview (temporary)
    function drawShapePreview(startX, startY, endX, endY) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = currentColor;
        ctx.fillStyle = currentColor;
        ctx.lineWidth = currentBrushSize;
        ctx.shadowColor = currentColor;
        ctx.shadowBlur = currentBrushSize / 3;
        ctx.setLineDash([5, 5]); // Dashed line for preview
        
        const width = endX - startX;
        const height = endY - startY;
        
        if (currentShape === 'rectangle') {
            ctx.strokeRect(startX, startY, width, height);
        } else if (currentShape === 'circle') {
            const radius = Math.sqrt(width * width + height * height) / 2;
            ctx.beginPath();
            ctx.arc(startX + width/2, startY + height/2, radius, 0, Math.PI * 2);
            ctx.stroke();
        } else if (currentShape === 'line') {
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }
        
        ctx.setLineDash([]); // Reset line dash
    }
    
    // Function to draw final shape and save it
    function drawShape(startX, startY, endX, endY) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = currentColor;
        ctx.fillStyle = currentColor;
        ctx.lineWidth = currentBrushSize;
        ctx.shadowColor = currentColor;
        ctx.shadowBlur = currentBrushSize / 3;
        ctx.setLineDash([]); // Solid line for final shape
        
        const width = endX - startX;
        const height = endY - startY;
        
        // Create shape data object
        let shapeData = {
            type: currentShape,
            color: currentColor,
            lineWidth: currentBrushSize,
            startX: startX,
            startY: startY
        };
        
        if (currentShape === 'rectangle') {
            shapeData.width = width;
            shapeData.height = height;
            ctx.strokeRect(startX, startY, width, height);
        } else if (currentShape === 'circle') {
            const radius = Math.sqrt(width * width + height * height) / 2;
            shapeData.centerX = startX + width/2;
            shapeData.centerY = startY + height/2;
            shapeData.radius = radius;
            ctx.beginPath();
            ctx.arc(shapeData.centerX, shapeData.centerY, radius, 0, Math.PI * 2);
            ctx.stroke();
        } else if (currentShape === 'line') {
            shapeData.endX = endX;
            shapeData.endY = endY;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }
        
        // Save shape to array
        shapes.push(shapeData);
        
        // Update counter
        updateShapeCounter();
    }
    
    function stopDrawing() {
        if (currentTool === 'shape' && isDrawingShape) {
            // Finalize shape drawing
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            drawShape(shapeStartX, shapeStartY, x, y);
            isDrawingShape = false;
        }
        
        isDrawing = false;
        lastX = 0;
        lastY = 0;
    }
    
    function handleTouch(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 
                                        e.type === 'touchmove' ? 'mousemove' : 'mouseup', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (paintModal.classList.contains('hidden')) return;
        
        switch(e.key) {
            case 'Escape':
                paintModal.classList.add('hidden');
                break;
            case 's':
            case 'S':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    saveBtn.click();
                }
                break;
            case 'c':
            case 'C':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    clearBtn.click();
                }
                break;
        }
    });
}
