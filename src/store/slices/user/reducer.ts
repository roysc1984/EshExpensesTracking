import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setUserAction } from './payloads';
import { clearAll } from 'store/actions/actions';

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
    },
    extraReducers: (builder) => builder.addCase(clearAll, () => initialState),
});

export default userSlice.reducer;
export const { setUserName } = userSlice.actions;
