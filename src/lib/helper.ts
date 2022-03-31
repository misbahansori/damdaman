import type { Coordinate } from './types/global.type';

export const checkStraightLine = (coordinates = []) => {
	const [coordinate1, coordinate2, coordinate3] = coordinates;
	const [x1, y1] = coordinate1;
	const [x2, y2] = coordinate2;
	const [x3, y3] = coordinate3;

	if (x2 - x1 > 0 && x3 - x2 < 0) return false;
	if (x2 - x1 < 0 && x3 - x2 > 0) return false;
	if (y2 - y1 > 0 && y3 - y2 < 0) return false;
	if (y2 - y1 < 0 && y3 - y2 > 0) return false;

	const slope1 = (y2 - y1) / (x2 - x1);
	const slope2 = (y3 - y2) / (x3 - x2);

	return slope1 === slope2;
};

export const checkTwoEnemiesInARow = (
	currentCoordinate: Coordinate,
	enemiesCoordinate: Coordinate[],
	targetCoordinate: Coordinate
) => {
	const enemies = enemiesCoordinate.filter(
		(enemyCoordinate) =>
			enemyCoordinate[0] !== currentCoordinate.x && enemyCoordinate[1] !== currentCoordinate.y
	);

	const [enemy1, enemy2] = enemies;

	const straightLine1 = checkStraightLine([
		[currentCoordinate.x, currentCoordinate.y],
		[enemy1.x, enemy1.y],
		[targetCoordinate.x, targetCoordinate.y],
	]);

	const straightLine2 = checkStraightLine([
		[currentCoordinate.x, currentCoordinate.y],
		[enemy2.x, enemy2.y],
		[targetCoordinate.x, targetCoordinate.y],
	]);

	return straightLine1 && straightLine2;
};
