import 'react-phone-number-input/style.css'
import { Button, Checkbox, Divider, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Select, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FlexColCenterCenter, FlexColCenterStart, FlexRowCenterBetween, FlexRowCenterCenter, FlexRowCenterStart } from '../../../../utils/theme/FlexConfigs'
import PhoneInput from 'react-phone-number-input'
import useLocation from '../../../../hooks/useLocation'
import { ZodError, ZodFormattedError, z } from 'zod'
import { isEmpty, uniqBy } from 'lodash'


const tPayoutMethodSchema = z.object({
    account_number: z.string().min(1).max(15).refine((val) => !isNaN(Number(val)), { message: "Account number must be a number" }).optional(),
    routing_number: z.string().max(9).refine((val) => !isNaN(Number(val)), { message: "Bank routing number must be a number" }).optional(),
    id_number: z.string().min(1).max(30, "ID number must be a max of 30 digits").refine((val) => !isNaN(Number(val)), { message: "ID number must be a number" }).optional(),
    id_type: z.enum(["passport", "drivers_licence", "national_id"]).optional(),
    country: z.string().min(1).optional(),
    city_state_province: z.string().min(1).optional(),
    address: z.string().min(1).optional(),
    phone_number: z.string().min(1).optional(),
})

export type tBankAccountPayoutSchema = z.infer<typeof tPayoutMethodSchema>

interface FormStateAndErrors {
    state: tBankAccountPayoutSchema | null,
    errors: ZodFormattedError<tBankAccountPayoutSchema, string> | null,
    agrees: boolean
}

interface IProps {
    fullName?: string,
    onDone: (data: tBankAccountPayoutSchema & { agrees: boolean } | null, errors: ZodFormattedError<tBankAccountPayoutSchema, string> | null) => void,
    onCancel: () => void,
}

