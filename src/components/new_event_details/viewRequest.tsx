import { Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import CustomButton from '../general/Button'
import useCustomTheme from '@/hooks/useTheme'
import ModalLayout from '../sharedComponent/modal_layout'
import { IoIosClose } from 'react-icons/io'
import StarRating from '../sharedComponent/StarRating'
import EventApplication from './eventApplication'
import { IEventType } from '@/models/Event'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'

export default function ViewRequest(props: IEventType) {

    const { primaryColor, borderColor, mainBackgroundColor, headerTextColor } = useCustomTheme()

    const [count, setCount] = useState(0)

    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState(false)


    const { results, isLoading, ref, isRefetching: refetchingList, data } = InfiniteScrollerComponent({
        url: `/event-application/search?eventID=${props?.id}&applicationType=SERVICE`, limit: 20, filter: "id", name: "event-application"
    })

    const { results: rentalData, isLoading: loadingRental, ref: refRental, data: rentalAllData } = InfiniteScrollerComponent({
        url: `/event-application/search?eventID=${props?.id}&applicationType=RENTAL`, limit: 20, filter: "id", name: "event-application"
    })

    return (
        <Flex h={"130px"} display={(data?.data?.totalElements+rentalAllData?.data?.totalElements === 0 || !data?.data?.totalElements || !rentalAllData?.data?.totalElements) ? "none" : "flex"} justifyContent={"center"} bgColor={mainBackgroundColor} flexDir={"column"} borderWidth={"1px"} rounded={"8px"} p={"3"} gap={"3"}  >
            <Text fontSize={"14px"} fontWeight={"500"} >Support Request <span style={{ fontWeight: "600" }} >{data?.data?.totalElements+rentalAllData?.data?.totalElements}</span></Text>
            <CustomButton onClick={() => setOpen(true)} text={"View proposal"} fontSize={"14px"} width={"150px"} borderWidth={"1px"} borderColor={primaryColor} color={primaryColor} backgroundColor={mainBackgroundColor} />
            <ModalLayout size={["full", "full", "3xl"]} open={open} close={setOpen} >
                <Flex w={"full"} flexDir={"column"} p={"4"} gap={"4"} >
                    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                        <Flex >
                            <Flex pb={"1"} as={"button"} onClick={() => setTab(false)} px={"3"} borderBottomWidth={"2px"} borderBottomColor={!tab ? primaryColor : borderColor} >
                                <Text fontWeight={"500"} fontSize={"sm"} >Services </Text>
                            </Flex>
                            <Flex pb={"1"} as={"button"} onClick={() => setTab(true)} px={"3"} borderBottomWidth={"2px"} borderBottomColor={tab ? primaryColor : borderColor}  >
                                <Text fontWeight={"500"} fontSize={"sm"} >Rentals </Text>
                            </Flex>
                        </Flex>
                        <Flex onClick={()=> setOpen(false)} as={"button"} >
                            <IoIosClose size={"25px"} />
                        </Flex>
                    </Flex>
                    {!tab && (
                        <EventApplication results={results} loading={isLoading} type="SERVICE" />
                    )}
                    {tab && (
                        <EventApplication results={rentalData} loading={loadingRental} type="RENTAL" />
                    )}
                </Flex>
            </ModalLayout>
        </Flex>
    )
}
