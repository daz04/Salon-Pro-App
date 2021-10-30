import {createStore} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'


const state = {authenticated: false};
const reducer = (state, action) => ({...state, ...action});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

//const persistedReducer = persistedReducer(persistConfig,reducer);
const store = createStore(persistReducer,state);
const persistor = persistStore(store);

export default () => {
    let reduxStore = store
    let persistor = persistor 
    return {reduxStore, persistor}
}
