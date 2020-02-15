'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true,
});
exports.default = void 0;

require('core-js/modules/es6.string.iterator');

require('core-js/modules/es6.array.from');

require('core-js/modules/es6.regexp.to-string');

require('core-js/modules/es6.object.to-string');

require('core-js/modules/es7.symbol.async-iterator');

require('core-js/modules/es6.symbol');

require('core-js/modules/web.dom.iterable');

require('core-js/modules/es6.object.assign');

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
	function Fader(selector, options) {
		_classCallCheck(this, Fader);

		this.options = options;
		var defaultOptions = {
			wrapperClasses: ['slider'],
			titleAnimation: '',
			transition: 5000,
		};
		Object.assign(defaultOptions, this.options);
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

				this.wrapper = this.generateWrapper();
				this.bullets = this.generateBullets();

				if (this.options.titleAnimation) {
					this.assignAnimation();
				}

				this.bullets[0].click();
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
				this.slides = this.slider.children;

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
			key: 'handleClickedBullet',
			value: function handleClickedBullet(ev) {
				var active = ev.target.closest('ul').querySelector('.active');

				if (active) {
					active.classList.remove('active');
				}

				ev.target.classList.add('active');
				var index = ev.target.dataset.index;
				this.resetActiveSlide();
				this.setActiveSlide(index);

				if (this.timer) {
					clearTimeout(this.timer);
				}

				this.startTimer(+index);
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
			key: 'setActiveSlide',
			value: function setActiveSlide(index) {
				this.slides[index].classList.add('slider__slide--active');
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
//# sourceMappingURL=fader.js.map
