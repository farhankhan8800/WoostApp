import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducer/user';
import withdrawReducer from './reducer/withdraw';
import { combineReducers} from 'redux';
import { persistStore, persistReducer, FLUSH, REHYDRATE, REGISTER, PAUSE, PERSIST, PURGE } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'woost_root',
    storage: AsyncStorage,
    version: 1,
    whitelist: ['user'],
};

const rootReducer = combineReducers({
    user: userReducer,
    withdraw: withdrawReducer,
});
const persistedReducers = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducers,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, REGISTER, PAUSE, PERSIST, PURGE],
            },
        });
    },
});
export const persistedStore = persistStore(store);
