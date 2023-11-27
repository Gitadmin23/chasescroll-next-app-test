import { IMAGE_URL } from '@/services/urls'
import { Box, Flex, Image } from '@chakra-ui/react'
import React from 'react'

interface Props {
    image: any,
    height: any
}

function BlurredImage(props: Props) {
    const {
        image,
        height
    } = props

    return (
        <Flex width={"full"} justifyContent={"center"} roundedBottom={"32px"} roundedTopLeft={"32px"} height={height} borderWidth={[ "0px" ,"2px"]} > 
            <Image display={["none", "block"]} style={{ borderBottomLeftRadius: "32px", borderBottomRightRadius: "32px", borderTopLeftRadius: "32px" }} id='img_blur' objectFit={"cover"} backdropFilter={"blur(10px)"} alt={image} width={"full"} height={"full"} src={IMAGE_URL + image} />
            <Box width={["fit-content"]} py={["0px" ,"2"]} position={"absolute"} height={height} >
                <Box width={["fit-content"]} roundedBottom={"32px"} roundedTopLeft={"32px"} height={"full"} borderWidth={"3px"} borderColor={"#D0D4EB"} >
                    <Image style={{ borderBottomLeftRadius: "32px", borderBottomRightRadius: "32px", borderTopLeftRadius: "32px" }} objectFit={"cover"}  alt={image} width={["fit-content"]} height={"full"} src={IMAGE_URL + image} />
                </Box>
            </Box>
        </Flex>
    )
}

export default BlurredImage
