export let getX = (angle: number, a: number, b: number) => {
	return (a * b) / Math.sqrt(b * b + a * a * Math.pow(Math.tan(angle), 2));
};

export let getY = (angle: number, a: number, b: number) => {
	return (
		(a * b) /
		Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2) / Math.pow(Math.tan(angle), 2))
	);
};

export let getXY = (
	index: number,
	numberOfPlayers: number,
	width: number,
	height: number,
): { x: number; y: number } => {
	let angle = index * (1 / numberOfPlayers) * 2 * Math.PI;
	// console.log(angle);
	let x = getX(angle, width, height);
	if (angle > Math.PI / 2 && angle < (3 * Math.PI) / 2) {
		x = -x;
	}
	let y = getY(angle, width, height);
	if (angle > Math.PI && angle < 2 * Math.PI) {
		y = -y;
	}
	return {
		x: parseFloat(x.toPrecision(7)),
		y: parseFloat(y.toPrecision(7)),
	};
};

export let getXYPosAbs = (
	index: number,
	numberOfPlayers: number,
	width: number,
	height: number,
): { left: number; top: number } => {
	let xy = getXY(index, numberOfPlayers, width / 2, height / 2);

	return {
		left: parseFloat((xy.x + width / 2).toPrecision(5)),
		top: parseFloat((height / 2 - xy.y).toPrecision(5)),
	};
};
