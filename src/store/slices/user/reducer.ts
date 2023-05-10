import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setUserAction } from './payloads';

type SliceState = {
    name: string;
};

const initialState: SliceState = {
    name: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUserName(state, action: PayloadAction<setUserAction>) {
            state.name = action.payload.name;
        },
        removeUserName(state) {
            state.name = '';
        },
    },
});

export default userSlice.reducer;
export const { setUserName, removeUserName } = userSlice.actions;
