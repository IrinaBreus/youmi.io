const carouselInfiniteAdaptive = (selector) => {
    // ===== DOM ЭЛЕМЕНТЫ =====
    const slider = document.querySelector(selector),
          field = slider.querySelector('.carousel__field'),
          slides = slider.querySelectorAll('.carousel__slide'),
          prevBtn = slider.querySelector('.carousel__btn_prev'),
          nextBtn = slider.querySelector('.carousel__btn_next'),
          dotsContainer = slider.querySelector('.carousel__indicators');
    
    // ===== СОСТОЯНИЕ =====
    let currentSlide = 1,
        isAnimating = false,
        isDragging = false,
        startX = 0,
        currentX = 0,
        allSlides, dots,
        visibleSlides = 1,
        slideWidth = 100;

    // ===== АДАПТИВНОСТЬ =====
    const updateVisibleSlides = () => {
        const style = getComputedStyle(document.documentElement);
        const newVisibleSlides = parseInt(style.getPropertyValue('--visible-slides')) || 1;
        
        if (newVisibleSlides !== visibleSlides) {
            visibleSlides = newVisibleSlides;
            slideWidth = 100 / visibleSlides;
            initSlider();
        }
    };

    // ===== ИНИЦИАЛИЗАЦИЯ =====
    const initSlider = () => {
        field.innerHTML = '';
        slides.forEach(slide => field.appendChild(slide.cloneNode(true)));
        
        const clonesBefore = [],
              clonesAfter = [];
        
        // Клоны для начала
        for (let i = slides.length - visibleSlides; i < slides.length; i++) {
            clonesBefore.push(slides[i].cloneNode(true));
        }
        clonesBefore.reverse();
        
        // Клоны для конца
        for (let i = 0; i < visibleSlides; i++) {
            clonesAfter.push(slides[i].cloneNode(true));
        }
        
        clonesBefore.forEach(clone => field.insertBefore(clone, field.firstChild));
        clonesAfter.forEach(clone => field.appendChild(clone));
        
        allSlides = field.querySelectorAll('.carousel__slide');
        createIndicators();
        
        currentSlide = visibleSlides;
        field.classList.remove('animated');
        updateSliderPosition();
        updateIndicators();
        
        setTimeout(() => field.classList.add('animated'), 50);
    };

    // ===== ПОЗИЦИОНИРОВАНИЕ =====
    const updateSliderPosition = () => {
        field.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
    };

    // ===== ИНДИКАТОРЫ =====
    const createIndicators = () => {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel__indicator');
            dot.setAttribute('aria-label', `Перейти к слайду ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        dots = dotsContainer.querySelectorAll('.carousel__indicator');
        updateIndicators();
    };

    const updateIndicators = () => {
        if (!dots) return;
        const realIndex = (currentSlide - visibleSlides + slides.length) % slides.length;
        dots.forEach((dot, i) => dot.classList.toggle('active', i === realIndex));
    };

    // ===== НАВИГАЦИЯ =====
    const goToSlide = (slideIndex) => {
        if (isAnimating) return;
        isAnimating = true;

        currentSlide = slideIndex + visibleSlides;
        field.classList.add('animated');
        updateSliderPosition();
        updateIndicators();
        
        setTimeout(() => isAnimating = false, 500);
    };

    const nextSlide = () => {
        if (isAnimating) return;
        isAnimating = true;
        field.classList.add('animated');
        
        currentSlide++;
        updateSliderPosition();
        updateIndicators();
        
        setTimeout(() => {
            checkBoundaries();
            isAnimating = false;
        }, 500);
    };
    
    const prevSlide = () => {
        if (isAnimating) return;
        isAnimating = true;
        field.classList.add('animated');
        
        currentSlide--;
        updateSliderPosition();
        updateIndicators();
        
        setTimeout(() => {
            checkBoundaries();
            isAnimating = false;
        }, 500);
    };

    // ===== БЕСКОНЕЧНОСТЬ =====
    const checkBoundaries = () => {
        const totalSlides = allSlides.length;
        const clonesAtStart = visibleSlides;
        const clonesAtEnd = visibleSlides;
        
        if (currentSlide > totalSlides - clonesAtEnd - 1) {
            field.classList.remove('animated');
            currentSlide = clonesAtStart;
            updateSliderPosition();
            updateIndicators();
            setTimeout(() => field.classList.add('animated'), 50);
        } else if (currentSlide < clonesAtStart) {
            field.classList.remove('animated');
            currentSlide = totalSlides - clonesAtEnd - 1;
            updateSliderPosition();
            updateIndicators();
            setTimeout(() => field.classList.add('animated'), 50);
        }
    };

    // ===== ПЕРЕТАСКИВАНИЕ =====
    const updateDragPosition = (clientX) => {
        if (!isDragging) return;
        currentX = clientX;
        const diff = currentX - startX;
        const offset = -currentSlide * slideWidth + (diff / slider.offsetWidth) * 100;
        field.style.transform = `translateX(${offset}%)`;
    };

    const handleDragEnd = () => {
        if (!isDragging) return;
        isDragging = false;
        field.classList.remove('dragging');
        
        const diff = currentX - startX;
        const sliderWidth = slider.offsetWidth;
        
        if (Math.abs(diff) > sliderWidth * 0.1) {
            field.classList.add('animated');
            diff > 0 ? prevSlide() : nextSlide();
        } else {
            field.classList.add('animated');
            updateSliderPosition();
        }
    };

    // ===== СОБЫТИЯ =====
    const handleTouchStart = (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        field.classList.remove('animated');
        field.classList.add('dragging');
    };

    const handleTouchMove = (e) => updateDragPosition(e.touches[0].clientX);

    const handleMouseStart = (e) => {
        isDragging = true;
        startX = e.pageX;
        currentX = startX;
        field.classList.remove('animated');
        field.classList.add('dragging');
    };

    const handleMouseDrag = (e) => {
        if (!isDragging) return;
        updateDragPosition(e.pageX);
    };

    // ===== ЗАПУСК =====
    initSlider();
    updateVisibleSlides();

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    window.addEventListener('resize', updateVisibleSlides);

    field.addEventListener('touchstart', handleTouchStart);
    field.addEventListener('touchmove', handleTouchMove);
    field.addEventListener('touchend', handleDragEnd);

    field.addEventListener('mousedown', handleMouseStart);
    document.addEventListener('mousemove', handleMouseDrag);
    document.addEventListener('mouseup', handleDragEnd);
}

export default carouselInfiniteAdaptive;

//     // БЛОК 1 - Основные переменные и элементы
//     const slider = document.querySelector(selectCarousel);
    
//     if (!slider) {
//         console.error('❌ Слайдер не найден:', selectCarousel);
//         return;
//     }
    
//     const field = slider.querySelector('.carousel__field'),
//           slides = slider.querySelectorAll('.carousel__slide'),
//           prevBtn = slider.querySelector('.carousel__btn_prev'),
//           nextBtn = slider.querySelector('.carousel__btn_next'),
//           dotsContainer = slider.querySelector('.carousel__indicators');

//     if (!field || !slides.length || !prevBtn || !nextBtn || !dotsContainer) {
//         console.error('❌ Не все элементы слайдера найдены');
//         return;
//     }

//     let currentSlide = 1; // начинаем с 1 потому что 0 - это клон последнего слайда
//     let isDragging = false;
//     let startX = 0;
//     let currentX = 0;
//     let allSlides, dots;

//     // БЛОК 2 - Базовые функции слайдера
//     const initSlider = () => {
//         // Клонируем первый и последний слайды для бесконечности
//         const firstClone = slides[0].cloneNode(true);
//         const lastClone = slides[slides.length - 1].cloneNode(true);
        
//         dotsContainer.innerHTML = '';
        
//         // Добавляем клоны: [последний] [ориг1] [ориг2] ... [оригN] [первый]
//         field.appendChild(firstClone);
//         field.insertBefore(lastClone, slides[0]);
        
//         allSlides = field.querySelectorAll('.carousel__slide');
//         createIndicators();
        
//         // Устанавливаем начальную позицию (на первом оригинальном слайде)
//         field.classList.remove('animated');
//         updateSliderPosition();
//         updateIndicators();
        
//         setTimeout(() => field.classList.add('animated'), 50);
//     };

//     const updateSliderPosition = () => {
//         const offset = currentSlide * 100; // каждый слайд = 100%
//         field.style.transform = `translateX(-${offset}%)`;
//     };

//     const updateIndicators = () => {
//         if (!dots || !dots.length) return;
        
//         // Пересчитываем реальный индекс для индикаторов
//         const realIndex = (currentSlide - 1 + slides.length) % slides.length;
        
//         dots.forEach((elem, i) => {
//             elem.classList.toggle('active', i === realIndex);
//         });
//     };

//     const createIndicators = () => {
//         for (let i = 0; i < slides.length; i++) {
//             const dot = document.createElement('button');
//             dot.classList.add('carousel__indicator');
//             dot.setAttribute('aria-label', `Перейти к слайду ${i + 1}`);
//             dot.addEventListener('click', () => goToSlide(i));
//             dotsContainer.appendChild(dot);
//         }
//         dots = dotsContainer.querySelectorAll('.carousel__indicator');
//     };

//     const goToSlide = (slideIndex) => {
//         currentSlide = slideIndex + 1; // +1 потому что у нас есть клон в начале
//         field.classList.add('animated');
//         updateSliderPosition();
//         updateIndicators();
//     };

//     // БЛОК 3 - Навигация (ПРОКРУТКА ПО 1 СЛАЙДУ)
//     const nextSlide = () => {
//         currentSlide++;
//         updateSliderPosition();
//         updateIndicators();
//         checkBoundaries();
//     };
    
//     const prevSlide = () => {
//         currentSlide--;
//         updateSliderPosition();
//         updateIndicators();
//         checkBoundaries();
//     };

//     const checkBoundaries = () => {
//         // Если дошли до клона в конце - перескакиваем на начало
//         if (currentSlide === allSlides.length - 1) {
//             setTimeout(() => {
//                 field.classList.remove('animated');
//                 currentSlide = 1; // перескакиваем на первый оригинальный слайд
//                 updateSliderPosition();
//                 updateIndicators();
//                 setTimeout(() => field.classList.add('animated'), 50);
//             }, 500);
//         } 
//         // Если дошли до клона в начале - перескакиваем в конец
//         else if (currentSlide === 0) {
//             setTimeout(() => {
//                 field.classList.remove('animated');
//                 currentSlide = allSlides.length - 2; // перескакиваем на последний оригинальный слайд
//                 updateSliderPosition();
//                 updateIndicators();
//                 setTimeout(() => field.classList.add('animated'), 50);
//             }, 500);
//         }
//     };

//     // БЛОК 4 - Drag мышкой (УПРОЩЕННЫЙ)
//     const handleMouseStart = (e) => {
//         isDragging = true;
//         startX = e.pageX;
//         currentX = startX;
//         field.classList.remove('animated');
//         field.classList.add('dragging');
//     };

//     const handleMouseDrag = (e) => {
//         if (!isDragging) return;
//         e.preventDefault();
//         currentX = e.pageX;
//         const diff = currentX - startX;
//         const offset = -currentSlide * 100 + (diff / slider.offsetWidth) * 100;
//         field.style.transform = `translateX(${offset}%)`;
//     };

//     const handleMouseEnd = () => {
//         if (!isDragging) return;
//         isDragging = false;
//         field.classList.remove('dragging');
        
//         const diff = currentX - startX;
//         const sliderWidth = slider.offsetWidth;
        
//         // Определяем направление драга
//         if (Math.abs(diff) > sliderWidth * 0.15) {
//             field.classList.add('animated');
//             diff > 0 ? prevSlide() : nextSlide();
//         } else {
//             field.classList.add('animated');
//             updateSliderPosition();
//         }
//     };

//     // ИНИЦИАЛИЗАЦИЯ
//     initSlider();

//     // Обработчики кнопок
//     nextBtn.addEventListener('click', nextSlide);
//     prevBtn.addEventListener('click', prevSlide);

//     // Drag мышкой
//     slides.forEach(slide => {
//         slide.addEventListener('mousedown', handleMouseStart);
//     });
//     document.addEventListener('mousemove', handleMouseDrag);
//     document.addEventListener('mouseup', handleMouseEnd);
// }

// export default carouselInfinity;