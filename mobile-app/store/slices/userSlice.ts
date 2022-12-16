import { RootState } from './index';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from '../../firebase/firebaseApp';

interface IProfileState {
    data: {
        fname: string;
        lname: string;
        email: string;
        handle: string;
        phone: string;
        profilePicUrl: string;
        marketId: number | null;
        userType: string;
        status: string;
    },
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
        profilePicUrl: "",
        marketId: null,
        userType: "",
        status: "",
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
            profilePicUrl: "https://picsum.photos/200",
            marketId: 1,
            userType: "normal",
            status: "active"
        }
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
        profilePicUrl: "https://picsum.photos/200",
        marketId: 1,
        userType: "normal",
        status: "active"
    }
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
            state.data.profilePicUrl = "";
            state.data.marketId = null;
            state.data.userType = "";
            state.data.status = "";
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