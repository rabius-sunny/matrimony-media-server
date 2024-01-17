const selectionString = {
  primary: 'name type published condition education',
  personal:
    'type published beard dress_over_ankle dress salat salat_duration maintain_mahram can_tilawat madhab mazhab political_view drama_cinnema disease deeni_effort murid_of_peer majar_view favorite_books favorite_scholars special_qualifications about_me',
  marriage:
    'type published condition whenDiedWife whenDiedHusband divorceInfo reMarryReason marry_reason guardians_permission family_planning education_after_marriage job_after_marriage demand',
  general:
    'type published permanent_jilla permanent_division current_jilla current_division birth age complexion height weight blood profession income',
  family:
    'type published father_name mother_name father_profession mother_profession brothers_info sisters_info uncles_profession family_status',
  address: 'type published permanent_address current_address where_lived',
  education:
    'type published education hafej dawra dawra_details takhassus secondary secondary_details higher higher_details honors_details highest_education another_education',
  others: 'type published profession_info special_acknowledgement',
  expectation:
    'type published ex_year ex_complexion ex_height ex_education ex_jilla ex_marrital_condition ex_profession ex_financial_condition ex_family_condition ex_features',
  contact: 'type published guardian_number number_relation receiving_email',
  card: 'type published condition permanent_jilla permanent_division current_jilla current_division birth complexion height weight blood profession'
}

const getSelection = (key) => selectionString[key]

module.exports = { selectionString, getSelection }
