import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserService from '~/services/UserSerivce';
import { ResponseType } from '~/utils/Types';
import { RootState } from '../../app/store';

export interface UserState {
    value: Array<any>;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
    value: [],
    status: 'idle',
};

export const getOneInfoUser = createAsyncThunk('user/getUser', async (id: number) => {
    const response: ResponseType = await UserService.GetUser(id);
    if (response.statusCode === 200) {
        return response.data;
    }
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action: any) => {
            state.value = action.payload;
        },

        resetUser: (state, action: any) => {
            state.value = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOneInfoUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getOneInfoUser.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload;
            })
            .addCase(getOneInfoUser.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { addUser, resetUser } = userSlice.actions;

export const getUser = (state: RootState) => state.user.value;

// export const incrementIfOdd =
//     (amount: number): AppThunk =>
//     (dispatch, getState) => {
//         const currentValue = getProducts(getState());
//         if (currentValue % 2 === 1) {
//             dispatch(incrementByAmount(amount));
//         }
//     };

export default userSlice.reducer;
