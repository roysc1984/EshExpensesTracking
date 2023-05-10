import { configureStore, combineReducers } from '@reduxjs/toolkit';
import expensesReducer from './slices/expenses/reducer';
import userReducer from './slices/user/reducer';

const rootReducer = combineReducers({
    userName: userReducer,
    expenses: expensesReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
