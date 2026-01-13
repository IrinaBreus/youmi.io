import calcScroll from "./calcScroll";

const modals = () => {
    const scroll = calcScroll();
    const modals = {
        info: document.querySelector('.popup'),
        form: document.querySelector('.modal')
    };

    function toggleModal(modal, action) {
        modal.classList[action]('active');
        document.body.style.overflow = action === 'add' ? 'hidden' : '';
        document.body.style.marginRight = action === 'add' ? `${scroll}px` : '0px';
    }

    // Все обработчики в одном месте
    document.addEventListener('click', (e) => {
        if (e.target.closest('.modal-btn')) {
            const contentId = e.target.dataset.trigger;
            modals.info.querySelectorAll('.popup__content').forEach(content => {
                content.classList.toggle('active', content.dataset.content === contentId);
            });
            toggleModal(modals.info, 'add');
        }
        
        if (e.target.closest('.open-modal')) toggleModal(modals.form, 'add');
        if (e.target.closest('[class*="close"]') || e.target.classList.contains('popup') || e.target.classList.contains('modal')) {
            Object.values(modals).forEach(modal => toggleModal(modal, 'remove'));
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') Object.values(modals).forEach(modal => toggleModal(modal, 'remove'));
    });
};

export default modals;

// import calcScroll from "./calcScroll";

// const modals = () => {
//     const triggers = document.querySelectorAll('.modal-btn'),
//           modal = document.querySelector('.popup'),
//           contents = modal.querySelectorAll('.popup__content'),
//           closeBtn = modal.querySelectorAll('.popup__close'),
//           openFormBtn = document.querySelectorAll('.open-modal'),
//           modalForm = document.querySelector('.modal'),
//           closeForm = modalForm.querySelector('.modal__close');

//     // чтобы не скакало окно модалки при открытии
//     const scroll = calcScroll();

//     triggers.forEach(btn => {
//         btn.addEventListener('click', (e) => {
//             hiddenContent();
//             contents.forEach(content => {
//                 if (e.target.dataset.trigger === content.dataset.content) {
//                     content.classList.add('active');
//                 }
//             });
//             openModal(modal);
//         })
//     });
//     openFormBtn.forEach(btn => {
//         btn.addEventListener('click', () => {
//             openModal(modalForm);
//         })
//     })
//     closeBtn.forEach(btn => {
//         btn.addEventListener('click', () => {
//             closeModal(modal);
//         });
//     });
//     closeForm.addEventListener('click', () => {
//         closeModal(modalForm);
//     })

//     document.addEventListener('keydown', (e) => {
//         if (e.code === 'Escape' ) {
//             closeModal(modal);
//             closeModal(modalForm);
//         } 
//     });
    
//     modal.addEventListener('click', (e) => {
//         if (e.target === modal ) {
//             closeModal(modal);
//         }
//     });
//     modalForm.addEventListener('click', (e) => {
//         if (e.target === modalForm ) {
//             closeModal(modalForm);
//         }
//     });
    
//     function openModal (content) {
//         content.classList.add('active');
//         document.body.style.marginRight = `${scroll}px`;
//         document.body.style.overflow = 'hidden';
//     }
//     function closeModal (content) {
//         content.classList.remove('active');
//         document.body.style.overflow = '';
//         document.body.style.marginRight = '0px';
//     }

//     function hiddenContent() {
//         contents.forEach(content => content.classList.remove('active'));
//     }
// }
// export default modals;