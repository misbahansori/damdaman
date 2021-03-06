import { test, expect } from 'vitest';
import { checkTwoEnemiesInARow } from '../src/lib/helper';

test('Check two enemies in a row', () => {
	const currentCoordinate = { x: 500, y: 1100 };

	const enemiesCoordinate = [
		{ x: 500, y: 500 },
		{ x: 500, y: 700 },
		{ x: 700, y: 500 },
		{ x: 300, y: 500 },
	];

	const targetCoordinate = { x: 500, y: 300 };

	expect(checkTwoEnemiesInARow(currentCoordinate, enemiesCoordinate, targetCoordinate)).toBe(true);
});

test('Check two enemies in a row', () => {
	const currentCoordinate = { x: 500, y: 1100 };

	const enemiesCoordinate = [
		{ x: 500, y: 500 },
		{ x: 700, y: 500 },
	];

	const targetCoordinate = { x: 500, y: 300 };

	expect(checkTwoEnemiesInARow(currentCoordinate, enemiesCoordinate, targetCoordinate)).toBe(false);
});

test('Check two enemies in a row', () => {
	const currentCoordinate = { x: 675, y: 1275 };

	const enemiesCoordinate = [
		{ x: 500, y: 1100 },
		{ x: 300, y: 900 },
	];

	const targetCoordinate = { x: 100, y: 700 };

	expect(checkTwoEnemiesInARow(currentCoordinate, enemiesCoordinate, targetCoordinate)).toBe(true);
});

test('Check two enemies in a row', () => {
	const currentCoordinate = { x: 800, y: 1400 };

	const enemiesCoordinate = [
		{ x: 500, y: 1100 },
		{ x: 300, y: 900 },
	];

	const targetCoordinate = { x: 100, y: 700 };

	expect(checkTwoEnemiesInARow(currentCoordinate, enemiesCoordinate, targetCoordinate)).toBe(true);
});

test('Check two enemies in a row', () => {
	const currentCoordinate = { x: 800, y: 1400 };

	const enemiesCoordinate = [
		{ x: 675, y: 1275 },
		{ x: 300, y: 900 },
	];

	const targetCoordinate = { x: 100, y: 700 };

	expect(checkTwoEnemiesInARow(currentCoordinate, enemiesCoordinate, targetCoordinate)).toBe(true);
});

test('Check two enemies in a row', () => {
	const currentCoordinate = { x: 500, y: 1400 };

	const enemiesCoordinate = [
		{ x: 675, y: 1275 },
		{ x: 500, y: 300 },
		{ x: 500, y: 125 },
		{ x: 200, y: 0 },
	];

	const targetCoordinate = { x: 500, y: 0 };

	expect(checkTwoEnemiesInARow(currentCoordinate, enemiesCoordinate, targetCoordinate)).toBe(true);
});
