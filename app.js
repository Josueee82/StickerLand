document.addEventListener('DOMContentLoaded', () => {
    // Si la variable no está definida, no hacemos nada
    if (!window.STICKERLAND_WA || !window.STICKERLAND_WA.phone) {
        console.error('El número de WhatsApp no está configurado en el HTML.');
        return;
    }

    const waPhone = window.STICKERLAND_WA.phone;
    const productsGrid = document.getElementById('productsGrid');
    const chips = document.querySelectorAll('.chip');
    const searchInput = document.getElementById('searchInput');
    const buyButtons = document.querySelectorAll('.btn-buy');
    
    // --- Funcionalidad de WhatsApp y Comprar ---
    const getWaLink = (message) => {
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${waPhone}?text=${encodedMessage}`;
    };

    const floatingWa = document.getElementById('wa-float');
    if (floatingWa) floatingWa.href = getWaLink('Hola, quiero hacer un pedido!');
    
    const ctaCustom = document.getElementById('cta-custom');
    if (ctaCustom) ctaCustom.href = getWaLink('Hola, estoy interesado en un sticker personalizado. Quiero enviarte mi imagen para que la hagan. ¿Me puedes dar más información sobre los tamaños (Pequeño: 5x5cm o Mediano: 8x8cm) y el proceso?');
    
    const footerWh = document.getElementById('footer-wh');
    if (footerWh) {
        footerWh.href = getWaLink('Hola, tengo una pregunta.');
        footerWh.textContent = waPhone;
    }

    // Funcionalidad de filtrado por categoría
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('is-active'));
            chip.classList.add('is-active');
            const category = chip.dataset.cat;
            filterProducts(category);
            searchInput.value = '';
        });
    });

    const filterProducts = (category) => {
        const cards = productsGrid.querySelectorAll('.card');
        cards.forEach(card => {
            const cardCat = card.dataset.cat;
            if (category === 'todos' || cardCat === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    };

    // Funcionalidad de búsqueda en tiempo real
    searchInput.addEventListener('keyup', (e) => {
        const query = e.target.value.toLowerCase();
        const cards = productsGrid.querySelectorAll('.card');
        
        chips.forEach(c => c.classList.remove('is-active'));
        
        cards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const desc = card.querySelector('.card-desc').textContent.toLowerCase();
            const cat = card.dataset.cat;
            
            if (title.includes(query) || desc.includes(query) || cat.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Funcionalidad del botón de compra
    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productName = e.target.dataset.name;
            const productPrice = e.target.dataset.price; 
            let message;

            if (productName === "Sticker Personalizado") {
                message = `Hola, quiero un Sticker Personalizado. Me gustaría enviar mi imagen para que la conviertan en sticker. ¿Podrías indicarme el tamaño que quiero (Pequeño: 5x5cm o Mediano: 8x8cm) y el proceso para enviar la imagen?`;
            } else {
                message = `Hola, quiero comprar el sticker "${productName}" que cuesta L. ${productPrice}. ¿Podrías indicarme el tamaño que quiero? (Pequeño: 5x5cm o Mediano: 8x8cm)`;
            }
            
            window.open(getWaLink(message), '_blank');
        });
    });
});