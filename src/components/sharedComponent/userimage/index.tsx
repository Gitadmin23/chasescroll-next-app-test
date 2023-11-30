import CustomText from '@/components/general/Text'
import { useDetails } from '@/global-state/useUserDetails'
import { IMAGE_URL } from '@/services/urls'
import { Box, Flex, HStack, Image, Text, VStack } from '@chakra-ui/react' 
import React from 'react'

interface Props {
    data: any,
    image: any,
    size: any,
    font?: any,
    border?: any,
    fontWeight?: any 
}

function UserImage(props: Props) {
    const {
        data,
        image,
        size,
        font,
        border,
        fontWeight, 
    } = props   

    return (
        <Box roundedBottom={"64px"} roundedTopLeft={"64px"} borderColor={"#D0D4EB"} w={size} h={size} bg={"white"} borderWidth={border? border :"4px"} >
            {image !== null &&
                <>
                    { (image?.includes('http')) && <Image style={{ borderBottomLeftRadius: "64px", borderBottomRightRadius: "64px", borderTopLeftRadius: "64px" }} objectFit="cover" alt={image} width={"full"} height={"full"} src={image?.replace("http://ec2-3-128-192-61.us-east-2.compute.amazonaws.com:8080/resource-api/download/", "https://chaseenv.chasescroll.com/resource-api/download/")} /> } 

                    { !image?.includes('http') && <Image style={{ borderBottomLeftRadius: "64px", borderBottomRightRadius: "64px", borderTopLeftRadius: "64px" }} objectFit="cover" alt={image} width={"full"} height={"full"} src={IMAGE_URL + image} /> }
                </>
            }
            {image === null && (
                <Flex justifyContent={"center"} alignItems={"center"} width={"full"} height={"full"} fontSize={font ? font : "30px"} fontWeight={fontWeight? fontWeight : "bold"} >
                    <Text>{data?.firstName?.charAt(0).toUpperCase()}{data?.lastName?.charAt(0).toUpperCase()}</Text>
                </Flex> 
            )}
        </Box>
    )
}

export default UserImage
