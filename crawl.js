const { JSDOM } = require('jsdom')

const normalizeURL = (url) => {
	const urlObj = new URL(url)
	let fullPath = `${urlObj.host}${urlObj.pathname}`

	if (fullPath.length > 0 && fullPath.slice(-1) === '/') {
		fullPath = fullPath.slice(0, -1)
	}

	return fullPath
}

const getURLsFromHTML = (htmlBody, baseURL) => {
	const dom = new JSDOM(htmlBody);
	const urls = [];
	dom.window.document.querySelectorAll('a').forEach(element => {
		if (element.href.slice(0, 1) === '/') {
			try {
				urls.push(new URL(element.href, baseURL).href);
			} catch (err) {
				console.log(`${err.message}: ${element.href}`);
			}
		} else {
			try {
				urls.push(new URL(element.href).href);
			} catch (err) {
				console.log(`${err.message}: ${element.href}`);
			}
		}
	});
	return urls;
}

const crawlPage = async (baseURL, currentURL, pages) => {
	const baseURLObj = new URL(baseURL);
	const currentURLObj = new URL(currentURL);

	if (baseURLObj.hostname !== currentURLObj.hostname) {
		return pages;
	}

	const normalizeCurrentURL = normalizeURL(currentURL);

	if (pages[normalizeCurrentURL] > 0) {
		pages[normalizeCurrentURL]++;
		return pages;
	}

	pages[normalizeCurrentURL] = 1

	console.log(`Crawling ${currentURL}`);
	let htmlBody = '';
	try {
		const response = await fetch(currentURL);
		const status = response.status;

		if (status >= 400) {
			console.log(`HTTP Error while trying to access ${currentURL}. Status code: ${status}`);
			return pages;
		}

		const contentType = response.headers.get('content-type');

		if (!contentType.includes('text/html')) {
			console.log("Response Error. Non html response.");
			return pages;
		}

		htmlBody = await response.text();
	} catch (error) {
		console.log('Error fetching data:', error);
	}

	const linkedURLs = getURLsFromHTML(htmlBody, baseURL);
	for (const linkedURL of linkedURLs) {
		pages = await crawlPage(baseURL, linkedURL, pages);
	}
	return pages;
}

module.exports = {
	normalizeURL,
	getURLsFromHTML,
	crawlPage,
}