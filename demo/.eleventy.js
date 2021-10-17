
const shortlinks = require('../')

module.exports = eleventyConfig => {
	eleventyConfig.addPlugin(shortlinks, {
		startIndex: 3,
		prefix: 'i'
	})
}
