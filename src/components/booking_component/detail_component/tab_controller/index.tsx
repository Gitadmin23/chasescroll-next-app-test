import { Box, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface Props {
    activeTab: number;
    setActiveTab: (active: number) => void
}

function TabController(props: Props) {
    const { activeTab, setActiveTab } = props;
    const Router = useRouter()

    return (
        <Flex width={"full"} mt={"4"} gap={"60px"}  borderBottomColor={"#00000059"} borderBottomWidth={"1px"} >
            <Box  onClick={()=> setActiveTab(1)} as='button' borderBottomWidth={"3px"} pb={"1px"} color={activeTab === 1 ? "black" : "#101828B2"} borderBottomColor={activeTab === 1  ? "brand.chasescrollButtonBlue" : "transparent"} >
                BOOKING
            </Box>
            <Box onClick={()=> setActiveTab(2)} as='button' borderBottomWidth={"3px"} pb={"1px"} color={activeTab === 2 ? "black" : "#101828B2"} borderBottomColor={activeTab === 2 ? "brand.chasescrollButtonBlue" : "transparent"} >
                PORTFOLIO
            </Box>
            <Box onClick={()=> setActiveTab(3)} as='button' borderBottomWidth={"3px"} pb={"1px"} color={activeTab === 3 ? "black" : "#101828B2"} borderBottomColor={activeTab === 3 ? "brand.chasescrollButtonBlue" : "transparent"} >
                DETAILS
            </Box>
            <Box onClick={()=> setActiveTab(4)} as='button' borderBottomWidth={"3px"} pb={"1px"} color={activeTab === 4 ? "black" : "#101828B2"} borderBottomColor={activeTab === 4 ? "brand.chasescrollButtonBlue" : "transparent"} >
                REVIEWS
            </Box>
        </Flex>
    )
}

export default TabController
