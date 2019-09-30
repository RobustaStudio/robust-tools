'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Fader = function () {
  function Fader(selector, options) {
    _classCallCheck(this, Fader);

    this.options = options;
    this.selector = selector;
    this.initialize();
  }

  _createClass(Fader, [{
    key: "initialize",
    value: function initialize() {
      this.slider = document.querySelector(this.selector);

      if (!this.slider) {
        console.warn("Error: Cannot find element with the selector ".concat(this.selector));
        return false;
      }

      this.wrapper = this.generateWrapper();
      this.bullets = this.generateBullets();
      this.bullets[0].click();
    }
  }, {
    key: "generateWrapper",
    value: function generateWrapper() {
      var sliderWrapper = document.createElement('div');
      sliderWrapper.classList.add('slider');
      this.slider.classList.add('slider__slides');
      this.slider.parentNode.appendChild(sliderWrapper);
      sliderWrapper.appendChild(this.slider);
      return sliderWrapper;
    }
  }, {
    key: "generateBullets",
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
    }
  }, {
    key: "handleClickedBullet",
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
    }
  }, {
    key: "resetActiveSlide",
    value: function resetActiveSlide() {
      var active = this.wrapper.querySelector('.slider__slide--active');

      if (active) {
        active.classList.remove('slider__slide--active');
      }
    }
  }, {
    key: "setActiveSlide",
    value: function setActiveSlide(index) {
      this.slides[index].classList.add('slider__slide--active');
    }
  }, {
    key: "startTimer",
    value: function startTimer(index) {
      var _this = this;

      var nextSlideIndex = index + 1;
      this.timer = setTimeout(function () {
        if (!_this.slides[nextSlideIndex]) {
          nextSlideIndex = 0;
        }

        _this.bullets[nextSlideIndex].click();
      }, 5000);
    }
  }]);

  return Fader;
}();

var _default = Fader;
exports.default = _default;
//# sourceMappingURL=fader.js.map