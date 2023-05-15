import { Box, Flex, Heading, Icon, Input, Spinner, useToast } from '@chakra-ui/react'
import Image from 'next/image'
import React, { useState } from 'react'
import {AiFillCamera} from 'react-icons/ai'
import Rounded from '../../components/molecules/Buttons/General/Rounded'
import { useAppSelector } from '../../redux/store'
import { selectUser } from '../../redux/userSlice'
import { useDisclosure } from '@chakra-ui/react'
import EditProfileModal from '../../components/organism/Modals/EditProfileModal'
import { uploadToFirebase } from '../../utils/utils'
import { IUserProfile } from '../../globaltypes'
import useUsers from '../../hooks/useUsers'
import { isEmpty } from 'lodash'

function Profile() {
    const user:IUserProfile|null = useAppSelector(selectUser)
    const {onOpen, onClose, isOpen} = useDisclosure()
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const {editUserProfile } = useUsers()
    
    const editProfileImage = (e:React.FormEvent) => {
        const fileList = (e.target as HTMLInputElement).files
        const fileListArray = fileList && Array.from(fileList)
        !isEmpty(fileListArray) && setLoading(true)
        fileListArray?.map(file => {
            const bloburl = URL.createObjectURL(file)
            return uploadToFirebase(bloburl, file.name, file.type ).then((url)=>{
                user && editUserProfile({
                    ...user,
                    profile_pic_url: url
                })
                setLoading(false)
                return url
            }).catch((e)=>{
                toast({
                    title: "Image Upload failed",
                    status: "error",
                })
                /**
                 * @todo logrocket implementation
                 */
                setLoading(false)
                return null
            })
        })
    }
  return (
    <Flex justifyContent={'space-between'}>
        {user && <EditProfileModal isOpen={isOpen} onClose={onClose} user={user}/>}
        <Box>
            <Box position='relative'>
                {user && 
                    <Image src={user?.profile_pic_url} width={220} height={220} alt={"User's profile image"} style={{borderRadius:'50%', border:"1px solid #E63B2E"}}/>
                }
                <Input type="file" id='profile_image' accept="image/*" display='none' onChange={editProfileImage}/>
                <label htmlFor="profile_image">
                    {loading ? <Spinner
                        thickness="4px"
                        speed="0.65s"
                        color="#E63B2E"
                    /> : <Icon bg={'transparent'} position='absolute' bottom={0} right={0} as={AiFillCamera} color={'#E63B2E'} width={10} height={10}/>}
                </label>
            </Box>
        </Box>
        <Box width={'78%'}>
            <Heading as='h4' size='md' mb={1}>User Details</Heading>
            <Flex marginY={5} flexDirection='column'>
                <Heading as='h4' size='sm'>
                    Name:
                </Heading>
                <Box bg='#fff' w='100%' p={4} color='black' mt={2}>
                    {user?.fname} {user?.lname}
                </Box>
            </Flex>
            <Flex marginY={5} flexDirection='column'>
                <Heading as='h4' size='sm'>
                    Email:
                </Heading>
                <Box bg='#fff' w='100%' p={4} color='black' mt={2}>
                    {user?.email}
                </Box>
            </Flex>
            <Flex marginY={5} flexDirection='column'>
                <Heading as='h4' size='sm'>
                    Phone Number:
                </Heading>
                <Box bg='#fff' w='100%' p={4} color='black' mt={2}>
                    {user?.phone}
                </Box>
            </Flex>
            <Flex marginY={5} flexDirection='column'>
                <Heading as='h4' size='sm'>
                    User handle:
                </Heading>
                <Box bg='#fff' w='100%' p={4} color='black' mt={2}>
                    {user?.handle}
                </Box>
            </Flex>
            <Rounded variant={'solid'} setWidth={'150px'} rounded={'md'} onClick={onOpen}>Edit</Rounded>
        </Box>
    </Flex>
  )
}

export default Profile

export function getStaticProps() {
    return {
        props: {
            adminonly: false,
            authonly: true,
            dashboard: true
        }
    }
}
