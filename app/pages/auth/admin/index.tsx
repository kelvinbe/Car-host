import { Alert, AlertIcon, Flex, Spinner, Text, useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { FlexColCenterCenter, FlexRowCenterCenter } from '../../../utils/theme/FlexConfigs'
import { useRouter } from 'next/router'
import { USERS_DOMAIN } from '../../../hooks/constants'
import axios from 'axios'
import { getAuth, signInWithCustomToken } from 'firebase/auth'
import { app } from '../../../firebase/firebaseApp'
import { isEmpty } from 'lodash'
import { useAppDispatch } from '../../../redux/store'
import { fetchUser } from '../../../redux/userSlice'
import apiClient from '../../../utils/apiClient'


/**
 * @name requestForLoginToken
 */

const requestForLoginToken = async (data: {code: string, email: string}) => {
    return apiClient.get(`${USERS_DOMAIN}/admin/accept`, {
    params: {
        code: data.code,
        email: data.email
    }
}).then((res)=>res.data)}

function Admin() {

    const { query, pathname, push  } = useRouter()
    const dispatch = useAppDispatch()
    const toast = useToast({
        position: 'top',
        duration: 5000,
    })

    useEffect(()=>{
        if(!isEmpty(query.inviteCode) && !isEmpty(query.email)){
            requestForLoginToken({
                code: query.inviteCode as string,
                email: query.email as string
            }).then((res)=>{
                signInWithCustomToken(getAuth(app), res).then((cred)=>{
                    if(cred){
                        cred.user.getIdTokenResult().then((token)=>{
                            if(token.claims.admin){
                                dispatch(fetchUser()).then(()=>{
                                    push("/dashboard")
                                }).catch((e)=>{
                                    toast({
                                        title: "Unable to sign you in",
                                        description: "Try again later",
                                        status: "error",
                                        isClosable: true,
                                    })
                                    push("/")
                                })
                                push("/dashboard")
                            }else{
                                toast({
                                    title: "Unable to sign you in",
                                    description: "Please check the link and try again",
                                    status: "error",
                                    isClosable: true,
                                })
                            }
                        }).catch((e)=>{
                            toast({
                                title: "Unable to sign you in",
                                description: "Please check the link and try again",
                                status: "error",
                                isClosable: true,
                            })
                        })
                    }else{
                        toast({
                            title: "Unable to sign you in",
                            description: "Please check the link and try again",
                            status: "error",
                            isClosable: true,
                        })
                    }
                }).catch((e)=>{
                    toast({
                        title: "Unable to sign you in",
                        description: "Please check the link and try again",
                        status: "error",
                        isClosable: true,
                    })
                })
            }).catch((e)=>{
                toast({
                    title: "Unable to validate invite link",
                    description: "Please check the link and try again",
                    status: "error",
                    isClosable: true,
                })
            })
        }else{
            toast({
                title: "Unable to validate invite link",
                description: "Please check the link and try again",
                status: "error",
                isClosable: true,
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