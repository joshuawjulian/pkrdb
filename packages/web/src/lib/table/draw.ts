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
	let angDeg = index * (1 / numberOfPlayers) * 360;
	angDeg = angDeg % 360;
	let angRad = (angDeg * Math.PI) / 180;
	let x = getX(angRad, width, height);
	if (angDeg > 90 && angDeg <= 270) {
		x = -x;
	}
	let y = getY(angRad, width, height);
	if (angDeg >= 180 && angDeg < 360) {
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
	sizeOfSeat: number,
): { left: number; top: number } => {
	let xy = getXY(
		index,
		numberOfPlayers,
		(width - width * 0.1) / 2 - sizeOfSeat / 2,
		(height - height * 0.1) / 2 - sizeOfSeat / 2,
	);

	return {
		left: parseFloat((xy.x + width / 2).toPrecision(5)),
		top: parseFloat((height / 2 - xy.y).toPrecision(5)),
	};
};
