'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true,
});
exports.default = void 0;

require('core-js/modules/es6.string.iterator');

require('core-js/modules/es6.array.from');

require('core-js/modules/es6.regexp.to-string');

require('core-js/modules/es7.symbol.async-iterator');

require('core-js/modules/es7.object.get-own-property-descriptors');

require('core-js/modules/es6.symbol');

require('core-js/modules/web.dom.iterable');

require('core-js/modules/es6.array.iterator');

require('core-js/modules/es6.object.to-string');

require('core-js/modules/es6.object.keys');

function _toConsumableArray(arr) {
	return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
	throw new TypeError('Invalid attempt to spread non-iterable instance');
}

function _iterableToArray(iter) {
	if (
		Symbol.iterator in Object(iter) ||
		Object.prototype.toString.call(iter) === '[object Arguments]'
	)
		return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
	if (Array.isArray(arr)) {
		for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
			arr2[i] = arr[i];
		}
		return arr2;
	}
}

function ownKeys(object, enumerableOnly) {
	var keys = Object.keys(object);
	if (Object.getOwnPropertySymbols) {
		var symbols = Object.getOwnPropertySymbols(object);
		if (enumerableOnly)
			symbols = symbols.filter(function(sym) {
				return Object.getOwnPropertyDescriptor(object, sym).enumerable;
			});
		keys.push.apply(keys, symbols);
	}
	return keys;
}

function _objectSpread(target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i] != null ? arguments[i] : {};
		if (i % 2) {
			ownKeys(Object(source), true).forEach(function(key) {
				_defineProperty(target, key, source[key]);
			});
		} else if (Object.getOwnPropertyDescriptors) {
			Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
		} else {
			ownKeys(Object(source)).forEach(function(key) {
				Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
			});
		}
	}
	return target;
}

function _defineProperty(obj, key, value) {
	if (key in obj) {
		Object.defineProperty(obj, key, {
			value: value,
			enumerable: true,
			configurable: true,
			writable: true,
		});
	} else {
		obj[key] = value;
	}
	return obj;
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}

