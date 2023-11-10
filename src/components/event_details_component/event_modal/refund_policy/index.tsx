import CustomButton from '@/components/general/Button'
import EventLocationDetail from '@/components/sharedComponent/event_location'
import EventImage from '@/components/sharedComponent/eventimage'
import useStripeStore from '@/global-state/useStripeState'
import { Box, Button, Checkbox, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsChevronLeft } from 'react-icons/bs'

interface Props {
    data: any  
}

function RefundPolicy(props: Props) {
    const {
        data,  
    } = props

    const [checked, setChecked] = useState(false)
    const { setModalTab, modalTab } = useStripeStore((state) => state);

    return (
        <Box width={"full"} bg={"white"} px={"8"} py={"10"} >  
            <Flex alignItems={"center"} gap={"4"} borderBottom={"1px dashed black "} py={"2"} > 
                <Box onClick={()=> setModalTab(modalTab -1)} as='button' width={"fit-content"} mb={"auto"} mt={"3"} >
                    <BsChevronLeft color={"black"} size={"25px"} />
                </Box>
                <EventImage width={"153px"} height={"101px"} data={data} />
                <Box>
                    <Text fontSize={"17px"} fontWeight={"bold"} >{data?.eventName}</Text>
                    <EventLocationDetail location={data?.location} fontWeight={"medium"} color={"brand.chasescrollBlue"} fontsize='sm' noicon={true} locationType={data?.locationType} />
                </Box>
            </Flex>
            <Box display={"flex"} fontWeight={"medium"} flexDirection={"column"} fontSize={"sm"} px={"3"} py={"5"} >
                <Text fontSize={"24px"} fontWeight={"bold"} textAlign={"center"} >Chasescroll Refund<br /> Policy</Text>
                <Text my={"3"} color={"#00000080"} >
                    Payment has been debited from your account but would be credited to the Organizers account after a 3- days waiting period. You  have the Right to cancel Ticket or payment only within this wait period. Your barcode would be added to your ticket after the wait period is over.
                </Text>
                <Flex alignItems={"start"} gap={"2"} fontWeight={"medium"} fontSize={"12px"} >
                    <Checkbox isChecked={checked} onChange={(e) => setChecked(e.target.checked)} size={"sm"} mt={"4px"} />
                    <Text color={"#10182880"} >By clicking this box, you hereby accept the <span style={{ color: "#5D70F9", fontWeight: "bold" }} >Chasescroll refund policy</span></Text>
                </Flex>
            </Box> 
            <CustomButton disable={!checked} onClick={()=> setModalTab(modalTab +1)} text='View Ticket' width={["full", "full"]} mt={"4"} />
        </Box>
    )
}

export default RefundPolicy
