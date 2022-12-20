import { Flex } from '@chakra-ui/react'
import React from 'react'
import BaseInput from '../components/molecules/Input/BaseInput/BaseInput'
import WithHelperText from '../components/molecules/Input/WithHelperText/WithHelperText'
import CreatePassword from '../components/organism/Forms/CreatePassword/CreatePassword'
import { FlexColCenterCenter } from '../utils/theme/FlexConfigs'

/**
 * This page is for testing components incase Storybook doesnt meet testing needs, sharb solid background color for easy testing
 */

function Sandbox() {
  return (
    <Flex {...FlexColCenterCenter} w="100vw" h="100vh" padding="20px" backgroundColor="white" >
        {/* <BaseInput
          placeholder="Email"
          formLabel='Email'
          onChangeText={(text)=>{
            console.log(text)
          }}
          
        /> */}
        {/* <WithHelperText
          placeholder="Email"
          formLabel='Email'
          errorMessage="ss"
          helperTextTop="ss"
          helperTextBottom="ss"
          onChangeText={()=>{
            console.log("text")
          }}
          customStyle={{
            width: 200
          }}
        /> */}
        <CreatePassword/>
    </Flex>
    )
}

export default Sandbox