"use client"
import CardTabs from '@/components/settings_component/card_tabs'
import DetailCard from '@/components/settings_component/detail_card'
import { Box, Flex } from '@chakra-ui/react'
import React from 'react' 

interface Props { }

function PaymentDetails(props: Props) {
    const { } = props

    return ( 
        <Box width={"full"} >
            <DetailCard />
        </Box>
    )
}

export default PaymentDetails
