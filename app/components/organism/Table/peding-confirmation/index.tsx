import React, { useEffect, useMemo, useState } from 'react'
import FilterableTable from '../FilterableTable/FilterableTable'
import { useAppDispatch, useAppSelector } from '../../../../redux/store'
import { fetchReservations, selectReservationsFeedback, selectReservationsPaginationState } from '../../../../redux/reservationSlice'
import { ReservationsPendingConfirmationTableColumns } from '../../../../utils/tables/dashboard.table.schema'
import { selectUser } from '../../../../redux/userSlice'
import { piggyBackDataToArray } from '../../../../utils/utils'
import { isArray } from 'lodash'
import { insertTableActions } from '../../../../utils/tables/utils'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Tag, Text, useDisclosure } from '@chakra-ui/react'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { IReservation } from '../../../../globaltypes'
import ConfirmationModal from './confirmation-modal'

function PendingConfirmationTable() {
    const feedback = useAppSelector(selectReservationsFeedback)
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser)
    const { onOpen, onClose} = useDisclosure()
    const { current_page, current_search, current_size } = useAppSelector(selectReservationsPaginationState)
    const [currentSelection, setCurrentSelection] = useState<{
        action?: 'payment_received' | 'payment_not_received',
        selection: Partial<IReservation> | null
    }>({
        selection: null
    })

    useEffect(()=>{
        dispatch(fetchReservations({
            status: 'PENDING_CONFIRMATION',
            reset: true
        }))
    },[ ])


    const handleModalClose = () => {
        setCurrentSelection({
            selection: null
        })  
    }

    const isOpen = useMemo(()=>{
        if(currentSelection.action && currentSelection.selection)
            return true
        return false
    }, [currentSelection.selection, currentSelection.action])

  return (
    <>
        <FilterableTable
            columns={insertTableActions(ReservationsPendingConfirmationTableColumns, (i, data)=>{
                if(data?.status !== 'PENDING_CONFIRMATION') return (
                    <Tag colorScheme={
                        data?.status === 'CANCELLED' ? 'red' : 'green'
                    } >
                        {
                            data?.status === 'CANCELLED' ? 'Cancelled' : 'Approved'
                        }
                    </Tag>
                )
                return (
                    <div
                        className='flex flex-col items-center justify-center gap-y-3 px-5'
                    >
                            <Button size="sm" colorScheme='green' w='100%' leftIcon={<CheckIcon/>} onClick={()=>{
                                setCurrentSelection({
                                    action: 'payment_received',
                                    selection: data
                                })
                            }} >
                                Mark Payment Recieved
                            </Button>
                            <Button size="sm" colorScheme='red' w='100%' leftIcon={<CloseIcon/>} onClick={()=>{
                                setCurrentSelection({
                                    action: 'payment_not_received',
                                    selection: data
                                })
                            }} >
                                Mark Payment Not Recieved
                            </Button>
                    </div>
                )
            }, 'Payment Actions')}
            data={isArray(feedback?.data) ? piggyBackDataToArray(user, 'current_host', feedback?.data) : []}
            primitiveTableProps={{
                loading: feedback.loading,
                style: {
                    minHeight: '80vh',
                    flexGrow: 1
                },
                scroll: {
                    x: 'max-content'
                }
            }}
            viewSearchField 
            refetch={()=>{
                dispatch(fetchReservations({
                    status: 'PENDING_CONFIRMATION',
                    reset: true
                }))
            }}
            pagination={{
              position: ["bottomCenter"],
              onChange: (page, pageSize) => {
                dispatch(fetchReservations({ page, size: pageSize }))
              },
              total: ((current_page ?? 0) * (current_size ?? 0)) + (
                feedback?.data?.length < (current_size ?? 0) ? 0 : 1
              ),
              showSizeChanger: true, 
            }}

            setSearch={(search)=>{
                dispatch(fetchReservations({
                    search: search,
                    status: 'PENDING_CONFIRMATION',
                    reset: true
                }))
            }}
        />
        <Modal isOpen={isOpen} onClose={handleModalClose} >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>
                    {
                        currentSelection.action === 'payment_received' ? 'Mark Payment Received' : 'Mark Payment Not Received'
                    }
                </ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <ConfirmationModal
                        action={currentSelection.action}
                        selection={currentSelection.selection}
                        onClose={handleModalClose}
                    />
                </ModalBody>
            </ModalContent>
        </Modal>
    </>
  )
}

export default PendingConfirmationTable