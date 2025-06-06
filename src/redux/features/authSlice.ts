import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    token: string | null;
    userId: string | null; // Add userId
}

const initialState: AuthState = {
    token: null,
    userId: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<{ token: string; userId: string }>) => {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
        },
        clearAuth: (state) => {
            state.token = null;
            state.userId = null;
        },
    },
});

export const { setAuthData, clearAuth } = authSlice.actions;
export default authSlice.reducer;
