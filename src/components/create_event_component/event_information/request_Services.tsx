import CustomButton from '@/components/general/Button'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import useEventStore from '@/global-state/useCreateEventState'
import useCustomTheme from '@/hooks/useTheme'
import httpService from '@/utils/httpService'
import { textLimit } from '@/utils/textlimit'
import { Checkbox, Flex, Input, Switch, Text, Wrap, WrapItem } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { useQuery } from 'react-query'

export default function RequestServices() {

    const { primaryColor, borderColor, headerTextColor, secondaryBackgroundColor } = useCustomTheme()

    const array = ["test", "test", "test", "test", "test", "test",]


    const { data: datarental } = useQuery(
        ["getcategoryRental"],
        () => httpService.get(`/rental/categories`), {
    }
    );

    const { isLoading, data } = useQuery(['get-business-categories'], () => httpService.get('/business-service/categories'), {
        refetchOnMount: true,
        onError: (error: any) => { },
    });

    const { updateEvent, eventdata } = useEventStore((state) => state);

    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState(false)

    const [isPr, setPr] = useState(false)

    const [serviceList, setServiceList] = useState<Array<string>>([])
    const [rentalList, setRentalList] = useState<Array<string>>([])

    const changeHandler = (item: string) => {

        const clone = { ...eventdata }

        let data = {
            affiliateType: "pr",
            percent: item
        }

        clone.affiliates = [data]

        updateEvent({ ...clone })
    }

    useEffect(()=> {

    }, [])

    const clickHander = () => {
        setPr((prev) => !prev)
        const clone = { ...eventdata }

        let data = {
            affiliateType: "pr",
            percent: null
        }

        clone.affiliates = [data]

        updateEvent({ ...clone })
    }

    const selectService = (data: string) => {
        const clone = [...serviceList]
        if (serviceList?.includes(data)) {
            let index = clone.indexOf(data);
            clone.splice(index, 1);
            setServiceList(clone)
        } else {
            setServiceList([...clone, data])
        }
    }


    const selectRental = (data: string) => {
        const clone = [...rentalList]
        if (rentalList?.includes(data)) {
            let index = clone.indexOf(data); // Find the index of the element 
            clone.splice(index, 1); // Removes the element at the found index  
            setRentalList(clone)
        } else {
            setRentalList([...clone, data])
        }
    } 

    return (
        <Flex w={"full"} flexDir={"column"} gap={"6"} >
            <Flex w={"full"} justifyContent={"space-between"} gap={"2"} alignItems={"center"} >
                <Text fontSize={"13px"} fontWeight={"500"} >Request services and rental for this event:</Text>
                <CustomButton onClick={() => setOpen(true)} text={"Request"} rounded={"16px"} fontSize={"sm"} backgroundColor={"#F7F8FE"} color={primaryColor} width={"112px"} />
            </Flex>
            {serviceList?.length > 0 && (
                <Flex w={"full"} gap={"3"} flexDirection={"column"} >
                    <Text fontSize={"14px"} fontWeight={"500"} >Services Selected</Text>
                    <Wrap gap={"4"} >
                        {serviceList?.map((item, index) => (
                            <WrapItem key={index} >
                                <Flex alignItems={"center"} bgColor={"#F7F8FE"} gap={"3"} h={"40px"} px={"4"} rounded={"8px"} >
                                    <Text fontSize={"12px"} color={primaryColor} fontWeight={"500"} >{item}</Text>
                                    <Flex as={"button"} onClick={() => selectService(item)}  >
                                        <IoClose size={"20px"} color='#F81F1F' />
                                    </Flex>
                                </Flex>
                            </WrapItem>
                        ))}
                    </Wrap>
                </Flex>
            )}
            {rentalList?.length > 0 && (
                <Flex w={"full"} gap={"3"} flexDirection={"column"} >
                    <Text fontSize={"14px"} fontWeight={"500"} >Rentals Selected</Text>
                    <Wrap gap={"4"} >
                        {rentalList?.map((item, index) => (
                            <WrapItem key={index} >
                                <Flex alignItems={"center"} bgColor={"#F7F8FE"} gap={"3"} h={"40px"} px={"4"} rounded={"8px"} >
                                    <Text fontSize={"12px"} color={primaryColor} fontWeight={"500"} >{item}</Text>
                                    <Flex as={"button"} onClick={() => selectRental(item)} >
                                        <IoClose size={"20px"} color='#F81F1F' />
                                    </Flex>
                                </Flex>
                            </WrapItem>
                        ))}
                    </Wrap>
                </Flex>
            )}
            <Flex w={"full"} borderWidth={"1px"} rounded={"16px"} p={"4"} flexDir={"column"} gap={"3"} >
                <Text fontSize={"14px"} fontWeight={"500"} >Do you wish to accept PR requests for your event?</Text>
                <Switch isChecked={isPr} onChange={clickHander} />
                {isPr && (
                    <Flex flexDir={"column"} gap={"3"} >
                        <Text fontSize={"14px"} fontWeight={"500"} >Add Percentage</Text>
                        {eventdata?.affiliates?.length > 0 && (
                            <Input value={eventdata?.affiliates[0]?.percent} onChange={(item) => changeHandler(item?.target?.value)} w={"full"} type="number" />
                        )}
                    </Flex>
                )}
            </Flex>
            <ModalLayout open={open} close={setOpen} closeIcon={true} >
                <Flex flexDir={"column"} gap={"4"} pb={"4"} >
                    <Text fontWeight={"500"} ml={"4"} >Service | Rentals</Text>
                    <Flex w={"full"} px={"4"} justifyContent={"center"} borderBottomWidth={"1px"} borderColor={borderColor}>
                        <Flex justifyContent={"center"} onClick={() => setTab(false)} w={"100px"} pb={"1"} mb={"-1px"} borderBottomWidth={"1px"} borderColor={!tab ? primaryColor : borderColor} >
                            <Text color={!tab ? primaryColor : headerTextColor} fontSize={"14px"} >Services</Text>
                        </Flex>
                        <Flex justifyContent={"center"} onClick={() => setTab(true)} w={"100px"} pb={"1"} mb={"-1px"} borderBottomWidth={"1px"} borderColor={tab ? primaryColor : borderColor} >
                            <Text color={tab ? primaryColor : headerTextColor} fontSize={"14px"} >Rental</Text>
                        </Flex>
                    </Flex>
                    <Flex flexDir={"column"} gap={"4"} px={"4"} >
                        {(serviceList?.length !== 0 && !tab) && (
                            <Flex w={"full"} h={"40px"} pos={"relative"} >
                                <Flex w={"full"} overflowX={"auto"} pos={"absolute"} gap={"3"} flex={"1"} left={"0px"} right={"0px"} top={"0px"} >
                                    {serviceList?.map((item, index) => {
                                        return (
                                            <Flex key={index} w={"fit-content"} >
                                                <Flex alignItems={"center"} bgColor={"#F7F8FE"} justifyContent={"space-between"} gap={"3"} h={"40px"} w={"140px"} px={"4"} rounded={"8px"} >
                                                    <Text fontSize={"12px"} color={primaryColor} fontWeight={"500"} >{textLimit(item, 10)}</Text>
                                                    <Flex as={"button"} >
                                                        <IoClose size={"20px"} color='#F81F1F' />
                                                    </Flex>
                                                </Flex>
                                            </Flex>
                                        )
                                    })}
                                </Flex>
                            </Flex>
                        )}

                        {(rentalList?.length !== 0 && tab) && (
                            <Flex w={"full"} h={"40px"} pos={"relative"} >
                                <Flex w={"full"} overflowX={"auto"} pos={"absolute"} gap={"3"} flex={"1"} left={"0px"} right={"0px"} top={"0px"} >
                                    {rentalList?.map((item, index) => {
                                        return (
                                            <Flex key={index} w={"fit-content"} >
                                                <Flex alignItems={"center"} bgColor={"#F7F8FE"} justifyContent={"space-between"} gap={"3"} h={"40px"} w={"140px"} px={"4"} rounded={"8px"} >
                                                    <Text fontSize={"12px"} color={primaryColor} fontWeight={"500"} >{textLimit(item, 10)}</Text>
                                                    <Flex as={"button"} >
                                                        <IoClose size={"20px"} color='#F81F1F' />
                                                    </Flex>
                                                </Flex>
                                            </Flex>
                                        )
                                    })}
                                </Flex>
                            </Flex>
                        )}
                        <Flex maxH={"40vh"} overflowY={"auto"} bgColor={secondaryBackgroundColor} rounded={"16px"} >
                            {!tab && (
                                <Flex w={"full"} h={"auto"} flexDir={"column"} rounded={"16px"} borderWidth={"1px"} borderColor={"#EAEBEDCC"} >
                                    {data?.data?.map((item: string, index: number) => {
                                        return (
                                            <Flex key={index} as={"button"} onClick={() => selectService(item)} w={"full"} h={"fit-content"} >
                                                <Flex w={"full"} h={"53px"} px={"4"} justifyContent={"space-between"} borderBottomWidth={"1px"} borderColor={"#EAEBEDCC"} alignItems={"center"} >
                                                    <Text fontSize={"14px"} >{item}</Text>
                                                    <Checkbox isChecked={serviceList?.includes(item) ? true : false} />
                                                </Flex>
                                            </Flex>
                                        )
                                    })}
                                </Flex>
                            )}
                            {tab && (
                                <Flex w={"full"} h={"auto"} flexDir={"column"} rounded={"16px"} borderWidth={"1px"} borderColor={"#EAEBEDCC"} >
                                    {datarental?.data?.map((item: string, index: number) => {
                                        return (
                                            <Flex key={index} as={"button"} onClick={() => selectRental(item)} w={"full"} h={"fit-content"} >
                                                <Flex w={"full"} h={"53px"} px={"4"} justifyContent={"space-between"} borderBottomWidth={"1px"} borderColor={"#EAEBEDCC"} alignItems={"center"} >
                                                    <Text fontSize={"14px"} >{item}</Text>
                                                    <Checkbox isChecked={rentalList?.includes(item) ? true : false} />
                                                </Flex>
                                            </Flex>
                                        )
                                    })}
                                </Flex>
                            )}
                        </Flex>
                    </Flex>
                </Flex>
            </ModalLayout>
        </Flex>
    )
}
