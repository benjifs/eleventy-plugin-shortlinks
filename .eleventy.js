const newbase60 = require('newbase60')

/**
 * Check if two valid JS dates are in the same day
 * @param {Date} d1 first date
 * @param {Date} d2 second date
 * @return {boolean} true if same date, false otherwise
 */
const areSameDay = (d1, d2) => {
	return d1 && d2 &&
		d1 instanceof Date && d2 instanceof Date &&
		d1.getUTCFullYear() === d2.getUTCFullYear() &&
		d1.getUTCMonth() === d2.getUTCMonth() &&
		d1.getUTCDate() === d2.getUTCDate()
}

module.exports = (eleventyConfig, options = {}) => {
	let shortlinks

	options = Object.assign({
		startIndex: 0,
		prefix: ''
	}, options)

	eleventyConfig.addCollection('shortlinks', collections => {
		shortlinks = {}
		let prev, index
		collections.getAllSorted().forEach(item => {
			index = areSameDay(prev, item.date) ? index + 1 : options.startIndex
			prev = item.date
			shortlinks[item.url] = `${options.prefix}${newbase60.DateToSxg(item.date)}${index}`
		})
		return shortlinks
	})

	/**
	 * Helper filter to do a lookup in the `shortlinks` collection
	 * @param {string} url URL string to look for
	 * @return {string} corresponding shortlink
	 */
	eleventyConfig.addFilter('shortlink', url => shortlinks[url])

	/**
	 * Shortcode that returns HTML with the `url` it redirects to
	 * @param {string} url URL to redirect to
	 * @return {string} HTML that handles the redirect
	 */
	eleventyConfig
		.addShortcode('page_redirect', url => `<!DOCTYPE html><meta http-equiv=refresh content="0; url=${url}">`)
}
