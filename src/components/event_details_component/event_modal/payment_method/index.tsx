import { DebitCardIcon } from '@/components/svg'
import useStripeStore from '@/global-state/useStripeState'
import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { BsChevronLeft } from 'react-icons/bs' 

function PaymentMethod() { 

    const { configData, clientSecret, setModalTab, modalTab } = useStripeStore((state) => state);

    return (
        <Box width={"full"} bg={"white"} px={"8"} py={"10"} >
            <Flex gap={"4"} alignItems={"center"} > 
                <Box onClick={()=> setModalTab(modalTab - 1)} as='button' > 
                    <BsChevronLeft color={"black"} size={"25px"} />
                </Box>
                <Text fontSize={"20px"} fontWeight={"bold"} textAlign={"center"} >Select Payment method</Text>
            </Flex>
            <Flex onClick={()=> setModalTab(modalTab + 1)} as='button' width={"full"} justifyContent={"start"} px={"4"} mt={"6"} borderColor={"#D0D4EB"} borderWidth={"1px"} gap={"3"} py={"8"} bg={"#F4F5FA"} rounded={"lg"} alignItems={"center"} >
                <DebitCardIcon />
                <Text fontWeight={"bold"} >Pay with Card</Text>
            </Flex> 
        </Box>
    )
}

export default PaymentMethod
