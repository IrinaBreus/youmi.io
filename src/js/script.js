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

document.addEventListener('DOMContentLoaded', () => {
    'use stricti';


    // получение текущего года
    // const year = document.querySelector('.footer__date span');
    // year.innerHTML = new Date().getFullYear();

    scrollUp();
    // calcScroll();

    sliderInfinity('.slider-infinity');
    sliderSimple('.slider-simple');
    carouselMultyple('.carousel__multiple');
    carouselInfinite('.carousel__infinite');

    burger();
    modals();

});