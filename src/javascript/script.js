// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MENU MOBILE ==========
    const mobileBtn = document.getElementById('mobile_btn');
    const navList = document.getElementById('nav_list');
    
    mobileBtn.addEventListener('click', function() {
        navList.classList.toggle('active');
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-x');
        icon.classList.toggle('fa-bars');
    });

    // Fecha menu ao clicar em um item
    const navItems = document.querySelectorAll('.nav-item a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navList.classList.remove('active');
            const icon = mobileBtn.querySelector('i');
            icon.classList.remove('fa-x');
            icon.classList.add('fa-bars');
        });
    });

    // ========== SCROLL - HEADER E NAVEGAÇÃO ==========
    const sections = document.querySelectorAll('section');
    const navItemsAll = document.querySelectorAll('.nav-item');
    const header = document.querySelector('header');
    const backToTopBtn = document.getElementById('back-to-top');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const headerHeight = header.offsetHeight;

        // Efeito de blur e sombra no header
        if (scrollPosition > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Navegação ativa baseada na seção visível
        let activeSectionIndex = 0;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = index;
            }
        });

        navItemsAll.forEach(item => item.classList.remove('active'));
        if (navItemsAll[activeSectionIndex]) {
            navItemsAll[activeSectionIndex].classList.add('active');
        }

        // Botão voltar ao topo
        if (scrollPosition > 300) {
            backToTopBtn.classList.remove('hidden');
        } else {
            backToTopBtn.classList.add('hidden');
        }

        // Controle da setinha
        if (scrollPosition > 100) {
            scrollIndicator.classList.add('hidden');
        } else {
            scrollIndicator.classList.remove('hidden');
        }
    });

    // ========== BOTÃO VOLTAR AO TOPO ==========
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ========== CLIQUE NA SETINHA ==========
    if (scrollIndicator) {
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

    // ========== FILTROS DE PROJETOS ==========
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Ativar botão clicado
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Mostrar/ocultar projetos com animação
            if (filter === 'all') {
                projectCards.forEach(card => {
                    card.style.display = 'flex';
                    // Pequeno delay para animação
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                });
            } else {
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
        });
    });

    // Clicar numa tag filtra automaticamente
    const projectTags = document.querySelectorAll('.project-tags span');
    projectTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const filter = this.dataset.filter;
            const targetBtn = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
            if (targetBtn) {
                targetBtn.click();
            }
        });
    });

    // ========== ANIMAÇÕES COM SCROLLREVEAL ==========
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('#cta', {
            origin: 'left',
            duration: 2000,
            distance: '20%'
        });

        ScrollReveal().reveal('.project-card', {
            origin: 'left',
            duration: 1500,
            distance: '50px',
            interval: 200
        });

        ScrollReveal().reveal('#about', {
            origin: 'right',
            duration: 1500,
            distance: '50px'
        });

        ScrollReveal().reveal('.education-item', {
            origin: 'bottom',
            duration: 1200,
            distance: '30px',
            interval: 150
        });
    }

    // ========== EFEITO DE MÁQUINA DE ESCREVER ==========
    typeWriterSlogan();
});

// Efeito de máquina de escrever apenas no slogan
function typeWriterSlogan() {
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