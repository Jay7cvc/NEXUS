document.addEventListener('DOMContentLoaded', function () {
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
document.addEventListener('DOMContentLoaded', function () {
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
            
            // Показываем что скопировали
            const preview = document.getElementById('servicePreview');
            preview.textContent = `${title}\n${desc}\n${price}`;
            
            navigator.clipboard.writeText(serviceText).then(() => {
                const notification = document.getElementById('copyNotification');
                notification.classList.add('show');
            });
        });
    });

    // Закрытие по крестику (уведомление с услугой)
    document.querySelector('.close-btn').addEventListener('click', function() {
        const notification = document.getElementById('copyNotification');
        notification.classList.remove('show');
        document.getElementById('userPhone').value = '';
    });

    // Кнопка "Отправить на почту"
    document.querySelector('.contact-btn').addEventListener('click', function() {
        const phone = document.getElementById('userPhone').value;
        const servicePreview = document.getElementById('servicePreview').textContent;
        const [title, desc, price] = servicePreview.split('\n');
        
        // Проверяем телефон
        if (!phone || phone === '+375 (') {
            alert('Пожалуйста, укажите номер телефона');
            document.getElementById('userPhone').focus();
            return;
        }
        
        let subject = `Заказ услуги: ${title}`;
        let body = `Услуга: ${title}\nЦена: ${price}\nТелефон: ${phone}`;
        
        // Открываем почтовый клиент
        window.location.href = `mailto:nexus2025contact@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // ЗАКРЫВАЕМ уведомление с услугой (автоматически)
        document.getElementById('copyNotification').classList.remove('show');
        document.getElementById('userPhone').value = '';
        
        // ПОКАЗЫВАЕМ уведомление "С вами свяжется" (только с крестиком)
        const alert = document.getElementById('customAlert');
        const overlay = document.getElementById('alertOverlay');
        alert.classList.add('show');
        overlay.classList.add('show');
    });

    // Закрытие по крестику (уведомление "С вами свяжется")
    document.querySelector('.alert-close-btn').addEventListener('click', function() {
        document.getElementById('customAlert').classList.remove('show');
        document.getElementById('alertOverlay').classList.remove('show');
    });

    // Закрытие по клику на overlay
    document.getElementById('alertOverlay').addEventListener('click', function() {
        document.getElementById('customAlert').classList.remove('show');
        this.classList.remove('show');
    });

    // Маска для телефона
    document.getElementById('userPhone').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.startsWith('375')) {
            value = value.substring(3);
        }
        
        let formatted = '+375 (';
        
        if (value.length > 0) {
            formatted += value.substring(0, 2);
        }
        if (value.length > 2) {
            formatted += ') ' + value.substring(2, 5);
        }
        if (value.length > 5) {
            formatted += ' ' + value.substring(5, 7);
        }
        if (value.length > 7) {
            formatted += ' ' + value.substring(7, 9);
        }
        
        e.target.value = formatted;
    });
}

document.addEventListener('DOMContentLoaded', setupServiceCopy);

// Всегда показываем price-tag на мобилках
if (window.innerWidth <= 768) {
    document.querySelectorAll('.price-tag').forEach(tag => {
        tag.style.display = 'block';
        tag.style.opacity = '1';
        tag.style.visibility = 'visible';
    });
}

// Обработчик клика на карточку для мобилок
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && !e.target.closest('.price-tag')) {
            document.querySelectorAll('.service-card').forEach(c => {
                c.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Закрытие при клике вне карточки
document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768 && !e.target.closest('.service-card')) {
        document.querySelectorAll('.service-card').forEach(c => {
            c.classList.remove('active');
        });
    }
});

