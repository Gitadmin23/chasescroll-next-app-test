"use client"
import WalletTransaction from '@/components/settings_component/card_tabs/fund_wallet/wallet_transaction'
import { Flex, Box, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'

interface Props { }

function Transaction(props: Props) {
    const { } = props

    const router = useRouter()

    return (
        <Flex flexDirection={"column"} height={"full"} width={"full"} overflowY={"auto"} >
            <Flex justifyContent={"space-between"} py={"36px"} px={["6", "59px"]} width={"full"} alignItems={"center"} >

                <Flex onClick={() => router.back()} as={"button"} alignItems={"center"} fontWeight={"700"} fontSize={"20px"} gap={"3"} >
                    <IoIosArrowBack size="24px" />
                    <Text>Transaction History</Text>
                </Flex>
            </Flex> 
            <Box width={["full", "400px"]} mx={"auto"} px={["6", "0px"]} py={"0px"} >
                <WalletTransaction />
            </Box>
        </Flex>
    )
}

export default Transaction
