import { REFETCH_TODO_DATA, UPDATED_TODO_DATA, UPDATE_TODO_FORM_DATA } from "./Actions"

export const initialState = {
    todoData: [],
    refecthTodoDataApi: null,
    initialTodoFormData: null
}

export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATED_TODO_DATA:
            return { ...state, todoData: action.payload }
        case REFETCH_TODO_DATA:
            return { ...state, refecthTodoDataApi: action.payload }
        case UPDATE_TODO_FORM_DATA:
            return { ...state, initialTodoFormData: action.payload }
        default:
            return state
    }
}