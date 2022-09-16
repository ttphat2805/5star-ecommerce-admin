import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import sidebarReducer from '~/features/SidebarActive/MenuSlice';
export const store = configureStore({
    reducer: {
        activeMenu: sidebarReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
