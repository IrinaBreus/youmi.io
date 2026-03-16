const menuScroll = () => {
    window.addEventListener('scroll', function() {
    const menu = document.querySelector('.nav-panel'); 
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    
    if (scrollPosition > 10) {
        menu.classList.add('scroll');
    } else {
        menu.classList.remove('scroll');
    }
});
}

export default menuScroll;