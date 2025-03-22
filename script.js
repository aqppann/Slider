class ImageSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.slidesContainer = document.querySelector('.slides');
        this.prevBtn = document.querySelector('.prev');
        this.nextBtn = document.querySelector('.next');
        this.dotsContainer = document.querySelector('.dots');
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.createDots();
        this.updateSlider();
        this.addEventListeners();
        this.startAutoPlay();
    }
    createDots() {
        this.slides.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.dataset.index = i;
            this.dotsContainer.appendChild(dot);
        });
    }
    updateSlider() {
        this.slidesContainer.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === this.currentIndex);
        });
    }
    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSlider();
    }
    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateSlider();
    }
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 3000);
    }
    stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }
    addEventListeners() {
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        document.querySelectorAll('.dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                this.currentIndex = parseInt(e.target.dataset.index);
                this.updateSlider();
            });
        });
        this.slidesContainer.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.slidesContainer.addEventListener('mouseleave', () => this.startAutoPlay());
    }
}
new ImageSlider();