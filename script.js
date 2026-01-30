// Automatyczna karuzela
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.carousel-slides');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const dotsContainer = document.querySelector('.carousel-dots');

  let currentIndex = 0;
  const totalSlides = slides.length;

  // Tworzenie kropek
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  const dots = document.querySelectorAll('.carousel-dot');

  // Funkcja do przejścia do slajdu
  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
    resetAutoPlay(); // Resetuje timer przy ręcznym kliknięciu
  }

  // Aktualizacja widoku karuzeli
  function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Aktualizacja kropek
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  // Przejdź do następnego slajdu
  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  }

  // Przejdź do poprzedniego slajdu
  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  // Obsługa przycisków
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  // Auto-play – zmiana co 5 sekund
  let autoPlayInterval = setInterval(nextSlide, 5000);

  // Reset auto-play po interakcji
  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(nextSlide, 5000);
  }

  // Zatrzymaj auto-play przy najechaniu myszką (opcjonalnie)
  carousel.parentElement.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
  });

  carousel.parentElement.addEventListener('mouseleave', () => {
    autoPlayInterval = setInterval(nextSlide, 5000);
  });
});
