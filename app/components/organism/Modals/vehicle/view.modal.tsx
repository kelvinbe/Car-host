import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import React from 'react'
import { IStation, IVehicle } from '../../../../globaltypes'
import Edit from './edit'
import View from './view'

interface Props {
    isOpen: boolean,
    onClose: () => void,
    chosenVehicle?: Partial<IVehicle> & {
        station?: Partial<IStation>
    }
}

function VehicleViewModal(props: Props) {
    const { isOpen, onClose, chosenVehicle } = props
  return (
    <Modal size="3xl" isOpen={isOpen} onClose={onClose} >
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>
                <Text>
                    {
                        chosenVehicle?.make && chosenVehicle?.model ? `${chosenVehicle?.make} ${chosenVehicle?.model}` : 'Vehicle'
                    }
                </Text>
                <ModalCloseButton/>
            </ModalHeader>
            <ModalBody>
                <View
                    {...chosenVehicle}
                />
            </ModalBody>
        </ModalContent>
    </Modal>
  )
}

export default VehicleViewModal