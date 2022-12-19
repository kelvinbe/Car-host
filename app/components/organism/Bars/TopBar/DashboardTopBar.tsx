import React, { useState } from 'react'
import { Flex, Text, Avatar, IconButton, Icon, Button, Divider } from "@chakra-ui/react"
import { FlexColStartStart, FlexRowCenterBetween, FlexRowCenterCenter } from '../../../../utils/theme/FlexConfigs'
import { BsChevronDown } from 'react-icons/bs'
import { BiUser } from "react-icons/bi"
import { FiSettings, FiLogOut } from "react-icons/fi"
import DropdownButton from '../../../molecules/Buttons/DropdownButton/DropdownButton'
import useAppAuth from '../../../../hooks/useAppAuth'
import { genGreetingBasedOnTime } from '../../../../utils/utils'

function DashboardTopBar() {
    const [isOpen, setIsOpen] = useState(false)

    const { appSignOut, signOutError, signOutLoading } = useAppAuth()

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

  return (
    <Flex {...FlexRowCenterBetween} zIndex="sticky" flex="1" >
        <Text fontSize="24px" fontWeight="500" >
            {
                genGreetingBasedOnTime("user")
            }
        </Text>
        <Flex {...FlexRowCenterCenter} position="relative"  >
            <Flex bg="transparent" padding="0px" rounded="full" as={Button} onClick={toggleDropdown} {...FlexRowCenterBetween}  >
                <Flex {...FlexRowCenterCenter} padding="2px" marginRight="20px" rounded="full" border="2px solid" borderColor="primary.1000" >
                    <Avatar
                        src="images/avatar.png"
                        size="sm"
                    />
                </Flex>
                <Icon marginRight="20px" as={BsChevronDown} />
            </Flex>
            { isOpen && <Flex zIndex="tooltip" position="absolute" bottom="-190px" right="0px" padding="20px" {...FlexColStartStart} borderRadius={20} background="whiteAlpha.300" backdropFilter="auto" boxShadow={"0px 8px 18px rgba(0, 0, 0, 0.1)"} backdropBlur="15px"  >
                <DropdownButton toggleDropdown={toggleDropdown} icon={BiUser}  >
                    Profile
                </DropdownButton>
                <DropdownButton toggleDropdown={toggleDropdown} icon={FiSettings}  >
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