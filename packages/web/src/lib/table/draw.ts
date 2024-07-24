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
	let startAngle = 215;
	let endAngle = -35;
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

export let getXYAtAngle = (
	angle: number,
	width: number,
	height: number,
): { x: number; y: number } => {
	angle = angle % 360;
	let angRad = (angle * Math.PI) / 180;
	let x = getX(angRad, width, height);
	if (angle > 90 && angle <= 270) {
		x = -x;
	}
	let y = getY(angRad, width, height);
	if (angle >= 180 && angle < 360) {
		y = -y;
	}
	return {
		x: parseFloat(x.toPrecision(7)),
		y: parseFloat(y.toPrecision(7)),
	};
};

export let getDistanceBetweenAngles = (
	start: number,
	end: number,
	clockwise: boolean,
): number => {
	let distance = end - start;
	if (clockwise && end > start) {
		distance = start - end + 360;
	} else if (!clockwise && start > end) {
		distance -= 360;
	}
	return distance;
};

export let getAngleList = (
	start: number,
	end: number,
	numberOfPositions: number,
	clockwise: boolean,
): number[] => {
	if (numberOfPositions === 1) {
		throw new Error('Number of positions must be greater than 1');
	}
	let list: number[] = [];
	let distance = getDistanceBetweenAngles(start, end, clockwise);
	let step = distance / (numberOfPositions - 1);
	if (clockwise) step = -step;
	for (let i = 0; i < numberOfPositions; i++) {
		let angle = start + i * step;
		if (angle < 0) angle += 360;
		list.push(angle);
	}
	return list;
};

export let getOvalList = (
	startAngle: number,
	endAngle: number,
	numberOfPositions: number,
	clockwise: boolean,
	width: number,
	height: number,
): { x: number; y: number }[] => {
	if (numberOfPositions === 1) {
		throw new Error('Number of positions must be greater than 1');
	}
	let list: { x: number; y: number }[] = [];
	let angelList = getAngleList(
		startAngle,
		endAngle,
		numberOfPositions,
		clockwise,
	);
	for (let i = 0; i < numberOfPositions; i++) {
		let xy = getXYAtAngle(angelList[i], width, height);
		list.push(xy);
	}
	return list;
};

export let getTableXYPosAbs = (
	startAngle: number,
	endAngle: number,
	numberOfPlayers: number,
	clockwise: boolean,
	width: number,
	height: number,
	sizeOfSeat: number,
): { left: number; top: number }[] => {
	let list = getOvalList(
		startAngle,
		endAngle,
		numberOfPlayers,
		clockwise,
		(width - width * 0.1) / 2 - sizeOfSeat / 2,
		(height - height * 0.1) / 2 - sizeOfSeat / 2,
	);

	return list.map((xy) => {
		return {
			left: parseFloat((xy.x + width / 2).toPrecision(5)),
			top: parseFloat((height / 2 - xy.y).toPrecision(5)),
		};
	});
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
