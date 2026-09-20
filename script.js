// Love Website JavaScript
document.addEventListener('DOMContentLoaded', function() {

    // Keep the main page behind the romantic unlock moment until it succeeds.
    const lockScreen = document.getElementById('lockScreen');
    const unlockForm = document.getElementById('unlockForm');
    const secretCodeInput = document.getElementById('secretCodeInput');
    const unlockButton = document.getElementById('unlockButton');
    const unlockMessage = document.getElementById('unlockMessage');
    const unlockWelcome = document.getElementById('unlockWelcome');
    const lockIcon = document.getElementById('lockIcon');
    const secretKeypad = document.getElementById('secretKeypad');

    if (secretKeypad) {
        secretKeypad.addEventListener('click', function(event) {
            const key = event.target.closest('[data-key]');
            if (!key || secretCodeInput.disabled) return;

            const keyValue = key.dataset.key;
            if (keyValue === 'clear') {
                secretCodeInput.value = '';
            } else if (keyValue === 'backspace') {
                secretCodeInput.value = secretCodeInput.value.slice(0, -1);
            } else if (secretCodeInput.value.length < secretCodeInput.maxLength) {
                secretCodeInput.value += keyValue;
            }
            secretCodeInput.focus();
        });
    }

    function createUnlockCelebration() {
        const symbols = ['❤️', '💕', '💖', '✨', '💗', '💘', '🎉'];
        for (let index = 0; index < 34; index++) {
            const particle = document.createElement('span');
            particle.className = 'unlock-celebration';
            particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.top = `${55 + Math.random() * 35}vh`;
            particle.style.setProperty('--unlock-drift', `${(Math.random() - 0.5) * 38}vw`);
            particle.style.animationDelay = `${Math.random() * 0.45}s`;
            lockScreen.appendChild(particle);
            setTimeout(() => particle.remove(), 3000);
        }
    }

    function unlockWebsite() {
        secretCodeInput.value = '';
        unlockMessage.textContent = '';
        unlockButton.disabled = true;
        secretCodeInput.disabled = true;
        lockIcon.textContent = '❤️';
        lockIcon.classList.add('is-open');
        unlockWelcome.classList.add('visible');
        lockScreen.classList.add('unlocking');
        createUnlockCelebration();

        setTimeout(() => document.body.classList.add('unlocked'), 450);
        setTimeout(() => {
            lockScreen.classList.add('hidden');
            lockScreen.setAttribute('aria-hidden', 'true');
        }, 1500);
    }

    if (lockScreen && unlockForm) {
        unlockForm.addEventListener('submit', function(event) {
            event.preventDefault();
            if (secretCodeInput.value.trim() === String(window.CONFIG.secretCode)) {
                unlockWebsite();
                return;
            }

            lockScreen.classList.remove('wrong-code');
            void lockScreen.offsetWidth;
            lockScreen.classList.add('wrong-code');
            unlockMessage.textContent = "Hmm… that's not it, my love 😏 Try again!";
            secretCodeInput.value = '';
            secretCodeInput.focus();
        });
    }
    
    // Apply configuration
    function applyConfig() {
        if (window.CONFIG) {
            // Update subtitle
            const subtitle = document.getElementById('subtitle');
            if (subtitle) {
                subtitle.textContent = '';
                subtitle.style.display = 'none';
            }
            
            // Update partner name and description
            const partnerName = document.getElementById('partnerName');
            if (partnerName) {
                partnerName.textContent = `${CONFIG.partnerName} 💕`;
            }
            
            const partnerDescription = document.getElementById('partnerDescription');
            if (partnerDescription) {
                partnerDescription.textContent = CONFIG.characters.partner;
            }
            
            // Update your name and description
            const yourName = document.getElementById('yourName');
            if (yourName) {
                yourName.textContent = `${CONFIG.yourName} 💙`;
            }
            
            const yourDescription = document.getElementById('yourDescription');
            if (yourDescription) {
                yourDescription.textContent = CONFIG.characters.you;
            }
            
            // Update love note
            const loveNoteText = document.getElementById('loveNoteText');
            if (loveNoteText) {
                loveNoteText.textContent = `${CONFIG.partnerName}, ${CONFIG.messages.loveNote}`;
            }
            
            // Update memory descriptions
            const memoryLateNight = document.getElementById('memoryLateNight');
            if (memoryLateNight) {
                memoryLateNight.textContent = CONFIG.memories.lateNight;
            }
            
            const memoryFirstMeeting = document.getElementById('memoryFirstMeeting');
            if (memoryFirstMeeting) {
                memoryFirstMeeting.textContent = CONFIG.memories.firstMeeting;
            }
            
            const memoryCare = document.getElementById('memoryCare');
            if (memoryCare) {
                memoryCare.textContent = CONFIG.memories.care;
            }
            
            // Update special message
            const specialMessageTitle = document.getElementById('specialMessageTitle');
            if (specialMessageTitle) {
                specialMessageTitle.textContent = `To My Dearest ${CONFIG.partnerName}`;
            }
            
            const specialMessage1 = document.getElementById('specialMessage1');
            if (specialMessage1) {
                specialMessage1.innerHTML = CONFIG.messages.specialMessage
                    .split('\n\n').map(p => `<p>${p}</p>`).join('');
            }
            
            const specialMessage2 = document.getElementById('specialMessage2');
            if (specialMessage2) {
                specialMessage2.textContent = CONFIG.messages.specialMessage2;
            }
            
            const signature = document.getElementById('signature');
            if (signature) {
                signature.textContent = CONFIG.messages.signature;
            }
        }
    }
    
    // Apply config on load
    applyConfig();

    // Playful love question
    const yesButton = document.getElementById('yesBtn');
    const noButton = document.getElementById('noBtn');
    const questionButtons = document.getElementById('questionButtons');
    const yesResponse = document.getElementById('yesResponse');
    let noAttempts = 0;
    let noIsFinal = false;
    const noMessages = ['Are you sure? 🥺', 'Think again 😭', 'Really?! 😭💔', 'Nice try 😂', "You can't escape me 😏❤️"];

    function celebrateLove() {
        yesResponse.classList.add('visible');
        yesButton.disabled = true;
        noButton.disabled = true;
        questionButtons.classList.add('celebrated');

        const celebrationSymbols = ['❤️', '💕', '💖', '✨', '💗', '🎉', '💘'];
        for (let index = 0; index < 30; index++) {
            const piece = document.createElement('span');
            piece.className = 'question-celebration';
            piece.textContent = celebrationSymbols[Math.floor(Math.random() * celebrationSymbols.length)];
            piece.style.left = `${Math.random() * 100}vw`;
            piece.style.top = `${70 + Math.random() * 25}vh`;
            piece.style.setProperty('--drift-x', `${(Math.random() - 0.5) * 35}vw`);
            piece.style.animationDelay = `${Math.random() * 0.65}s`;
            document.body.appendChild(piece);
            setTimeout(() => piece.remove(), 3500);
        }
    }

    function moveNoButton() {
        if (noIsFinal) return;

        noAttempts++;
        noButton.textContent = noMessages[Math.min(noAttempts - 1, noMessages.length - 1)];
        if (noAttempts >= noMessages.length) {
            noIsFinal = true;
            noButton.textContent = 'OKAY, I LOVE YOU ❤️';
            noButton.classList.add('is-final');
            noButton.style.position = 'relative';
            return;
        }

        const parentRect = questionButtons.getBoundingClientRect();
        const buttonRect = noButton.getBoundingClientRect();
        const maxLeft = Math.max(0, parentRect.width - buttonRect.width);
        const maxTop = Math.max(0, parentRect.height - buttonRect.height);
        noButton.style.position = 'absolute';
        noButton.style.left = `${Math.random() * maxLeft}px`;
        noButton.style.top = `${Math.random() * maxTop}px`;
        noButton.classList.remove('is-moving');
        void noButton.offsetWidth;
        noButton.classList.add('is-moving');
    }

    if (yesButton && noButton) {
        yesButton.addEventListener('click', celebrateLove);
        noButton.addEventListener('pointerenter', moveNoButton);
        noButton.addEventListener('pointerdown', (event) => {
            if (!noIsFinal) {
                event.preventDefault();
                moveNoButton();
            }
        });
        noButton.addEventListener('click', () => {
            if (noIsFinal) celebrateLove();
        });
    }
    
    // Create floating hearts
    function createHearts() {
        const heartsContainer = document.querySelector('.hearts-container');
        const heartSymbols = ['💕', '💖', '💗', '💘', '💝', '💞', '💟', '💌', '💋', '❤️'];
        
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 6 + 's';
            heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
            heartsContainer.appendChild(heart);
        }
    }

    // Music Control via YouTube IFrame API
    let ytPlayer;
    let isPlaying = false;

    window.onYouTubeIframeAPIReady = function() {
        ytPlayer = new YT.Player('ytPlayer', {
            height: '0',
            width: '0',
            videoId: 'FPoDwu3odT8',
            playerVars: { autoplay: 0, loop: 1, playlist: 'FPoDwu3odT8' },
            events: {
                onReady: function(e) { e.target.setVolume(60); }
            }
        });
    };

    const musicToggle = document.getElementById('musicToggle');
    musicToggle.addEventListener('click', function() {
        if (!ytPlayer) return;
        if (isPlaying) {
            ytPlayer.pauseVideo();
            musicToggle.textContent = '🎵';
            isPlaying = false;
        } else {
            ytPlayer.playVideo();
            musicToggle.textContent = '🔊';
            isPlaying = true;
        }
    });

    // Love Note Toggle
    const loveButton = document.getElementById('loveButton');
    const loveNote = document.getElementById('loveNote');

    loveButton.addEventListener('click', function() {
        loveNote.classList.toggle('visible');
        if (loveNote.classList.contains('visible')) {
            loveButton.textContent = 'Hide My Love Note 💝';
            createHeartBurst();
        } else {
            loveButton.textContent = 'Click for a surprise 💝';
        }
    });

    // Create heart burst effect
    function createHeartBurst() {
        const heartsContainer = document.querySelector('.hearts-container');
        const burstHearts = ['💕', '💖', '💗', '💘', '💝', '💞'];
        
        for (let i = 0; i < 10; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = burstHearts[Math.floor(Math.random() * burstHearts.length)];
            heart.style.left = (Math.random() * 80 + 10) + '%';
            heart.style.top = (Math.random() * 80 + 10) + '%';
            heart.style.animation = 'float 2s ease-out forwards';
            heart.style.fontSize = '25px';
            heart.style.zIndex = '1000';
            heartsContainer.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 2000);
        }
    }

    // Kiss Counter
    let kissCount = 0;
    const kissButton = document.getElementById('kissButton');
    const kissCountDisplay = document.getElementById('kissCount');

    kissButton.addEventListener('click', function() {
        kissCount++;
        kissCountDisplay.textContent = kissCount;
        createKissEffect();
        
        // Add special messages for certain kiss counts
        if (window.CONFIG && window.CONFIG.kissMessages) {
            if (kissCount === 10 && window.CONFIG.kissMessages[10]) {
                showSpecialMessage(window.CONFIG.kissMessages[10]);
            } else if (kissCount === 50 && window.CONFIG.kissMessages[50]) {
                showSpecialMessage(window.CONFIG.kissMessages[50]);
            } else if (kissCount === 100 && window.CONFIG.kissMessages[100]) {
                showSpecialMessage(window.CONFIG.kissMessages[100]);
            }
        }
    });

    // Create kiss effect
    function createKissEffect() {
        const kissEffects = document.querySelector('.kiss-effects');
        const kissSymbols = ['💋', '💕', '💖', '💗', '😘'];
        
        for (let i = 0; i < 5; i++) {
            const kiss = document.createElement('div');
            kiss.textContent = kissSymbols[Math.floor(Math.random() * kissSymbols.length)];
            kiss.style.position = 'absolute';
            kiss.style.left = Math.random() * 100 + '%';
            kiss.style.top = Math.random() * 100 + '%';
            kiss.style.fontSize = '30px';
            kiss.style.animation = 'float 2s ease-out forwards';
            kiss.style.pointerEvents = 'none';
            kiss.style.zIndex = '1000';
            kissEffects.appendChild(kiss);
            
            setTimeout(() => {
                kiss.remove();
            }, 2000);
        }
    }

    // Show special message
    function showSpecialMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.style.position = 'fixed';
        messageDiv.style.top = '50%';
        messageDiv.style.left = '50%';
        messageDiv.style.transform = 'translate(-50%, -50%)';
        messageDiv.style.background = 'linear-gradient(135deg, #FF69B4, #FF1493)';
        messageDiv.style.color = 'white';
        messageDiv.style.padding = '1rem 2rem';
        messageDiv.style.borderRadius = '2rem';
        messageDiv.style.fontFamily = 'Great Vibes, cursive';
        messageDiv.style.fontSize = '1.5rem';
        messageDiv.style.fontWeight = '600';
        messageDiv.style.boxShadow = '0 10px 30px rgba(255, 105, 180, 0.4)';
        messageDiv.style.zIndex = '10000';
        messageDiv.style.animation = 'glow 2s ease-in-out infinite alternate';
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    // Memory Gallery Interactions
    const memoryCards = document.querySelectorAll('.memory-card');
    
    memoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const memoryType = this.dataset.memory;
            createMemoryEffect(memoryType);
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Create memory effects
    function createMemoryEffect(type) {
        if (window.CONFIG && window.CONFIG.memoryMessages) {
            switch(type) {
                case 'late-night':
                    createStars();
                    showMemoryMessage(window.CONFIG.memoryMessages.lateNight || "Those late nights talking with you are my favorite memories 🌙✨");
                    break;
                case 'first-meeting':
                    createSparkles();
                    showMemoryMessage(window.CONFIG.memoryMessages.firstMeeting || "I know the day we meet will be magical and unforgettable 💫💕");
                    break;
                case 'care':
                    createHeartRain();
                    showMemoryMessage(window.CONFIG.memoryMessages.care || "Your caring nature, sweet voice, and adorable cuteness melt my heart 💕😍");
                    break;
            }
        }
    }

    // Create starry night effect
    function createStars() {
        const heartsContainer = document.querySelector('.hearts-container');
        
        for (let i = 0; i < 20; i++) {
            const star = document.createElement('div');
            star.textContent = '✨';
            star.style.position = 'absolute';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.fontSize = '20px';
            star.style.animation = 'float 3s ease-in-out infinite';
            star.style.animationDelay = Math.random() * 3 + 's';
            star.style.pointerEvents = 'none';
            heartsContainer.appendChild(star);
            
            setTimeout(() => {
                star.remove();
            }, 5000);
        }
    }

    // Create sparkle effect
    function createSparkles() {
        const heartsContainer = document.querySelector('.hearts-container');
        const sparkles = ['✨', '⭐', '💫', '🌟'];
        
        for (let i = 0; i < 15; i++) {
            const sparkle = document.createElement('div');
            sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.position = 'absolute';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.fontSize = '25px';
            sparkle.style.animation = 'float 2s ease-out forwards';
            sparkle.style.pointerEvents = 'none';
            heartsContainer.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 2000);
        }
    }

    // Create heart rain effect
    function createHeartRain() {
        const heartsContainer = document.querySelector('.hearts-container');
        const hearts = ['💕', '💖', '💗', '💘', '💝', '💞'];
        
        for (let i = 0; i < 25; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.position = 'absolute';
                heart.style.left = Math.random() * 100 + '%';
                heart.style.top = '-50px';
                heart.style.fontSize = '20px';
                heart.style.animation = 'rainDown 3s linear forwards';
                heart.style.pointerEvents = 'none';
                heartsContainer.appendChild(heart);
                
                setTimeout(() => {
                    heart.remove();
                }, 3000);
            }, i * 100);
        }
    }

    // Add rain animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainDown {
            to {
                transform: translateY(calc(100vh + 50px));
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Show memory message
    function showMemoryMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.style.position = 'fixed';
        messageDiv.style.top = '20%';
        messageDiv.style.left = '50%';
        messageDiv.style.transform = 'translate(-50%, -50%)';
        messageDiv.style.background = 'rgba(255, 255, 255, 0.95)';
        messageDiv.style.color = '#FF1493';
        messageDiv.style.padding = '1.5rem 2rem';
        messageDiv.style.borderRadius = '1rem';
        messageDiv.style.fontFamily = 'Cormorant Garamond, serif';
        messageDiv.style.fontSize = '1.3rem';
        messageDiv.style.fontWeight = '600';
        messageDiv.style.boxShadow = '0 10px 30px rgba(255, 105, 180, 0.3)';
        messageDiv.style.zIndex = '10000';
        messageDiv.style.textAlign = 'center';
        messageDiv.style.maxWidth = '90%';
        messageDiv.style.backdropFilter = 'blur(10px)';
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translate(-50%, -50%) scale(0.8)';
            setTimeout(() => {
                messageDiv.remove();
            }, 500);
        }, 3000);
    }

    // Character interactions
    const partnerCharacter = document.getElementById('partner');
    const youCharacter = document.getElementById('you');

    if (partnerCharacter) {
        partnerCharacter.addEventListener('click', function() {
            const message = window.CONFIG && window.CONFIG.characterMessages && window.CONFIG.characterMessages.partner 
                ? `${window.CONFIG.partnerName}, ${window.CONFIG.characterMessages.partner}`
                : "You're the most beautiful person in the world! 💕";
            showSpecialMessage(message);
            createHeartBurst();
        });
    }

    if (youCharacter) {
        youCharacter.addEventListener('click', function() {
            const message = window.CONFIG && window.CONFIG.characterMessages && window.CONFIG.characterMessages.you 
                ? window.CONFIG.characterMessages.you
                : "I'm so lucky to have you in my life! 💖";
            showSpecialMessage(message);
            createSparkles();
        });
    }

    // Check Love Meter
    const checkLoveBtn = document.getElementById('checkLoveBtn');
    const circleFill = document.getElementById('circleFill');
    const lovePercent = document.getElementById('lovePercent');
    const circleMeter = document.querySelector('.circle-meter');
    const loveInfinity = document.getElementById('loveInfinity');
    const circumference = 502;

    checkLoveBtn.addEventListener('click', function() {
        checkLoveBtn.disabled = true;
        let percent = 0;
        lovePercent.textContent = '0%';

        // Phase 1: count 0 → 100
        const counter = setInterval(() => {
            percent += 1;
            const offset = circumference - (percent / 100) * circumference;
            circleFill.style.strokeDashoffset = Math.max(offset, 0);
            lovePercent.textContent = percent + '%';

            if (percent >= 100) {
                clearInterval(counter);

                // Phase 2: overfill beyond 100
                setTimeout(() => {
                    circleMeter.classList.add('breaking');
                    circleFill.style.transition = 'stroke-dashoffset 0.8s ease';
                    circleFill.style.strokeDashoffset = -80;
                    lovePercent.textContent = '999%';

                    // Phase 3: BOOM
                    setTimeout(() => {
                        circleMeter.classList.remove('breaking');
                        circleMeter.classList.add('broken');
                        lovePercent.textContent = '💥';

                        // Blast sound
                        const blastCtx = new (window.AudioContext || window.webkitAudioContext)();

                        function playBlast() {
                            // Layer 1: deep boom
                            const boom = blastCtx.createOscillator();
                            const boomGain = blastCtx.createGain();
                            boom.type = 'sine';
                            boom.frequency.setValueAtTime(120, blastCtx.currentTime);
                            boom.frequency.exponentialRampToValueAtTime(20, blastCtx.currentTime + 1.2);
                            boomGain.gain.setValueAtTime(3.0, blastCtx.currentTime);
                            boomGain.gain.exponentialRampToValueAtTime(0.001, blastCtx.currentTime + 1.5);
                            boom.connect(boomGain);
                            boomGain.connect(blastCtx.destination);
                            boom.start();
                            boom.stop(blastCtx.currentTime + 1.5);

                            // Layer 2: explosion noise burst
                            const bufferSize = blastCtx.sampleRate * 1.0;
                            const buffer = blastCtx.createBuffer(1, bufferSize, blastCtx.sampleRate);
                            const data = buffer.getChannelData(0);
                            for (let i = 0; i < bufferSize; i++) {
                                data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 0.2);
                            }
                            const noise = blastCtx.createBufferSource();
                            noise.buffer = buffer;
                            const noiseFilter = blastCtx.createBiquadFilter();
                            noiseFilter.type = 'bandpass';
                            noiseFilter.frequency.value = 300;
                            noiseFilter.Q.value = 0.5;
                            const noiseGain = blastCtx.createGain();
                            noiseGain.gain.setValueAtTime(4.0, blastCtx.currentTime);
                            noiseGain.gain.exponentialRampToValueAtTime(0.001, blastCtx.currentTime + 1.0);
                            noise.connect(noiseFilter);
                            noiseFilter.connect(noiseGain);
                            noiseGain.connect(blastCtx.destination);
                            noise.start();

                            // Layer 3: sharp crack
                            const crackBuf = blastCtx.createBuffer(1, blastCtx.sampleRate * 0.1, blastCtx.sampleRate);
                            const crackData = crackBuf.getChannelData(0);
                            for (let i = 0; i < crackData.length; i++) {
                                crackData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / crackData.length, 3);
                            }
                            const crack = blastCtx.createBufferSource();
                            crack.buffer = crackBuf;
                            const crackGain = blastCtx.createGain();
                            crackGain.gain.setValueAtTime(5.0, blastCtx.currentTime);
                            crackGain.gain.exponentialRampToValueAtTime(0.001, blastCtx.currentTime + 0.1);
                            crack.connect(crackGain);
                            crackGain.connect(blastCtx.destination);
                            crack.start();

                            // Layer 4: rumble
                            const rumble = blastCtx.createOscillator();
                            const rumbleGain = blastCtx.createGain();
                            rumble.type = 'sawtooth';
                            rumble.frequency.setValueAtTime(60, blastCtx.currentTime);
                            rumble.frequency.exponentialRampToValueAtTime(10, blastCtx.currentTime + 2.0);
                            rumbleGain.gain.setValueAtTime(1.5, blastCtx.currentTime + 0.1);
                            rumbleGain.gain.exponentialRampToValueAtTime(0.001, blastCtx.currentTime + 2.0);
                            rumble.connect(rumbleGain);
                            rumbleGain.connect(blastCtx.destination);
                            rumble.start();
                            rumble.stop(blastCtx.currentTime + 2.0);
                        }

                        playBlast();

                        createHeartBurst();
                        createHeartBurst();

                        // Phase 4: infinity
                        setTimeout(() => {
                            lovePercent.textContent = '∞';
                            loveInfinity.classList.add('visible');
                            createHeartBurst();
                        }, 700);
                    }, 900);
                }, 300);
            }
        }, 22);
    });

    // Initialize
    createHearts();

    // Lightbox
    window.openLightbox = function(src) {
        document.getElementById('lightboxImg').src = src;
        document.getElementById('lightbox').classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeLightbox = function() {
        document.getElementById('lightbox').classList.remove('active');
        document.body.style.overflow = '';
    };

    document.getElementById('lightboxImg').addEventListener('click', function(e) {
        e.stopPropagation();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeLightbox();
    });
    
    // Add some initial animations
    setTimeout(() => {
        document.querySelector('.main-title').style.animation = 'glow 2s ease-in-out infinite alternate';
    }, 1000);

    // Auto-create some floating hearts periodically
    setInterval(() => {
        if (Math.random() > 0.7) {
            createHearts();
        }
    }, 10000);

    // Add smooth scrolling to sections
    document.querySelectorAll('section').forEach(section => {
        section.style.scrollMarginTop = '2rem';
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});