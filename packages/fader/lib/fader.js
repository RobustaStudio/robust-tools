'use strict';

class Fader {
	constructor(selector, { autoplay = true, duration = 5000 } = {}) {
		this.selector = selector;
		this.autoplay = autoplay;
		this.duration = duration;
		this.initialize();
	}

	initialize() {
		this.slider = document.querySelector(this.selector);
		if (!this.slider) {
			console.warn(`Error: Cannot find element with the selector ${this.selector}`);
			return false;
		}

		this.wrapper = this.generateWrapper();
		this.bullets = this.generateBullets();
		this.bullets[0].click();
	}

	generateWrapper() {
		const sliderWrapper = document.createElement('div');
		sliderWrapper.classList.add('slider');
		this.slider.classList.add('slider__slides');
		this.slider.parentNode.appendChild(sliderWrapper);
		sliderWrapper.appendChild(this.slider);
		return sliderWrapper;
	}

	generateBullets() {
		const bulletsContainer = document.createElement('ul');
		bulletsContainer.classList.add('slider__navigation');
		this.slides = this.slider.children;
		for (let i = 0; i < this.slides.length; i++) {
			const bullet = document.createElement('li');
			const button = document.createElement('button');
			button.innerHTML = i + 1;
			button.type = 'button';
			button.dataset.index = i;
			button.addEventListener('click', this.handleClickedBullet.bind(this));
			bullet.appendChild(button);
			bulletsContainer.appendChild(bullet);
		}
		this.slider.parentNode.insertBefore(bulletsContainer, this.slider.nextSibling);
		return bulletsContainer.querySelectorAll('button');
	}

	handleClickedBullet(ev) {
		// clear the active class
		const active = ev.target.closest('ul').querySelector('.active');
		if (active) {
			active.classList.remove('active');
		}
		ev.target.classList.add('active');
		// Set active slide
		const { index } = ev.target.dataset;

		this.resetActiveSlide();
		this.setActiveSlide(index);
		if (this.timer) {
			clearTimeout(this.timer);
		}
		if (this.autoplay) {
			this.startTimer(+index);
		}
	}

	resetActiveSlide() {
		const active = this.wrapper.querySelector('.slider__slide--active');
		if (active) {
			active.classList.remove('slider__slide--active');
		}
	}

	setActiveSlide(index) {
		this.slides[index].classList.add('slider__slide--active');
	}

	startTimer(index) {
		let nextSlideIndex = index + 1;
		this.timer = setTimeout(() => {
			if (!this.slides[nextSlideIndex]) {
				nextSlideIndex = 0;
			}
			this.bullets[nextSlideIndex].click();
		}, this.duration);
	}
}

export default Fader;
