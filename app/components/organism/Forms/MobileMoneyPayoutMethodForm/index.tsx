import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Divider, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Select, Text, useToast } from '@chakra-ui/react'
import { FlexColCenterStart, FlexRowCenterBetween } from '../../../../utils/theme/FlexConfigs'
import PhoneInputWithCountrySelect from 'react-phone-number-input'
import { ZodFormattedError, z } from 'zod'
import { isEmpty } from 'lodash'


interface Props {
    onDone: (data: Partial<tMobileMoneyPayoutSchema> & { agrees: boolean }| null, errors: ZodFormattedError<tMobileMoneyPayoutSchema, string> | null) => void,
    onCancel: () => void,
}

const tMobileMoneySchema = z.object({
    provider: z.enum(["MTN", "MPESA"]).optional(),
    phone_number: z.string().min(5).optional(),
    id_number: z.string().min(5).max(30).optional().refine((val)=>{
        return !isNaN(Number(val))
    }).optional(),
    id_type: z.enum(["national_id", "passport", "drivers_license"]).optional(),
    type: z.enum(["MTN", "MPESA"]).optional()
})

export type tMobileMoneyPayoutSchema = z.infer<typeof tMobileMoneySchema>

interface FormState {
    state: Partial<tMobileMoneyPayoutSchema> | null,
    errors: ZodFormattedError<tMobileMoneyPayoutSchema, string> | null,
    agrees: boolean
}

function MobileMoneyPayoutMethodForm(props: Props) {
    const { onDone, onCancel } = props
    const toast = useToast({
        position: "top"
    })
    const [inputState, setInputState] = useState<FormState>({
        state: null,
        errors: null,
        agrees: false
    })


    const handleStateChange = (key: keyof tMobileMoneyPayoutSchema, value: string) => {
        const parsed = tMobileMoneySchema.safeParse({...inputState.state, [key]: value}) 
        if(parsed.success){
            return setInputState({
                ...inputState,
                state: parsed.data,
                errors: null
            })
        }
        return setInputState({
            ...inputState,  
            errors: parsed.error.format()
        })

    }

    const handleOnDone = () => {
        if(isEmpty(inputState?.errors)){
            return onDone({...inputState.state, agrees: inputState.agrees}, null)
        }
        onDone(null, inputState.errors)
    }

    const handleOnCancel = () => {
        onCancel()
    }
  return (
    <Flex flex="1"  {...FlexColCenterStart} w="full" >
        <Text fontSize="2xl" fontWeight="bold" >
            Mobile Money
        </Text>
        <Text fontSize={"xl"} fontWeight={"normal"} w="full" textAlign="left" >
            Set up Payout details with your mobile money account.
        </Text>
        <Text fontSize={"sm"} fontWeight={"normal"} w="full" textAlign="left" >
            We currently only support MTN Mobile Money in Rwanda and M-PESA in Kenya.
        </Text>
        <Divider my="20px" />
        <Flex w="full" experimental_spaceY={"20px"} {...FlexColCenterStart} >
            <FormControl isInvalid={!isEmpty(inputState?.errors?.provider)} >
                <FormLabel>
                    Select Your Country
                </FormLabel>
                <Select value={inputState.state?.provider} onChange={(e)=> handleStateChange("provider", e.target.value)} placeholder="Select option">
                    <option value="MTN">Rwanda</option>
                    <option value="MPESA">Kenya</option>
                </Select>
            </FormControl>
            <FormControl isInvalid={!isEmpty(inputState?.errors?.phone_number)} >
                <FormLabel>
                    Your Phone Number
                </FormLabel>
                <PhoneInputWithCountrySelect 
                    data-testid='phone'
                    limitMaxLength={true}
                    key={inputState?.state?.provider}
                    value={inputState.state?.phone_number}
                    placeholder="Enter your phone number"
                    defaultCountry={
                        inputState.state?.provider === "MTN" ? "RW" : "KE"
                    }
                    onChange={(val)=>{
                        handleStateChange("phone_number", val as string)
                    }}
                    countries={["RW", "KE"]}
                    inputComponent={Input}
                />
                <FormErrorMessage>
                    {inputState?.errors?.phone_number?._errors?.map((err, i) => <Text key={i} fontSize="sm" color="red.500">{err}</Text>)}
                </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!isEmpty(inputState?.errors?.id_number)} >
                <FormLabel>
                    ID Number
                </FormLabel>
                <FormHelperText>
                    Max 30 digits
                </FormHelperText>
                <Input maxLength={30} value={inputState?.state?.id_number} onChange={(e)=> handleStateChange("id_number", e.target.value)} placeholder="Enter your ID number" />
                <FormErrorMessage>
                    {inputState?.errors?.id_number?._errors?.map((err, i) => <Text key={i} fontSize="sm" color="red.500">{err}</Text>)}
                </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!isEmpty(inputState?.errors?.id_type)} >
                <FormLabel>
                    ID Type
                </FormLabel>
                <Select value={inputState?.state?.id_type} placeholder="Select option" onChange={(e)=> handleStateChange("id_type", e.target.value)} >
                    <option value="national_id">National ID</option>
                    <option value="passport">Passport</option>
                    <option value="drivers_licence">Driver's Licence</option>
                </Select>
            </FormControl>
            <Checkbox isChecked={inputState?.agrees} onChange={(e)=> setInputState({
                ...inputState,
                agrees: e.target.checked
            })} w="full" >
                I attest that I am the owner and have full authorization to use this account.
            </Checkbox>

        </Flex>
        <Flex w="full" my="20px" {...FlexRowCenterBetween} >
            <Button disabled={!isEmpty(inputState?.errors)} onClick={handleOnDone} colorScheme='green' >
                Done
            </Button>
            <Button onClick={handleOnCancel} colorScheme="red" >
                Cancel
            </Button>
        </Flex>
    </Flex>
  )
}

export default MobileMoneyPayoutMethodForm