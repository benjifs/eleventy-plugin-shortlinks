# eleventy-plugin-shortlinks

## Description

A plugin for [Eleventy](https://www.11ty.dev/) to generate shortlinks for all items in a collection. The shortlinks can then be paired with a short domain and be used to share shorter permalinks to content in your site.

The shortlinks are generated similar to [Whistle](http://tantek.pbworks.com/w/page/21743973/Whistle) which takes the `date` of the item in the collection and converts it to [NewBase60](http://tantek.pbworks.com/w/page/19402946/NewBase60). The shortlink is traditionally expected to be of the format `tSSSn` where:
* `t`: prefix
* `SSS`: item date in NewBase60
* `n`: number of post in the same `SSS`

## Installation

```bash
npm install eleventy-plugin-shortlinks
```

## Usage

```js
const shortlinks = require('eleventy-plugin-shortlinks')

module.exports = eleventyConfig => {
	eleventyConfig.addPlugin(shortlinks, {
		startIndex: 0,
		prefix: 'i'
	})
  ...
}
```

The above will generate the shortlinks for all the items in the collections. In order to use it, create another template file (e.g. `links.njk`):

```njk
---
pagination:
  data: collections.all
  size: 1
  alias: item
permalink: "{{ item.url | shortlink }}/"
eleventyExcludeFromCollections: true
---
{% page_redirect item.url %}
```

## Options

| Option | Description | Default |
| --- | --- | --- |
| `startIndex` | Index to start entries for a given day | 0 |
| `prefix` | Prefix for all shortlinks (see: [design](http://tantek.pbworks.com/w/page/21743973/Whistle#design)) | `empty string` |

## Credits

* [Whistle](http://tantek.pbworks.com/w/page/21743973/Whistle)
* [NewBase60](http://tantek.pbworks.com/w/page/19402946/NewBase60)
* [newbase60 on npm](https://www.npmjs.com/package/newbase60)
