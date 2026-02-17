const accordeon = (selector) => {
    const container = document.querySelector(selector);

    if (!container) return;

    const items = container.querySelectorAll('.faq__item');
    let isAnimating = false;

    const closeAll = () => {
        items.forEach(item => item.classList.remove('active'));
    };

    container.addEventListener('click', (e) => {
        const plus = e.target.closest('.faq__plus');
        const minus = e.target.closest('.faq__minus');

        if (isAnimating) return;

        if (plus) {
            const parent = plus.closest('.faq__item');
            if (parent && !parent.classList.contains('active')) {
                isAnimating = true;
                closeAll();
                parent.classList.add('active');

                setTimeout(() => {
                    isAnimating = false;
                }, 600);
            }
        }
        
        if (minus) {
            isAnimating = true;
            minus.closest('.faq__item')?.classList.remove('active');
            
            setTimeout(() => {
                isAnimating = false;
            }, 600);
        }
    })
}

export default accordeon;