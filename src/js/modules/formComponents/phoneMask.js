export const initPhoneMask = (formElement) => {
    const phoneInput = formElement.querySelector('input[name="tel"]');
    
    if (!phoneInput) return;
    
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        // Если начинается с 7 или 8, меняем на +7
        if (value.startsWith('7') || value.startsWith('8')) {
            value = '7' + value.substring(1);
        }
        // Если начинается с 9, добавляем +7
        else if (value.startsWith('9') && value.length <= 10) {
            value = '7' + value;
        }
        
        // Форматируем по маске
        let formattedValue = '+7';
        
        if (value.length > 1) {
            formattedValue += '(' + value.substring(1, 4);
        }
        if (value.length >= 5) {
            formattedValue += ')' + value.substring(4, 7);
        }
        if (value.length >= 8) {
            formattedValue += '-' + value.substring(7, 9);
        }
        if (value.length >= 10) {
            formattedValue += '-' + value.substring(9, 11);
        }
        
        e.target.value = formattedValue;
    });
    
    // Обработчик для удаления символов (чтобы нельзя было удалить +7)
    phoneInput.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && phoneInput.value === '+7') {
            e.preventDefault();
        }
    });
};