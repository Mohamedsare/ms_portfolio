// Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    const letters = document.querySelectorAll('.letter');
    
    // Animation des lettres
    setTimeout(() => {
        letters.forEach((letter, index) => {
            setTimeout(() => {
                letter.style.animation = 'none';
                setTimeout(() => {
                    letter.style.animation = 'bounce 0.75s ease infinite alternate';
                }, 50);
            }, index * 100);
        });
    }, 500);
    
    // Disparition du loader
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 500);
    }, 1500);
});

// Curseur personnalisé
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Effets sur le curseur
const hoverElements = document.querySelectorAll('a, button, .skill, .project-card, .filter-btn, .navbar-toggle, .dot, .scroll-top');

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        cursorFollower.classList.add('cursor-follower-hover');
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        cursorFollower.classList.remove('cursor-follower-hover');
    });
});

// Mode sombre/clair
const themeSwitches = document.querySelectorAll('.theme-switch input');

themeSwitches.forEach(switchInput => {
    switchInput.addEventListener('change', (e) => {
        // Synchroniser tous les boutons
        themeSwitches.forEach(sw => {
            sw.checked = e.target.checked;
        });
        
        if(e.target.checked) {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
    });
});

// Navigation
const navbar = document.querySelector('.navbar');
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
});

// Fermer le menu mobile quand on clique sur un lien
document.querySelectorAll('.navbar-links').forEach(link => {
    link.addEventListener('click', () => {
        navbarToggle.classList.remove('active');
        navbarMenu.classList.remove('active');
    });
});

// Changement de style de la navbar au scroll
window.addEventListener('scroll', () => {
    if(window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Animation de texte typé
const typedTextSpan = document.querySelector('.typed-text');
const cursorBlinkSpan = document.querySelector('.cursor-blink');
const textArray = ['Mohamed SARE', 'Développeur Full-Stack', 'Technicien Réseaux Cisco', 'Administrateur Systèmes Junior', 'Passionné d\'IA & Cybersécurité', 'Créateur de Projets Digitaux', 'Intégrateur WordPress & SEO'];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if(charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if(charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if(textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

// Démarrer l'animation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, newTextDelay + 250);
});

// Animation au scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.timeline-item, .skill-bar, .circle-progress, .section-title, .about-img, .about-text, .skill-category');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if(elementPosition < screenPosition) {
            element.classList.add('show');
            
            // Animer les barres de compétences
            if(element.classList.contains('skill-bar')) {
                const progressBar = element.querySelector('.progress-bar');
                const width = progressBar.getAttribute('data-width');
                // Utiliser une variable CSS pour contrôler la largeur du pseudo-element :after
                progressBar.style.setProperty('--progress-width', '0%');
                setTimeout(() => {
                    progressBar.style.setProperty('--progress-width', width + '%');
                }, 200);
            }
            
            // Animer les cercles de compétences
            if(element.classList.contains('circle-progress')) {
                const circleFill = element.querySelector('.circle-fill');
                const value = element.getAttribute('data-value');
                circleFill.style.strokeDasharray = '0, 100';
                setTimeout(() => {
                    circleFill.style.strokeDasharray = value + ', 100';
                }, 200);
            }
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Filtrage des projets (maintenant géré par Django)
const filterButtons = document.querySelectorAll('.filter-btn');

// Filtrage des projets
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Retirer la classe active de tous les boutons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Ajouter la classe active au bouton cliqué
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        const projectCards = document.querySelectorAll('.project-card');
        
        // Afficher/masquer les projets selon le filtre
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                // Animation d'apparition
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = 'all 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Citations
const quoteSlides = document.querySelectorAll('.quote-slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

function showSlide(n) {
    quoteSlides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + quoteSlides.length) % quoteSlides.length;
    quoteSlides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Rotation automatique des citations
setInterval(nextSlide, 5000);

// Formulaire de contact
const form = document.getElementById('form');
if (form) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitBtn = document.querySelector('.submit-btn');
    const formMessage = document.querySelector('.form-message');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            submitBtn.classList.add('loading');
            const formData = new FormData(form);
            
            // Envoyer les données via fetch
            fetch('/contact/submit/', {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    formMessage.textContent = "Votre message a bien été envoyé ! Je vous répondrai dans les plus brefs délais.";
                    formMessage.classList.remove('error');
                    formMessage.classList.add('success');
                    formMessage.style.display = 'block';
                    form.reset();
                    
                    // Scroll to the message
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Hide message after 5 seconds
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, 5000);
                } else {
                    formMessage.textContent = "Une erreur est survenue. Veuillez réessayer.";
                    formMessage.classList.remove('success');
                    formMessage.classList.add('error');
                    formMessage.style.display = 'block';
                }
            }).catch(() => {
                formMessage.textContent = "Une erreur est survenue. Veuillez réessayer.";
                formMessage.classList.remove('success');
                formMessage.classList.add('error');
                formMessage.style.display = 'block';
            }).finally(() => {
                submitBtn.classList.remove('loading');
            });
        }
    });

    function validateForm() {
        let isValid = true;
        
        // Validation du nom
        if(nameInput.value.trim() === '') {
            setError(nameInput, 'Le nom est requis');
            isValid = false;
        } else {
            setSuccess(nameInput);
        }
        
        // Validation de l'email
        if(emailInput.value.trim() === '') {
            setError(emailInput, 'L\'email est requis');
            isValid = false;
        } else if(!isValidEmail(emailInput.value.trim())) {
            setError(emailInput, 'Veuillez entrer un email valide');
            isValid = false;
        } else {
            setSuccess(emailInput);
        }
        
        // Validation du sujet
        if(subjectInput.value.trim() === '') {
            setError(subjectInput, 'Le sujet est requis');
            isValid = false;
        } else {
            setSuccess(subjectInput);
        }
        
        // Validation du message
        if(messageInput.value.trim() === '') {
            setError(messageInput, 'Le message est requis');
            isValid = false;
        } else {
            setSuccess(messageInput);
        }
        
        return isValid;
    }

    function setError(input, message) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        
        formGroup.classList.add('error');
        errorMessage.textContent = message;
        errorMessage.style.opacity = '1';
    }

    function setSuccess(input) {
        const formGroup = input.parentElement;
        formGroup.classList.remove('error');
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

// Bouton remonter
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    if(window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animation de particules
const canvas = document.getElementById('particles-js');
if (canvas) {
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = `rgba(108, 99, 255, ${Math.random() * 0.6 + 0.1})`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if(this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if(this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const particles = [];
    for(let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for(let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            // Optimisation : ne vérifier que les particules suivantes
            for(let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if(distance < 100) {
                    ctx.strokeStyle = `rgba(108, 99, 255, ${1 - distance / 100})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animateParticles);
    }

    animateParticles();
}

