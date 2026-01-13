const sliderSimple = (selector) => {
    const slider = document.querySelector(selector),
          field = slider.querySelector('.slider-field'),
          slides = slider.querySelectorAll('.slide'),
          prevBtn = slider.querySelector('.slider-btn--prev'),
          nextBtn = slider.querySelector('.slider-btn--next'),
          dotsContainer = slider.querySelector('.slider-indicators');
    
    let currentSlide = 0; // Текущий слайд 
    let isAnimating = false; 
    let dots;
    // Переменные для drag/swipe
    let isDragging = false;
    let startX = 0;
    let currentX = 0;


    createIndicators();
    field.classList.add('animated'); // можно удалить, если transition добавить к slider-field в css
    prevBtn.setAttribute('disabled', '');

    nextBtn.addEventListener('click', () => handleButtonClick('next'));
    prevBtn.addEventListener('click', () => handleButtonClick('prev'));
    
    // движение слайдов
    function handleButtonClick(direction) {
        if (isAnimating) return;
        
        isAnimating = true;
        
        if (direction === 'next') {
            currentSlide++;
        } else { // direction === 'prev'
            currentSlide--;
        }
        updateButtonsState();
        
        field.style.transform = `translateX(-${currentSlide * 100}%)`;
        dotsActive(currentSlide);
        
        // Сбрасываем флаг анимации после завершения перехода
        setTimeout(() => {
            isAnimating = false;
        }, 500); // Время должно совпадать с CSS transition
    }
    
    // динамическое создание точек и удаление статических точек из верстки
    function createIndicators () {
        dotsContainer.innerHTML = ''; // Очищаем контейнер
        
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('button');
            dot.classList.add('indicator');
            dot.setAttribute('aria-label', `Перейти к слайду ${i + 1}`);
            
            // Делаем первую точку активной
            if (i === 0) {
                dot.classList.add('active');
            }
            
            dot.addEventListener('click', () => {
                if (!isAnimating) {
                    goToSlide(i);
                }
            });
            
            dotsContainer.appendChild(dot);
        }
        
        dots = dotsContainer.querySelectorAll('.indicator');
    };

    // стилизация активной точки
    function dotsActive(i) {
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        dots[i].classList.add('active');
    }

    // функционал для блокировки кнопок
    function updateButtonsState() {
        if (currentSlide == slides.length - 1) {
            nextBtn.setAttribute('disabled', '');
        } else {
            nextBtn.removeAttribute('disabled');
        }
        if (currentSlide == 0) {
            prevBtn.setAttribute('disabled', '');
        } else {
            prevBtn.removeAttribute('disabled');
        }
    }

    // функционал для индикаторов
    function goToSlide(slideIndex) {
        if (isAnimating) return;
        isAnimating = true;

        currentSlide = slideIndex;
        field.style.transform = `translateX(-${currentSlide * 100}%)`;

        dotsActive(currentSlide);
        updateButtonsState();
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    // Функции для touch событий
    const handleTouchStart = (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        field.classList.remove('animated');
        field.classList.add('dragging');
    };
    // функции swipe для мыши
    const handleMouseStart = (e) => {
        isDragging = true;
        startX = e.pageX;
        currentX = startX;
        field.classList.remove('animated');
        field.classList.add('dragging');
    };

    // Общая функция для завершения drag/swipe
    function handleDragEnd() {
        if (!isDragging) return;
        isDragging = false;
        field.classList.remove('dragging');
        
        const diff = currentX - startX;
        const sliderWidth = slider.offsetWidth;
        
         // Если мы на границе и тянем за пределы - всегда возвращаем на место
        if ((currentSlide === 0 && diff > 0) || (currentSlide === slides.length - 1 && diff < 0)) {
            field.classList.add('animated');
            field.style.transform = `translateX(-${currentSlide * 100}%)`;
            return;
        }

        if (Math.abs(diff) > sliderWidth * 0.1) {
            field.classList.add('animated');
            if (diff > 0) {
                // Свайп вправо - предыдущий слайд
                if (currentSlide > 0) goToSlide(currentSlide - 1);
            } else {
                // Свайп влево - следующий слайд
                if (currentSlide < slides.length - 1) goToSlide(currentSlide + 1);
            }
        } else {
            // Возвращаем на место если свайп слабый
            field.classList.add('animated');
            field.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
    }
    // Функция для обновления позиции при drag
    function updateDragPosition(clientX) {
        if (!isDragging) return;
        currentX = clientX;
        const diff = currentX - startX;
        const sliderWidth = slider.offsetWidth;
        
        // Ограничиваем drag за границы
        let limitedDiff = diff;
        
        // Если первый слайд и тянем вправо - ограничиваем
        if (currentSlide === 0 && diff > 0) {
            limitedDiff = diff * 0.3; // Сопротивление 30%
        }
        
        // Если последний слайд и тянем влево - ограничиваем  
        if (currentSlide === slides.length - 1 && diff < 0) {
            limitedDiff = diff * 0.3; // Сопротивление 30%
        }
        
        const offset = -currentSlide * 100 + (limitedDiff / sliderWidth) * 100;
        field.style.transform = `translateX(${offset}%)`;
    }

    // Упрощаем handleTouchMove и handleMouseDrag:
    const handleTouchMove = (e) => updateDragPosition(e.touches[0].clientX);
    const handleMouseDrag = (e) => updateDragPosition(e.pageX);
    
    
    field.addEventListener('touchstart', handleTouchStart);
    field.addEventListener('touchmove', handleTouchMove);
    field.addEventListener('touchend', handleDragEnd);
    
    // Drag мышкой
    field.addEventListener('mousedown', handleMouseStart);
    document.addEventListener('mousemove', handleMouseDrag);
    document.addEventListener('mouseup', handleDragEnd);

}

export default sliderSimple;