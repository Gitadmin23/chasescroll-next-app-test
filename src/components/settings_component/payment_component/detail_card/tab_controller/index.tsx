import { CashoutIcon, FundWalletIcon, MiniTicketIcon } from '@/components/svg'
import { Box, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface Props {
    tab: number,
    setTab: any
}

function TabController(props: Props) {
    const {
        tab,
        setTab
    } = props

    const tab_list = [
        {
            name: "Buy Ticket",
            icon: <MiniTicketIcon />
        },
        {
            name: "Cash Out",
            icon: <CashoutIcon />
        },
        {
            name: "Fund Wallet",
            icon: <FundWalletIcon />
        },
        {
            name: "History",
            icon: <MiniTicketIcon />
        },
    ]

    const router = useRouter()

    const clickHandler =(item: any)=> {
        if(item === 0){ 
            router.replace("/dashboard/event")
        } else {
            setTab(item)
        }
    }

    return (
        <Flex width={"full"} bgColor={"white"} roundedBottom={"6px"} padding={"6px"} justifyContent={"space-around"} >
            {tab_list?.map((item: {
                name: string,
                icon: any
            }, index: number) => {
                return( 
                    <Flex as={"button"} onClick={()=> clickHandler(index)} flexDirection={"column"} alignItems={"center"} fontSize={"12px"} justifyContent={"center"} py={"2"} rounded={"6px"} width={"full"} bgColor={tab === index ? "#12299C" : ""} color={tab === index ? "white" : "#12299C"} borderColor={tab === index ? "white" : "#12299C"} >
                        <Flex width={"40px"} height={"40px"} justifyContent={"center"} alignItems={"center"} border={"1px"} rounded={"full"} >
                            {item?.icon}
                        </Flex>
                        <Text fontWeight={"medium"} mt={"2px"} >{item?.name}</Text>
                    </Flex>
                )
            })}
        </Flex>
    )
}

export default TabController
