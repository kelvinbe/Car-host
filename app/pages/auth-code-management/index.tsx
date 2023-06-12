import React, { useMemo, useState } from 'react'
import AuthCodeTable from '../../components/organism/Table/authcode-table'
import AuthCodeRequestForm from '../../components/organism/Forms/auth-code-request'
import { IAuthCode, IUserProfile, IVehicle } from '../../globaltypes'
import { CloseButton, Flex, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, useDisclosure, useModal } from '@chakra-ui/react'
import { isEmpty } from 'lodash'
import { FlexRowCenterEnd } from '../../utils/theme/FlexConfigs'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '../../components/organism/ErrorFallback'
import { logError } from '../../utils/utils'

interface AuthCodeRequest extends Partial<IAuthCode> {
  vehicle?: Partial<IVehicle>
  user?: Partial<IUserProfile>
}

function AuthCodeManagement() {
  const [chosenCode, setChosenCode] = useState<AuthCodeRequest|null>(null)
  const { isOpen, onClose, onOpen } = useDisclosure()
  const open = useMemo(()=>{
    return !isEmpty(chosenCode) && isOpen
  }, [chosenCode, isOpen ])
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}  onError={logError} >
      <div className="flex flex-col w-full items-center justify-start">
        <Modal size="5xl" isOpen={open} onClose={onClose} >
          <ModalOverlay/>
          <ModalContent>
            <ModalHeader >
              <Flex {...FlexRowCenterEnd} >
                <CloseButton onClick={onClose} />
              </Flex>
            </ModalHeader>
            <ModalBody>
              {chosenCode && <AuthCodeRequestForm onClose={onClose}
                data={chosenCode}
              />}
            </ModalBody>
          </ModalContent>
        </Modal>
        <div className="w-full h-full flex flex-col items-center justify-start">
          <AuthCodeTable
            onEdit={(data)=>{
              onOpen()
              setChosenCode(data)
            }}
          />
        </div>
      </div>

    </ErrorBoundary>
  )
}

export default AuthCodeManagement


export function getServerSideProps () {
  return {
    props: {
      authonly: true,
      dashboard: true,
      adminonly: false,
    }
  }
}