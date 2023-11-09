import { formatNumber } from '@/utils/numberFormat'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { LiaAngleDownSolid } from 'react-icons/lia'

interface Props {
    ticket: any,
    selectedticket: any
    currency: any,
    setCategory: any
}

function SelectTicket(props: Props) {
    const {
        ticket,
        selectedticket,
        currency,
        setCategory
    } = props

    const [showModal, setShowModal] = React.useState(false)

    const clickHandler = (item: any) => {
        setCategory(item)
        setShowModal(false)
    } 
    
    return (
        <Flex gap={"3"} position={"relative"} alignItems={"center"} justifyContent={"end"} pl={"5"}  >
            <Flex onClick={() => setShowModal(true)} as={"button"} borderColor={"brand.chasescrollBlue"} rounded={"lg"} borderWidth={"1px"} height={"49px"} width={"full"} justifyContent={"center"} alignItems={"center"} >
                <Text fontSize={"sm"} color={"brand.chasescrollBlue"} >
                    {selectedticket?.ticketType ? selectedticket?.ticketType : "Select Ticket Type"}{" "}
                    {selectedticket?.ticketType ? formatNumber(selectedticket?.ticketPrice, currency === "USD" ? "$" : "₦") : ""}
                </Text>
            </Flex>
            <Box width={"fit-content"} >
                <Flex onClick={() => setShowModal(true)} as={"button"} width={"50px"} height={"49px"} rounded={"lg"} justifyContent={"center"} alignItems={"center"} borderColor={"brand.chasescrollBlue"} borderWidth={"1px"} >
                    <LiaAngleDownSolid />
                </Flex>
            </Box>
            {showModal && (
                <Box width={"full"} pl={"5"} borderWidth={"0px"} zIndex={"30"} top={"60px"} position={"absolute"} rounded={"lg"} >
                    <Flex gap={"3"} flexDirection={"column"} shadow={"lg"} width={"full"} borderColor={"#D0D4EB"} padding={"4"} borderBottomWidth={"0px"} bg={"white"} rounded={"lg"}>
                        {ticket?.filter((item: any) => item?.ticketType )?.map((item: any, index: number) => {
                            return (
                                <Button disabled={item?.totalNumberOfTickets === item?.ticketsSold ? true : false} key={index} onClick={() => clickHandler(item)} width={"full"} py={"14px"} borderBottomColor={"#D0D4EB"} rounded={"lg"} borderBottomWidth={"1px"} >
                                    {item?.totalNumberOfTickets === item?.ticketsSold ?
                                        item?.ticketType + " Sold Out" :
                                        item?.ticketType + " " + formatNumber(item?.ticketPrice, currency === "USD" ? "$" : "₦")
                                    }
                                </Button>
                            )
                        })}
                    </Flex>
                </Box>
            )}
            {showModal && (
                <Box onClick={() => setShowModal(false)} bg={"black"} inset={"0px"} position={"fixed"} opacity={"0.25"} zIndex={"20"} />
            )}
        </Flex>
    )
}

export default SelectTicket
