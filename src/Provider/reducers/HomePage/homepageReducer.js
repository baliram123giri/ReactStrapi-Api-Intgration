//actions 
export const UPDATE_ACTIVE_DOCTOR_CATRGORY = "UPDATE_ACTIVE_DOCTOR_CATRGORY"
export const UPDATE_DOCTORS_LIST = "UPDATE_DOCTORS_LIST"
export const UPDATE_DOCTORS_FILTERS = "UPDATE_DOCTORS_FILTERS"
export const UPDATE_CURRUNT_PAGE = "UPDATE_CURRUNT_PAGE"

const initialState = {
    activeDoctorsCategory: "",
    doctosList: [],
    currentPage: 1,
    doctorsFilter: { category: "", gender: "", language: "", sort: "" }
}

export function homepageReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_DOCTORS_LIST:
            return { ...state, doctosList: action.payload }
        case UPDATE_ACTIVE_DOCTOR_CATRGORY:
            return { ...state, activeDoctorsCategory: action.payload }
        case UPDATE_DOCTORS_FILTERS:
            return { ...state, doctorsFilter: action.payload }
        case UPDATE_CURRUNT_PAGE:
            return { ...state, currentPage: action.payload }
        default:
            return state
    }
} 