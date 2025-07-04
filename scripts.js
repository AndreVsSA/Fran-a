// Redirecionamento dos botões de pacote para WhatsApp
document.querySelectorAll('.btn-pacote').forEach(btn => {
    btn.addEventListener('click', function() {
        const pacote = btn.getAttribute('data-pacote');
        const msg = encodeURIComponent(`Olá! Tenho interesse no pacote ${pacote}. Gostaria de saber mais detalhes.`);
        window.open(`https://wa.me/5538999216198?text=${msg}`, '_blank');
    });
});

// Redirecionamento dos botões de serviço para WhatsApp
document.querySelectorAll('.btn-servico').forEach(btn => {
    btn.addEventListener('click', function() {
        // Busca o h3 mais próximo acima do botão
        const card = btn.closest('.servico-card');
        const h3 = card ? card.querySelector('h3') : null;
        let pacote = '';
        if (h3) {
            // Pega o texto do h3, removendo tags extras
            pacote = h3.textContent.trim();
        } else {
            pacote = btn.getAttribute('data-servico');
        }
        const msg = encodeURIComponent(`Olá, tenho interesse no ${pacote}!`);
        window.open(`https://wa.me/553899216198?text=${msg}`, '_blank');
    });
});

// Carrossel CTA manual com setas
(function() {
    const imgs = document.querySelectorAll('.cta-foto-carousel .carousel-img');
    const left = document.querySelector('.carousel-arrow-left');
    const right = document.querySelector('.carousel-arrow-right');
    if (!imgs.length || !left || !right) return;
    let idx = 0;

    function show(idxToShow) {
        imgs.forEach((img, i) => img.classList.toggle('active', i === idxToShow));
    }

    left.addEventListener('click', () => {
        idx = (idx - 1 + imgs.length) % imgs.length;
        show(idx);
    });

    right.addEventListener('click', () => {
        idx = (idx + 1) % imgs.length;
        show(idx);
    });
})();

// Carrossel de imagens nos cards da seção Estilos
(function() {
    // Defina as imagens para cada card (ordem: corporativo, equipe, aniversario, pessoal)
    const imagensPorCard = [
        [
            './imgs/corporativo/corp1.jpg',
            './imgs/corporativo/corp2.jpg',
            './imgs/corporativo/corp3.jpg',
            './imgs/corporativo/corp4.jpg',
            './imgs/corporativo/corp5.jpg',
            './imgs/corporativo/corp6.jpg',
            './imgs/corporativo/corp7.jpg',
            './imgs/corporativo/corp8.jpg',
            './imgs/corporativo/corp9.jpg',
            './imgs/corporativo/corp10.jpg'
        ],
        [
            './imgs/equipe/eqp1.jpg',
            './imgs/equipe/eqp2.jpg',
            './imgs/equipe/eqp3.jpg',
            './imgs/equipe/eqp4.jpg',
            './imgs/equipe/eqp5.jpg',
            './imgs/equipe/eqp6.jpg'
            
        ],
        [
            './imgs/aniversario/niver1.jpg',
            './imgs/aniversario/niver2.jpg',
            './imgs/aniversario/niver3.jpg',
            './imgs/aniversario/niver4.jpg',
            './imgs/aniversario/niver5.jpg',
            './imgs/aniversario/niver6.jpg'
        ],
        [
            './imgs/pessoal/psl1.jpg',
            './imgs/pessoal/psl2.jpg',
            './imgs/pessoal/psl3.jpg',
            './imgs/pessoal/psl4.jpg',
            './imgs/pessoal/psl5.jpg',
            './imgs/pessoal/psl6.jpg',
            './imgs/pessoal/psl7.jpg',
            './imgs/pessoal/psl8.jpg',
            './imgs/pessoal/psl9.jpg'
        ]
    ];

    const cards = document.querySelectorAll('.estilos-lista .estilo-card');
    let idx = 0;

    function trocarImagens() {
        cards.forEach((card, i) => {
            const bg = card.querySelector('.estilo-bg');
            if (bg && imagensPorCard[i]) {
                // Adiciona fade-out
                bg.style.transition = 'opacity 0.5s';
                bg.style.opacity = '0';
                setTimeout(() => {
                    bg.style.backgroundImage = `url('${imagensPorCard[i][idx % imagensPorCard[i].length]}')`;
                    bg.style.opacity = '1';
                }, 500);
            }
        });
        idx = (idx + 1) % imagensPorCard[0].length;
    }

    if (cards.length === imagensPorCard.length) {
        // Inicializa com fade-in
        cards.forEach((card, i) => {
            const bg = card.querySelector('.estilo-bg');
            if (bg && imagensPorCard[i]) {
                bg.style.transition = 'opacity 0.5s';
                bg.style.opacity = '1';
                bg.style.backgroundImage = `url('${imagensPorCard[i][0]}')`;
            }
        });
        setInterval(trocarImagens, 10000);
    }
})();

