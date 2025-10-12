document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.fade-element');
    
    // Задержки для этапов появления
    const delays = [1600, 800, 1900]; // Лого+название → Навигация → Текст
    
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('visible');
        }, delays[index]);
    });
});

// Анимации при скролле
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.scroll-animate');
    
    function checkScroll() {
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                el.classList.add('animated');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); 
});


function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        }
    };
}



