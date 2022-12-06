import { createSlice } from "@reduxjs/toolkit";

interface Issues {
    id: string;
    message: string;
    dateTime: string;
    statue: string;
}

const initialState: {
    issues: Issues[]
} = {
    issues: []
}

const issuesSlice = createSlice({
    name: "issuesSlice",
    initialState: initialState,
    reducers: {
        setIssues: (state, action) => {
            state.issues = action.payload.issues
        }
    }
})

export default issuesSlice.reducer;

// actions
export const { setIssues } = issuesSlice.actions;

// selectors
export const selectIssues = (state: any) => state.issues;