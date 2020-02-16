'use strict';

class Fader {
	constructor(selector, options = {}) {
		this.options = options;
		const defaultOptions = {
			wrapperClasses: ['slider'],
			titleAnimation: '', // focus-in-contract-bck, text-focus-in
			transition: 5000,
			autoplay: true,
			bullets: true,
			arrows: true,
			prevArrow: 'Prev',
			nextArrow: 'Next',
		};
		this.options = { ...defaultOptions, ...this.options };
		this.selector = selector;
		this.initialize();
	}

	initialize() {
		this.slider = document.querySelector(this.selector);
		if (!this.slider) {
			console.warn(`Error: Cannot find element with the selector ${this.selector}`);
			return false;
		}
		this.slides = this.slider.children;

		this.wrapper = this.generateWrapper();

		if (this.options.arrows) {
			this.arrows = this.generateArrows();
		}

		if (this.options.titleAnimation) {
			this.assignAnimation();
		}

		if (this.options.bullets) {
			this.bullets = this.generateBullets();
			this.bullets[0].click();
		} else {
			this.setActiveSlide(0);
		}
	}

	assignAnimation() {
		const titles = this.wrapper.querySelectorAll('.slider__title');
		if (titles.length > 0) {
			titles.forEach((title) => {
				title.classList.add(this.options.titleAnimation);
			});
		}
	}

	generateWrapper() {
		const sliderWrapper = document.createElement('div');
		sliderWrapper.classList.add(...this.options.wrapperClasses);
		this.slider.classList.add('slider__slides');
		this.slider.parentNode.appendChild(sliderWrapper);
		sliderWrapper.appendChild(this.slider);
		return sliderWrapper;
	}

	generateBullets() {
		const bulletsContainer = document.createElement('ul');
		bulletsContainer.classList.add('slider__navigation');
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

	generateArrows() {
		const arrowsContainer = document.createElement('ul');
		arrowsContainer.classList.add('slider__arrows');

		// Generate previous arrow
		const prevArrow = document.createElement('li');
		const prevButton = document.createElement('button');
		prevButton.innerHTML = this.options.prevArrow;
		prevButton.addEventListener('click', this.handleClickPrevious.bind(this));
		prevArrow.appendChild(prevButton);
		arrowsContainer.appendChild(prevArrow);
		this.slider.parentNode.insertBefore(arrowsContainer, this.slider.prevSibling);

		// Generate next arrow
		const nextArrow = document.createElement('li');
		const nextButton = document.createElement('button');
		nextButton.innerHTML = this.options.nextArrow;
		nextButton.addEventListener('click', this.handleClickNext.bind(this));
		nextArrow.appendChild(nextButton);
		arrowsContainer.appendChild(nextArrow);
		this.slider.parentNode.insertBefore(arrowsContainer, this.slider.nextSibling);

		return arrowsContainer.querySelectorAll('button');
	}

	handleClickedBullet(ev) {
		const { index } = ev.target.dataset;
		this.resetActiveBullet();
		ev.target.classList.add('active');
		this.resetActiveSlide();
		this.setActiveSlide(index);

		if (!this.options.autoplay) {
			return;
		}

		if (this.timer) {
			clearTimeout(this.timer);
		}
		this.startTimer(+index);
	}

	handleClickNext() {
		const activeSlide = this.slider.querySelector('.slider__slide--active');
		const activeIndex = [...activeSlide.parentElement.children].indexOf(activeSlide);
		this.resetActiveSlide();
		this.resetActiveBullet();
		if (activeIndex === this.slides.length - 1) {
			this.setActiveSlide(0);
			this.setActiveBullet(0);
		} else {
			this.setActiveSlide(activeIndex + 1);
			this.setActiveBullet(activeIndex + 1);
		}
	}
	handleClickPrevious() {
		const activeSlide = this.slider.querySelector('.slider__slide--active');
		const activeIndex = [...activeSlide.parentElement.children].indexOf(activeSlide);
		this.resetActiveSlide();
		this.resetActiveBullet();
		if (activeIndex === 0) {
			this.setActiveSlide(this.slides.length - 1);
			this.setActiveBullet(this.slides.length - 1);
		} else {
			this.setActiveSlide(activeIndex - 1);
			this.setActiveBullet(activeIndex - 1);
		}
	}

	resetActiveSlide() {
		const active = this.wrapper.querySelector('.slider__slide--active');
		if (active) {
			active.classList.remove('slider__slide--active');
		}
	}

	resetActiveBullet() {
		if (!this.options.bullets) {
			return;
		}
		this.bullets.forEach((bullet) => {
			bullet.classList.remove('active');
		});
	}

	setActiveSlide(index) {
		this.slides[index].classList.add('slider__slide--active');
	}

	setActiveBullet(index) {
		if (!this.options.bullets) {
			return;
		}
		this.bullets[index].classList.add('active');
	}

	startTimer(index) {
		let nextSlideIndex = index + 1;
		this.timer = setTimeout(() => {
			if (!this.slides[nextSlideIndex]) {
				nextSlideIndex = 0;
			}
			this.bullets[nextSlideIndex].click();
		}, this.options.transition);
	}
}

export default Fader;
