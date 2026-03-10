// ===== Мобильное меню =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle?.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Закрыть меню при клике на ссылку
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// ===== Шапка при скролле =====
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ===== Табы (переключение фасовки) =====
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    
    // Активная кнопка
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Активный контент
    tabContents.forEach(c => c.classList.remove('active'));
    document.getElementById(tab).classList.add('active');
  });
});

// ===== Lightbox (галерея) =====
const galleryImages = [
  './images/gallery-1.jpg',
  './images/gallery-2.jpg',
  './images/gallery-3.jpg',
  './images/gallery-4.jpg',
  './images/gallery-5.jpg',
  './images/gallery-6.jpg'
];

let currentImage = 0;
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(index) {
  currentImage = index;
  lightboxImg.src = galleryImages[currentImage];
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function changeImage(direction) {
  currentImage += direction;
  if (currentImage < 0) currentImage = galleryImages.length - 1;
  if (currentImage >= galleryImages.length) currentImage = 0;
  lightboxImg.src = galleryImages[currentImage];
}

// Закрытие по клику на фон
lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Клавиатура
 document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') changeImage(-1);
  if (e.key === 'ArrowRight') changeImage(1);
});

// ===== Форма заказа =====
const orderForm = document.getElementById('orderForm');
const successModal = document.getElementById('successModal');

orderForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Здесь можно добавить отправку на сервер
  // fetch('/api/order', { method: 'POST', body: new FormData(orderForm) })
  
  // Показываем модальное окно
  successModal.classList.add('active');
  orderForm.reset();
});

function closeModal() {
  successModal.classList.remove('active');
}

// Закрытие по клику на фон
successModal?.addEventListener('click', (e) => {
  if (e.target === successModal) closeModal();
});

// ===== Плавная прокрутка для якорных ссылок =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== Анимация при скролле =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

// Наблюдаем за секциями
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
});

// Добавляем класс анимации
const style = document.createElement('style');
style.textContent = `
  section.animate {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);
