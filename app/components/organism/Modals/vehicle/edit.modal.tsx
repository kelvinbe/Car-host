import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import React from 'react'
import { IVehicle } from '../../../../globaltypes'
import Edit from './edit'

interface Props {
    isOpen: boolean,
    onClose: () => void,
    chosenVehicle: Partial<IVehicle>
}

function VehicleEditModal(props: Props) {
    const { isOpen, onClose, chosenVehicle } = props
  return (
    <Modal size="6xl" isOpen={isOpen} onClose={onClose} >
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>
                <Text>
                    Update Vehicle
                </Text>
                <ModalCloseButton/>
            </ModalHeader>
            <ModalBody>
                <Edit
                    onClose={onClose}
                    {...chosenVehicle}
                />
            </ModalBody>
        </ModalContent>
    </Modal>
  )
}

export default VehicleEditModal