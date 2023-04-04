function published(dataArray) {
  return dataArray.filter(item => item.published === true)
}

module.exports = published
