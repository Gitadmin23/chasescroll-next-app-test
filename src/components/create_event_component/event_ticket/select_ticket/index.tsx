import CustomButton from '@/components/general/Button';
import useEventStore from '@/global-state/useCreateEventState';
import { Box, Flex, Input, Select, useToast } from '@chakra-ui/react'
import React from 'react'

interface Props { }

function SelectTicket(props: Props) {
    const { } = props

    const { eventdata, updateEvent } = useEventStore((state) => state);
    const toast = useToast()

    const handleChange = (index: any, name: any, value: any) => {
        let clone: any = { ...eventdata }
        if (clone.productTypeData.length - 1 < index) {
            clone.productTypeData = [...clone.productTypeData, {
                totalNumberOfTickets: null,
                ticketPrice: null,
                ticketType: "",
                minTicketBuy: null,
                maxTicketBuy: null
            },]
        }
        clone.productTypeData[index][name] = value

        updateEvent(clone)
    };



    const handleChangeCurrency = ({ target: { name, value, type } }: any) => {
        if (name === "isPublic" || name === "attendeesVisibility") {
            updateEvent({
                ...eventdata,
                [name]: value === "true" ? true : false
            });
        } else {
            updateEvent({
                ...eventdata,
                [name]: value
            });
        }
    };

    const handleMaxTicket = (index: number, name: string, value: any) => {
        if (Number(eventdata.productTypeData[index]?.totalNumberOfTickets) >= (value)) {
            handleChange(index, name, value)
        } else {
            if (name === "minTicketBuy") {
                toast({
                    status: "error",
                    title: "Error",
                    description: "minimum ticket can't be greater than total number of ticket",
                    position:"top-right"
                })
            } else {
                toast({
                    status: "error",
                    title: "Error",
                    description: "maximum ticket can't be greater than total number of ticket",
                    position:"top-right"
                })
            }
        }
    }

    const HandleDeleteTicket = (item: any) => {

        let myArr: any = [...eventdata?.productTypeData]

        var index = myArr.findIndex(function (o: any) {
            return o.ticketType === item;
        })
        myArr.splice(index, 1);
        updateEvent({
            ...eventdata,
            productTypeData: myArr
        })
    }

    const HandleAddTicket = (index: any) => {

        let myArr: any = [...eventdata?.productTypeData]
        myArr[index] = {
            totalNumberOfTickets: null,
            ticketPrice: null,
            ticketType: "",
            minTicketBuy: null,
            maxTicketBuy: null
        } 
        updateEvent({
            ...eventdata,
            productTypeData: myArr
        })
    }

    return (
        <Flex flexDirection={"column"} gap={"4"} width={"full"} >
            {eventdata.productTypeData?.map((item: any, index: number) => {
                return (
                    <Flex width={"full"} flexDirection={"column"} border={"1px solid #E2E8F0"} roundedBottom={"3xl"} roundedTopLeft={"3xl"} p={"6"} gap={"4"} key={index + item} >
                        <Flex width={"full"} flexDir={["column", "column", "row"]} gap={"3"} >
                            <Box width={"full"}>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Enter Ticket Name
                                </label>
                                <Flex >
                                    <Input
                                        h={"45px"}
                                        type="text"
                                        border={"1px solid #E2E8F0"} 
                                        focusBorderColor={"#E2E8F0"} 
                                        placeholder="Enter Name"
                                        disabled={eventdata.productTypeData[index]?.ticketType === "Free" ? true : false}
                                        value={eventdata.productTypeData[index]?.ticketType}
                                        name="ticketType"
                                        onChange={e => handleChange(index, "ticketType", e.target.value)}
                                    />
                                </Flex>
                            </Box>
                            <Box width={"full"} >
                                <label className="block text-gray-700 font-medium mb-2">
                                    Enter Price
                                </label>
                                <Flex gap={"2"} >
                                    <Input
                                        h={"45px"}
                                        type="number"
                                        width={"full"}
                                        border={"1px solid #E2E8F0"}                                
                                        focusBorderColor={"#E2E8F0"} 
                                        placeholder="Enter amount"
                                        value={eventdata.productTypeData[index]?.ticketPrice}
                                        disabled={eventdata.productTypeData[index]?.ticketType === "Free" ? true : false}
                                        name="ticketPrice"
                                        onChange={e => handleChange(index, "ticketPrice", e.target.value)}
                                    />
                                </Flex>
                            </Box>
                        </Flex>
                        <Box width={"full"} >
                            <label className="block text-gray-700 font-medium mb-2">
                                Indicate total number of tickets available to be sold for your
                                events
                            </label>
                            <Input
                                h={"45px"}
                                type="number"
                                border={"1px solid #E2E8F0"} 
                                focusBorderColor={"#E2E8F0"} 
                                placeholder=" Type in available quantity"
                                // value={eventdata.totalTicketAvailable}
                                value={eventdata.productTypeData[index]?.totalNumberOfTickets}
                                name="totalNumberOfTickets"
                                onChange={e =>
                                    handleChange(index, "totalNumberOfTickets", e.target.value)
                                }
                            />
                        </Box>
                        <Flex flexDirection={"column"} gap={"4"} width={"full"} >
                            <label className="block text-gray-700 font-medium mb-2">
                                Indicate the minimum and maximum number of tickets each user can
                                purchase for your event
                            </label>
                            <Input
                                h={"45px"}
                                type="number"
                                border={"1px solid #E2E8F0"} 
                                focusBorderColor={"#E2E8F0"} 
                                placeholder="Type in minimum no of Tickets"
                                value={eventdata.productTypeData[index]?.minTicketBuy}
                                name="minTicketBuy"
                                onChange={e => handleMaxTicket(index, "minTicketBuy", e.target.value)} />
                            <Input
                                h={"45px"}
                                type="number"
                                border={"1px solid #E2E8F0"}  
                                focusBorderColor={"#E2E8F0"} 
                                placeholder="Type in maximum no. of Tickets"
                                value={eventdata.productTypeData[index]?.maxTicketBuy}
                                name="maxTicketBuy"
                                onChange={e => handleMaxTicket(index, "maxTicketBuy", e.target.value)} />
                        </Flex>
                        {eventdata.productTypeData[index]?.ticketType && (
                            <>
                                {index !== 0 && (
                                    <CustomButton onClick={() => HandleDeleteTicket(eventdata.productTypeData[index]?.ticketType)} backgroundColor={"brand.chasescrollRed"} width={"fit-content"} text='Remove Ticket' /> 
                                )}
                            </>
                        )}

                    </Flex>
                )
            })}

            {eventdata.productTypeData[0]?.ticketType !== "Free" && (
                <CustomButton onClick={() => HandleAddTicket(eventdata?.productTypeData?.length)} text='+ Add New Ticket Type' mt={"3"} fontWeight={"bold"} width={"fit-content"} />
                // <button onClick={() => HandleAddTicket(eventdata?.productTypeData?.length)} className=" mt-3 font-bold border text-white bg-blue-600 rounded-md py-2 w-fit px-3 " >+ Add New Ticket Type</button>
            )}
            <Select
                h={"45px"}
                border={"1px solid #E2E8F0"} 
                focusBorderColor={"#E2E8F0"} 
                placeholder="Type in maximum no. of Tickets"
                value={eventdata.currency}
                name="currency"
                onChange={handleChangeCurrency}
            >
                <option>NGN</option>
                <option>USD</option>
            </Select>
        </Flex>
    )
}

export default SelectTicket