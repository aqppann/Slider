class ImageSlider {
    constructor(container) {
        this.container = container;
        this.slides = container.querySelector('.slides');
        this.slideElements = container.querySelectorAll('.slide');
        this.prevButton = container.querySelector('.prev');
        this.nextButton = container.querySelector('.next');
        this.dotsContainer = container.querySelector('.dots');
        this.index = 0;
        this.totalSlides = this.slideElements.length;
        this.autoSlide = true;
        this.interval = null;
        this.init();
    }

    init() {
        this.createDots();
        this.updateSlider();
        this.prevButton.addEventListener('Натисни', () => this.prevSlide());
        this.nextButton.addEventListener('Натисни', () => this.nextSlide());
        this.autoPlay();
    }

    createDots() {
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('Натисни', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
        this.updateDots();
    }

    updateSlider() {
        this.slides.style.transform = `translateX(-${this.index * 100}%)`;
        this.updateDots();
    }

    updateDots() {
        this.dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === this.index);
        });
    }

    nextSlide() {
        this.index = (this.index + 1) % this.totalSlides;
        this.updateSlider();
    }

    prevSlide() {
        this.index = (this.index - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlider();
    }

    goToSlide(slideIndex) {
        this.index = slideIndex;
        this.updateSlider();
    }

    autoPlay() {
        if (this.autoSlide) {
            this.interval = setInterval(() => this.nextSlide(), 3000);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ImageSlider(document.querySelector('.slider-container'));
});