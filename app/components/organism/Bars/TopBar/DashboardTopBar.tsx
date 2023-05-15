import React, { useState } from 'react'
import { Flex, Text, Avatar, IconButton, Icon, Button, Divider } from "@chakra-ui/react"
import { FlexColStartStart, FlexRowCenterBetween, FlexRowCenterCenter } from '../../../../utils/theme/FlexConfigs'
import { BsChevronDown } from 'react-icons/bs'
import { BiUser } from "react-icons/bi"
import { FiSettings, FiLogOut } from "react-icons/fi"
import DropdownButton from '../../../molecules/Buttons/DropdownButton/DropdownButton'
import useAppAuth from '../../../../hooks/useAppAuth'
import { genGreetingBasedOnTime } from '../../../../utils/utils'
import { useAppSelector } from '../../../../redux/store'
import { selectUser } from '../../../../redux/userSlice'
import { useRouter } from 'next/router'

function DashboardTopBar() {
    const [isOpen, setIsOpen] = useState(false)
    const {push} = useRouter()

    const { appSignOut, signOutError, signOutLoading } = useAppAuth()
    const user = useAppSelector(selectUser)
    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }
    const moveToSettings = () => {
        push("/settings")
    }
    const moveToProfile = () => {
        push("/profile")
    }

  return (
    <Flex {...FlexRowCenterBetween} zIndex="sticky" flex="1" >
        <Text fontSize="24px" fontWeight="500" >
            {
                genGreetingBasedOnTime(user?.handle ?? "user")
            }
        </Text>
        <Flex {...FlexRowCenterCenter} position="relative"  >
            <Flex bg="transparent" padding="0px" rounded="full" as={Button} onClick={toggleDropdown} {...FlexRowCenterBetween} data-testid={'top-bar'}>
                <Flex {...FlexRowCenterCenter} padding="2px" marginRight="20px" rounded="full" border="2px solid" borderColor="primary.1000" >
                    <Avatar
                        src={user?.profile_pic_url}
                        size="sm"
                    />
                </Flex>
                <Icon marginRight="20px" as={BsChevronDown} />
            </Flex>
            { isOpen && <Flex zIndex="tooltip" position="absolute" bottom="-190px" right="0px" padding="20px" {...FlexColStartStart} borderRadius={20} background="whiteAlpha.300" backdropFilter="auto" boxShadow={"0px 8px 18px rgba(0, 0, 0, 0.1)"} backdropBlur="15px"  >
                <DropdownButton toggleDropdown={toggleDropdown} icon={BiUser} onClick={moveToProfile}>
                    Profile
                </DropdownButton>
                <DropdownButton toggleDropdown={toggleDropdown} icon={FiSettings} onClick={moveToSettings} >
                    Settings
                </DropdownButton>
                <Divider width={166} borderColor="gray.300" marginY="10px" />
                <DropdownButton onClick={appSignOut} icon={FiLogOut}  >
                    Logout
                </DropdownButton>
            </Flex>}
        </Flex>
        
    </Flex>
  )
}

export default DashboardTopBar