import React, {ChangeEvent, useState} from 'react'
import { Box, Input, FormControl, FormLabel, FormErrorMessage, Flex, Image, IconButton, Icon, useToast, Spinner } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { FlexRowCenterCenter } from '../../../utils/theme/FlexConfigs'
import { BiImageAdd } from 'react-icons/bi'
import { uploadToFirebase } from '../../../utils/utils'
import { isEmpty, last } from 'lodash'

interface Props{
    isError?:boolean,
    handleSelectImages?:(e:ChangeEvent) => void, // being phased out
    images?:string[],
    // eslint-disable-next-line no-empty-pattern
    setter?:([]) => void, // being phased out
    onChange: (images: string[] | string) => void,
    multiple?:boolean
}
const UploadImage = ({isError, images, onChange, multiple}:Props) => {

    const [imageUrls, setImageUrls] = useState<(string)[]>(images || [])
    const [loading, setLoading] = useState<boolean>(false)

    const toast = useToast({
        position: "top",
        duration: 3000,
        
    })

    const onDelete = (index:number) => {
        const newImages = imageUrls.filter((_, i) => i !== index)
        const last_image = last(newImages) as string
        setImageUrls(multiple ? newImages : isEmpty(last_image) ? [] :[last_image])
        onChange(multiple ? newImages as string[] : last_image  ?? '')
    }

    const onImageChange = (e:ChangeEvent) => {
        const fileList = (e.target as HTMLInputElement).files
        const fileListArray = fileList && Array.from(fileList)
        !isEmpty(fileListArray) && setLoading(true)
        fileListArray && Promise.all(fileListArray?.map(async file => {
            const bloburl = URL.createObjectURL(file)
            return await uploadToFirebase(bloburl, file.name, file.type ).then((url)=>{
                return url
            }).catch(()=>{
                toast({
                    title: "Image Upload failed",
                    status: "error",
                })
                /**
                 * @todo logrocket implementation
                 */
                return null
            })
        })).then((urls)=>{
            const url_strings = urls.filter(e => e !== null) as string[] || []
            const last_image = last(url_strings) as string
            setImageUrls((prev)=>multiple ? [...prev, ...url_strings] : isEmpty(last_image) ? [] : [last_image])
            onChange(multiple ? [...imageUrls, ...url_strings] : last_image  ?? '')
        }).catch(()=>{
            // toasts have already been displayed
            /**
             * @todo logrocket implementation
             */
            
        }).finally(()=>{
            setLoading(false)
        })

        
    }
  return (
    <FormControl isRequired isInvalid={isError} paddingLeft={'22px'} paddingBottom={'10px'}>
        <FormLabel>Upload Image</FormLabel>
        <FormErrorMessage>Upload at least one image</FormErrorMessage>
        <Flex w={'100%'} flexWrap='wrap' flexDirection={"row"} maxH={'300px'} overflowY={'scroll'} justifyContent="flex-start" >
            <Input
                type="file"
                id='vehicle_pictures'
                accept="image/*"
                display='none'
                multiple
                required
                onChange={onImageChange}
            /> 
            <Flex {...FlexRowCenterCenter} border='1px' borderColor={'primary.1000'} borderRadius={'2xl'} borderStyle='dashed' w={24} h={24} padding='2px'>
                <label htmlFor="vehicle_pictures">
                    { loading ? <Spinner
                        thickness="4px"
                        speed="0.65s"
                        color="primary.1000"
                    /> : <Icon as={BiImageAdd} color="primary.1000" w={16} h={16} aria-label='add image'/>}
                </label>
            </Flex>
            
            
            {imageUrls?.map((image, index) => {
                return(
                    <Box key={index} w={110} h={110} position={'relative'} marginBottom={5} marginX={2}>
                        <Image src={image} alt='Vehicle' h={100} w={120} border={'1px'} borderColor='gray.400' rounded={'2xl'}/>
                        <IconButton
                            aria-label="Delete"
                            icon={<DeleteIcon />}
                            size="sm"
                            onClick={() => {
                                onDelete(index)
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