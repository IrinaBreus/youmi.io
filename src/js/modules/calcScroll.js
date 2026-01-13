const calcScroll = () => {
    let div = document.createElement('div');
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';
    document.body.append(div);

    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    return scrollWidth;
};

export default calcScroll;

// Применение:
// const scroll = calcScroll();
// при открытии модалки добавить
// document.body.style.marginRight = `${scroll}px`;
// при закрытии модалки добавить
// document.body.style.marginRight = '0px';