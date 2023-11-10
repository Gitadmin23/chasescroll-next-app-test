// import CustomButton from '@/components/Form/CustomButton'
import CustomButton from '@/components/general/Button'
import EventLocationDetail from '@/components/sharedComponent/event_location'
import EventImage from '@/components/sharedComponent/eventimage'
import { AddIcon, SubtractIcon } from '@/components/svg'
import { URLS } from '@/services/urls'
import httpService from '@/utils/httpService'
import { formatNumber } from '@/utils/numberFormat'
import { Box, Flex, Text, useToast } from '@chakra-ui/react'
import config, { setConfig } from 'next/config'
import React, { useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query'

interface Props {
    data: any,
    selectedTicket: {
        ticketPrice: number,
        minTicketBuy: number,
        maxTicketBuy: number,
        totalNumberOfTickets: number,
        ticketCount: number,
        ticketType: string,
    },
    numbOfTicket: any, 
    setNumberOfTicket: any,
    next: any,
    close: any
}

function SelectTicketNumber(props: Props) {
    const {
        data,
        selectedTicket,
        next,
        numbOfTicket, 
        setNumberOfTicket,
        close
    } = props

    const serviceFee = 1.77 

    let price = selectedTicket?.ticketPrice * numbOfTicket
    let service = price * 0.025


    const queryClient = useQueryClient()   
    const toast = useToast()
    let usdtotal = ((((selectedTicket?.ticketPrice * numbOfTicket) * 1.025) + 0.39) / (1 - 0.059))
    let nairatotal = ((((selectedTicket?.ticketPrice * numbOfTicket) * 1.025) + 100) / (1 - 0.039))
    let nairatotalnew = ((((selectedTicket?.ticketPrice * numbOfTicket) * 1.025)) / (1 - 0.039))

    const createTicket = useMutation({
        mutationFn: (data: any) => httpService.post(URLS.CREATE_TICKET, data),
        onSuccess: (data: any) => {  
            toast({
                title: 'Success',
                description: "Ticket Created",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });  
            queryClient.invalidateQueries(['all-events-details'+data.id]) 
            close(false)
        },
        onError: (error) => { 
            console.log(error);
            toast({
                title: 'Error',
                description: "Error Creating Ticket",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });  
        },
    });


    const clickHandler = () => {
        if (selectedTicket?.ticketType === "Free") { 
            createTicket.mutate({
                eventID: data?.id ,
                ticketType: selectedTicket?.ticketType,
                numberOfTickets: numbOfTicket
            })
        } else {
            next(2) 
        }
    }


    return (
        <Box width={"full"} bg={"white"} px={"8"} py={"10"} >
            <Flex alignItems={"center"} gap={"4"} >
                <EventImage width={"153px"} height={"101px"} data={data} />
                <Box>
                    <Text fontSize={"17px"} fontWeight={"bold"} >{data?.eventName}</Text>
                    <EventLocationDetail location={data?.location} fontWeight={"medium"} color={"brand.chasescrollBlue"} fontsize='sm' noicon={true} locationType={data?.locationType} />
                </Box>
            </Flex>
            <Flex flexDirection={"column"} py={"5"} alignItems={"center"} >
                <Text color={"#667085"} >
                    Number of Tickets
                </Text>
                <Flex gap={"5"} alignItems={"center"} py={"1"}  >
                    <Box onClick={() => setNumberOfTicket((prev: any) => prev - 1)} as='button' >
                        <SubtractIcon />
                    </Box>
                    {numbOfTicket}
                    <Box onClick={() => setNumberOfTicket((prev: any) => prev + 1)} as='button' >
                        <AddIcon />
                    </Box>
                </Flex>
                <Box width={"full"} pt={"7"} display={"flex"} flexDirection={"column"} gap={"3"} fontWeight={"medium"} fontSize={"sm"} px={"5"} >
                    <Text >VIP Ticket  [{numbOfTicket}]</Text>
                    <Flex justifyContent={"space-between"} >
                        <Text>Ticket Price</Text>
                        <Text>{formatNumber(price, data?.currency === "USD" ? "$" : "₦")}</Text>
                    </Flex>
                    <Flex justifyContent={"space-between"} >
                        <Text>Service Fee</Text>
                        <Text>{formatNumber(service, data?.currency === "USD" ? "$" : "₦")}</Text>
                    </Flex>
                    <Flex justifyContent={"space-between"} >
                        <Text>Processing Fee</Text>
                        <Text>{selectedTicket?.ticketType === "Free" ? data?.currency === "USD" ? "$0" : "₦0" : formatNumber((data?.currency === "USD" ? usdtotal - price - service : (nairatotal < 2500 ? nairatotalnew : nairatotal) - price - service), data?.currency === "USD" ? "$" : "₦")}</Text>
                    </Flex>
                    <Flex justifyContent={"space-between"} >
                        <Text>Total</Text>
                        <Text>{selectedTicket?.ticketType === "Free" ? data?.currency === "USD" ? "$0" : "₦0" : formatNumber((data?.currency === "USD" ? usdtotal : (nairatotal < 2500 ? nairatotalnew : nairatotal)), data?.currency === "USD" ? "$" : "₦")}</Text>
                    </Flex>
                    <CustomButton isLoading={createTicket?.isLoading} onClick={clickHandler} text='Pay now' width={["full", "full"]}  /> 
                </Box>
            </Flex>
        </Box>
    )
}

export default SelectTicketNumber
