import { inputCounter } from './formComponents/inputCounter.js';
import { initValidation } from './formComponents/validation.js';
import { initPhoneMask } from './formComponents/phoneMask.js';

const form = (formSelector) => {
    const form = document.querySelector(formSelector);
    form.setAttribute('novalidate', 'true');

    inputCounter(form);
    initPhoneMask(form);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (initValidation(form)) {
            const formData = collectFormData(form);
            
            // Фейковый fetch для консоли
            await fakeFetch(formData, form, formSelector);
        }
    })
}

// Фейковый fetch
const fakeFetch = (data, formElement, formSelector) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('📨 FETCH DATA:', data);
            console.log('🎯 Форма:', data.firstName ? 'Основная' : 'Модальная');
            resolve({ status: 200, message: 'Success' });
            // reject(new Error('Сервер сломался!'));
        }, 500);
    })
    .then(result => {
        showMessage('ok');
        return result;
    })
    .catch(error => {
        showMessage('error');
        throw error;
    })
    .finally(() => {
        formElement.reset();
        if (formSelector.includes('modal')) {
            closeModal();
        }
    });
};

// Сбор данных формы
const collectFormData = (form) => {
    const formData = new FormData(form);
    return Object.fromEntries(formData);
};

// Закрытие модалки (добавь свою логику)
const closeModal = () => {
    document.querySelector('.modal').classList.remove('active');
    document.body.style.overflow = '';
    document.body.style.marginRight = '0px';
};

const showMessage = (type) => {
    const message = document.querySelector(`.modal-success.${type}`);
    message.classList.add('active');
    setTimeout(() => {
        message.classList.remove('active');
    }, 2000);
};


export default form;