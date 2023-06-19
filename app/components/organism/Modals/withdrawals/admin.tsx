import { Avatar, Flex, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { IWithdrawals } from '../../../../globaltypes'
import { Button } from '@chakra-ui/react'
import { useAppDispatch } from '../../../../redux/store'
import { updateWithdrawal } from '../../../../redux/withdrawalSlice'
import LogRocket from 'logrocket'

interface IProps extends Partial<IWithdrawals> {
    onClose: ()=>void
}

function AdminEdit(props: IProps) {
    const toast = useToast({
        position: "top"
    })
    const dispatch = useAppDispatch()

    const handleApproveWithdrawal = async ()=>{

        try {
            await dispatch(updateWithdrawal({
                id: props?.id,
                status: "APPROVED"
            }))
            props.onClose()
            toast({
                title: "Success",
                description: "Processing withdrawal",
                colorScheme: "green"
            })
        } catch (e)
        {
            LogRocket.error(e)
            toast({
                title: "Error",
                description: "An error occured while approving withdrawal",
                colorScheme: "red"
            })
        }
    }

    const handleDenyWithdrawal = async ()=>{
        try {
            await dispatch(updateWithdrawal({
                id: props?.id,
                status: "CANCELLED"
            }))
            props.onClose()
            toast({
                title: "Success",
                description: "Withdrawal cancelled",
                colorScheme: "green"
            })
        } catch (e)
        {
            LogRocket.error(e)
            toast({
                title: "Error",
                description: "An error occured while approving withdrawal",
                colorScheme: "red"
            })
        }
    }

  return (
    <div className="w-full h-full grid grid-cols-3">
        <div className="col-span-2 flex flex-col items-center space-y-2 justify-start">
            <div className="flex w-full flex-row items-center rounded-md px-2 py-2 justify-start space-x-5">
                <Avatar
                    src={props?.user?.profile_pic_url}
                    size="md"
                    name={(props?.user?.fname && props?.user?.lname)  ? `${props?.user?.fname} ${props?.user?.lname}` : props?.user?.email}
                />
                <Text variant="label" >
                    {
                        (props?.user?.fname && props?.user?.lname)  ? `${props?.user?.fname} ${props?.user?.lname}` : props?.user?.email
                    }
                </Text>
            </div>
            {
                props?.payout_method?.type === "MPESA" ? (
                    <div className="grid grid-cols-2 w-full px-5 py-5">
                        <Text variant="label" >
                            Phone Number
                        </Text>
                        <Text>
                            { 
                                props?.payout_method?.details?.phone_number
                            }
                        </Text>
                        <Text variant="label" >
                            Provider
                        </Text>
                        <Text>
                            {
                                props?.payout_method?.type
                            }
                        </Text>
                        <Text variant="label" >
                            ID Number
                        </Text>
                        <Text>
                            {
                                props?.payout_method?.details?.id_number
                            }
                        </Text>
                        <Text variant="label" >
                            ID Type
                        </Text>
                        <Text>
                            {
                                props?.payout_method?.details?.id_type === "drivers_licence" ? "Drivers licence" :
                                props?.payout_method?.details?.id_type === "national_id" ? "National ID" :
                                props?.payout_method?.details?.id_type === "passport" ? "Passport" : "N/A"
                            }
                        </Text>
                    </div>
                ) : props?.payout_method?.type === "BANK_ACCOUNT" ? (
                    <div className="grid grid-cols-2 w-full">
                        <Text variant="label" >
                            Bank Routing Number
                        </Text>
                        <Text>
                            {
                                props?.payout_method?.details?.routing_number
                            }
                        </Text>
                        <Text variant="label" >
                            Account Number
                        </Text>
                        <Text>
                            {                            
                                props?.payout_method?.details?.account_number
                            }
                        </Text>
                        <Text variant="label" >
                            ID type
                        </Text>
                        <Text>
                            {
                                props?.payout_method?.details?.id_type
                            }
                        </Text>
                        <Text variant="label" >
                            ID Number
                        </Text>
                        <Text>
                            {
                                props?.payout_method?.details?.id_number
                            }
                        </Text>
                        <Text>
                            City/State/Province
                        </Text>
                        <Text>
                            {
                                props?.payout_method?.details?.city_state_province
                            }
                        </Text>
                        <Text>
                            Address 
                        </Text>
                        <Text>
                            {
                                props?.payout_method?.details?.address
                            }
                        </Text>
                    </div>
                ) : null
            }
        </div>
        <div className="col-span-1 w-full h-full px-2 py-2 flex flex-col items-center justify-between">
            <div className="grid grid-cols-2 w-full">
                <Text variant="label" >
                    Amount
                </Text>
                <Text>
                    {props?.user?.market?.currency} {props?.amount} 
                </Text>
                <Text variant="label" >
                    Status
                </Text>
                <Text>
                    {props?.status}
                </Text>
            </div>
            <div className="flex flex-row items-center justify-between w-full">
                <Button
                    colorScheme='green'
                    disabled={props?.status !== "PENDING"}
                    onClick={handleApproveWithdrawal}
                >
                    Approve
                </Button>
                <Button
                    colorScheme='red'
                    onClick={handleDenyWithdrawal}
                    disabled={props?.status === "APPROVED"}
                >
                    Deny
                </Button>
            </div>
        </div>
    </div>
  )
}

export default AdminEdit