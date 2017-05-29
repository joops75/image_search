var filtered = function(entry) {
    this.snippet = entry.name
    this.thumbnail_url = entry.thumbnailUrl
    this.page_url = entry.hostPageUrl
}

module.exports = filtered