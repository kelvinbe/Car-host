import React, {ChangeEvent, useState} from 'react'
import { Box, Input, FormControl, FormLabel, FormErrorMessage, Flex, Image, IconButton, Icon } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { FlexRowCenterCenter } from '../../../utils/theme/FlexConfigs'
import { BiImageAdd } from 'react-icons/bi'

interface Props{
    isError:boolean,
    handleSelectImages:(e:ChangeEvent) => void,
    images:string[],
    setter:([]) => void
}
const UploadImage = ({isError, handleSelectImages, images, setter}:Props) => {
  return (
    <FormControl isRequired isInvalid={isError} paddingLeft={'22px'} paddingBottom={'10px'}>
        <FormLabel>Upload Image</FormLabel>
        <FormErrorMessage>Upload at least one image</FormErrorMessage>
        <Flex w={'100%'} flexWrap='wrap' flexDirection={"row"} maxH={'300px'} overflowY={'scroll'}>
            <Input
                type="file"
                id='vehicle_pictures'
                accept="image/*"
                display='none'
                multiple
                required
                onChange={handleSelectImages}
            /> 
            <Flex {...FlexRowCenterCenter} border='1px' borderColor={'primary.1000'} borderRadius={'2xl'} borderStyle='dashed' w={24} h={24} padding='2px'>
                <label htmlFor="vehicle_pictures"><Icon as={BiImageAdd} color="primary.1000" w={16} h={16} aria-label='Add vehicle image'/></label>
            </Flex>
            
            {images && 
            images.map((image, index) => {
                return(
                    <Box key={index} w={110} h={110} position={'relative'} marginBottom={5} marginX={2}>
                        <Image src={image} alt='Vehicle' h={100} w={120} border={'1px'} borderColor='gray.400' rounded={'2xl'}/>
                        <IconButton
                            aria-label="Delete"
                            icon={<DeleteIcon />}
                            size="sm"
                            onClick={() => {
                                let newImages = images.filter(e => e !== image)
                                setter(newImages)
                            }}
                            color="cancelled.1000"
                            position={'absolute'}
                            top={0}
                            left={0}
                        />
                    </Box>

                )
            })}
        </Flex>
    </FormControl>
  )
}

export default UploadImage