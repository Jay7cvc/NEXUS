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


