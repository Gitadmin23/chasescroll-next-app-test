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
        <Box display={'inline'} roundedBottom={"64px"} roundedTopLeft={"64px"} borderColor={"#D0D4EB"} w={size} h={size} bg={"white"} borderWidth={border? border :"4px"} >
            {image !== null &&
                <>
                    { image?.includes('https://') && <Image style={{ borderBottomLeftRadius: "64px", borderBottomRightRadius: "64px", borderTopLeftRadius: "64px" }} objectFit="cover" alt={image} width={"full"} height={"full"} src={image} /> }

                    { !image?.includes('https://') && <Image style={{ borderBottomLeftRadius: "64px", borderBottomRightRadius: "64px", borderTopLeftRadius: "64px" }} objectFit="cover" alt={image} width={"full"} height={"full"} src={IMAGE_URL + image} /> }
                </>
            }
            {image === null && (
                <HStack justifyContent={"center"} alignItems={"center"} width={"100%"} height={"100%"} >
                    <CustomText fontFamily={'DM-Bold'} fontSize={'14px'} >{data?.firstName?.charAt(0).toUpperCase()}{data?.lastName?.charAt(0).toUpperCase()}</CustomText>
                </HStack> 
            )}
        </Box> 
    )
}

export default UserImage
