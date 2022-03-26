export const checkStraightLine = (coordinates = []) => {
	if (coordinates.length === 0) return false;
	let x1 = coordinates[0][0];
	let y1 = coordinates[0][1];
	let slope1 = null;
	for (let i = 1; i < coordinates.length; i++) {
		let x2 = coordinates[i][0];
		let y2 = coordinates[i][1];
		if (x2 - x1 === 0) {
			return false;
		}
		if (slope1 === null) {
			slope1 = (y2 - y1) / (x2 - x1);
			continue;
		}
		let slope2 = (y2 - y1) / (x2 - x1);
		if (slope2 != slope1) {
			return false;
		}
	}
	return true;
};
