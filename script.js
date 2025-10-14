document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.fade-element');
    
    // Задержки для этапов появления
    const delays = [1100, 400, 1200]; // Лого+название → Навигация → Текст
    
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

function setupServiceCopy() {
    document.querySelectorAll('.service-card').forEach(card => {
        const priceTag = card.querySelector('.price-tag');
        const title = card.querySelector('.service-title').textContent;
        const desc = card.querySelector('.service-desc').textContent;
        const price = priceTag.textContent;
        
        priceTag.addEventListener('click', function() {
            const serviceText = `Здравствуйте! Хочу заказать услугу:\n${title}\n${desc}\n${price}`;
            
            const preview = document.getElementById('servicePreview');
            preview.textContent = `${title}\n${desc}\n${price}`;
            
            navigator.clipboard.writeText(serviceText).then(() => {
                const notification = document.getElementById('copyNotification');
                notification.classList.add('show');
                
                // Обработчик для кнопки связи
                const contactBtn = notification.querySelector('.contact-btn');
                contactBtn.onclick = () => {
                    notification.classList.remove('show');
                    // Скролл только при клике на кнопку
                    document.querySelector('.footer').scrollIntoView({ 
                        behavior: 'smooth' 
                    });
                };
                
                // Автоскрытие через 4 секунды БЕЗ скролла
                setTimeout(() => {
                    if (notification.classList.contains('show')) {
                        notification.classList.remove('show');
                    }
                }, 4500);
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', setupServiceCopy);

