import { test, expect } from 'vitest';
import { checkStraightLine } from '../src/lib/helper';

test('should return true if the line is horizontal', () => {
	expect(
		checkStraightLine([
			[100, 700],
			[300, 700],
			[500, 700],
		])
	).toBe(true);
});
test('should return true if the line is horizontal', () => {
	expect(
		checkStraightLine([
			[700, 1100],
			[700, 900],
			[700, 700],
		])
	).toBe(true);
});
test('should return false if the last is coordinate is not align', () => {
	expect(
		checkStraightLine([
			[100, 500],
			[300, 500],
			[500, 700],
		])
	).toBe(false);
});

test('should return true if the line is diagonal', () => {
	expect(
		checkStraightLine([
			[300, 500],
			[500, 300],
			[675, 125],
		])
	).toBe(true);
});

test('should return true if the line is diagonal', () => {
	expect(
		checkStraightLine([
			[900, 500],
			[700, 500],
			[500, 500],
		])
	).toBe(true);
});

test('should return false if the line is diagonal but not in correct order', () => {
	expect(
		checkStraightLine([
			[300, 900],
			[500, 700],
			[700, 500],
		])
	).toBe(false);
});
