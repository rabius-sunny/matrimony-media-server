const { selectionString } = require('../static/selection')
const { filterEmptyGroups } = require('./filterEmptyObject')

const data = {}

function getGroupData(flatData) {
  Object.entries(selectionString).forEach(([groupName, fieldString]) => {
    data[groupName] = {}
    const fields = fieldString.split(' ')
    fields.forEach((field) => (data[groupName][field] = flatData[field]))
  })

  return filterEmptyGroups(data)
}

module.exports = getGroupData
