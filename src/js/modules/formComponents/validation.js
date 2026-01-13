export const initValidation = (formSelector) => {
    const nameInput = formSelector.querySelector('input[name="firstName"]'),
          emailInput = formSelector.querySelector('input[name="email"]'),
          phoneInput = formSelector.querySelector('input[name="tel"]');

    const nameValue = nameInput.value.trim(),
          emailValue = emailInput.value.trim(),
          phoneValue = phoneInput.value.trim();
    
          let isValid = true;
    
    clearErrors(formSelector);
    
    // проверка имени
    if (!nameValue) {
        showError(nameInput, 'Введите имя участника');
        isValid = false;
    } else if (nameValue.length < 2) {
        showError(nameInput, 'Имя должно содержать минимум 2 буквы');
        isValid = false;
    };

    // проверка почты
    if (!emailValue) {
        showError(emailInput, 'Введите email');
        isValid = false;
    } else if (!isValidEmail(emailValue)) {
        showError(emailInput, 'Введите корректный email');
        isValid = false;
    }

    // проверка телефона
    if (!phoneValue) {
        showError(phoneInput, 'Введите номер телефона');
        isValid = false;
    } else if (!isValidPhone(phoneValue)) {
        showError(phoneInput, 'Введите корректный номер телефона');
        isValid = false;
    }
    
    return isValid;
};
// функция проверки телефона
const isValidPhone = (phone) => {
    const phoneRegex = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
    return phoneRegex.test(phone);
};

// Функция проверки email
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const showError = (input, message) => {
     input.style.borderColor = '#ff0000';
    
    // Создаем элемент для сообщения об ошибке
    let errorElement = input.parentNode.querySelector('.error-message');
    
    // Если элемента ещё нет - создаем
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        input.parentNode.appendChild(errorElement);
    }
    
    // Заполняем текст ошибки
    errorElement.textContent = message;
    errorElement.style.color = '#ff0000';
    errorElement.style.fontSize = '14px';
    errorElement.style.marginTop = '5px';
    
    // Убираем ошибку при вводе
    input.addEventListener('input', clearSingleError, { once: true });
};



const clearSingleError = (e) => {
    e.target.style.borderColor = '';
    
    // Убираем сообщение об ошибке
    const errorElement = e.target.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
};

const clearErrors = (form) => {
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.style.borderColor = '';
        const errorElement = input.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    });
};

// Добавляем валидацию в реальном времени (опционально)
export const initLiveValidation = (form) => {
    const nameInput = form.querySelector('input[name="firstName"]');
    
    nameInput.addEventListener('blur', () => {
        const nameValue = nameInput.value.trim();
        if (!nameValue || nameValue.length < 2) {
            showError(nameInput, '');
        }
    });
};