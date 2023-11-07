import CustomButton from '@/components/general/Button'
import { Flex, Input, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {}

function FundWallet(props: Props) {
    const {} = props

    return (
        <Flex width={"full"} pt={"8"} flexDirection={"column"} alignItems={"center"} >
            <Text  fontWeight={"semibold"} >Enter Amount</Text>
            <Input width={"full"} textAlign={"center"} borderColor={"transparent"} focusBorderColor="transparent" placeholder='$0.00' fontSize={"20px"} _hover={{color: "transparent"}} />
            <CustomButton text='Fund' marginTop={"8"} backgroundColor={"#12299C"} />
        </Flex>
    )
}

export default FundWallet
