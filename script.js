/* script.js */

const LINKS = {
    downloadLink: 'https://drive.usercontent.google.com/download?id=1QjIPCKTbdVcDNBnggp6cS3cZmCn6oWLy&export=download&authuser=0', 
    tiktok: 'https://tiktok.com/@andrew1284prod'
};

document.addEventListener('DOMContentLoaded', () => {
    // Исправленные ID под твой новый HTML
    const downloadBtn = document.getElementById('downloadLink'); // ID из секции .download
    const authorLink = document.getElementById('authorLink');   // ID из секции .author

    // Присваиваем ссылки
    if (downloadBtn) {
        downloadBtn.href = LINKS.downloadLink;
    }
    
    if (authorLink) {
        authorLink.href = LINKS.tiktok;
    }
});

// ===== ИНТЕРАКТИВНОЕ СРАВНЕНИЕ ШЕЙДЕРОВ =====
const container = document.getElementById('comparisonContainer');
const afterImage = document.getElementById('afterImage');
const afterImg = document.querySelector('.comparison-after img');
const divider = document.getElementById('divider');
let isDragging = false;

function setPosition(x) {
    if (!container || !afterImage || !divider) return;
    
    const rect = container.getBoundingClientRect();
    let offsetX = x - rect.left;
    
    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;
    
    const percent = (offsetX / rect.width) * 100;
    afterImage.style.width = percent + '%';
    
    if (afterImg) {
        afterImg.style.width = (rect.width) + 'px'; 
    }
    
    divider.style.left = offsetX + 'px';
}

if (container) {
    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        setPosition(e.clientX);
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        setPosition(e.clientX);
    });

    document.addEventListener('mouseup', () => isDragging = false);

    // Поддержка тач-скринов
    container.addEventListener('touchstart', (e) => {
        isDragging = true;
        setPosition(e.touches[0].clientX);
    });

    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        setPosition(e.touches[0].clientX);
    });

    document.addEventListener('touchend', () => isDragging = false);
}

// Начальная позиция ползунка
window.addEventListener('load', () => {
    if (container) {
        const rect = container.getBoundingClientRect();
        setPosition(rect.left + rect.width * 0.5);
    }
});

// ===== ЭФФЕКТ ПАРАЛЛАКСА =====
document.addEventListener('mousemove', function(e) {
    const wrapper = document.querySelector('.site-wrapper');
    if (!wrapper) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const mouseX = e.clientX / w;
    const mouseY = e.clientY / h;
    
    const strength = 20; 
    const moveX = (mouseX - 0.5) * strength;
    const moveY = (mouseY - 0.5) * strength;
    
    wrapper.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`;
});
