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

test('should return true if the line is diagonal', () => {
	expect(
		checkStraightLine([
			[300, 500],
			[500, 300],
			[675, 125],
		])
	).toBe(true);
});

test('should return false if the line is diagonal but not in correct order', () => {
	expect(
		checkStraightLine([
			[300, 500],
			[675, 125],
			[500, 300],
		])
	).toBe(false);
});
