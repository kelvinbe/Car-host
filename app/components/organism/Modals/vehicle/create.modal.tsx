import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import React from 'react'
import Create from './create'

interface Props {
    isOpen: boolean,
    onClose: () => void
}

function VehicleCreateModal(props: Props) {
    const { isOpen, onClose } = props
  return (
    <Modal size="6xl" isOpen={isOpen} onClose={onClose} >
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>
                <Text>
                    Create Vehicle
                </Text>
                <ModalCloseButton/>
            </ModalHeader>
            <ModalBody>
                <Create
                    onClose={onClose}
                />
            </ModalBody>
        </ModalContent>
    </Modal>
  )
}

export default VehicleCreateModal