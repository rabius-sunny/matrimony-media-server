const filterEmptyProperties = (obj) => {
  const filteredObj = {}
  for (const key in obj) {
    if (obj[key] !== '') {
      filteredObj[key] = obj[key]
    }
  }

  return filteredObj
}

module.exports = filterEmptyProperties
