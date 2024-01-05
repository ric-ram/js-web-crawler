const { argv } = require('node:process');
const { crawlPage } = require('./crawl.js');
const { printReport } = require('./report.js');

async function main() {
	if (argv.length < 3) {
		console.log("Insufficient arguments. Please supply the desired base url.");
		return;
	}

	if (argv.length > 3) {
		console.log("Too many arguments. Please supply only one base url.");
		return;
	}

	const baseURL = argv[2];
	console.log(`The crawler will now start at the base url: ${baseURL}`);
	const pages = await crawlPage(baseURL, baseURL, {});
	printReport(pages);
}

main();