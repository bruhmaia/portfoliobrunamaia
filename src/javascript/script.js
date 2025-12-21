// ========================================
// Funcionalidades gerais para todas as páginas
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
        initMobileMenu();
        initScrollEffects();
        initBackToTop();
        initScrollIndicator();
        initProjectFilters();
        initScrollReveal();
        initTypewriter();
    }
    
    // ========================================
    // MENU MOBILE
    // ========================================
    function initMobileMenu() {
        const mobileBtn = document.getElementById('mobile_btn');
        const navList = document.getElementById('nav_list');
        
        if (!mobileBtn || !navList) return;
        
        // Toggle menu
        mobileBtn.addEventListener('click', function() {
            const isActive = navList.classList.toggle('active');
            const icon = this.querySelector('i');
            
            // Troca ícone
            if (isActive) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
                this.setAttribute('aria-expanded', 'true');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
                this.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Fecha ao clicar em item
        const navItems = navList.querySelectorAll('.nav-item a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                navList.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
                mobileBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }
    
    // ========================================
    // SCROLL EFFECTS
    // ========================================
    function initScrollEffects() {
        const header = document.querySelector('header');
        const backToTopBtn = document.getElementById('back-to-top');
        const scrollIndicator = document.querySelector('.scroll-indicator');
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-item');
        
        let ticking = false;
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        function handleScroll() {
            const scrollPosition = window.scrollY;
            
            // Header com sombra ao scrollar
            if (header) {
                if (scrollPosition > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
            
            // Botão back-to-top
            if (backToTopBtn) {
                if (scrollPosition > 300) {
                    backToTopBtn.classList.remove('hidden');
                } else {
                    backToTopBtn.classList.add('hidden');
                }
            }
            
            // Scroll indicator (setinha)
            if (scrollIndicator) {
                if (scrollPosition > 100) {
                    scrollIndicator.classList.add('hidden');
                } else {
                    scrollIndicator.classList.remove('hidden');
                }
            }
            
            // Navegação ativa (só se tiver seções)
            if (sections.length > 0 && navItems.length > 0) {
                updateActiveNavigation(scrollPosition);
            }
        }
        
        // Atualiza item ativo do menu
        function updateActiveNavigation(scrollPosition) {
            const sections = document.querySelectorAll('section');
            let currentSectionId = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    currentSectionId = section.getAttribute('id');
                }
            });
            
            // Remove todas as classes active
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Adiciona active no item correto
            if (currentSectionId) {
                const activeLink = document.querySelector(`.nav-item a[href="#${currentSectionId}"]`);
                if (activeLink) {
                    activeLink.parentElement.classList.add('active');
                }
            }
        }
    }
    
    // ========================================
    // BOTÃO VOLTAR AO TOPO
    // ========================================
    function initBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        
        if (!backToTopBtn) return;
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ========================================
    // SCROLL INDICATOR (Setinha para baixo)
    // ========================================
    function initScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        if (!scrollIndicator) return;
        
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                window.scrollTo({
                    top: aboutSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // ========================================
    // FILTROS DE PROJETOS (index.html)
    // ========================================
    function initProjectFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        if (filterBtns.length === 0) return;
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.dataset.filter;
                
                // Ativa botão clicado
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filtra projetos
                if (filter === 'all') {
                    showAllProjects();
                } else {
                    filterProjects(filter);
                }
            });
        });
        
        // Tags clicáveis
        const projectTags = document.querySelectorAll('.project-tags span[data-filter]');
        projectTags.forEach(tag => {
            tag.addEventListener('click', function() {
                const filter = this.dataset.filter;
                const targetBtn = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
                if (targetBtn) {
                    targetBtn.click();
                }
            });
        });
        
        function showAllProjects() {
            projectCards.forEach(card => {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            });
        }
        
        function filterProjects(filter) {
            projectCards.forEach(card => {
                const categories = card.dataset.categories;
                
                if (categories && categories.includes(filter)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        }
    }
    
    // ========================================
    // SCROLL REVEAL (se disponível)
    // ========================================
    function initScrollReveal() {
        if (typeof ScrollReveal === 'undefined') return;
        
        const sr = ScrollReveal();
        
        // Elementos da página inicial
        if (document.getElementById('cta')) {
            sr.reveal('#cta', {
                origin: 'left',
                duration: 2000,
                distance: '20%'
            });
        }
        
        if (document.querySelectorAll('.project-card').length > 0) {
            sr.reveal('.project-card', {
                origin: 'left',
                duration: 1500,
                distance: '50px',
                interval: 200
            });
        }
        
        if (document.getElementById('about')) {
            sr.reveal('#about', {
                origin: 'right',
                duration: 1500,
                distance: '50px'
            });
        }
        
        if (document.querySelectorAll('.education-item').length > 0) {
            sr.reveal('.education-item', {
                origin: 'bottom',
                duration: 1200,
                distance: '30px',
                interval: 150
            });
        }
    }
    
    // ========================================
    // TYPEWRITER EFFECT (index.html)
    // ========================================
    function initTypewriter() {
        const sloganElement = document.querySelector('#cta h3');
        if (!sloganElement) return;
        
        const originalText = sloganElement.textContent;
        let i = 0;
        sloganElement.textContent = '';
        
        function type() {
            if (i < originalText.length) {
                sloganElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(type, 60);
            }
        }
        
        setTimeout(type, 2000);
    }
    
})();