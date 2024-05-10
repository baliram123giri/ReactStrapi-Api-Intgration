//actions 
export const UPDATE_ACTIVE_DOCTOR_CATRGORY = "UPDATE_ACTIVE_DOCTOR_CATRGORY"
export const UPDATE_DOCTORS_LIST = "UPDATE_DOCTORS_LIST"

const initialState = {
    activeDoctorsCategory: null,
    doctosList: []
}

export function homepageReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_DOCTORS_LIST:
            return { ...state, doctosList: action.payload }
        case UPDATE_ACTIVE_DOCTOR_CATRGORY:
            return { ...state, activeDoctorsCategory: action.payload }
        default:
            return state
    }
} 