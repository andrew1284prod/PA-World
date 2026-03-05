/* script.js */

const LINKS = {
    downloadLink: 'https://drive.usercontent.google.com/download?id=1QjIPCKTbdVcDNBnggp6cS3cZmCn6oWLy&export=download&authuser=0', 
    tiktok: 'https://tiktok.com/@andrew1284prod'            // Ссылка на TikTok
};

// Устанавливаем ссылки при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Получаем элементы по новым ID, которые ты поставил в HTML
    const btn1 = document.getElementById('downloadLink1');
    const btn2 = document.getElementById('downloadLink2');
    const btn3 = document.getElementById('downloadLink3');
    const authorLink = document.getElementById('authorLink');

    // Присваиваем ссылки, если элементы существуют
    if (btn1) btn1.href = LINKS.modrinth;
    if (btn2) btn2.href = LINKS.zip;
    if (btn3) btn3.href = LINKS.rar;
    if (authorLink) authorLink.href = LINKS.tiktok;
});

// ===== ИНТЕРАКТИВНОЕ СРАВНЕНИЕ ШЕЙДЕРОВ =====
const container = document.getElementById('comparisonContainer');
const afterImage = document.getElementById('afterImage');
const afterImg = document.querySelector('.comparison-after img');
const divider = document.getElementById('divider');
let isDragging = false;

function setPosition(x) {
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    let offsetX = x - rect.left;
    
    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;
    
    const percent = (offsetX / rect.width) * 100;
    const clampedPercent = Math.min(99, Math.max(1, percent));
    afterImage.style.width = clampedPercent + '%';
    
    if (afterImg) {
        const imgWidthPercent = (100 / clampedPercent) * 100;
        afterImg.style.width = imgWidthPercent + '%';
    }
    
    divider.style.left = offsetX + 'px';
}

if (container) {
    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        setPosition(e.clientX);
        e.preventDefault();
    });
}

document.addEventListener('mousemove', (e) => {
    if (!isDragging || !container) return;
    setPosition(e.clientX);
    e.preventDefault();
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

// Сенсорные экраны
if (container) {
    container.addEventListener('touchstart', (e) => {
        isDragging = true;
        setPosition(e.touches[0].clientX);
        e.preventDefault();
    });
}

document.addEventListener('touchmove', (e) => {
    if (!isDragging || !container) return;
    setPosition(e.touches[0].clientX);
    e.preventDefault();
});

document.addEventListener('touchend', () => {
    isDragging = false;
});

// Начальная позиция (по центру)
window.addEventListener('load', () => {
    if (container && afterImage && divider && afterImg) {
        const rect = container.getBoundingClientRect();
        const initialX = rect.left + rect.width * 0.5;
        setPosition(initialX);
    }
});

// ===== ЭФФЕКТ ПАРАЛЛАКСА ФОНА (НАДЕЖНЫЙ) =====
document.addEventListener('mousemove', function(e) {
    const wrapper = document.querySelector('.site-wrapper');
    if (!wrapper) return;

    // Получаем ширину и высоту окна
    const w = window.innerWidth;
    const h = window.innerHeight;
    
    // Получаем позицию курсора (0-1)
    const mouseX = e.clientX / w;
    const mouseY = e.clientY / h;
    
    // Определяем силу эффекта
    const strength = 30; 
    
    // Считаем сдвиг
    const moveX = (mouseX - 0.5) * strength;
    const moveY = (mouseY - 0.5) * strength;
    
    // Применяем transform напрямую к псевдоэлементу через JS невозможно, 
    // поэтому мы применяем его к родителю wrapper, или переделываем логику.                
    // ДАВАЙ ИСПОЛЬЗОВАТЬ СТИЛЬ-ОБЕРТКУ ДЛЯ ФОНА В CSS
    
    wrapper.style.backgroundPosition = `${50 + moveX/10}% ${50 + moveY/10}%`;
});