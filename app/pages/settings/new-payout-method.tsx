import { Flex, FormControl, FormLabel, Progress, Select, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FlexColCenterStart, FlexColStartStart } from '../../utils/theme/FlexConfigs'
import BankPayoutMethodForm, { tBankAccountPayoutSchema } from '../../components/organism/Forms/BankPayoutMethod'
import MobileMoneyPayoutMethodForm, { tMobileMoneyPayoutSchema } from '../../components/organism/Forms/MobileMoneyPayoutMethodForm'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { addPayoutMethod, selectPayoutFeedback } from '../../redux/payoutSlice'
import { useRouter } from 'next/router'
import { ZodFormattedError } from 'zod'
import { isNull } from 'lodash'

function NewPayoutMethodPage() {
    const toast = useToast({
        position: "top"
    })
    const [payout_method, set_payout_method] = useState<string>("bank")
    const feedback = useAppSelector(selectPayoutFeedback)
    const dispatch = useAppDispatch()
    const { push } = useRouter()

    const onBack = () => {
        push("/settings")
    }

    const handleBankCompleted = (data: Partial<tBankAccountPayoutSchema> & {agrees: boolean} | null, error: ZodFormattedError<tBankAccountPayoutSchema, string> | null ) => {
        if (isNull(data)) return
        dispatch(addPayoutMethod({
            details: data,
            type: "BANK_ACCOUNT"
        })).unwrap().then(()=>{
            push("/settings")
        }).catch((e)=>{
            toast({
                title: "Error",
                description: "An error occured while adding your payout method",
            })
        })
    }

    const handleMobileMoneyCompleted = (data: Partial<tMobileMoneyPayoutSchema> & { agrees: boolean } | null, error: ZodFormattedError<tMobileMoneyPayoutSchema, string> | null) => {
        if (isNull(data)) return 
        dispatch(addPayoutMethod({
            details: data,
            type: data?.provider
        })).unwrap().then(()=>{
            push("/settings")
        }).catch((e)=>{
            toast({
                title: "Error",
                description: "An error occured while adding your payout method",
            })
        })
    }
  return (
    <Flex w="full" p="20px" {...FlexColCenterStart} >
        <Flex {...FlexColCenterStart} experimental_spaceY={"5px"} >
            <Text
                fontSize="2xl"
                fontWeight="bold"
                color="gray.700"
            >
                Add a new Payout Method
            </Text>
            <FormControl className="w-4/5" >
                <FormLabel>
                    Choose a payout method
                </FormLabel>
                <Select value={payout_method} onChange={(e)=>{
                    set_payout_method(e.target.value)
                }} placeholder="Choose a payout method" >
                    <option value="bank">Bank</option>
                    <option value="mobilemoney">Mobile Money</option>
                    {/* OThers can be added here */}
                </Select>
            </FormControl>
            <Flex {...FlexColCenterStart} flex="1" px="20px" py="20px" >
                {
                    payout_method === "bank" ? <BankPayoutMethodForm onDone={handleBankCompleted} onCancel={onBack} /> : <MobileMoneyPayoutMethodForm onDone={handleMobileMoneyCompleted} onCancel={onBack} />
                }
            </Flex>
            {
                feedback.loading && <Progress w="full"
                    isIndeterminate
                />
            }
        </Flex>
    </Flex>
  )
}

export default NewPayoutMethodPage