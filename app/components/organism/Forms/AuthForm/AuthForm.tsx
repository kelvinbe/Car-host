import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Flex, Icon, IconButton, Text, useToast } from '@chakra-ui/react';
import { createSlice } from '@reduxjs/toolkit';
import React, { useReducer } from 'react'
import { FlexColCenterStart, FlexRowCenterCenter } from '../../../../utils/theme/FlexConfigs';
import DividerWithText from '../../../atoms/Display/DividerWithText/DividerWithText';
import ValidityCheck from '../../../atoms/Feedback/ValidityCheck/ValidityCheck';
import Rounded from '../../../molecules/Buttons/General/Rounded';
import WithHelperText from '../../../molecules/Input/WithHelperText/WithHelperText';
import CreatePassword from '../CreatePassword/CreatePassword';
import { FcGoogle  } from 'react-icons/fc';	
import { BsApple } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import ForgotPassword from './ForgotPassword';
import useAppAuth from '../../../../hooks/useAppAuth';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../../../redux/store';
import { fetchUser } from '../../../../redux/userSlice';

interface IProps {
  type: "signin" | "signup" | "forgot",
  onSubmit: (email: string, password: string) => void,
  loading?: boolean,
  changeAuthState?: (type: "signin" | "signup" | "forgot") => void,
}

interface IReducerState {
  email: string,
  isEmailValid: boolean,
  password: string,
  name: string,
  isPasswordValid: boolean,
  isPasswordVisible: boolean,
  confirmPassword: string
  isConfirmPasswordValid: boolean
  
}

const initialState: IReducerState = {
  email: "",
  isEmailValid: false,
  password: "",
  confirmPassword: "",
  isPasswordValid: false,
  isPasswordVisible: false,
  name: "",
  isConfirmPasswordValid: false

}

const reducerSlice = createSlice({
  name: "authForm",
  initialState,
  reducers: {
    setPassword: (state, action) => {
      state.password = action.payload
      state.isPasswordValid = action.payload.length >= 8
    },
    setConfirmPassword: (state, action) => {
      state.isConfirmPasswordValid = action.payload
    },
    setEmail: (state, action) => {
      state.email = action.payload
      state.isEmailValid = action.payload.includes("@") && action.payload.includes(".")
    },
    setName: (state, action) => {
      state.name = action.payload
    },
    togglePasswordVisiblity: (state) => {
      state.isPasswordVisible = !state.isPasswordVisible
    }
  }
})

const { setPassword, setEmail, togglePasswordVisiblity, setName, setConfirmPassword } = reducerSlice.actions

function AuthForm(props: IProps) {
  const {
    appleSignIn,
    googleSignIn,
    facebookSignIn  } = useAppAuth()
  const [{
    email,
    isEmailValid,
    password,
    isPasswordValid,
    isPasswordVisible,
    isConfirmPasswordValid,
    
  }, dispatchAction] = useReducer(reducerSlice.reducer, initialState)
  const dispatch = useAppDispatch()
  const { type, onSubmit, loading, changeAuthState } = props; 

  const {push} = useRouter()

  const toast = useToast({
    position: "top"
  })


  const setEmailHandler = (text: string) => {
    dispatchAction(setEmail(text))
  }

  const setPasswordHandler = (text: string) => {
    dispatchAction(setPassword(text))
  }

  const setConfirmPasswordHandler = (text: boolean) => {
    dispatchAction(setConfirmPassword(text))
  }

  const setNameHandler = (text: string) => {
    dispatchAction(setName(text))
  }

  const togglePasswordVisibilityHandler = () => {
    dispatchAction(togglePasswordVisiblity())
  }

  const onSubmitHandler = () =>{
    onSubmit(email, password)
  }

  const googleSignInHandler = () => {
    googleSignIn().then(()=>{
      dispatch(fetchUser()).then(()=>{
        push("/dashboard")
      })
    }).catch((e)=>{
      toast({
        title: "Error",
        description: e.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    })
  }

  const facebookSignInHandler = () => {
    facebookSignIn().then(()=>{
      dispatch(fetchUser()).then(()=>{
        push("/dashboard")
      })
    }).catch((e)=>{
      toast({
        title: "Error",
        description: e.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    })
  }

  const appleSignInHandler = () => {
    appleSignIn().then(()=>{
      dispatch(fetchUser()).then(()=>{
        push("/dashboard")
      })
    }).catch((e)=>{
      toast({
        title: "Error",
        description: e.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    })
  }

  return (
    type === "forgot" ? <ForgotPassword/> :
    (<Flex {...FlexColCenterStart} w="full" >
      <Flex 
        {...FlexRowCenterCenter}
        w="full"
        mb="50px"
      >
        <Text
          fontSize="36px"
          fontWeight="600"
        >
          {
            type === "signin" ? "Log in to Your Account" : type === "signup" ? "Register" : "Forgot Password"
          }
        </Text>
      </Flex>
      {
        type === "signup" && <WithHelperText
        type="text"
        formLabel='Name'
        placeholder="Enter your fullname"
        onChangeText={setNameHandler}
        />
      }
      <WithHelperText
        type="email"
        formLabel='Email Address'
        placeholder="Enter your email"
        onChangeText={setEmailHandler}
        value={email}
        helperTextBottom={
          email.length > 0 ? (
            <ValidityCheck
              isValid={isEmailValid}
              isValidText="Email is valid"
              checkText="Email is invalid"
            />
          ) : null
        }
      />
      {
        type === "signup" ? (
          <CreatePassword
            onValidPasswordCreated={setPasswordHandler}
            onValidConfirmPassword={setConfirmPasswordHandler}
            hasForgotPassword={false}
          />
        ) : type === "signin" ? (
          <WithHelperText
            type={
              isPasswordVisible ? "text" : "password"
            }
            value={password}
            formLabel='Password'
            placeholder="Enter your password"
            onChangeText={setPasswordHandler}
            onClickHelperText={() => {
              changeAuthState && changeAuthState("forgot")
            }}
            helperTextTop={
              "Forgot Password?"
            }
            rightIcon={
              isPasswordVisible ? <ViewIcon
                  onClick={togglePasswordVisibilityHandler}
               /> : <ViewOffIcon 
                  onClick={togglePasswordVisibilityHandler}
               />
            }
          />
        ) : null
      }
      <Flex {...FlexRowCenterCenter} mt="20px" mb="20px" w="full"  >
          
          <Rounded
          loading={loading}
          rounded='full'
          disabled={type === 'signup' ? !(isEmailValid && isPasswordValid && isConfirmPasswordValid): !(isEmailValid && isPasswordValid)}
          fullWidth variant="solid" onClick={onSubmitHandler}>
            {
              type === "signup" ? "Sign Up" : "Log In"
            }
          </Rounded>
      </Flex>
      {<DividerWithText>
        Or
      </DividerWithText>}
      { <Flex {...FlexRowCenterCenter} mt="20px" className="space-x-4" >
        <IconButton
          icon={<Icon as={FcGoogle} />}
          aria-label="Google"
          rounded="full"
          bg="transparent"
          onClick={googleSignInHandler}
        />
        <IconButton
          aria-label='Apple'
          icon={<Icon as={BsApple} />}
          rounded="full"
          bg="transparent"
          onClick={appleSignInHandler}
        />
        <IconButton
          aria-label='Facebook'
          icon={<Icon as={FaFacebook} color="link" />}
          rounded="full"
          bg="transparent"
          onClick={facebookSignInHandler}
        />
      </Flex>}
    </Flex>)
  )
}

export default AuthForm