function BankPayoutMethodForm(props: IProps) {
    const toast = useToast()
    const { onDone, fullName, onCancel } = props
    const [inputState, setInputState] = useState<FormStateAndErrors>({
        state: null,
        errors: null,
        agrees: false
    })

    const { markets, submarkets, fetchMarkets, fetchSubmarkets } = useLocation()
    useEffect(() => {
        fetchMarkets()
    }, [])

    const handleStateChange = (key: keyof tBankAccountPayoutSchema, value: string) => {
        const parsed = tPayoutMethodSchema.safeParse({ ...inputState.state, [key]: value })
        setInputState((prev) => {

            if (parsed.success) return {
                ...prev,
                state: {
                    ...prev.state,
                    ...parsed.data
                },
                errors: null
            }

            const errors = parsed.error.format()
            return {
                ...prev,
                errors: {
                    ...prev.errors,
                    ...errors
                }
            }
        })
    }


    const handleDone = () => {
        const parsed = tPayoutMethodSchema.safeParse(inputState.state)
        if (!parsed.success) {
            toast({
                title: "Error",
                description: "Please fill all required fields",
                status: "error",
                duration: 3000,
                position: "top"
            })
            onDone(null, inputState.errors)
        } else {
            onDone({ ...parsed.data, agrees: inputState.agrees }, null)
        }

    }

    return (
        <Flex {...FlexColCenterCenter} experimental_spaceY={"1.5"} flex="1" >
            <Flex w="full" {...FlexRowCenterCenter} >
                <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    color="gray.700"
                >
                    Direct to your local bank.
                </Text>
            </Flex>
            <Text
                fontSize="md"
                fontWeight="normal"
                color="gray.500"
                textAlign={"left"}
                w="full"
            >
                Receive your earnings in your local currency, quickly and securely.
            </Text>
            <Divider />
            <Text
                fontSize="xl"
                fontWeight="bold"
                color="gray.700"
                textAlign={"left"}
                w="full"
            >
                Account holder bank information
            </Text>
            <FormControl isInvalid={!isEmpty(inputState?.errors?.account_number)} experimental_spaceY={2} >
                <FormLabel>
                    Account Number
                </FormLabel>
                <FormHelperText>
                    Enter up to 15 digits
                </FormHelperText>
                <Input maxLength={15} value={inputState?.state?.account_number} onChange={(e) => {
                    handleStateChange("account_number", e.target.value)
                }} placeholder="Enter your account number" />
                <FormErrorMessage>
                    {inputState?.errors?.account_number?._errors?.map((err, i) => <Text key={i} fontSize="sm" color="red.500">{err}</Text>)}
                </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!isEmpty(inputState?.errors?.routing_number)} experimental_spaceY={2}>
                <FormLabel>
                    Bank Routing Number
                </FormLabel>
                <FormHelperText>
                    Please insert your Bank Routing Number (9 digits)
                </FormHelperText>
                <Input maxLength={9} value={inputState?.state?.routing_number} onChange={(e) => handleStateChange("routing_number", e.target.value)} placeholder="Enter your bank routing number" />
                <FormErrorMessage>
                    {inputState?.errors?.routing_number?._errors?.map((err, i) => <Text key={i} fontSize="sm" color="red.500">{err}</Text>)}
                </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!isEmpty(inputState?.errors?.id_number)} experimental_spaceY={2}>
                <FormLabel>
                    ID Number
                </FormLabel>
                <FormHelperText>
                    Number printed on your ID. Max length 30 charactes
                </FormHelperText>
                <Input maxLength={30} value={inputState?.state?.id_number} onChange={(e) => handleStateChange("id_number", e.target.value)} placeholder="Enter your ID number" />
                <FormErrorMessage>
                    {inputState?.errors?.id_number?._errors?.map((err, i) => <Text key={i} fontSize="sm" color="red.500">{err}</Text>)}
                </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!isEmpty(inputState?.errors?.id_type)} experimental_spaceY={2}>
                <FormLabel>
                    ID Type
                </FormLabel>
                <FormHelperText>
                    Type of ID provided
                </FormHelperText>
                <Select value={inputState?.state?.id_type} placeholder="Please select" data-testid={'id'} onChange={(e) => handleStateChange("id_type", e.target.value)} >
                    <option value="national_id" >
                        Nation ID
                    </option>
                    <option value="passport" data-testid='passport' >
                        Passport
                    </option>
                    <option value="drivers_licence" >
                        Driver's License
                    </option>
                </Select>
                <FormErrorMessage>
                    {inputState?.errors?.id_type?._errors?.map((err, i) => <Text key={i} fontSize="sm" color="red.500">{err}</Text>)}
                </FormErrorMessage>
            </FormControl>
            <FormControl experimental_spaceY={2}>
                <FormLabel>
                    Name on account
                </FormLabel>
                <Input disabled value={fullName} />
            </FormControl>
            <FormControl isInvalid={!isEmpty(inputState?.errors?.address)} experimental_spaceY={2}>
                <FormLabel>
                    Address
                </FormLabel>
                <FormHelperText>
                    Please enter the physical address associated with this account. If the postal address where you receive mail is different than the physical address where you live, please use the physical address.
                </FormHelperText>
                <Input value={inputState?.state?.address} onChange={(e) => handleStateChange("address", e.target.value)} placeholder="Enter your address" />
                <FormErrorMessage>
                    {inputState?.errors?.address?._errors?.map((err, i) => <Text key={i} fontSize="sm" color="red.500">{err}</Text>)}
                </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!isEmpty(inputState?.errors?.country)} experimental_spaceY={2}>
                <FormLabel>
                    Country
                </FormLabel>
                <Select value={inputState?.state?.country} placeholder="Select country" onChange={(e) => handleStateChange("country", e.target.value)}  >
                    {
                        uniqBy(markets?.data, ({ country }) => country)?.map(({ country, id }) => {
                            return (
                                <option value={country} key={id}>
                                    {country}
                                </option>
                            )
                        })
                    }
                </Select>
                <FormErrorMessage>
                    {inputState?.errors?.country?._errors?.map((err, i) => <Text key={i} fontSize="sm" color="red.500">{err}</Text>)}
                </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!isEmpty(inputState?.state?.phone_number)} experimental_spaceY={2}>
                <FormLabel>
                    Phone Number
                </FormLabel>
                <PhoneInput
                    value={inputState?.state?.phone_number}
                    onChange={(numb) => {
                        handleStateChange("phone_number", numb as string)
                    }}
                    international
                    inputComponent={Input}
                />
                <FormErrorMessage>
                    {inputState?.errors?.phone_number?._errors?.map((err, i) => <Text key={i} fontSize="sm" color="red.500">{err}</Text>)}
                </FormErrorMessage>
            </FormControl>
            <Flex w="full" py="20px" px="10px" {...FlexRowCenterStart} >
                <Checkbox colorScheme='green' onChange={(e) => {
                    setInputState((prev) => ({
                        ...prev,
                        agrees: e.target.checked
                    }))
                }} isChecked={inputState.agrees} >
                    I attest that I am the owner and have full authorization to this bank account.
                </Checkbox>
            </Flex>
            <Flex {...FlexRowCenterBetween} w="full" px="20px" py="20px" >
                <Button
                    colorScheme='green'
                    onClick={handleDone}
                    disabled={!isEmpty(inputState.errors) || !inputState.agrees}
                >
                    Done
                </Button>
                <Button onClick={onCancel} colorScheme='red' >
                    Cancel
                </Button>
            </Flex>
        </Flex>
    )
}

export default BankPayoutMethodForm