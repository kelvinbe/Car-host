import { Avatar, Button, Flex, FormControl, FormLabel, Input, Select, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FlexColStartCenter, FlexRowCenterBetween, FlexRowCenterEnd } from '../../../utils/theme/FlexConfigs'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { fetchEmulationUser, selectEmulationFeedback } from '../../../redux/emulationSlice'
import { selectUser } from '../../../redux/userSlice'

interface IProps {
    refetch?: () => void
}

function EmulationDeck(props: IProps) {
    const { refetch } = props
    const user = useAppSelector(selectUser)
    const dispatch = useAppDispatch()
    const feedback = useAppSelector(selectEmulationFeedback)
    const toast = useToast({
        position: "top",
    })
    
    const [search_type, set_search_type] = useState<"email" | "uid" | "user_id" | "handle">("email")
    const [current_id, set_current_id] = useState<string>("")
    
    const handleSearch = () => {
        dispatch(fetchEmulationUser({
            id: current_id,
            type: search_type
        })).unwrap()
        .then(()=>{
            refetch?.()
        }).catch(()=>{
            toast({
                title: "Something went wrong",
                description: "Is the search value valid?",
                colorScheme: "red",
                status: "error",
            })
        })
    }
    if (user?.is_admin) return (
        <Flex {...FlexRowCenterBetween} 
            sx={{
                w: "full",
                px: "10px",
                py: "20px",
                rounded: "md",
                mb: "20px"
            }}
            backgroundColor={"blue.100"}
        >
            <div className="flex flex-col items-start justify-start space-y-2">
                <FormControl
                    isDisabled={feedback.loading}
                >
                    <FormLabel
                        m="0px" px="0px"
                        fontSize="sm"
                        fontWeight="bold"
                    >
                        Search Type
                    </FormLabel>
                    <Select
                        size="sm"
                        value={search_type}
                        onChange={(e) => set_search_type(e.target.value as any)}
                        bg="gray.100"
                        placeholder="select search type"
                    >
                        <option value="email">Email</option>
                        <option value="uid">UID</option>
                        <option value="user_id">User ID</option>
                        <option value="handle">Handle</option>
                    </Select>
                </FormControl>
                <FormControl 
                    {...FlexColStartCenter}
                    isDisabled={feedback.loading}
                >
                    <FormLabel
                        m="0px" px="0px"
                        fontSize="sm"
                        fontWeight="bold"
                    >
                        Emulate User
                    </FormLabel>
                    <Input 
                        bg="gray.100" 
                        placeholder={`Enter user's ${search_type}`}  
                        onChange={(e) => set_current_id(e.target.value)}
                        value={current_id}
                    />
                    <Button 
                        colorScheme='red' 
                        variant={"solid"} 
                        mt="20px" 
                        rounded="full"  
                        isLoading={feedback.loading}
                        onClick={handleSearch}
                    >Emulate</Button>
                </FormControl>
            </div>
            <Flex
            w="50%"
            >
                {feedback?.data && <Flex
                    {...FlexColStartCenter}
                >
                    <div className="flex flex-row items-center justify-start space-x-2">
                        <Avatar
                            src={feedback?.data?.profile_pic_url}
                            size="sm"
                            name={feedback?.data?.fname ? `${feedback?.data?.fname} ${feedback?.data?.lname??""}` : feedback?.data?.email}
                        />

                        <Text
                            fontWeight="bold"
                            fontSize="medium"
                        >
                            {
                                feedback?.data?.fname ? `${feedback?.data?.fname} ${feedback?.data?.lname??""}` : feedback?.data?.email
                            }
                        </Text>
                    </div>

                    <Text
                        fontWeight="medium"
                        fontSize="sm"
                        mt="5px"
                    >
                        You are currently emulating <strong>{feedback?.data?.handle}</strong>
                    </Text>
                </Flex>}
            </Flex>
        </Flex>
    )

    return null
}

export default EmulationDeck