export const inputCounter = (formSelector) => {
    const btnPlus = formSelector.querySelector('.form-main__symbol_plus'),
          btnMinus = formSelector.querySelector('.form-main__symbol_minus'),
          inptNumOfMan = formSelector.elements.numberOfMan;

    // подсчет и вывод кол-ва человек
    let numOfMan = inptNumOfMan.value || 1;
    const MAX_VALUE = 40; // или любое другое максимальное значение

    const updateMinusButton = () => {
        btnMinus.disabled = numOfMan === 1;
        btnPlus.disabled = numOfMan === MAX_VALUE;
    };
    inptNumOfMan.addEventListener('input', (e) => {
        numOfMan = e.target.value || 1;
        updateMinusButton();
    });

    btnPlus.addEventListener('click', (e) => {
        e.preventDefault();
        if (numOfMan < MAX_VALUE) {
            numOfMan++;
            inptNumOfMan.value = numOfMan;
            updateMinusButton();
        }
    })
    btnMinus.addEventListener('click', (e) => {
        e.preventDefault();
        if (numOfMan > 1) {
            numOfMan--;
            inptNumOfMan.value = numOfMan;
            updateMinusButton();
        }
    });
};