# Fader

Fader is a component that works like a slider by fading slides above one another. It's minimal abd lightweight.

## Usage

Install it

```bash
npm install @robust-tools/fader
```

Add the HTML

```html
<ul class="slider">
	<li class="slider__slide">
		<img
			class="slider__img"
			src="http://lorempixel.com/800/600/abstract/1"
			alt=""
			role="presentation"
		/>
		<p class="slider__title">Genuine</p>
	</li>
	<li class="slider__slide">
		<img
			class="slider__img"
			src="http://lorempixel.com/800/600/abstract/2"
			alt=""
			role="presentation"
		/>
		<p class="slider__title">Journey</p>
	</li>
	<li class="slider__slide">
		<img
			class="slider__img"
			src="http://lorempixel.com/800/600/abstract/3"
			alt=""
			role="presentation"
		/>
		<p class="slider__title">Glocal</p>
	</li>
	<li class="slider__slide">
		<img
			class="slider__img"
			src="http://lorempixel.com/800/600/abstract/4"
			alt=""
			role="presentation"
		/>
		<p class="slider__title">Inspire</p>
	</li>
</ul>
```

Add the CSS. According to your build process this can be imported directly into your files or you can copy it from the `@robust-tools/fader/lib/css/` directory

```css
@import '@robust-tools/fader/lib/css/fader.css';
@import '@robust-tools/fader/lib/css/animation.css';
```

Import it

```javascript
import Fader from '@robust-tools/fader';

const myFader = new Fader(selector, options);
```

## Options

| Option                  | Type       | Default      | Details                                                                                                                 |
| ----------------------- | ---------- | ------------ | ----------------------------------------------------------------------------------------------------------------------- |
| wrapperClasses          | `string[]` | `['slider']` | List of the classes will be used to create the wrapper element around the slider                                        |
| titleAnimation          | `string`   | `''`         | The type of animation to be used on the slide title. Available animations are: `focus-in-contract-bck`, `text-focus-in` |
| transition              | `number`   | `5000`       | Transition between every slide in milliseconds                                                                          |
| autoplay                | `boolean`  | `true`       | Start the slider automatically                                                                                          |
| bullets                 | `boolean`  | `true`       | Generate and display the navigation bullets                                                                             |
| arrows                  | `boolean`  | `true`       | Generate and display the next and previous buttons                                                                      |
| prevArrow               | `string`   | `'Prev'`     | The inner HTML of the previous button                                                                                   |
| nextArrow               | `string`   | `'Next'`     | The inner HTML of the next button                                                                                       |
| paginationInfo          | `boolean`  | `false`      | Display the number of the active slide out of the total slides                                                          |
| paginationInfoSeparator | `string`   | `out of`     | The text that separates the numbers of the active slide from the total slides                                           |
