const filterEmptyProperties = (obj) =>
  Object.entries(obj).reduce((filteredObj, [key, value]) => {
    if (value !== '' && value !== undefined) {
      filteredObj[key] = value
    }
    return filteredObj
  }, {})

const filterEmptyGroups = (groupedData) => {
  const filteredGroups = {}
  for (const groupKey in groupedData) {
    const filteredProperties = filterEmptyProperties(groupedData[groupKey])
    if (Object.keys(filteredProperties).length > 0) {
      filteredGroups[groupKey] = filteredProperties
    }
  }

  return filteredGroups
}
module.exports = { filterEmptyProperties, filterEmptyGroups }
