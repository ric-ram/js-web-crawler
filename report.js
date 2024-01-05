const printReport = (pages) => {
	console.log('==========')
	console.log("The crawling report is starting...");
	console.log('==========')
	const sortedPages = sortPages(pages);

	for (const url in sortedPages) {
		console.log(`Found ${sortedPages[url]} internal links to ${url}`);
	}
}

const mergeSort = (arr) => {
	const length = arr.length;

	if (length <= 1) {
		return arr;
	}

	const midPoint = Math.floor(length / 2);
	const left = mergeSort(arr.slice(0, midPoint));
	const right = mergeSort(arr.slice(midPoint, length));
	return merge(left, right);
}

const merge = (left, right) => {
	const sortedArr = [];
	let i = 0;
	let j = 0;

	while (i < left.length && j < right.length) {
		if (left[i] >= right[j]) {
			sortedArr.push(left[i]);
			i++;
		} else {
			sortedArr.push(right[j]);
			j++;
		}
	}
	while (i < left.length) {
		sortedArr.push(left[i]);
		i++;
	}
	while (j < right.length) {
		sortedArr.push(right[j]);
		j++;
	}
	return sortedArr;
}

const getKeyByValue = (obj, value) => {
	return Object.keys(obj).filter(key => obj[key] === value);
}

const sortPages = (pages) => {
	const valuesArr = Object.values(pages);
	const sortedArr = mergeSort(valuesArr);
	const sortedPages = {}
	sortedArr.forEach(value => {
		const keys = getKeyByValue(pages, value);
		keys.forEach(key => sortedPages[key] = value)
	})

	return sortedPages;
}

// Cleaner way
// sortPages sorts a dictionary of pages
// into a list of tuples (url, count)
// with the highest counts first in the list
// function sortPages(pages) {
// 	// 2D array where the
// 	// inner array: [ url, count ]
// 	const pagesArr = Object.entries(pages)
// 	pagesArr.sort((pageA, pageB) => {
// 		return pageB[1] - pageA[1]
// 	})
// 	return pagesArr
// }

module.exports = {
	printReport,
	sortPages
}