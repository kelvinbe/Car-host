import { Alert, AlertIcon, Flex, Spinner, Text, useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { FlexColCenterCenter, FlexRowCenterCenter } from '../../../utils/theme/FlexConfigs'
import { useRouter } from 'next/router'
import { USERS_DOMAIN } from '../../../hooks/constants'
import { getAuth, signInWithCustomToken } from 'firebase/auth'
import { app } from '../../../firebase/firebaseApp'
import { isEmpty } from 'lodash'
import { useAppDispatch } from '../../../redux/store'
import { fetchUser } from '../../../redux/userSlice'
import apiClient from '../../../utils/apiClient'
import LogRocket from 'logrocket'
import { GetServerSideProps } from 'next'
import axios from 'axios'

/**
 * @name requestForLoginToken
 */

const requestForLoginToken = async (data: {code: string, email: string}) => {
    return axios.get(`${USERS_DOMAIN}/admin/accept`, {
    params: {
        code: data.code,
        email: data.email
    }
}).then((res)=>res.data.data)}

function Admin(props: {
    query: {
        inviteCode: string,
        email: string
    },
    token: string
}) {
    const {token} = props
    const { push  } = useRouter()
    const dispatch = useAppDispatch()
    const toast = useToast({
        position: 'top',
        duration: 5000,
    })

    useEffect(()=>{
        if(!isEmpty(token)){
            signInWithCustomToken(getAuth(app), token).then((cred)=>{
                if(cred){
                    cred.user.getIdTokenResult().then((token)=>{
                        if(token.claims.admin){
                            dispatch(fetchUser()).then(()=>{
                                push("/onboarding")
                            }).catch((error)=>{
                                toast({
                                    title: "Unable to sign you in",
                                    description: "Try again later",
                                    status: "error",
                                    isClosable: true,
                                })
                                LogRocket.error(error)
                                push("/")
                            })
                            push("/onboarding")
                        }else{
                            toast({
                                title: "You are not an admin",
                                description: "You are not authorized to access this page",
                                status: "error",
                                isClosable: true,
                                id: "trigger"
                            })
                        }
                    }).catch((error)=>{
                        toast({
                            title: "Unable to get token",
                            description: "Try again later",
                            status: "error",
                            isClosable: true,
                            id: "trigger"
                        })
                        LogRocket.error(error)
                    })
                }else{
                    toast({
                        title: "No Credentials found",
                        description: "Unable to sign you in",
                        status: "error",
                        isClosable: true,
                        id: "trigger"
                    })
                }
            }).catch((error)=>{
                toast({
                    title: "Error validating token",
                    description: "Unable to sign you in",
                    status: "error",
                    isClosable: true,
                    id: "trigger"
                })
                LogRocket.error(error)
            })
        }else{
            toast({
                title: "No token found",
                description: "Token already used or invalid",
                status: "error",
                isClosable: true,
                id: "trigger"
            })
            push("/")
        }
    }, [])

  return (
    <Flex w="100vw" h="100vh" bg="blue.100" {...FlexColCenterCenter} >
        <Alert status="info" display={"flex"} flexDir={"row"}  alignItems={"center"} justifyContent={"center"} >
            <AlertIcon/>
            <Flex
                {
                    ...FlexRowCenterCenter
                }
            >
                <Text mr="20px" >
                    Signing you in
                </Text>
                <Spinner
                    size={"sm"}
                    color='primary.1000'
                />
            </Flex>
        </Alert>
    </Flex>
  )
}

export default Admin


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const query = ctx.query
    let token: string = ''
    try {
        token = await requestForLoginToken({
            code: query.inviteCode as string,
            email: query.email as string
        })
        return {
            props: {
                query,
                token
            }
        }

    } catch (e) {
        return {
            props: {
                query,
                token
            }
        }
    }

}