import { PayStackLogo, StripeLogo } from '@/components/svg'
import { URLS } from '@/services/urls'
import httpService from '@/utils/httpService'
import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { BsChevronLeft } from 'react-icons/bs' 
import PayStackBtn from '../paystack_btn'

interface Props { 
    click: any
    currency: string,
    data: {
        id: string
    },

    close?: any,
    selectedCategory: {
        ticketType: string
    },
    ticketCount: any, 
}

function PaymentType(props: Props) {
    const { 
        click,
        currency,
        close,
        selectedCategory,
        ticketCount,
        data
    } = props

    return (
        <Box width={"full"} bg={"white"} px={"8"} py={"10"} >
            <Flex gap={"4"} alignItems={"center"} >
                <Box onClick={()=> click((prev: any) => prev - 1)} as='button' >
                    <BsChevronLeft color={"black"} size={"25px"} />
                </Box>
                <Text fontSize={"20px"} fontWeight={"bold"} textAlign={"center"} >Payment Options</Text>
            </Flex> 
            {currency !== "NGN" && (
                <Flex as={"button"} justifyContent={"start"} px={"4"} mt={"6"} borderColor={"#D0D4EB"} borderWidth={"1px"} gap={"3"} py={"8"} bg={"#F4F5FA"} rounded={"lg"} alignItems={"center"} >
                    <StripeLogo />
                </Flex>
            )}
            {currency === "NGN" && (
                <PayStackBtn selectedCategory={selectedCategory} datainfo={data} ticketCount={ticketCount} close={()=> close} />
            )}
        </Box>
    )
}

export default PaymentType