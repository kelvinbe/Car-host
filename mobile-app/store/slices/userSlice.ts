import { dIUserProfile } from './../../types';
import { RootState } from './index';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from '../../firebase/firebaseApp';

interface IProfileState {
    data: dIUserProfile,
    providers?: string[],
    passwordChanged?: boolean
}

const initialState: IProfileState = {
    data: {
        fname: "",
        lname: "",
        email: "",
        handle: "",
        phone: "",
        profile_pic_url: "",
        user_type: "customer",
        status: "Active",
        customer_id: ""
    },
    providers: [],
    passwordChanged: false
}

export const fetchUserData = createAsyncThunk("user/fetchdata", async (userId: string)=>{
    /**
     * @todo fetch user data from server
     */
    const providers = auth?.currentUser?.providerData.map((provider)=>provider.providerId);
    return {
        providers,
        data: {
            fname: "John",
            lname: "Doe",
            email: "john@email.com",
            handle: "john_doe",
            phone: "1234567890",
            profile_pic_url: "https://picsum.photos/200",
            market: null,
            user_type: "customer",
            status: "Active",
            //This is a test stripe customer id, this test user exists on stripe
            customer_id: "cus_Mza47QlfK5fAG1"
        } as dIUserProfile
    }
})

export const updateUserData = createAsyncThunk("user/updatedata", (data: {uid?: string, data: {[key: string]: any}} | null, thunkApi)=>{
    /**
     * @todo update user data on server and on firebase
     */
    return {
        fname: "John",
        lname: "Doe",
        email: "",
        handle: "john_doe",
        phone: "1234567890",
        profile_pic_url: "https://picsum.photos/200",
        market: null,
        user_type: "customer",
        status: "Active"
    } as dIUserProfile
})


const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        clearUserState: (state) => {
            state.data.fname = "";	
            state.data.lname = "";
            state.data.email = "";
            state.data.handle = "";
            state.data.phone = "";
            state.data.profile_pic_url = "";
            state.data.market = null;
            state.data.user_type = "customer";
            state.data.status = "NonActive";
        },
        setPasswordChanged: (state) =>{
            state.passwordChanged = true
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(fetchUserData.fulfilled, (state, action)=>{
            state.data = action.payload.data;
            state.providers = action.payload.providers;
        })
        builder.addCase(updateUserData.fulfilled, (state, action)=>{
            state.data = action.payload;
        })
    }
})

export default userSlice.reducer;


// actions
export const { clearUserState, setPasswordChanged } = userSlice.actions;

// selectors
export const selectUser = (state: RootState) => state.user.data;
export const selectAuthProviders = (state: RootState) => state.user.providers
export const selectPasswordChanged = (state: RootState) => state.user.passwordChanged
export const selectStripeCustomerId = (state: RootState) => state.user.data.customer_id