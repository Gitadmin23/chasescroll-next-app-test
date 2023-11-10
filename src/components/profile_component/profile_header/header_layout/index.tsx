import { Box, Flex, Text } from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

interface Props {
    icon: any,
    count: string,
    name: string,
    link: string,
    index?: string
}

function HeaderLayout(props: Props) {
    const {
        icon,
        count,
        name,
        link,
        index
    } = props

    const router = useRouter() 
    const pathname = usePathname(); 
 
    return (
        <Flex as={"button"} onClick={()=> router.replace(link)} color={(pathname?.includes(name.toLocaleLowerCase()) || (pathname === "/dashboard/profile/"+index)) ? "brand.chasescrollBlue" : "#B1B5C3"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} >
            <Text fontSize={["160x", "20px"]} fontWeight={"medium"} color={(pathname?.includes(name.toLocaleLowerCase()) || (pathname === "/dashboard/profile/"+index)) ? "brand.chasescrollBlue" : "black"} >{count ? count : 0}</Text>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} width={"24px"} height={"24px"} >
                {icon}
            </Box>
            <Text fontSize={["12px", "16px"]} >{name}</Text>
        </Flex>
    )
}

export default HeaderLayout
