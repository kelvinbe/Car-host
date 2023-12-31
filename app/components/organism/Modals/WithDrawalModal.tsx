import { Button, Select, Flex, Modal, ModalOverlay, ModalHeader, ModalContent, FormControl, FormLabel, ModalFooter, ModalBody, Input, ModalCloseButton, Box, FormErrorMessage, Text, useToast,  NumberInput,
  NumberInputField,  } from "@chakra-ui/react";
import {ChangeEvent, useRef, useState} from 'react'
import { FlexRowCenterCenter } from "../../../utils/theme/FlexConfigs";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { selectUser } from "../../../redux/userSlice";
import { tBankAccountPayoutSchema } from "../Forms/BankPayoutMethod";
import { isUndefined, isEmpty } from 'lodash'
import {createWithDrawal} from '../../../redux/payoutSlice'
import AvailableEarnings from "../../atoms/earnings-reports/available";
import { selectPayoutReportFeedback } from "../../../redux/withdrawalSlice";



interface IProps {
    isOpen: boolean;
    onClose: () => void

}

const WithDrawalModal = (props: IProps) => {

    const {data} = useAppSelector(selectPayoutReportFeedback)
  
    const {isOpen, onClose} = props
    const user = useAppSelector(selectUser)
    const [inputState, setInputState] = useState<number | string>(0)
    const [error, setError] = useState('')
    const [payoutMethodId, setPayoutMethodId] = useState('')
    const dispatch = useAppDispatch()
    const toast = useToast({
      position: 'top'
    })
    



    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputState(e.target.value)

        
        if(Number(e.target.value) > (data?.available ?? 0)){
            setError('Please add a lower value')
        }else {
            setError('')
        }
    }

    const setPayOutMethod = (e: ChangeEvent<HTMLSelectElement>) => {

        setPayoutMethodId(e.target.value)
    }

    const handleWithDrawal = () => {
        dispatch(createWithDrawal({
                payout_method_id: payoutMethodId,
                amount: Number(inputState)
        })).then(() => {
            toast({
                title: 'Success',
                description: 'Withdrawal Created Successfully',
                colorScheme: 'green'
            })
            onClose()
        }).catch((e) => {
            toast({
              title: 'Error',
              description: 'An Error occured while creating withdrawal',
              colorScheme: 'red'
            })
        })

    }
  
    return (
      <>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Make A Withdrawal</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl
                isInvalid={Boolean(error)}
              >
                <FormLabel>Your Available Earnings {data?.currency} {data?.available} </FormLabel>
                <NumberInput>
                  <NumberInputField  
                    disabled={((data?.available ?? 0) === 0)} value={inputState} 
                    border='1px solid black' borderRadius='md' bg='white' w='100%' p={4} color='black' onChange={(e) => {handleChange(e)}} 
                    placeholder={`MAX: ${data?.available ?? 0} MIN: ${100}`}  
                  />
                </NumberInput>
                <FormErrorMessage>
                  {
                    ( Number(inputState) > (data?.available ?? 0) ) ? `Max withdrawal amount is ${data?.available}` : `Input invalid`
                  }
                </FormErrorMessage>

              </FormControl>
  
              <FormControl mt={4}>
              <Select placeholder='Payout Methods' onChange={(e) => setPayOutMethod(e)}>
              {user?.PayoutMethod?.map((method) => {
                  return <>
                  <option  value={method.id} key={method.id}>
                  {
                    method?.type === "PAYPAL" ? method?.paypal_email :
                    method?.type === "BANK_ACCOUNT" ? (method?.details as Partial<tBankAccountPayoutSchema>)?.account_number :
                    method?.type === "MPESA" ? method?.details?.phone_number :
                    method?.type === "MTN" ? method?.details?.phone_number :
                    null
                    } ({method?.type})
                  </option>
                  </>
                  })
            }
                </Select>
              </FormControl>
            </ModalBody>
  
            <ModalFooter >
              <Flex {...FlexRowCenterCenter}>
              <Button onClick={handleWithDrawal} colorScheme='blue' mr={3} disabled={inputState === 0 || isEmpty(inputState) || error !== '' || payoutMethodId === ''}>
                Create WithDrawal
              </Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default WithDrawalModal