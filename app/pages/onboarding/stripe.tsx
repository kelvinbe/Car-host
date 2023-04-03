/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, AlertIcon, Flex, Spinner, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { fetchOnboardingDetails, selectCompleted } from '../../redux/onboardingSlice'
import { FlexColCenterCenter } from '../../utils/theme/FlexConfigs'
import { useRouter } from 'next/router'

function Stripe() {
    const dispatch = useAppDispatch()
    const retries = useRef(0)
    const completed = useAppSelector(selectCompleted)   
    const toast = useToast()

    const {push } = useRouter()

    useEffect(()=>{
        const interval_ref = setInterval(()=>{
            if (retries.current > 10) {
                toast({
                    title: "We couldn't confirm your info",
                    description: "Please try again",
                    status: "info",
                    duration: 5000,
                    position: "top",
                })
                push("/onboarding")
            }
            dispatch(fetchOnboardingDetails()).then(()=>{
                retries.current = retries.current + 1
            })
        }, 1000)
        return ()=>{
            clearInterval(interval_ref)
        }
    }, [])

    useEffect(()=>{
        if(completed.payout_method && completed.location && completed.profile){
            push("/dasboard")
        }else{
            if(retries.current > 10){
                push("/onboarding")
            }   
        }
    }, [completed.payout_method, completed.location, completed.profile])


  return (
    <Flex w="100vw" h="100vh" bg="blue.100" {...FlexColCenterCenter} >
        <Alert status="info" display={"flex"} justifyContent={"center"} alignItems={"center"}  >
            <AlertIcon/>
            <Flex>
                <Text>
                    We are confirming the info you filled. This may take a while.
                </Text>
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    color={"primary.1000"}
                    ml="20px"
                />
            </Flex>
        </Alert>
    </Flex>
  )
}

export default Stripe