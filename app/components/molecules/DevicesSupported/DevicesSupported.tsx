import React from 'react'
import { Flex, Text, Alert, AlertIcon} from "@chakra-ui/react";
import { FlexColCenterCenter } from '../../../utils/theme/FlexConfigs';

const DevicesSupported = () => {
  return (
    <>
    <Flex w="100vw" h="100vh" bg="blue.100" {...FlexColCenterCenter}>
    <Alert status='info' justifyContent={'center'} flexDirection={'column'}>
    <AlertIcon />
    <Text fontSize={'14px'}>The Divvly Control Panel is not supported on your mobile devices. Please use a device with a screen size of 900px and above (eg laptop, desktop).</Text>
    </Alert>
    </Flex>
    </>
  )
}

export default DevicesSupported