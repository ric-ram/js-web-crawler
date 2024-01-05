const { test, expect } = require('@jest/globals')
const { sortPages } = require('./report.js');

test('Sort pages by number of visits in decrementing order', () => {
	const pages = { 'page1': 3, 'page2': 7, 'page3': 5, 'page4': 10, 'page5': 3, 'page6': 12 };
	const actual = sortPages(pages);
	const expected = { 'page6': 12, 'page4': 10, 'page2': 7, 'page3': 5, 'page5': 3, 'page1': 3 };
	expect(actual).toEqual(expected)
})