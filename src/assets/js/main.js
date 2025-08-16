
class SiteAnimations {
    constructor() {
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupAnimations());
        } else {
            this.setupAnimations();
        }
    }

    setupAnimations() {
        this.setupScrollAnimations();
        this.setupCounterAnimations();
        this.setupHoverEffects();
        this.setupSmoothScrolling();
        this.setupHeaderScrollEffect();
        this.setupParallaxEffects();
        this.setupTypewriterEffect();
        this.setupFormAnimations();
        this.setupButtonAnimations();
        this.setupCardAnimations();
    }


    // 1. Анимации при скролле (Intersection Observer)
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);
                }
            });
        }, observerOptions);

        // Элементы для анимации при скролле
        const animateElements = document.querySelectorAll(`
            .about-card,
            .stat-item,
            .location-stat,
            .feed-content > *,
            .contact-method,
            .partner-item,
            .feature
        `);

        animateElements.forEach((el, index) => {
            el.classList.add('fade-in');
            el.dataset.delay = index * 100; 
            observer.observe(el);
        });
    }

    // 2. Анимация счетчиков
    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.dataset.target);
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                
                if (current >= target) {
                    counter.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.ceil(current).toLocaleString();
                }
            }, 20);
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // 3. Эффекты при наведении
    setupHoverEffects() {
        const buttons = document.querySelectorAll('.cta-button, .feed-btn, .submit-btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                this.createRippleEffect(e.currentTarget, e);
            });

            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.02)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
            });
        });

        const statItems = document.querySelectorAll('.stat-item');
        statItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.animateStatIcon(item);
            });
        });

        const partnerItems = document.querySelectorAll('.partner-item');
        partnerItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'scale(1.1) rotate(5deg)';
            });
            item.addEventListener('mouseleave', () => {
                item.style.transform = '';
            });
        });
    }

    // 4. Создание ripple эффекта
    createRippleEffect(element, event) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // 5. Анимация иконок статистики
    animateStatIcon(statItem) {
        const icon = statItem.querySelector('.stat-icon i');
        if (icon) {
            icon.style.animation = 'bounce 0.6s ease-in-out';
            setTimeout(() => {
                icon.style.animation = '';
            }, 600);
        }
    }

    // 6. Плавная прокрутка для навигации
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    link.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        link.style.transform = '';
                    }, 150);

                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    this.highlightSection(targetSection);
                }
            });
        });
    }

    // 7. Подсветка активной секции
    highlightSection(section) {
        section.style.boxShadow = '0 0 30px rgba(247, 216, 75, 0.3)';
        setTimeout(() => {
            section.style.boxShadow = '';
        }, 2000);
    }

    // 8. Эффекты хедера при скролле
    setupHeaderScrollEffect() {
        const header = document.querySelector('.header');
        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateHeader = () => {
            const scrollY = window.scrollY;
            
            if (scrollY > 100) {
                header.classList.add('scrolled');
                header.style.transform = 'translateY(0)';
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(20px)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.classList.remove('scrolled');
                header.style.background = 'rgba(255, 255, 255, 0.9)';
                header.style.boxShadow = 'none';
            }

            if (scrollY > lastScrollY && scrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else if (scrollY < lastScrollY) {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = scrollY;
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // 9. Параллакс эффекты
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero-shape-1, .hero-shape-2, .hero-shape-3');
        
        const handleParallax = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.2 + (index * 0.1);
                element.style.transform = `translateY(${rate * speed}px)`;
            });
        };

        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(handleParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // 10. Эффект печатной машинки для заголовка
    setupTypewriterEffect() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;

        const lines = heroTitle.querySelectorAll('.title-line');
        
        lines.forEach((line, index) => {
            const text = line.textContent;
            line.textContent = '';
            line.style.borderRight = '2px solid #F7D84B';
            
            setTimeout(() => {
                this.typeText(line, text, 100, () => {
                    if (index === lines.length - 1) {
                        setTimeout(() => {
                            line.style.borderRight = 'none';
                        }, 1000);
                    }
                });
            }, index * 1000);
        });
    }

    typeText(element, text, speed, callback) {
        let i = 0;
        const timer = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            
            if (i >= text.length) {
                clearInterval(timer);
                element.style.borderRight = 'none';
                if (callback) callback();
            }
        }, speed);
    }

    // 11. Анимации формы
    setupFormAnimations() {
        const form = document.querySelector('#contactForm');
        const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
        
        if (!form) return;

        inputs.forEach(input => {
            input.addEventListener('focus', (e) => {
                const formGroup = e.target.closest('.form-group');
                formGroup.style.transform = 'translateY(-2px)';
                formGroup.style.transition = 'all 0.3s ease';
            });

            input.addEventListener('blur', (e) => {
                const formGroup = e.target.closest('.form-group');
                formGroup.style.transform = '';
            });

            input.addEventListener('input', (e) => {
                this.validateInput(e.target);
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.animateFormSubmission(form);
        });
    }

    validateInput(input) {
        const isValid = input.value.trim() !== '';
        const formGroup = input.closest('.form-group');
        
        if (isValid) {
            formGroup.style.borderLeft = '4px solid #28a745';
            input.style.borderColor = '#28a745';
        } else {
            formGroup.style.borderLeft = '';
            input.style.borderColor = '';
        }
    }

    animateFormSubmission(form) {
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = `
            <div class="loading-spinner"></div>
            <span>Отправляется...</span>
        `;
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = `
                <i class="bi bi-check-circle"></i>
                <span>Отправлено!</span>
            `;
            submitBtn.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
            
            // Анимация успеха
            form.style.transform = 'scale(1.02)';
            setTimeout(() => {
                form.style.transform = '';
            }, 300);
            
            // Возврат к исходному состоянию
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                form.reset();
            }, 3000);
        }, 2000);
    }

    // 12. Анимации кнопок с задержкой
    setupButtonAnimations() {
        const ctaButtons = document.querySelectorAll('.hero-cta .cta-button');
        
        ctaButtons.forEach((button, index) => {
            setTimeout(() => {
                button.style.animation = 'slideInUp 0.8s ease-out forwards';
                button.style.opacity = '1';
            }, 800 + (index * 200));
        });
    }

    // 13. Карточные анимации
    setupCardAnimations() {
        const cards = document.querySelectorAll('.location-stat, .feature, .contact-method');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const siblings = Array.from(card.parentElement.children)
                    .filter(sibling => sibling !== card);
                
                siblings.forEach(sibling => {
                    sibling.style.opacity = '0.7';
                    sibling.style.transform = 'scale(0.98)';
                });
                
                card.style.zIndex = '10';
                card.style.transform = 'translateY(-10px) scale(1.03)';
            });
            
            card.addEventListener('mouseleave', () => {
                const siblings = Array.from(card.parentElement.children);
                
                siblings.forEach(sibling => {
                    sibling.style.opacity = '';
                    sibling.style.transform = '';
                    sibling.style.zIndex = '';
                });
            });
        });
    }
}

// CSS анимации для добавления в style.css
const additionalCSS = `
/* Дополнительные CSS анимации */
@keyframes ripple {
    to {
        transform: scale(2);
        opacity: 0;
    }
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-in {
    animation: slideInUp 0.8s ease-out forwards;
}

.loading-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

/* Улучшенные переходы */
.stat-item,
.location-stat,
.contact-method,
.feature {
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.form-group {
    transition: all 0.3s ease;
}
`;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Добавляем дополнительные стили
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalCSS;
    document.head.appendChild(styleSheet);
    
    new SiteAnimations();
});

class AnimationUtils {
    static easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
    
    static animateValue(obj, start, end, duration, callback) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easedProgress = AnimationUtils.easeInOutCubic(progress);
            const value = Math.floor(easedProgress * (end - start) + start);
            
            if (callback) callback(value);
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    static throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SiteAnimations, AnimationUtils };
}


document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".feed-slide");
    let current = 0;
  
    function showNextSlide() {
      slides[current].classList.remove("active");
  
      current = (current + 1) % slides.length;
  
      slides[current].classList.add("active");
    }
  
    setInterval(showNextSlide, 5000);
  });