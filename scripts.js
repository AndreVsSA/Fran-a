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
