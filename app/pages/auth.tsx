import { useRouter } from 'next/router';
import { Flex, useToast } from '@chakra-ui/react';
import { FlexColCenterBetween, FlexColCenterStart, FlexRowCenterBetween, FlexRowCenterCenter } from '../utils/theme/FlexConfigs';
import Logo from '../components/atoms/Brand/Logo';
import AuthForm from '../components/organism/Forms/AuthForm/AuthForm';
import HelperLinkText from '../components/atoms/HelperLinkText/HelperLinkText';
import React, {  useState } from 'react';
import useAppAuth from '../hooks/useAppAuth';
import LogRocket from 'logrocket'

export default function Home() {
  const [authState, setAuthState] = useState<"signup"|"signin"|"forgot">("signin")
  const { push } = useRouter();

  const toast = useToast({
    position: "top",
  })
                                                                                                                                     
  const {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    createUserWithEmailAndPasswordLoading,
    signInLoading
  } = useAppAuth() 



  const onSubmitHandler = (email: string, password: string) => {
    if(authState === "signin"){
      signInWithEmailAndPassword({email, password})
    }else if(authState === "signup"){
      createUserWithEmailAndPassword(email, password).then(()=>{
        push("/onboarding")
      }).catch((e)=>{
        LogRocket.error(e)
        toast({
          title: "Error",
          description: "An Error Occured",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top"
        })
      })
    }
  }

  return (
    <Flex 
      w="100vw" 
      h="100vh"
      {...FlexRowCenterBetween} 
    >
      <Flex w="50%" h="full" {...FlexColCenterBetween} padding="40px 20px" >
        <Flex {...FlexRowCenterCenter} w="full" >
          <Logo/>
        </Flex>
        <Flex w="80%" {...FlexColCenterStart} >
          <AuthForm
            type={authState}
            onSubmit={onSubmitHandler}
            changeAuthState={setAuthState}
            loading={
              authState === "signin" ? signInLoading : authState === "signup" ? createUserWithEmailAndPasswordLoading : false
            }
          />
        </Flex>
        <Flex 
          w="full"
          {...FlexRowCenterCenter}
        >
          <HelperLinkText
            onClick={()=>{
              if(authState === "signin"){
                setAuthState("signup")
              }else if(authState === "forgot"){
                setAuthState("signin")
              }else{
                setAuthState("signin")
              }
            }}
            linkText={
              authState === "signin" ? "Sign Up" : authState === "forgot" ? "Back to Login" : "Sign In" 
            }
          >
            {
              authState === "signin" ? "Don't have an account?" : authState === "forgot" ? "Not you?" : "Already have an account?"
            }
          </HelperLinkText>
        </Flex>
      </Flex>

      <Flex 
        w="50%"
        h="full"	 
        {...FlexColCenterStart}
        bgImage="/images/AuthForm.png"
        bgSize="cover"
        bgRepeat="no-repeat"
      ></Flex>
    </Flex>
  )
}
