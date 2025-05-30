// Redirecionamento dos botões de pacote para WhatsApp
document.querySelectorAll('.btn-pacote').forEach(btn => {
    btn.addEventListener('click', function() {
        const pacote = btn.getAttribute('data-pacote');
        const msg = encodeURIComponent(`Olá! Tenho interesse no pacote ${pacote}. Gostaria de saber mais detalhes.`);
        window.open(`https://wa.me/5599999999999?text=${msg}`, '_blank');
    });
});

// Redirecionamento dos botões de serviço para WhatsApp
document.querySelectorAll('.btn-servico').forEach(btn => {
    btn.addEventListener('click', function() {
        const servico = btn.getAttribute('data-servico');
        const msg = encodeURIComponent(`Olá! Tenho interesse no ${servico}. Gostaria de saber mais detalhes.`);
        window.open(`https://wa.me/5599999999999?text=${msg}`, '_blank');
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
