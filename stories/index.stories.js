import { document, console } from 'global';
import { storiesOf } from '@storybook/html';
import { useEffect } from '@storybook/client-api';

import Fader from '../packages/fader';
import FaderHTML from '../packages/fader/lib/fader.html';
import '../packages/fader/lib/css/fader.css';
import '../packages/fader/lib/css/animation.css';

storiesOf('Fader', module).add('Standard', () => {
	useEffect(() => {
		new Fader('.slider');
	}, []);
	return FaderHTML;
});
