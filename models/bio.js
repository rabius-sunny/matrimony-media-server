import mongoose from 'mongoose'
const { model, Schema } = mongoose

const bioSchema = new Schema(
  {
    name: {
      type: String
    },
    type: {
      type: String
    },
    condition: {
      type: String
    },
    permanent_jilla: {
      type: String
    },
    permanent_division: {
      type: String
    },
    current_jilla: {
      type: String
    },
    current_division: {
      type: String
    },
    birth: {
      type: String
    },
    complexion: {
      type: String
    },
    height: {
      type: String
    },
    weight: {
      type: String
    },
    blood: {
      type: String
    },
    profession: {
      type: String
    },
    income: {
      type: String
    },
    permanent_address: {
      type: String
    },
    current_address: {
      type: String
    },
    where_lived: {
      type: String
    },
    education: {
      type: String
    },
    hafej: {
      type: String
    },
    dawra: {
      type: String
    },
    dawra_details: {
      type: String
    },
    dawra_year: {
      type: String
    },
    takhassus: {
      type: String
    },
    takhassus_details: {
      type: String
    },
    highest_education: {
      type: String
    },
    secondary: {
      type: String
    },
    class: {
      type: String
    },
    secondary_details: {
      type: String
    },
    heigher: {
      type: String
    },
    higher_year: {
      type: String
    },
    heigher_details: {
      type: String
    },
    diploma_details: {
      type: String
    },
    honors_details: {
      type: String
    },
    another_education: {
      type: String
    },
    father_name: {
      type: String
    },
    mother_name: {
      type: String
    },
    father_profession: {
      type: String
    },
    mother_profession: {
      type: String
    },
    brothers: {
      type: String
    },
    brothers_info: {
      type: String
    },
    sisters: {
      type: String
    },
    sisters_info: {
      type: String
    },
    uncles_profession: {
      type: String
    },
    family_status: {
      type: String
    },
    dress: {
      type: String
    },
    beard: {
      type: String
    },
    dress_over_ankle: {
      type: String
    },
    salat: {
      type: String
    },
    salat_duration: {
      type: String
    },
    maintain_mahram: {
      type: String
    },
    can_tilawat: {
      type: String
    },
    mazhab: {
      type: String
    },
    political_view: {
      type: String
    },
    drama_cinnema: {
      type: String
    },
    disease: {
      type: String
    },
    deeni_effort: {
      type: String
    },
    murid_of_peer: {
      type: String
    },
    majar_view: {
      type: String
    },
    favorite_books: {
      type: String
    },
    favorite_scholars: {
      type: String
    },
    special_qualifications: {
      type: String
    },
    about_me: {
      type: String
    },
    when_died: {
      type: String
    },
    divorce_reason: {
      type: String
    },
    marry_reason: {
      type: String
    },
    guardians_permission: {
      type: String
    },
    managing_hijab: {
      type: String
    },
    education_after_marriage: {
      type: String
    },
    job_after_marriage: {
      type: String
    },
    continue_job: {
      type: String
    },
    living_place: {
      type: String
    },
    demand: {
      type: String
    },
    profession_info: {
      type: String
    },
    special_acknowledgement: {
      type: String
    },
    ex_year: {
      type: String
    },
    ex_complexion: {
      type: String
    },
    ex_height: {
      type: String
    },
    ex_education: {
      type: String
    },
    ex_jilla: {
      type: String
    },
    ex_marrital_condition: {
      type: String
    },
    ex_profession: {
      type: String
    },
    ex_financial_condition: {
      type: String
    },
    ex_family_condition: {
      type: String
    },
    ex_features: {
      type: String
    },
    ex_family_condition: {
      type: String
    },
    family_about_bio: {
      type: String
    },
    is_correct_info: {
      type: String
    },
    liability: {
      type: String
    },
    guandian_number: {
      type: String
    },
    number_relation: {
      type: String
    },
    receiving_email: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

export default model('bio', bioSchema)
