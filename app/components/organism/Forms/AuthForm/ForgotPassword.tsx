import { Flex, Text } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { FlexColCenterCenter, FlexRowCenterCenter } from '../../../../utils/theme/FlexConfigs'
import Logo from '../../../atoms/Brand/Logo'
import ValidityCheck from '../../../atoms/Feedback/ValidityCheck/ValidityCheck'
import Rounded from '../../../molecules/Buttons/General/Rounded'
import WithHelperText from '../../../molecules/Input/WithHelperText/WithHelperText'
import CreatePassword from '../CreatePassword/CreatePassword'
import {getAuth, sendPasswordResetEmail} from 'firebase/auth'
import { useToast } from '@chakra-ui/react'


function ForgotPassword() {
    const [step, setStep] = useState<number>(0)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isEmailValid, setIsEmailValid] = useState<boolean>(false)
    const auth = getAuth()
    const toast = useToast()

    useEffect(()=>{
        setIsEmailValid(email.includes("@") && email.includes("."))
    }, [email])

    const submitEmail = () =>{
        sendPasswordResetEmail(auth, email).then(() => {
            setStep(1)
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if(errorCode === 'auth/user-not-found'){
                toast({
                    position: "top",
                    title: "Email Doesn't Exist",
                    description: "The following email doesn't exist",
                    duration: 3000,
                    isClosable: true,
                    status: "error" })
            }else{
                toast({
                    position: "top",
                    title: "Something Went Wrong",
                    description: "Something went wrong try again",
                    duration: 3000,
                    isClosable: true,
                    status: "error" })
            }
          })
    }

  return (
    <Flex flex="1" w="full" h="full" {...FlexColCenterCenter} >
        <Flex
            {
                ...FlexColCenterCenter
            }
            w="full"
        >   
            <Text fontSize="36px" fontWeight="500" textAlign="center" >
                {
                    step === 0 ? "Forgot Password" : step === 1 ? "Check Your Email" : step === 2 ? "Create Password" : null
                }
            </Text>
            <Flex w="full" {...FlexColCenterCenter} marginBottom="20px" className="space-y-5" >
                {
                    step === 0 ? (
                    <WithHelperText
                        type="email"
                        formLabel='Email Address'
                        placeholder="Enter your email"
                        onChangeText={setEmail}
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
                    ) : step === 1 ? (
                        <Text w="full" textAlign="center" data-testid='reset-instruction' >
                            An email with instruction to Reset your password has been sent to <strong>{email}</strong> 
                        </Text>
                    ) : step === 2? (
                        <CreatePassword
                            onValidPasswordCreated={setPassword}
                        />
                    ) : null
                }
            </Flex>
            {
                step === 0 ? (
                    <Rounded onClick={submitEmail} variant="solid" fullWidth rounded='full' >
                        Continue
                    </Rounded>
                ) : step === 1 ? null : step === 2 ? (
                    <Rounded variant="solid" fullWidth rounded='full' >
                        Continue
                    </Rounded>
                ) : null
            }
        </Flex>
    </Flex>
  )
}

export default ForgotPassword