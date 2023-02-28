import { createSlice } from "@reduxjs/toolkit";

interface IProps {
    driversLicenseUrl:string;
}

const initialState: IProps = {
    driversLicenseUrl:'',
};
const driversLicenseSlice = createSlice({
    name: 'driversLicenseSlice',
    initialState,
    reducers: {
    setDriversLicenseUrl: (state, action) => {
        state.driversLicenseUrl = action.payload.driversLicenseUrl;
    },
},
});

//actions
export const { setDriversLicenseUrl } = driversLicenseSlice.actions;

//reducer
export default driversLicenseSlice.reducer;