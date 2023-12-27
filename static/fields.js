const marriageFields = {
  whenDiedWife: '',
  reMarryReason: '',
  family_planning: '',
  demand: '',
  divorceInfo: '',
  whenDiedHusband: '',
  marry_reason: '',
  guardians_permission: '',
  education_after_marriage: '',
  job_after_marriage: ''
}

const generalFields = {
  secondary: '',
  secondary_details: '',
  higher: '',
  higher_details: '',
  honors_details: ''
}
const madrasaFields = {
  hafej: '',
  dawra: '',
  dawra_details: '',
  takhassus: ''
}

const formRoutes = {
  primary: { name: 'প্রাথমিক', slug: '/primary' },
  personal: { name: 'ব্যক্তিগত', slug: '/personal-info' },
  marriage: { name: 'বিয়েসংক্রান্ত', slug: '/marriage-related-info' },
  general: { name: 'সাধারণ', slug: '/general-info' },
  family: { name: 'পারিবারিক', slug: '/family-info' },
  address: { name: 'ঠিকানা', slug: '/address' },
  education: { name: 'শিক্ষাগত', slug: '/educational-qualification' },
  others: { name: 'অন্যান্য', slug: '/others-info' },
  expectation: { name: 'আকাঙ্ক্ষিত বৈশিষ্ট্যাবলী', slug: '/expectation' },
  contact: { name: 'যোগাযোগ', slug: '/contact-info' }
}

function getFilled(user) {
  return Object.keys(user.fields).filter((key) => user.fields[key])
}
function getUnfilled(user) {
  const falsyFields = Object.keys(user.fields).filter(
    (item) => !user.fields[item]
  )
  return falsyFields.map((item) => formRoutes[item])
}

module.exports = {
  marriageFields,
  generalFields,
  madrasaFields,
  formRoutes,
  getFilled,
  getUnfilled
}
