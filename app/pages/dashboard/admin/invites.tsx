import { Flex, FormControl, FormLabel, Grid, GridItem, Input, Button, FormHelperText, Text, useToast, FormErrorMessage } from '@chakra-ui/react'
import React, { ChangeEvent, useState } from 'react'
import { FlexColStartStart } from '../../../utils/theme/FlexConfigs'
import { NextPageContext } from 'next'
import { dIInvitation } from '../../../globaltypes'
import { ColumnsType } from 'antd/es/table'
import FilterableTable from '../../../components/organism/Table/FilterableTable/FilterableTable'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { fetchUser, selectUser } from '../../../redux/userSlice'
import apiClient from '../../../utils/apiClient'
import { USERS_DOMAIN } from '../../../hooks/constants'
import { z } from 'zod'
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../../components/organism/ErrorFallback";
import { logError } from "../../../utils/utils";
import LogRocket from 'logrocket'


const InvitationTableColumnDefinition: ColumnsType<dIInvitation> = [
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        render: (v, { email }) => (
            <Text>
                {email}
            </Text>
        )
    },
    {
        title: "Status",
        dataIndex: "activated",
        key: "activated",
        render: (v, { activated }) => (
            <>
                {
                    activated ? (
                        <Text
                            fontWeight={"semibold"}
                            color="green.500"
                        >
                            Activated
                        </Text>
                    ) : (
                        <Text
                            color="red.500"
                            fontWeight="semibold"
                        >
                            Not Activated
                        </Text>
                    )
                }
            </>
        )
    }
]

/**
 * @name sendInvite 
 * @description sends out an invite to a specified email
 * - this will only be used here so no need for a hook, avoiding unnecessary boilerplate
 */

const sendInvite = (email: string) => apiClient.post(`${USERS_DOMAIN}/admin/invite`, { email })

function Invites() {
    const [email, setEmail] = useState<{
        value: string,
        isInvalid: boolean
    }>({
        value: "",
        isInvalid: false
    })
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const toast = useToast({
        position: 'top',
        duration: 3000
    })
    const user = useAppSelector(selectUser)

    const handleInvite = async () => {
        const { value, isInvalid } = email
        if (!isInvalid) {
            setLoading(true)
            await sendInvite(value).then(() => {
                dispatch(fetchUser())
            }).catch((error) => {
                toast({
                    title: 'Error',
                    description: "An error occured"
                })
                LogRocket.error(error)
            }).finally(() => {
                setLoading(false)
            })
        }
    }

    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(() => ({
            value: e.target.value,
            isInvalid: !z.string().email().optional().safeParse(e.target.value).success
        }))
    }

    return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
        <Grid w="100vw" h="100%" templateRows="200px 1fr" rowGap="20px" data-cy={'invites-container'}>
            <GridItem w="100%"  >
                <Flex {...FlexColStartStart} data-cy={'email-form-container'} >
                    <FormControl
                        isRequired
                        isInvalid={email.isInvalid}
                        data-cy={'email-form'}
                    >
                        <FormLabel>
                            Email
                        </FormLabel>
                        <Input
                            placeholder="Email"
                            type='email'
                            rounded="full"
                            w="400px"
                            value={email.value}
                            isInvalid={email.isInvalid}
                            onChange={onEmailChange}
                        />
                        <FormHelperText>
                            The email to the user you want to invite.
                        </FormHelperText>
                        <FormErrorMessage data-cy={'error-message'}>
                            Enter a valid email
                        </FormErrorMessage>
                    </FormControl>
                    <Button
                        bg="primary.1000"
                        color="white"
                        isLoading={loading}
                        loadingText='Sending...'
                        rounded="full"
                        mt="20px"
                        onClick={handleInvite}
                    >
                        Invite
                    </Button>
                </Flex>
            </GridItem>
            <GridItem w="70%" >
                    <FilterableTable
                        columns={InvitationTableColumnDefinition}
                        data={user?.sent_invites ?? []}
                        viewSearchField={false}
                    />
            </GridItem>
        </Grid>
    </ErrorBoundary>
    )
}

export default Invites

export function getServerSideProps() {
    return {
        props: {
            adminonly: true,
            dashboard: true,
            authonly: true,
        },
    };
}