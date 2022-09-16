// import General from './_generalScripts';
import HomeBg from './_front-page-bg';

const App = {

	/**
	 * App.init
	 */
	init() {
		// General scripts
		// function initGeneral() {
		// 	return new General();
		// }
		// initGeneral();

		// Front Page background
		function initHomeBg() {
			return new HomeBg();
		}
		if (document.querySelector('.home')) {
			initHomeBg();
		}
	}

};

document.addEventListener('DOMContentLoaded', () => {
	App.init();
});
