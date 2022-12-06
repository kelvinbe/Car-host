import { createSlice } from "@reduxjs/toolkit";

const initialState: {
    fname: string;
    lname: string;
    email: string;
    handle: string;
    phone: string;
    profilePicUrl: string;
    marketId: number | null;
    userType: string;
    status: string;
} = {
    fname: "",
    lname: "",
    email: "",
    handle: "",
    phone: "",
    profilePicUrl: "",
    marketId: null,
    userType: "",
    status: ""
}

const userSlice = createSlice({
    name: "userSlice",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state = action.payload
        }
    }
})

export default userSlice.reducer;

// actions
export const { setUser } = userSlice.actions;

// selectors
export const selectUser = (state: any) => state;