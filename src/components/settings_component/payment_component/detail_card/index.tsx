"use client"
import { Box, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import UserWalletAmount from './user_wallet_amount'
import TabController from './tab_controller'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io' 
import useSettingsStore from '@/global-state/useSettingsState'
import CardTabs from '../card_tabs'

interface Props { 

}

function DetailCard(props: Props) {
    const { } = props

    const [showEscrow, setShowEscrow] = useState(false)    
    const [tab, setTab] = React.useState(2)
    // const [currency, setCurrency] = useState("NGN")

    const { currency } = useSettingsStore((state) => state);

    return (
        <Box> 
            <Box width={"full"} padding={"2px"} rounded={"6px"} bgColor={"#12299C"} >
                <Flex justifyContent={"space-between"} >
                    <Flex as={"button"} color={"#12299C"} bg={"white"} roundedTopLeft={"6px"} roundedBottomRight={"12px"} fontWeight={"bold"} px={"10px"} py={"3px"} >
                        Balance
                    </Flex>
                    <Flex onClick={() => setShowEscrow((prev) => !prev)} as={"button"} roundedTopRight={"6px"} roundedBottomLeft={"12px"} color={showEscrow ? "white" : "#12299C"} bg={showEscrow ? "" : "white"} alignItems={"center"} fontWeight={"bold"} gap={"2px"} px={"10px"} py={"3px"} >
                        {!showEscrow && (
                            <IoIosArrowBack size="16px" />
                        )}
                        {showEscrow ? "Escrow" : "Wallet"}
                        {showEscrow && (
                            <IoIosArrowForward size="16px" />
                        )}
                    </Flex>
                </Flex>
                <UserWalletAmount showEscrow={showEscrow} currency={currency} />
                <TabController tab={tab} setTab={setTab} />
            </Box> 
            <CardTabs tab={tab} currency={currency} />
        </Box>
    )
}

export default DetailCard