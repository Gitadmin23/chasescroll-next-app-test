"use client"
import { Flex } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'

interface Props { }

function PaymentPage(props: Props) {
    const { } = props

    const router = useRouter()

    const PaymentPageList = [
        {
            name: "Payment Details",
            route: "/details"
        },
        {
            name: "Transaction History",
            route: "/"
        }
    ]

    return (
        <Flex  px={"20px"} py={"30px"} overflowY={"auto"} width={"full"} flexDirection={"column"} > 
            <Flex onClick={() => router.back()} as={"button"} alignItems={"center"} fontWeight={"700"} fontSize={"20px"} gap={"3"} >
                <IoIosArrowBack size="24px" />
                Payments
            </Flex>

            <Flex mt={"6"} px={"6"} gap={"2"} flexDirection={"column"} >
                {PaymentPageList?.map((item: {
                    name: string; 
                    route?: any
                }, index: number) => {
                    return (
                        <Flex key={index} onClick={()=> router.replace("/dashboard/settings/payment"+item?.route)} as={"button"} borderBottomWidth={"1px"} px={"4"} alignItems={"center"} color={"black"} fontSize={"15px"} py={"3"} gap={"1"}  >
                            {item?.name}
                        </Flex>
                    )
                })}
            </Flex>
        </Flex>
    )
}

export default PaymentPage
