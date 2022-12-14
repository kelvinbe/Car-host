import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import React, { useReducer } from 'react'
import { auth } from '../firebase/firebaseApp'
import { SEND_MAIL_ENDPOINT } from './constants'

interface MailerHookReducerInterface {
    sendMessageLoading: boolean
    sendMessageError: any | null
    sendMessageSuccess: boolean
    sendTemplateMessageLoading: boolean
    sendTemplateMessageError: any | null
    sendTemplateMessageSuccess: boolean
}

const initialState: MailerHookReducerInterface = {
    sendMessageLoading: false,
    sendMessageError: null,
    sendMessageSuccess: false,
    sendTemplateMessageLoading: false,
    sendTemplateMessageError: null,
    sendTemplateMessageSuccess: false
}

const mailerHookReducer = createSlice({
    name: 'mailerHookReducer',
    initialState,
    reducers: {
        _sendMessageLoading: (state) => {
            state.sendMessageLoading = true
            state.sendMessageError = null
            state.sendMessageSuccess = false
        },
        _sendMessageSuccess: (state) => {
            state.sendMessageLoading = false
            state.sendMessageError = null
            state.sendMessageSuccess = true
        },
        _sendMessageError: (state, action) => {
            state.sendMessageLoading = false
            state.sendMessageError = action.payload
            state.sendMessageSuccess = false
        },
        _sendTemplateMessageLoading: (state) => {
            state.sendTemplateMessageLoading = true
            state.sendTemplateMessageError = null
            state.sendTemplateMessageSuccess = false
        },
        _sendTemplateMessageSuccess: (state) => {
            state.sendTemplateMessageLoading = false
            state.sendTemplateMessageError = null
            state.sendTemplateMessageSuccess = true
        },
        _sendTemplateMessageError: (state, action) => {
            state.sendTemplateMessageLoading = false
            state.sendTemplateMessageError = action.payload
            state.sendTemplateMessageSuccess = false
        },
    }
})

const { _sendMessageError, _sendMessageLoading, _sendMessageSuccess, _sendTemplateMessageError, _sendTemplateMessageLoading, _sendTemplateMessageSuccess } = mailerHookReducer.actions

const reducer = mailerHookReducer.reducer

function useMailer() {
    const [{
        sendMessageLoading,
        sendMessageError,
        sendMessageSuccess,
        sendTemplateMessageLoading,
        sendTemplateMessageError,
        sendTemplateMessageSuccess
    }, dispatch] = useReducer(reducer, initialState)
    /**
     * @name sendMessage 
     * @param {string} to
     * @param {string} subject
     * @param {string} message
     * @returns {void}
     */

    const sendMessage = (to: string, subject: string, message: string) => {
        dispatch(_sendMessageLoading())
        auth.currentUser?.getIdToken().then((token) => {
            axios.post(SEND_MAIL_ENDPOINT, {
                // for dev purposes, we are sending to a blackhole email
                to: "test@blackhole.postmarkapp.com",
                subject,
                htmlBody: message
            }, {
                headers: {
                    token: token
                }
            }).then(({data})=>{
                console.log(data)
                dispatch(_sendMessageSuccess())
            }).catch((e)=>{
                console.log(e)
                dispatch(_sendMessageError(e))
            })
        }).catch((e)=>{
            console.log(e)
            dispatch(_sendMessageError(e))
        })
    }

    /**
     * @name sendTemplateMessage
     * @param {string} to
     * @param {string} template
     * @param {object} data
     * @returns {void}
     */

    const sendTemplateMessage = (to: string, template: string, data: object) => {
        dispatch(_sendTemplateMessageLoading())
        auth.currentUser?.getIdToken().then((token) => {
            axios.post(SEND_MAIL_ENDPOINT, {
                 // for dev purposes, we are sending to a blackhole email
                to: "test@blackhole.postmarkapp.com",   
                template,
                data
            }, {
                headers: {
                    token: token
                }
            }).then(({data})=>{
                console.log(data)
                dispatch(_sendTemplateMessageSuccess())
            }).catch((e)=>{
                console.log(e)
                dispatch(_sendTemplateMessageError(e))
            })
        }).catch((e)=>{
            console.log(e)
            dispatch(_sendTemplateMessageError(e))
        })
    }

  return {
        sendMessage, 
        sendMessageLoading,
        sendMessageError,
        sendMessageSuccess,
        sendTemplateMessageLoading,
        sendTemplateMessageError,
        sendTemplateMessageSuccess,
        sendTemplateMessage
  }
}

export default useMailer