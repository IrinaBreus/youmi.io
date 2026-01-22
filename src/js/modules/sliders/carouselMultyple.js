// const carouselMultyple = (selector) => {
//     // ===== DOM ЭЛЕМЕНТЫ =====
//     const slider = document.querySelector(selector),
//           field = slider.querySelector('.carousel__field'),
//           slides = slider.querySelectorAll('.carousel__slide'),
//           prevBtn = slider.querySelector('.carousel__btn_prev'),
//           nextBtn = slider.querySelector('.carousel__btn_next'),
//           dotsContainer = slider.querySelector('.carousel__indicators');
    
//     // ===== СОСТОЯНИЕ =====
//     let currentSlide = 0,
//         isAnimating = false,
//         isDragging = false,
//         startX = 0,
//         currentX = 0,
//         dots,
//         visibleSlides = 3,
//         slideWidth = 100 / visibleSlides;

//     // ===== АДАПТИВНОСТЬ =====
//     const updateVisibleSlides = () => {
//         const style = getComputedStyle(document.documentElement);
//         const newVisibleSlides = parseInt(style.getPropertyValue('--visible-slides')) || 3;
        
//         if (newVisibleSlides !== visibleSlides) {
//             visibleSlides = newVisibleSlides;
//             slideWidth = 100 / visibleSlides;
            
//             const maxSlide = Math.max(0, slides.length - visibleSlides);
//             currentSlide = Math.min(currentSlide, maxSlide);
            
//             updateSliderPosition();
//             updateButtonsState();
//             recreateIndicators();
//         }
//     };

//     // ===== ИНДИКАТОРЫ =====
//     const createIndicators = () => {
//         dotsContainer.innerHTML = '';
//         const totalDots = Math.max(1, slides.length - visibleSlides + 1);
        
//         for (let i = 0; i < totalDots; i++) {
//             const dot = document.createElement('button');
//             dot.classList.add('carousel__indicator');
//             dot.setAttribute('aria-label', `Перейти к группе ${i + 1}`);
//             dot.addEventListener('click', () => !isAnimating && goToSlide(i));
//             dotsContainer.appendChild(dot);
//         }
        
//         dots = dotsContainer.querySelectorAll('.carousel__indicator');
//     };

//     const recreateIndicators = () => {
//         createIndicators();
//         dotsActive(currentSlide);
//     };

//     const dotsActive = (index) => {
//         if (!dots.length) return;
//         dots.forEach(dot => dot.classList.remove('active'));
//         if (dots[index]) dots[index].classList.add('active');
//     };

//     // ===== ПОЗИЦИОНИРОВАНИЕ =====
//     const updateSliderPosition = () => {
//         field.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
//     };

//     // ===== НАВИГАЦИЯ =====
//     const handleButtonClick = (direction) => {
//         if (isAnimating) return;
//         isAnimating = true;
        
//         direction === 'next' ? currentSlide++ : currentSlide--;
//         updateButtonsState();
//         updateSliderPosition();
//         dotsActive(currentSlide);
        
//         setTimeout(() => isAnimating = false, 500);
//     };

//     const goToSlide = (slideIndex) => {
//         if (isAnimating) return;
//         isAnimating = true;

//         currentSlide = slideIndex;
//         updateSliderPosition();
//         dotsActive(currentSlide);
//         updateButtonsState();
        
//         setTimeout(() => isAnimating = false, 500);
//     };

//     const updateButtonsState = () => {
//         const maxSlide = Math.max(0, slides.length - visibleSlides);
//         prevBtn.disabled = currentSlide === 0;
//         nextBtn.disabled = currentSlide >= maxSlide;
//     };

//     // ===== ПЕРЕТАСКИВАНИЕ =====
//     const updateDragPosition = (clientX) => {
//         if (!isDragging) return;
//         currentX = clientX;
        
//         const diff = currentX - startX,
//               sliderWidth = slider.offsetWidth,
//               maxSlide = Math.max(0, slides.length - visibleSlides);
        
//         let currentOffset = -currentSlide * slideWidth + (diff / sliderWidth) * 100;
//         const minOffset = 0,
//               maxOffset = maxSlide * slideWidth;
        
//         if (-currentOffset < minOffset) currentOffset = -minOffset;
//         if (-currentOffset > maxOffset) currentOffset = -maxOffset;
        
//         field.style.transform = `translateX(${currentOffset}%)`;
//     };

//     const handleDragEnd = () => {
//         if (!isDragging) return;
//         isDragging = false;
//         field.classList.remove('dragging');
        
//         const diff = currentX - startX,
//               sliderWidth = slider.offsetWidth,
//               maxSlide = Math.max(0, slides.length - visibleSlides);
        
//         let newSlide = currentSlide;
        
//         if (Math.abs(diff) > sliderWidth * 0.1) {
//             field.classList.add('animated');
//             diff > 0 ? newSlide-- : newSlide++;
//         }
        
