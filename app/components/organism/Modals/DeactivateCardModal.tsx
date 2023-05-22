import ModalTemplate from "./ModalTemplate";
import React, { useState } from "react";
import { Box, Heading, Select } from "@chakra-ui/react";
import { PayoutMethods } from "../../../globaltypes";
import Rounded from "../../molecules/Buttons/General/Rounded";
import usePayoutMethods from "../../../hooks/usePayoutMethods";

interface IProps{
    isOpen:boolean,
    onClose: () => void,
    userCards: PayoutMethods[] | null
    inactiveCards: PayoutMethods[] | null
}
export default function DeactivateCardModal ({isOpen, onClose, inactiveCards}:IProps) {
    const [selectedCardId, setSelectedCardId] = useState<string>("")
    const {deactivatePayout} = usePayoutMethods()
    const handleSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCardId(e.target.value)
    }
    const deactivateCard = () => {
        const selectedCard = inactiveCards?.find(card => card.id === selectedCardId)
        deactivatePayout(selectedCardId, {
            ...selectedCard,
            status:"ACTIVE"
        })
        onClose()
    }
    return (
        <ModalTemplate headerTitle="Deactivate" isOpen={isOpen} onClose={onClose}>
            <>
                <Heading as='h6' size='xs'>
                    Select a new primary account:
                </Heading>
                <Select mb={4} onChange={handleSelected}>
                    {inactiveCards && inactiveCards.map(card => 
                        <option value={card.id} key={card.id} data-testid={'select'}>{card.connected_account_id}</option>
                    )}
                </Select>
                <Box mb={4}>
                    <Rounded disabled= {selectedCardId !== "" ? false : true} variant='outline' rounded={'full'} fullWidth onClick={deactivateCard}>Activate</Rounded>
                </Box>
            </>
        </ModalTemplate>
    )
}