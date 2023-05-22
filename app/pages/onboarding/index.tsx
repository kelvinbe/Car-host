/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, GridItem, useToast } from '@chakra-ui/react'
import { Steps } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { updateOnboardingDetails, selectCompleted, selectOnBoardingError, fetchOnboardingDetails } from '../../redux/onboardingSlice'
import { isNull, isUndefined } from 'lodash'
import { IUserProfile } from '../../globaltypes'
import { useRouter } from 'next/router'
import OnBoardingProfileInfo from '../../components/organism/OnBoarding/OnBoardingProfileInfo'
import OnBoardinLocation from '../../components/organism/OnBoarding/OnBoardingLocation'
import OnBoardingPayoutMethod from '../../components/organism/OnBoarding/OnBoardingPayoutMethod'



function Onboarding() {
    const toast = useToast()
    const completed = useAppSelector(selectCompleted)
    const onBoardingError = useAppSelector(selectOnBoardingError)
    const dispatch = useAppDispatch()
    const { push } = useRouter()

    const [currentStep, setCurrentStep] = useState<{
        current: number,
        completed: boolean,
        loading: boolean
    }>({
        current: 0,
        completed: false,
        loading: false
    })

    useEffect(()=>{
        dispatch(fetchOnboardingDetails())
    }, [])


    useEffect(() => {
        if(!completed.location && !completed.profile && !completed.payout_method){
            setCurrentStep({
                ...currentStep,
                current:  0
            })
        }else if(completed.location && !completed.profile && !completed.payout_method){
            setCurrentStep({
                ...currentStep,
                current:  1
            })
        }else if(completed.location && completed.profile && !completed.payout_method){
            setCurrentStep({
                ...currentStep,
                current:  2
            })
        }else if(completed.location && completed.profile && completed.payout_method){
            push("/dashboard")
        }
    }, [completed.location, completed.payout_method, completed.profile])

    
    const checkIfStepComplete = (data?: Partial<IUserProfile> | null) => {
        if (!isUndefined(data) && !isNull(data)) {
            dispatch(updateOnboardingDetails(data)).then(()=>{
                setCurrentStep((prev)=>({
                    ...prev,
                    current: prev.current + 1
                }))
            })
        } else {
            if (currentStep.current === 2) {
                /**
                 *@todo Check if payout method has been verified
                 */
            } else {
                toast({
                    title: "Complete the form",
                    description: "Please complete the form to continue",
                    status: "info",
                    position: "top"
                })
            }

        }
    }

    const handleBackPress = () => {
        if (currentStep.current === 0) {
            return
        }
        setCurrentStep({
            ...currentStep,
            current: currentStep.current - 1
        })
    }

    useEffect(() => {
        if (onBoardingError) {
            toast({
                title: "Error",
                description: "An error occured, try again later",
                status: "error",
                position: "top"
            })
        }
    }, [onBoardingError])
    return (
        <Grid w="100vw" h='100vh' templateColumns={"1fr 1fr 1fr 1fr"} padding="20px" >
            <GridItem colSpan={0} rowSpan={1} bg="blackAlpha.100" padding="10px" >
                <Steps
                    direction='vertical'
                    current={currentStep.current}
                    items={[
                        {
                            title: "Profile Info",
                            description: "Your Profile Information"
                        },
                        {
                            title: "Location",
                            description: "Your Current Location"
                        },
                        {
                            title: "Payout Method",
                            description: "Add a payout method"
                        }
                    ]}
                    style={{
                        height: "100%"
                    }}
                />
            </GridItem>
            <GridItem colSpan={3} bg="whiteAlpha.100" padding="20px 10px" h="full" rowSpan={1} >
                <Grid w="full" h="full" templateRows="1fr" >
                    <GridItem colSpan={1} rowSpan={1} w="full" >
                        {currentStep.current === 0 && <OnBoardingProfileInfo onBack={handleBackPress} onCompleted={checkIfStepComplete} />}
                        {currentStep.current === 1 && <OnBoardinLocation onBack={handleBackPress} onCompleted={checkIfStepComplete} />}
                        {currentStep.current === 2 && <OnBoardingPayoutMethod onBack={handleBackPress} onCompleted={checkIfStepComplete} />}
                    </GridItem>
                </Grid>
            </GridItem>
        </Grid>
    )
}

export default Onboarding


export const getStaticProps = async () => {
    return {
        props: {
            adminonly: false,
            dashboard: false,
            authonly: true
        }
    }
}