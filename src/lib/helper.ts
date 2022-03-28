export const checkStraightLine = (coordinates = []) => {
	const [coordinate1, coordinate2, coordinate3] = coordinates;
	const [x1, y1] = coordinate1;
	const [x2, y2] = coordinate2;
	const [x3, y3] = coordinate3;

	const slope1 = (y2 - y1) / (x2 - x1);
	const slope2 = (y3 - y2) / (x3 - x2);

	return slope1 === slope2;
};
