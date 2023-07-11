import { Button, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { IReservation } from '../../../../globaltypes'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { useAppDispatch, useAppSelector } from '../../../../redux/store'
import { selectUpdateCashReservationFeedback, updateCashReservation } from '../../../../redux/reservationSlice'

interface Props {
    action?: 'payment_received' | 'payment_not_received',
    selection: Partial<IReservation> | null,
    onClose?: () => void
}

function ConfirmationModal(props: Props) {
    const feedback = useAppSelector(selectUpdateCashReservationFeedback)
    const dispatch = useAppDispatch()
    const toast = useToast({
        position: 'top'
    })
    const { action, selection, onClose } = props

    const handleYes = async () => {
        
        if (action === 'payment_not_received') {
            try {
                await dispatch(updateCashReservation({
                    reservation_id: selection?.id,
                    status: 'DENIED',
                    payment_id: selection?.payment?.id
                })).unwrap()
            }
            catch(e)
            {
                toast({
                    title: 'Error',
                    description: "Something went wrong, please try again later",
                    status: 'error',
                    colorScheme: 'red',
                })
            }   
        }


        if (action === 'payment_received') {
            try {
                await dispatch(updateCashReservation({
                    reservation_id: selection?.id,
                    status: 'APPROVED',
                    payment_id: selection?.payment?.id
                })).unwrap()
            }
            catch(e)
            {
                toast({
                    title: 'Error',
                    description: "Something went wrong, please try again later",
                    status: 'error',
                    colorScheme: 'red',
                })
            }
        }

        onClose && onClose()
    }

    const handleCancel = async () => {
        onClose && onClose()
    }

  return (
    <div className="flex flex-col w-full items-center px-2 py-3 justify-between">
        <Text  textAlign={'center'} >
            {
                action === 'payment_not_received' ? 'You are about to mark this payment as not received, which will cancel this reservation, \n are you sure you want to proceed?' : 'You are about to mark this payment as received, which will confirm this reservation, \n are you sure you want to proceed?'
            }
        </Text>
        <div className="flex flex-row items-center justify-between w-full">
            <Button onClick={handleYes} isLoading={feedback.loading} colorScheme='green' size='sm' leftIcon={<CheckIcon/>} >
                Yes
            </Button>

            <Button onClick={handleCancel} colorScheme='red' variant={'outline'} size={'sm'} leftIcon={<CloseIcon/>} >
                No
            </Button>
        </div>
    </div>
  )
}

export default ConfirmationModal