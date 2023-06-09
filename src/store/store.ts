import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import expensesReducer from './slices/expenses/reducer';
import userReducer from './slices/user/reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    // blacklist: ['expenses'],
};

const rootReducer = combineReducers({
    userName: userReducer,
    expenses: expensesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }),
});

export type RootState = ReturnType<typeof rootReducer>;

export const persistor = persistStore(store);
