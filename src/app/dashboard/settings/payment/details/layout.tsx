"use client"
import { useDetails } from '@/global-state/useUserDetails';
import { Box, Flex, Text } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
 

function Layout({ children }: { children: ReactNode })  { 
 
    const { firstName, lastName, username } = useDetails((state) => state);
    
    return ( 
        <Flex flexDirection={"column"} height={"full"} width={"full"} >
            <Flex justifyContent={"space-between"} py={"36px"} px={"59px"} width={"full"} alignItems={"center"} >
                <Flex as={"button"} gap={"3"} width={"fit-content"} alignItems={"center"}  >
                    <IoIosArrowBack size="24px" />
                    <Flex gap={"2"} justifyContent={"start"} alignItems={"center"} >
                        <Box width={"46px"} height={"46px"} rounded={"full"} bg={"gray.200"} />
                        <Box>
                            <Text fontSize={"14px"} textAlign={"start"} color={"#353945"} >Hello</Text>
                            <Text fontSize={"17px"} fontWeight={"semibold"} mt={"-3px"} color={"#14131B"} >{firstName+" "+lastName}</Text>
                        </Box>
                    </Flex>
                </Flex>
            </Flex>
            <Box width={"400px"} mx={"auto"} py={"6"} >
                {children}
            </Box>
        </Flex>
    )
}

export default Layout
