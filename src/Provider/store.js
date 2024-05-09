import { combineReducers, createStore } from "redux";
import { globalReducer } from "./reducers/GlobalReucer/globalReducer";
import { homepageReducer } from "./reducers/HomePage/homepageReducer";

const reducer = combineReducers({
    globalReducer,
    homepageReducer
})

export const store = createStore(reducer)