//         newSlide = Math.max(0, Math.min(maxSlide, newSlide));
//         newSlide !== currentSlide ? goToSlide(newSlide) : updateSliderPosition();
//     };

//     // ===== СОБЫТИЯ =====
//     const handleTouchStart = (e) => {
//         isDragging = true;
//         startX = e.touches[0].clientX;
//         field.classList.remove('animated');
//         field.classList.add('dragging');
//     };

//     const handleTouchMove = (e) => updateDragPosition(e.touches[0].clientX);

//     // ===== ЗАПУСК =====
//     createIndicators();
//     field.classList.add('animated');
//     updateVisibleSlides();

//     nextBtn.addEventListener('click', () => handleButtonClick('next'));
//     prevBtn.addEventListener('click', () => handleButtonClick('prev'));
//     window.addEventListener('resize', updateVisibleSlides);

//     field.addEventListener('touchstart', handleTouchStart);
//     field.addEventListener('touchmove', handleTouchMove);
//     field.addEventListener('touchend', handleDragEnd);
// }

// export default carouselMultyple;

const carouselMultyple = (selector) => {
    // try {
        // ===== DOM ЭЛЕМЕНТЫ =====
        const slider = document.querySelector(selector),
              field = slider.querySelector('.carousel__field'),
              slides = slider.querySelectorAll('.carousel__slide'),
            //   prevBtn = slider.querySelector('.carousel__btn_prev'),
            //   nextBtn = slider.querySelector('.carousel__btn_next'),
              dotsContainer = slider.querySelector('.carousel__indicators');
        
        // ===== СОСТОЯНИЕ =====
        let currentSlide = 0,
            isAnimating = false,
            isDragging = false,
            startX = 0,
            currentX = 0,
            dots,
            visibleSlides = 3,
            slideWidth = 100 / visibleSlides;
    
        // ===== АДАПТИВНОСТЬ =====
        const updateVisibleSlides = () => {
            const style = getComputedStyle(document.documentElement);
            const newVisibleSlides = parseInt(style.getPropertyValue('--visible-slides')) || 3;
            
            if (newVisibleSlides !== visibleSlides) {
                visibleSlides = newVisibleSlides;
                slideWidth = 100 / visibleSlides;
                
                const maxSlide = Math.max(0, slides.length - visibleSlides);
                currentSlide = Math.min(currentSlide, maxSlide);
                
                updateSliderPosition();
                // updateButtonsState();
                recreateIndicators();
            }
        };
    
        // ===== ИНДИКАТОРЫ =====
        const createIndicators = () => {
            dotsContainer.innerHTML = '';
            const totalDots = Math.max(1, slides.length - visibleSlides + 1);
            
            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('button');
                dot.classList.add('carousel__indicator');
                dot.setAttribute('aria-label', `Перейти к группе ${i + 1}`);
                dot.addEventListener('click', () => !isAnimating && goToSlide(i));
                dotsContainer.appendChild(dot);
            }
            
            dots = dotsContainer.querySelectorAll('.carousel__indicator');
        };
    
        const recreateIndicators = () => {
            createIndicators();
            dotsActive(currentSlide);
        };
    
        const dotsActive = (index) => {
            if (!dots.length) return;
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[index]) dots[index].classList.add('active');
        };
    
        // ===== ПОЗИЦИОНИРОВАНИЕ =====
        const updateSliderPosition = () => {
            // field.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
            // ВАЖНО: используем слайды[0], чтобы получить реальную ширину одного слайда
            const slide = slides[0];
            if (!slide) return;
            
            // Получаем реальную ширину слайда в процентах от контейнера
            const containerWidth = field.offsetWidth;
            const slideWidthPx = slide.offsetWidth;
            const gap = parseInt(getComputedStyle(field).gap); 
            // Ширина слайда + gap в процентах
            const slideWithGapPercent = ((slideWidthPx + gap) / containerWidth) * 100;
            
            field.style.transform = `translateX(-${currentSlide * slideWithGapPercent}%)`;
        };
    
        // ===== НАВИГАЦИЯ =====
        const handleButtonClick = (direction) => {
            if (isAnimating) return;
            isAnimating = true;
            
            direction === 'next' ? currentSlide++ : currentSlide--;
            updateButtonsState();
            updateSliderPosition();
            dotsActive(currentSlide);
            
            setTimeout(() => isAnimating = false, 500);
        };
    
        const goToSlide = (slideIndex) => {
            if (isAnimating) return;
            isAnimating = true;
    
            currentSlide = slideIndex;
            updateSliderPosition();
            dotsActive(currentSlide);
            // updateButtonsState();
            
            setTimeout(() => isAnimating = false, 500);
        };
    
        // const updateButtonsState = () => {
        //     const maxSlide = Math.max(0, slides.length - visibleSlides);
        //     prevBtn.disabled = currentSlide === 0;
        //     nextBtn.disabled = currentSlide >= maxSlide;
        // };
    
        // ===== ПЕРЕТАСКИВАНИЕ С РЕЗИНОВЫМИ ГРАНИЦАМИ =====
        const updateDragPosition = (clientX) => {
            if (!isDragging) return;
            currentX = clientX;
            
            const diff = currentX - startX;
            const sliderWidth = slider.offsetWidth;
            const maxSlide = Math.max(0, slides.length - visibleSlides);
            
            let currentOffset = -currentSlide * slideWidth + (diff / sliderWidth) * 100;
            const minOffset = 0;
            const maxOffset = maxSlide * slideWidth;
            
            // НАСТРОЙКИ РЕЗИНОВЫХ ГРАНИЦ
            const maxOvershoot = 50; // максимальная оттяжка в px
            const resistance = 0.8; // сопротивление оттяжки
            
            // В НАЧАЛЕ (currentSlide === 0) и тянем ВЛЕВО (diff > 0)
            if (currentSlide === 0 && diff > 0) {
                const overshoot = Math.min(diff * resistance, maxOvershoot);
                currentOffset = (overshoot / sliderWidth) * 100;
            }
            // В КОНЦЕ (currentSlide === maxSlide) и тянем ВПРАВО (diff < 0)  
            else if (currentSlide === maxSlide && diff < 0) {
                const overshoot = Math.min(Math.abs(diff) * resistance, maxOvershoot);
                currentOffset = -maxOffset - (overshoot / sliderWidth) * 100;
            }
            // В ОСТАЛЬНЫХ СЛУЧАЯХ - ОГРАНИЧИВАЕМ ГРАНИЦЫ
            else {
                if (-currentOffset < minOffset) currentOffset = -minOffset;
                if (-currentOffset > maxOffset) currentOffset = -maxOffset;
            }
            
            field.style.transform = `translateX(${currentOffset}%)`;
        };
    
        const handleDragEnd = () => {
            if (!isDragging) return;
            isDragging = false;
            field.classList.remove('dragging');
            
            const diff = currentX - startX;
            const sliderWidth = slider.offsetWidth;
            const maxSlide = Math.max(0, slides.length - visibleSlides);
            
            let newSlide = currentSlide;
            
            // ПРОВЕРЯЕМ ТОЛЬКО ЕСЛИ НЕ НА ГРАНИЦЕ С ОТТЯЖКОЙ
            const isOvershooting = 
                (currentSlide === 0 && diff > 0) || 
                (currentSlide === maxSlide && diff < 0);
            
            if (Math.abs(diff) > sliderWidth * 0.1 && !isOvershooting) {
                field.classList.add('animated');
                diff > 0 ? newSlide-- : newSlide++;
            }
            
            newSlide = Math.max(0, Math.min(maxSlide, newSlide));
            
            // ВСЕГДА ВОЗВРАЩАЕМ НА МЕСТО С АНИМАЦИЕЙ
            field.classList.add('animated');
            if (newSlide !== currentSlide) {
                goToSlide(newSlide);
            } else {
                updateSliderPosition();
            }
        };
    
        // ===== СОБЫТИЯ МЫШИ =====
        const handleMouseStart = (e) => {
            isDragging = true;
            startX = e.pageX;
            currentX = startX;
            field.classList.remove('animated');
            field.classList.add('dragging');
        };
    
        const handleMouseDrag = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            updateDragPosition(e.pageX);
        };
    
        const handleMouseEnd = () => {
            if (!isDragging) return;
            handleDragEnd();
        };
    
        // ===== СОБЫТИЯ ТАЧ =====
        const handleTouchStart = (e) => {
            isDragging = true;
            startX = e.touches[0].clientX;
            field.classList.remove('animated');
            field.classList.add('dragging');
        };
    
        const handleTouchMove = (e) => {
            e.preventDefault();
            updateDragPosition(e.touches[0].clientX);
        };
    
        // ===== ЗАПУСК =====
        createIndicators();
        field.classList.add('animated');
        updateVisibleSlides();
    
        // nextBtn.addEventListener('click', () => handleButtonClick('next'));
        // prevBtn.addEventListener('click', () => handleButtonClick('prev'));
        window.addEventListener('resize', updateVisibleSlides);
    
        // ТАЧ СОБЫТИЯ
        field.addEventListener('touchstart', handleTouchStart);
        field.addEventListener('touchmove', handleTouchMove, { passive: false });
        field.addEventListener('touchend', handleDragEnd);
    
        // МЫШЬ СОБЫТИЯ
        field.addEventListener('mousedown', handleMouseStart);
        document.addEventListener('mousemove', handleMouseDrag);
        document.addEventListener('mouseup', handleMouseEnd);
        
    // } catch (error) {
        
    // }
}

export default carouselMultyple;