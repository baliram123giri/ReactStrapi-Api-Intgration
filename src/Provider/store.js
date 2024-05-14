import { combineReducers, createStore } from "redux";
import { globalReducer } from "./reducers/GlobalReucer/globalReducer";
import { homepageReducer } from "./reducers/HomePage/homepageReducer";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
    key: "root",
    storage
}

const reducer = combineReducers({
    globalReducer,
    homepageReducer
})

const appPersistReducer = persistReducer(persistConfig, reducer)

export const store = createStore(appPersistReducer)
export let persistor = persistStore(store)