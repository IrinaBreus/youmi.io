const sliderInfinity = (selectCarousel) => {
    // БЛОК 1 - Основные переменные и элементы
    const slider = document.querySelector(selectCarousel),
          field = slider.querySelector('.slider-field'),
          slides = slider.querySelectorAll('.slide'),
          prevBtn = slider.querySelector('.slider-btn--prev'),
          nextBtn = slider.querySelector('.slider-btn--next'),
          dotsContainer = slider.querySelector('.slider-indicators');

    let currentSlide = 1;
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let allSlides, dots, autoPlayInterval;
    const autoPlayDelay = 3000;

    // БЛОК 2 - Базовые функции слайдера
    const initSlider = () => {
        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[slides.length - 1].cloneNode(true);
        
        dotsContainer.innerHTML = '';
        field.appendChild(firstClone);
        field.insertBefore(lastClone, slides[0]);
        
        allSlides = field.querySelectorAll('.slide');
        createIndicators();
        
        field.classList.remove('animated');
        updateSliderPosition();
        updateIndicators();
        
        setTimeout(() => field.classList.add('animated'), 50);
    };

    const updateSliderPosition = () => {
        const offset = currentSlide * 100;
        field.style.transform = `translateX(-${offset}%)`;
    };

    const updateIndicators = () => {
        dots = dotsContainer.querySelectorAll('.indicator');
        const realIndex = (currentSlide - 1 + slides.length) % slides.length;
        
        dots.forEach((elem, i) => {
            elem.classList.toggle('active', i === realIndex);
        });
    };

    const createIndicators = () => {
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('button');
            dot.classList.add('indicator');
            dot.setAttribute('aria-label', `Перейти к слайду ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i + 1));
            dotsContainer.appendChild(dot);
        }
    };

    const goToSlide = (slideIndex) => {
        currentSlide = slideIndex;
        field.classList.add('animated');
        updateSliderPosition();
        updateIndicators();
        handleUserInteraction();
    };

    // БЛОК 3 - Навигация (кнопки + индикаторы)
    const nextSlide = () => {
        field.classList.add('animated');
        currentSlide++;
        updateSliderPosition();
        updateIndicators();
        checkBoundaries();
    };
    
    const prevSlide = () => {
        field.classList.add('animated');
        currentSlide--;
        updateSliderPosition();
        updateIndicators();
        checkBoundaries();
    };

    const checkBoundaries = () => {
        setTimeout(() => {
            if (currentSlide === allSlides.length - 1) {
                field.classList.remove('animated');
                currentSlide = 1;
                updateSliderPosition();
                updateIndicators();
            } else if (currentSlide === 0) {
                field.classList.remove('animated');
                currentSlide = allSlides.length - 2;
                updateSliderPosition();
                updateIndicators();
            }
        }, 500);
    };

    // БЛОК 4 - Автопрокрутка (можно закомментировать)
    const startAutoPlay = () => {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
    };

    const stopAutoPlay = () => {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    };

    const handleUserInteraction = () => {
        stopAutoPlay();
        setTimeout(startAutoPlay, 5000);
    };

    // БЛОК 5 - Свайп для мобилок (можно закомментировать)
    const handleTouchStart = (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        field.classList.remove('animated');
        field.classList.add('dragging');
        handleUserInteraction();
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        const offset = -currentSlide * 100 + (diff / slider.offsetWidth) * 100;
        field.style.transform = `translateX(${offset}%)`;
    };

    const handleTouchEnd = () => {
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
        handleUserInteraction();
    };

    // БЛОК 6 - Drag мышкой (можно закомментировать)
    const handleMouseStart = (e) => {
        isDragging = true;
        startX = e.pageX;
        currentX = startX;
        field.classList.remove('animated');
        field.classList.add('dragging');
    };

    const handleMouseDrag = (e) => {
        if (!isDragging) return;
        currentX = e.pageX;
        const diff = currentX - startX;
        const sliderWidth = slider.offsetWidth;
        const maxOffset = sliderWidth * 0.8;
        const limitedDiff = Math.max(-maxOffset, Math.min(maxOffset, diff));
        const offset = -currentSlide * 100 + (limitedDiff / sliderWidth) * 100;
        field.style.transform = `translateX(${offset}%)`;
        handleUserInteraction();
    };

    const handleMouseEnd = () => {
        if (!isDragging) return;
        isDragging = false;
        field.classList.remove('dragging');
        
        const diff = currentX - startX;
        const sliderWidth = slider.offsetWidth;
        
        if (Math.abs(diff) > sliderWidth * 0.2) {
            field.classList.add('animated');
            diff > 0 ? prevSlide() : nextSlide();
        } else {
            field.classList.add('animated');
            updateSliderPosition();
        }
        handleUserInteraction();
    };

    // ИНИЦИАЛИЗАЦИЯ
    initSlider();

    // Обязательные обработчики
    nextBtn.addEventListener('click', () => { nextSlide(); handleUserInteraction(); });
    prevBtn.addEventListener('click', () => { prevSlide(); handleUserInteraction(); });

    // ОПЦИОНАЛЬНЫЕ БЛОКИ (можно комментировать)
    
    // Автопрокрутка
    startAutoPlay();
    document.addEventListener('visibilitychange', () => {
        document.hidden ? stopAutoPlay() : startAutoPlay();
    });

    // Свайп на мобилках
    field.addEventListener('touchstart', handleTouchStart);
    field.addEventListener('touchmove', handleTouchMove);
    field.addEventListener('touchend', handleTouchEnd);

    // Drag мышкой
    field.addEventListener('mousedown', handleMouseStart);
    document.addEventListener('mousemove', handleMouseDrag);
    document.addEventListener('mouseup', handleMouseEnd);
}

export default sliderInfinity;
