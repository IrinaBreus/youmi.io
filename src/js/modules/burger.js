import calcScroll from "./calcScroll";

const burger = () => {
    const burger = document.querySelector('.burger'),
          header = document.querySelector('.header'),
          open = document.querySelector('.nav-panel__btn-open'),
          close = burger.querySelector('.burger__close'),
          links = burger.querySelectorAll('.burger__menu li');

    const scroll = calcScroll();

    open.addEventListener('click', () => {
        burger.classList.add('active');
        document.body.style.marginRight = `${scroll}px`;
        document.body.style.overflow = 'hidden';
    });
    
    close.addEventListener('click', closeBurger);

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' ) {
            closeBurger();
        } 
    });
    
    document.addEventListener('click', (e) => {
        if (e.target === header && burger.classList.contains('active')) {
            closeBurger();
        }
    })
    burger.addEventListener('click', (e) => {
        if (e.target === burger ) {
            closeBurger();
        }
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            closeBurger();
        })
    })

    function closeBurger () {
        burger.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.marginRight = '0px';
    }
}

export default burger;