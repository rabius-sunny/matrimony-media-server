const selectionString = {
  primary: 'name type condition education',
  personal:
    'type beard dress_over_ankle dress salat salat_duration maintain_mahram can_tilawat madhab mazhab political_view drama_cinnema disease deeni_effort murid_of_peer majar_view favorite_books favorite_scholars special_qualifications about_me',
  marriage:
    'type condition whenDiedWife whenDiedHusband divorceInfo reMarryReason marry_reason guardians_permission family_planning managing_hijab education_after_marriage  job_after_marriage',
  general:
    'permanent_jilla permanent_division current_jilla current_division birth age complexion height weight blood profession income',
  family:
    'father_name mother_name father_profession mother_profession brothers_info sisters_info uncles_profession family_status',
  address: 'permanent_address current_address where_lived',
  education: 'education',
  others: 'profession_info special_acknowledgement',
  expectation:
    'ex_year ex_complexion ex_height ex_education ex_jilla ex_marrital_condition ex_profession ex_financial_condition ex_family_condition ex_features',
  contact: 'guardian_number number_relation receiving_email'
}

const getSelection = (key) => selectionString[key]

module.exports = getSelection
