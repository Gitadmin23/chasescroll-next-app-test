"use client"
import CardTabs from '@/components/settings_component/payment_component/card_tabs' 
import DetailCard from '@/components/settings_component/payment_component/detail_card'
import useCustomTheme from '@/hooks/useTheme'
import { Box, Flex, useColorMode } from '@chakra-ui/react'
import React from 'react' 

interface Props { }

function PaymentDetails(props: Props) {
    const { } = props

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    return ( 
        <Box width={"full"} bg={secondaryBackgroundColor} pb={'6px'} borderRadius={'10px'} >
            <DetailCard />
        </Box>
    )
}

export default PaymentDetails