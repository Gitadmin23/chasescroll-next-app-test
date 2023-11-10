
import { Box, Flex, Link, Text } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { BsChevronLeft } from 'react-icons/bs'

function Layout({ children }: {
    children: ReactNode
}) {

    return (
        <Box width={"full"} position={"relative"} overflowY={"auto"} >
            <Box width={"full"} top={"0px"} zIndex={"50"} position={"sticky"} >
                <Flex height={"30px"} width={"full"} alignItems={"center"} justifyContent={"center"} position={"relative"} >
                    <Link href='/dashboard/event' display={"flex"} px={"3"} height={"full"} left={"0px"} justifyContent={"center"} alignItems={"center"} position={"absolute"} zIndex={"10"} >
                        <BsChevronLeft size={"25px"} />
                    </Link>
                    <Text fontWeight={"bold"} fontSize={"20px"} >Edit Events</Text>
                </Flex>
            </Box>
            <Box flex={1} pb={["16","16","16","16","0px"]} >
                {children}
            </Box>
        </Box>
    )
}

export default Layout
