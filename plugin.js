var ArticleType;
(function (ArticleType) {
    ArticleType["article"] = "article";
    ArticleType["category"] = "category";
})(ArticleType || (ArticleType = {}));

var FileStatus;
(function (FileStatus) {
    FileStatus["modified"] = "modified";
    FileStatus["delete"] = "delete";
    FileStatus["new"] = "new";
    FileStatus["rename"] = "rename";
    FileStatus["conflict"] = "conflict";
    FileStatus["current"] = "current";
})(FileStatus || (FileStatus = {}));

class Plugin {
    constructor(_app) {
        this._app = _app;
        this._commandConfigs = [];
    }
    get commandConfigs() {
        return this._commandConfigs;
    }
    _addCommand(command) {
        this._commandConfigs.push(command);
    }
}

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var src = {
	compareTwoStrings:compareTwoStrings,
	findBestMatch:findBestMatch
};

function compareTwoStrings(first, second) {
	first = first.replace(/\s+/g, '');
	second = second.replace(/\s+/g, '');

	if (first === second) return 1; // identical or empty
	if (first.length < 2 || second.length < 2) return 0; // if either is a 0-letter or 1-letter string

	let firstBigrams = new Map();
	for (let i = 0; i < first.length - 1; i++) {
		const bigram = first.substring(i, i + 2);
		const count = firstBigrams.has(bigram)
			? firstBigrams.get(bigram) + 1
			: 1;

		firstBigrams.set(bigram, count);
	}
	let intersectionSize = 0;
	for (let i = 0; i < second.length - 1; i++) {
		const bigram = second.substring(i, i + 2);
		const count = firstBigrams.has(bigram)
			? firstBigrams.get(bigram)
			: 0;

		if (count > 0) {
			firstBigrams.set(bigram, count - 1);
			intersectionSize++;
		}
	}

	return (2.0 * intersectionSize) / (first.length + second.length - 2);
}

function findBestMatch(mainString, targetStrings) {
	if (!areArgsValid(mainString, targetStrings)) throw new Error('Bad arguments: First argument should be a string, second should be an array of strings');
	
	const ratings = [];
	let bestMatchIndex = 0;

	for (let i = 0; i < targetStrings.length; i++) {
		const currentTargetString = targetStrings[i];
		const currentRating = compareTwoStrings(mainString, currentTargetString);
		ratings.push({target: currentTargetString, rating: currentRating});
		if (currentRating > ratings[bestMatchIndex].rating) {
			bestMatchIndex = i;
		}
	}
	
	
	const bestMatch = ratings[bestMatchIndex];
	
	return { ratings: ratings, bestMatch: bestMatch, bestMatchIndex: bestMatchIndex };
}

function areArgsValid(mainString, targetStrings) {
	if (typeof mainString !== 'string') return false;
	if (!Array.isArray(targetStrings)) return false;
	if (!targetStrings.length) return false;
	if (targetStrings.find( function (s) { return typeof s !== 'string'})) return false;
	return true;
}

var stringSimilarity = /*@__PURE__*/getDefaultExportFromCjs(src);

class HelloWorldPlugin extends Plugin {
    get name() {
        return "helloWorld4";
    }
    onLoad() {
        this._addCommand({
            name: "index",
            do() {
                const similarity = stringSimilarity.compareTwoStrings("abc", "abd");
                console.log(similarity);
                console.log("Hello World4!");
            },
        });
    }
}

export { HelloWorldPlugin as default };

