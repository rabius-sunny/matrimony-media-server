const projections = {
  name: 0,
  bookmarks: 0,
  father_name: 0,
  mother_name: 0,
  guardian_number: 0,
  number_relation: 0,
  receiving_email: 0,
  createdAt: 0,
  updatedAt: 0,
  __v: 0,
  published: 0,
  requested: 0,
  featured: 0
}

const getProjections = (escape = null) => {
  const newProjections = { ...projections }

  if (escape) {
    escape.forEach((item) => {
      delete newProjections[item]
    })
  }
  return newProjections
}

module.exports = { projections, getProjections }