function _defineProperties(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ('value' in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}

function _createClass(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties(Constructor, staticProps);
	return Constructor;
}

var Fader = (function() {
	function Fader(selector) {
		var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		_classCallCheck(this, Fader);

		this.options = options;
		var defaultOptions = {
			wrapperClasses: ['slider'],
			titleAnimation: '',
			transition: 5000,
			autoplay: true,
			bullets: true,
			arrows: true,
			prevArrow: 'Prev',
			nextArrow: 'Next',
		};
		this.options = _objectSpread({}, defaultOptions, {}, this.options);
		this.selector = selector;
		this.initialize();
	}

	_createClass(Fader, [
		{
			key: 'initialize',
			value: function initialize() {
				this.slider = document.querySelector(this.selector);

				if (!this.slider) {
					console.warn('Error: Cannot find element with the selector '.concat(this.selector));
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
			},
		},
		{
			key: 'assignAnimation',
			value: function assignAnimation() {
				var _this = this;

				var titles = this.wrapper.querySelectorAll('.slider__title');

				if (titles.length > 0) {
					titles.forEach(function(title) {
						title.classList.add(_this.options.titleAnimation);
					});
				}
			},
		},
		{
			key: 'generateWrapper',
			value: function generateWrapper() {
				var _sliderWrapper$classL;

				var sliderWrapper = document.createElement('div');

				(_sliderWrapper$classL = sliderWrapper.classList).add.apply(
					_sliderWrapper$classL,
					_toConsumableArray(this.options.wrapperClasses),
				);

				this.slider.classList.add('slider__slides');
				this.slider.parentNode.appendChild(sliderWrapper);
				sliderWrapper.appendChild(this.slider);
				return sliderWrapper;
			},
		},
		{
			key: 'generateBullets',
			value: function generateBullets() {
				var bulletsContainer = document.createElement('ul');
				bulletsContainer.classList.add('slider__navigation');

				for (var i = 0; i < this.slides.length; i++) {
					var bullet = document.createElement('li');
					var button = document.createElement('button');
					button.innerHTML = i + 1;
					button.type = 'button';
					button.dataset.index = i;
					button.addEventListener('click', this.handleClickedBullet.bind(this));
					bullet.appendChild(button);
					bulletsContainer.appendChild(bullet);
				}

				this.slider.parentNode.insertBefore(bulletsContainer, this.slider.nextSibling);
				return bulletsContainer.querySelectorAll('button');
			},
		},
		{
			key: 'generateArrows',
			value: function generateArrows() {
				var arrowsContainer = document.createElement('ul');
				arrowsContainer.classList.add('slider__arrows');
				var prevArrow = document.createElement('li');
				var prevButton = document.createElement('button');
				prevButton.innerHTML = this.options.prevArrow;
				prevButton.addEventListener('click', this.handleClickPrevious.bind(this));
				prevArrow.appendChild(prevButton);
				arrowsContainer.appendChild(prevArrow);
				this.slider.parentNode.insertBefore(arrowsContainer, this.slider.prevSibling);
				var nextArrow = document.createElement('li');
				var nextButton = document.createElement('button');
				nextButton.innerHTML = this.options.nextArrow;
				nextButton.addEventListener('click', this.handleClickNext.bind(this));
				nextArrow.appendChild(nextButton);
				arrowsContainer.appendChild(nextArrow);
				this.slider.parentNode.insertBefore(arrowsContainer, this.slider.nextSibling);
				return arrowsContainer.querySelectorAll('button');
			},
		},
		{
			key: 'handleClickedBullet',
			value: function handleClickedBullet(ev) {
				var index = ev.target.dataset.index;
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
			},
		},
		{
			key: 'handleClickNext',
			value: function handleClickNext() {
				var activeSlide = this.slider.querySelector('.slider__slide--active');

				var activeIndex = _toConsumableArray(activeSlide.parentElement.children).indexOf(
					activeSlide,
				);

				this.resetActiveSlide();
				this.resetActiveBullet();

				if (activeIndex === this.slides.length - 1) {
					this.setActiveSlide(0);
					this.setActiveBullet(0);
				} else {
					this.setActiveSlide(activeIndex + 1);
					this.setActiveBullet(activeIndex + 1);
				}
			},
		},
		{
			key: 'handleClickPrevious',
			value: function handleClickPrevious() {
				var activeSlide = this.slider.querySelector('.slider__slide--active');

				var activeIndex = _toConsumableArray(activeSlide.parentElement.children).indexOf(
					activeSlide,
				);

				this.resetActiveSlide();
				this.resetActiveBullet();

				if (activeIndex === 0) {
					this.setActiveSlide(this.slides.length - 1);
					this.setActiveBullet(this.slides.length - 1);
				} else {
					this.setActiveSlide(activeIndex - 1);
					this.setActiveBullet(activeIndex - 1);
				}
			},
		},
		{
			key: 'resetActiveSlide',
			value: function resetActiveSlide() {
				var active = this.wrapper.querySelector('.slider__slide--active');

				if (active) {
					active.classList.remove('slider__slide--active');
				}
			},
		},
		{
			key: 'resetActiveBullet',
			value: function resetActiveBullet() {
				if (!this.options.bullets) {
					return;
				}

				this.bullets.forEach(function(bullet) {
					bullet.classList.remove('active');
				});
			},
		},
		{
			key: 'setActiveSlide',
			value: function setActiveSlide(index) {
				this.slides[index].classList.add('slider__slide--active');
			},
		},
		{
			key: 'setActiveBullet',
			value: function setActiveBullet(index) {
				if (!this.options.bullets) {
					return;
				}

				this.bullets[index].classList.add('active');
			},
		},
		{
			key: 'startTimer',
			value: function startTimer(index) {
				var _this2 = this;

				var nextSlideIndex = index + 1;
				this.timer = setTimeout(function() {
					if (!_this2.slides[nextSlideIndex]) {
						nextSlideIndex = 0;
					}

					_this2.bullets[nextSlideIndex].click();
				}, this.options.transition);
			},
		},
	]);

	return Fader;
})();

var _default = Fader;
exports.default = _default;
