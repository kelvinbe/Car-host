import { IToast } from './../../types';
import { createSlice } from '@reduxjs/toolkit';

interface IState {
    messages: IToast[]
}

const initialState: IState = {
    messages: []
}

const notificationSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages.push({...action.payload, id: Date.now()});
        },
        removeMessage: (state, action) => {
            state.messages = state.messages.filter(message => message.id !== action.payload);
        },
        clearMessages: (state) => {
            state.messages = [];
        }   
    }
})

//actions
export const { addMessage, removeMessage, clearMessages } = notificationSlice.actions;

//reducer
export default notificationSlice.reducer;

//selectors
export const selectMessages = (state: any) => state.notifications.messages;

export const selectCurrentMessage = (state: any) => state.notifications.messages[0];
