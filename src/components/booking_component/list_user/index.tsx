import CustomButton from '@/components/general/Button'
import { AddIconWithBorder } from '@/components/svg'
import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {}

function ListUser(props: Props) {
    const {} = props

    return (
        <Box width={"full"} >
            <Flex gap={"4"} overflowX={"auto"} py={"6"} >
                <Box display={"flex"} flexDir={"column"} justifyContent={"center"} alignItems={"center"} bg={"white"} py={"4"} px={"4"} shadow={"lg"} rounded={"32px"} roundedTopRight={"0px"} roundedBottomLeft={"8px"} >
                    <Box width={"70px"}  height={"70px"} rounded={"full"} roundedTopRight={"0px"} bgColor={"gray.300"} >  

                    </Box>
                    <Text fontSize={"xs"} mt={"7px"} >Project Managers</Text>
                </Box>
                <Box display={"flex"} flexDir={"column"} justifyContent={"center"} alignItems={"center"} bg={"white"} py={"4"} px={"4"} shadow={"lg"} rounded={"32px"} roundedTopRight={"0px"} roundedBottomLeft={"8px"} >
                    <Box width={"70px"}  height={"70px"} rounded={"full"} roundedTopRight={"0px"} bgColor={"gray.300"} >  

                    </Box>
                    <Text fontSize={"xs"} mt={"7px"} >Project Managers</Text>
                </Box>
                <Box display={"flex"} flexDir={"column"} justifyContent={"center"} alignItems={"center"} bg={"white"} py={"4"} px={"4"} shadow={"lg"} rounded={"32px"} roundedTopRight={"0px"} roundedBottomLeft={"8px"} >
                    <Box width={"70px"}  height={"70px"} rounded={"full"} roundedTopRight={"0px"} bgColor={"gray.300"} >  

                    </Box>
                    <Text fontSize={"xs"} mt={"7px"} >Project Managers</Text>
                </Box>
                <Box display={"flex"} flexDir={"column"} justifyContent={"center"} alignItems={"center"} bg={"white"} py={"4"} px={"4"} shadow={"lg"} rounded={"32px"} roundedTopRight={"0px"} roundedBottomLeft={"8px"} >
                    <Box width={"70px"}  height={"70px"} rounded={"full"} roundedTopRight={"0px"} bgColor={"gray.300"} >  

                    </Box>
                    <Text fontSize={"xs"} mt={"7px"} >Project Managers</Text>
                </Box>
                <Box display={"flex"} flexDir={"column"} justifyContent={"center"} alignItems={"center"} bg={"white"} py={"4"} px={"4"} shadow={"lg"} rounded={"32px"} roundedTopRight={"0px"} roundedBottomLeft={"8px"} >
                    <Box width={"70px"}  height={"70px"} rounded={"full"} roundedTopRight={"0px"} bgColor={"gray.300"} >  

                    </Box>
                    <Text fontSize={"xs"} mt={"7px"} >Project Managers</Text>
                </Box>
            </Flex>
            <Flex mt={"6"} justifyContent={"space-between"} alignItems={"center"} width={"full"} >
                <Flex gap={"4"} >
                    <CustomButton borderRadius={"8px"} width={"150px"} text='Services' backgroundColor={"#F0F1F2"} color={"#101828B2"} fontSize={"sm"} />
                    <CustomButton borderRadius={"8px"} width={"150px"} text='My Services' backgroundColor={"#5D70F9"} color={"white"} fontSize={"sm"} />
                </Flex>
                <Flex width={"40px"} height={"40px"} rounded={"full"} as={"button"} backgroundColor={"#5D70F9"} justifyContent={"center"} alignItems={"center"} >
                    <AddIconWithBorder />
                </Flex>
            </Flex>
        </Box>
    )
}

export default ListUser
