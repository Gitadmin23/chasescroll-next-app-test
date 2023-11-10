import { IMAGE_URL } from '@/services/urls'
import { Box, Flex, Image, Text } from '@chakra-ui/react' 
import React from 'react'

interface Props {
    data: any,
    size: any,
    font?: any,
    border?: any,
    fontWeight?: any
}

function UserImage(props: Props) {
    const {
        data,
        size,
        font,
        border,
        fontWeight
    } = props

    return (
        <Box roundedBottom={"64px"} roundedTopLeft={"64px"} borderColor={"#D0D4EB"} w={size} h={size} bg={"white"} borderWidth={border? border :"5px"} >
            {data?.data?.imgMain?.value &&
                <Image style={{ borderBottomLeftRadius: "64px", borderBottomRightRadius: "64px", borderTopLeftRadius: "64px" }} objectFit="cover" alt={data?.data?.imgMain?.value} width={"full"} height={"full"} src={IMAGE_URL + data?.data?.imgMain?.value} />
            }
            {!data?.data?.imgMain?.value && (
                <Flex justifyContent={"center"} alignItems={"center"} width={"full"} height={"full"} fontSize={font ? font : "30px"} fontWeight={fontWeight? fontWeight : "bold"} >
                    <Text>{data?.firstName?.charAt(0).toUpperCase()}{data?.lastName?.charAt(0).toUpperCase()}</Text>
                </Flex> 
            )}
        </Box> 
    )
}

export default UserImage