// Smooth scroll para os links do menu do footer
document.querySelectorAll('.footer-col.menu-col a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').replace('#', '');
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Portfolio Card Slider Highlight Center
(function() {
    const track = document.querySelector('.portfolio-carousel-track');
    const cards = track ? Array.from(track.children) : [];
    const leftBtn = document.querySelector('.portfolio-arrow-left');
    const rightBtn = document.querySelector('.portfolio-arrow-right');
    let current = 0;
    let transitioning = false;

    function getCardWidth() {
        if (!cards[0]) return 0;
        return cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginLeft) + parseInt(getComputedStyle(cards[0]).marginRight);
    }

    function getViewportCenterOffset() {
        if (window.innerWidth <= 600) {
            return (window.innerWidth - cards[0].offsetWidth) / 2;
        }
        return window.innerWidth / 2 - cards[0].offsetWidth / 2;
    }

    function updateSlider(animate = true) {
        cards.forEach((card, i) => {
            card.classList.remove('active', 'left', 'right', 'far');
            if (i === current) {
                card.classList.add('active');
            } else if (i === (current - 1 + cards.length) % cards.length) {
                card.classList.add('left');
            } else if (i === (current + 1) % cards.length) {
                card.classList.add('right');
            } else {
                card.classList.add('far');
            }
        });
        const cardWidth = getCardWidth();
        const offset = cardWidth * current;
        const centerOffset = getViewportCenterOffset();
        if (!animate) {
            track.style.transition = 'none';
        } else {
            track.style.transition = 'transform 0.6s cubic-bezier(.4,1,.7,1)';
        }
        track.style.transform = `translateX(${-offset + centerOffset}px)`;
        if (!animate) {
            void track.offsetWidth;
            track.style.transition = '';
        }
    }

    function slideLeft() {
        if (transitioning) return;
        transitioning = true;
        current = (current - 1 + cards.length) % cards.length;
        updateSlider(true);
        setTimeout(() => { transitioning = false; }, 600); // 600ms = duração da transição
    }

    function slideRight() {
        if (transitioning) return;
        transitioning = true;
        current = (current + 1) % cards.length;
        updateSlider(true);
        setTimeout(() => { transitioning = false; }, 600);
    }

    if (track && cards.length > 0) {
        updateSlider();
        if (leftBtn && rightBtn) {
            leftBtn.addEventListener('click', slideLeft);
            rightBtn.addEventListener('click', slideRight);
        }
        window.addEventListener('resize', () => updateSlider(false));
    }
})();

// Remova o carregamento dinâmico do carrossel via data.json
// (apague ou comente o bloco abaixo)
/*
(function() {
    fetch('admin/data.json')
        .then(r => r.json())
        .then(data => {
            const track = document.querySelector('.portfolio-carousel-track');
            if (!track || !data.imagens) return;
            track.innerHTML = '';
            data.imagens.forEach(img => {
                const div = document.createElement('div');
                div.className = 'portfolio-card';
                const image = document.createElement('img');
                image.src = img;
                image.alt = 'Portfólio';
                div.appendChild(image);
                track.appendChild(div);
            });
            // Opcional: reinicializar o slider JS se necessário
        });
})();
*/
