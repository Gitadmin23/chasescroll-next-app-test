import React from 'react'
import { Flex, Text, Input } from '@chakra-ui/react'
import CashoutBtn from './cashout_btn'
import useSettingsStore from '@/global-state/useSettingsState'

interface Props {
    currency: string
}

function CashOut(props: Props) {
    const {
        currency
    } = props 

    const { amount, setAmount } = useSettingsStore((state) => state); 

    return (
        <Flex width={"full"} pt={"8"} flexDirection={"column"} alignItems={"center"} >
            <Text fontWeight={"semibold"} >Enter Amount</Text>
            <Input value={amount} onChange={(e) => setAmount(e.target.value)} width={"full"} type='number' textAlign={"center"} borderColor={"transparent"} focusBorderColor="transparent" placeholder={currency === "USD" ? '$0.00' : "₦0.00"} fontSize={"20px"} _hover={{ color: "black" }} />
            <CashoutBtn currency={currency} amount={amount}  />
        </Flex>
    )
}

export default CashOut
