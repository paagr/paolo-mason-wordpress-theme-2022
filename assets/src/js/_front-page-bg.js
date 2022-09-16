class HomeBg {
	constructor() {
		this.vw = window.innerWidth;
		this.vh = window.innerHeight;

		this.width = 50;
		this.height = 50;

		this.mouse = {
			x: 0,
			y: 0
		};

		this.lines = [];
		this.requestId = null;

		this.init();
	}

	drawLine() {
		for (let y = 50; y <= this.vh - this.height; y += 100) {
			for (let x = 50; x <= this.vw - this.width; x += 100) {
				const line = document.createElement('div');
				document.body.append(line);
				line.style.width = `${this.width}px`;
				line.style.height = `${this.height}px`;
				line.style.left = `${x}px`;
				line.style.top = `${y}px`;
				line.className = 'line';

				this.lines.push({
					element: line,
					cx: x + this.width / 2,
					cy: y + this.height / 2
				});
			}
		}
	}

	resize() {
		const drawnedLines = document.querySelectorAll('.line');
		drawnedLines.forEach((el) => {
			el.remove();
		});
		this.lines.length = 0;
		this.drawLine();

		this.requestId = null;
	}

	update() {
		// eslint-disable-next-line no-plusplus
		for (let i = 0; i < this.lines.length; i++) {
			const line = this.lines[i];

			const dx = this.mouse.x - line.cx;
			const dy = this.mouse.y - line.cy;

			const dw = (this.mouse.x / window.innerWidth);
			const dh = (this.mouse.y / window.innerHeight);

			const transform = `rotate(${Math.atan2(dy, dx)}rad) scale(${dw * 2}, ${dh * 2})`;
			line.element.style.transform = transform;
		}

		this.requestId = null;
	}

	init() {
		this.drawLine();

		window.addEventListener('mousemove', (event) => {
			this.mouse.x = event.pageX;
			this.mouse.y = event.pageY;

			if (!this.requestId) {
				this.requestId = requestAnimationFrame(() => this.update());
			}
		});

		window.addEventListener('resize', () => {
			this.vw = window.innerWidth;
			this.vh = window.innerHeight;

			if (!this.requestId) {
				this.requestId = requestAnimationFrame(() => this.resize());
			}
			// const drawnedLines = document.querySelectorAll('.line');
			// drawnedLines.forEach((el) => {
			// 	el.remove();
			// });
			// this.vw = window.innerWidth;
			// this.vh = window.innerHeight;
			// this.lines.length = 0;
			// this.drawLine();
		});
	}
}

export default HomeBg;
