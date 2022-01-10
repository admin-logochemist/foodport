import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,

    },
    reducers: {
        login: (state, action) => {
            console.log('áction', action)
            state.user = action.payload;
        },
        logout: (state) => {
            localStorage.removeItem('USER');
            localStorage.removeItem('EMAIL');
            localStorage.removeItem('NAME');
            state.user = null;
        },
    }
});
export const { login, logout } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;