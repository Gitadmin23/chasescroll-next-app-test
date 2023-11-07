import { ClosedEyeIcon, EyeIcon, OpenEyeIcon } from '@/components/svg'
import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

interface Props { 
    showEscrow: boolean
    currency?: string
}

function UserWalletAmount(props: Props) {
    const { 
        showEscrow,
        currency
    } = props

    const [showText, setShowText] = React.useState(false)

    return ( 
        <Flex flexDirection={"column"} maxWidth={"full"} color={"white"} alignItems={"center"} py={"20px"} >
            <Flex justifyContent={"space-between"} gap={"3"} alignItems={"center"} >
                <Text fontSize={"lg"} fontWeight={"medium"} >Total</Text>
                <Box as={"button"} onClick={()=> setShowText((prev) => !prev)} > 
                    {!showText ? <ClosedEyeIcon /> : <OpenEyeIcon />}
                </Box>
            </Flex>
            <Text fontSize={"xl"} fontWeight={"bold"} >$ {showText ? "187,242.45" : "****"}</Text>
        </Flex>
    )
}

export default UserWalletAmount
