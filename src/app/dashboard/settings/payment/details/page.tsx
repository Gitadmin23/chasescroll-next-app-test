"use client"
import CardTabs from '@/components/settings_component/payment_component/card_tabs'
import DetailCard from '@/components/settings_component/payment_component/detail_card'
import { Box, Flex } from '@chakra-ui/react'
import React from 'react' 

interface Props { }

function PaymentDetails(props: Props) {
    const { } = props

    const [tab, setTab] = React.useState(0)

    return ( 
        <Box width={"full"} >
            <DetailCard tab={tab} setTab={setTab} />
            <CardTabs tab={tab} />
        </Box>
    )
}

export default PaymentDetails
