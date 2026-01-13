const burger = () => {
    const burger = document.querySelector('.burger'),
          trigger = burger.querySelector('.burger__open'),
          links = burger.querySelectorAll('.burger__menu li'),
          carousel = document.querySelector('.carousel');

    trigger.addEventListener('click', () => {
        burger.classList.toggle('active');
        carousel.classList.toggle('hidden');
        if (burger.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    links.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            carousel.classList.remove('hidden');
            document.body.style.overflow = '';
        })
    })
}

export default burger;