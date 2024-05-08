import { combineReducers, createStore } from "redux";
import { globalReducer } from "./reducers/GlobalReucer/globalReducer";

const reducer = combineReducers({
    globalReducer
})

export const store = createStore(reducer)
