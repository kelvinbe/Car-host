/* eslint-disable react-hooks/exhaustive-deps */
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/react'
import { createSlice } from '@reduxjs/toolkit'
import React, { useEffect, useReducer } from 'react'
import { FlexColCenterStart, FlexColStartStart } from '../../../../utils/theme/FlexConfigs'
import { hasLowercase, hasNumber, hasSpecialCharacter } from '../../../../utils/utils'
import ValidityCheck from '../../../atoms/Feedback/ValidityCheck/ValidityCheck'
import WithHelperText from '../../../molecules/Input/WithHelperText/WithHelperText'

interface IProps {
    onValidPasswordCreated: (password: string) => void,
    onForgotPasswordHandler?: () => void,
    hasForgotPassword?: boolean
}

interface IReducer {
    password: string,
    confirmPassword: string,
    isPasswordValid: boolean,
    isConfirmPasswordValid: boolean,
    isPasswordMatch: boolean,
    isPasswordVisible: boolean,
    isConfirmPasswordVisible: boolean,
}

const initialState: IReducer = {
    password: "",
    confirmPassword: "",
    isPasswordValid: false,
    isConfirmPasswordValid: false,
    isPasswordMatch: false,
    isPasswordVisible: false,
    isConfirmPasswordVisible: false,
}

const reducerSlice = createSlice({
    name: "createPassword",	
    initialState,
    reducers: {
        setPassword: (state, action) => {
            state.password = action.payload
            state.isPasswordValid = hasNumber(action.payload) && hasLowercase(action.payload) && hasLowercase(action.payload)  && action.payload.length >= 8 && hasSpecialCharacter(action.payload)
        },
        setConfirmPassword: (state, action) => {
            state.confirmPassword = action.payload
            state.isConfirmPasswordValid = hasNumber(action.payload) && hasLowercase(action.payload) && hasLowercase(action.payload)  && action.payload.length >= 8 && hasSpecialCharacter(action.payload)
            state.isPasswordMatch = action.payload === state.password
        },
        togglePasswordVisibility: (state) => {
            state.isPasswordVisible = !state.isPasswordVisible
        },
        toggleConfirmPasswordVisibility: (state) => {
            state.isConfirmPasswordVisible = !state.isConfirmPasswordVisible
        }
    }
})

const { setPassword, setConfirmPassword, toggleConfirmPasswordVisibility, togglePasswordVisibility } = reducerSlice.actions

function CreatePassword(props: IProps) {
    const { 
        onValidPasswordCreated,
        hasForgotPassword,
        onForgotPasswordHandler
     } = props
    const [{
        password,
        confirmPassword,
        isPasswordMatch,
        isPasswordValid,
        isConfirmPasswordValid,
        isPasswordVisible,
        isConfirmPasswordVisible
    }, dispatchAction] = useReducer(reducerSlice.reducer, initialState)

    useEffect(()=>{
        if(isPasswordMatch && isPasswordValid && isConfirmPasswordValid){
            onValidPasswordCreated(password)
        }
    }, [password, confirmPassword])


    const togglePasswordVisibilityHandler = () => {
        dispatchAction(togglePasswordVisibility())
    }

    const toggleConfirmPasswordVisibilityHandler = () => {
        dispatchAction(toggleConfirmPasswordVisibility())
    }

    const setPasswordHandler = (text: string) => {
        dispatchAction(setPassword(text))
    }

    const setConfirmPasswordHandler = (text: string) => {
        dispatchAction(setConfirmPassword(text))
    }

  return (
    <Flex w="full" {...FlexColCenterStart} >
        <WithHelperText
            value={password}
            customStyle={{
                w: "full",
                mb: "20px"
            }}
            placeholder="Password"
            type={
                isPasswordVisible ? "text" : "password"
            }
            formLabel="Password"
            helperTextTop={ hasForgotPassword ? "Forgot Password" : undefined}
            onChangeText={setPasswordHandler}
            onClickHelperText={onForgotPasswordHandler}
            rightIcon={
                isPasswordVisible ? <ViewIcon onClick={togglePasswordVisibilityHandler} /> : <ViewOffIcon onClick={togglePasswordVisibilityHandler} />
            }
            helperTextBottom={
                password?.length < 1 ? null :(!isPasswordValid ? <Flex {...FlexColStartStart} className="space-y-5" >
                    <ValidityCheck isValid={hasNumber(password)} checkText="Password should have at least one number" />
                    <ValidityCheck isValid={hasLowercase(password)} checkText="Password should have at least one lowercase letter" />
                    <ValidityCheck isValid={hasSpecialCharacter(password)} checkText="Password should have at least one special character" />
                    <ValidityCheck isValid={password.length >= 8} checkText="Password should have at least 8 characters" />
                </Flex> : <Flex>
                    <ValidityCheck isValid={isPasswordValid} isValidText="Password is valid" checkText='Password is Invalid' />
                </Flex>)
            }
        />
        <WithHelperText
        value={confirmPassword}
            placeholder="Confirm Password"
            type={
                isConfirmPasswordVisible ? "text" : "password"
            }
            formLabel="Confirm Password"
            onChangeText={setConfirmPasswordHandler}
            rightIcon={
                isConfirmPasswordVisible ? <ViewIcon onClick={toggleConfirmPasswordVisibilityHandler} /> : <ViewOffIcon onClick={toggleConfirmPasswordVisibilityHandler} />
            }
            helperTextBottom={
                (
                    password.length > 8 && isPasswordValid
                ) ? 
                    <ValidityCheck isValid={isPasswordMatch} isValidText="Passwords Match." checkText="Password does not match" />
                :null
            }
        />
    </Flex>
    )
}

export default CreatePassword