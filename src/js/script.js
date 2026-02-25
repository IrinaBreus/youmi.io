import '/src/sass/style.scss';

import 'virtual:svg-icons-register';

// import calcScroll from './modules/calcScroll';
import scrollUp from './modules/scrollUp';
import burger from './modules/burger';
import modals from './modules/modals';
import sliderInfinity from './modules/sliders/sliderInfinity';
import sliderSimple from './modules/sliders/sliderSimple';
import carouselMultyple from './modules/sliders/carouselMultyple';
import carouselInfinite from './modules/sliders/carouselInfinity';
import accordeon from './modules/accordeon';

document.addEventListener('DOMContentLoaded', () => {
    'use stricti';


    // получение текущего года
    // const year = document.querySelector('.footer__date span');
    // year.innerHTML = new Date().getFullYear();

    scrollUp();
    // calcScroll();

    // sliderInfinity('.slider-infinity');
    // sliderSimple('.slider-simple');
    // carouselInfinite('.carousel__infinite');
    carouselMultyple('.therapy-perks__carousel');
    carouselMultyple('.about__carousel');
    
    burger();
    accordeon('.faq-main');
    // modals();
    
    let carouselInitialized = false;
    
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768 && !carouselInitialized) {
            carouselMultyple('.specialists__carousel', 'btns');
            carouselMultyple('.psy-proof__carousel');
            carouselInitialized = true;
        }
    });
    
    if (window.innerWidth <= 768) {
        carouselMultyple('.specialists__carousel', 'btns');
        carouselMultyple('.psy-proof__carousel');
        carouselInitialized = true;
    }
});