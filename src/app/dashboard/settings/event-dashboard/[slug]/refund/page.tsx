"use client"
import DashboardRefund from '@/components/event_dashboard_component/dashboard_refund'
import { Box, Text } from '@chakra-ui/react'
import React from 'react'

function Page({ params }: { params: { slug: string } }) {

    return (
        <Box width={"full"} py={"8"} >  
            <DashboardRefund index={params?.slug} />
        </Box>
    )
}

export default Page
