
// Funcionalidades específicas das páginas de projeto
// ========================================

(function() {
    'use strict';
    
    // Aguarda DOM carregar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        addSectionIDs();
        initSmoothScroll();
        initScrollIndicator();
        initProjectScrollReveal();
    }
    
    // ========================================
    // ADICIONA IDs NAS SEÇÕES
    // ========================================
    function addSectionIDs() {
        const sectionMap = {
            '.project-about': 'sobre-projeto',
            '.project-features': 'funcionalidades',
            '.app-screens-detailed': 'telas-aplicativo',
            '.project-process': 'processo-desenvolvimento'
        };
        
        Object.entries(sectionMap).forEach(([selector, id]) => {
            const section = document.querySelector(selector);
            if (section && !section.id) {
                section.id = id;
            }
        });
    }
    
    // ========================================
    // NAVEGAÇÃO SUAVE
    // ========================================
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('#nav_list a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove focus após clicar (remove o quadrado)
                this.blur();
                
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    const headerHeight = 80;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ========================================
    // SCROLL INDICATOR (Setinha para baixo)
    // Para páginas de projeto - scrolla para #sobre-projeto
    // ========================================
    function initScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        if (!scrollIndicator) return;
        
        scrollIndicator.addEventListener('click', function() {
            const sobreSection = document.getElementById('sobre-projeto');
            if (sobreSection) {
                const headerHeight = 80;
                const targetPosition = sobreSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // ========================================
    // SCROLL REVEAL - PÁGINAS DE PROJETO
    // ========================================
    function initProjectScrollReveal() {
        if (typeof ScrollReveal === 'undefined') return;
        
        const sr = ScrollReveal();
        
        // Feature cards
        if (document.querySelectorAll('.feature-card').length > 0) {
            sr.reveal('.hero-stats .stat', {
            origin: 'left',      // ← ERA 'bottom'
            duration: 1200,      // ← ERA 800ms (50% mais lento)
            distance: '50px',    // ← ERA 20px (movimento maior)
            interval: 250,       // ← ERA 150ms (mais espaçado)
            delay: 300          // ← ERA 500ms (começa mais cedo)
        });
        }
        
        // Screen items (telas do app)
        if (document.querySelectorAll('.screen-item').length > 0) {
            sr.reveal('.screen-item', {
                duration: 1000,
                distance: '50px',
                delay: 200,
                interval: 300
            });
        }
        
        // Process steps
        if (document.querySelectorAll('.process-step').length > 0) {
            sr.reveal('.process-step', {
                origin: 'right',
                duration: 1000,
                distance: '30px',
                delay: 100,
                interval: 200
            });
        }
        
        // Hero stats
        if (document.querySelectorAll('.hero-stats .stat').length > 0) {
            sr.reveal('.hero-stats .stat', {
                origin: 'bottom',
                duration: 800,
                distance: '20px',
                interval: 150,
                delay: 500
            });
        }
        
        // About section
        if (document.querySelector('.about-text')) {
            sr.reveal('.about-text', {
                origin: 'left',
                duration: 1200,
                distance: '40px'
            });
        }
        
        if (document.querySelector('.about-video')) {
            sr.reveal('.about-video', {
                origin: 'right',
                duration: 1200,
                distance: '40px',
                delay: 300
            });
        }
    }
    
})();