import EventLocationDetail from '@/components/sharedComponent/event_location'
import EventImage from '@/components/sharedComponent/eventimage'
import SaveOrUnsaveBtn from '@/components/sharedComponent/save_unsave_event_btn'
import { dateFormat } from '@/utils/dateFormat'
import { Box, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { IoCalendarOutline } from "react-icons/io5";
import EventPrice from '../event_price'
import DeleteEvent from '../delete_event'
import useEventStore from '@/global-state/useCreateEventState'
import InterestedUsers from '../interested_users'
import ShareEvent from '../share_event'

interface Props {
    event: any,
    page?: boolean,
    draft?: boolean,
    search?: boolean,
    my_event?: boolean,
    searchbar?: boolean,
    date?: boolean,
    profile?: boolean,
    dashboard?: boolean,
}

function ExploreEventCard(props: Props) {
    const {
        event,
        page,
        draft,
        my_event,
        search,
        searchbar,
        date,
        profile,
        dashboard
    } = props

    const router = useRouter()
    const { updateEvent } = useEventStore((state) => state);

    const clickHandler = () => {
        if (draft) {
            updateEvent({
                id: event?.id,
                picUrls: event?.picUrls,
                eventType: event?.eventType,
                eventName: event?.eventName,
                eventDescription: event?.eventDescription,
                joinSetting: event?.joinSetting,
                locationType: event?.locationType,
                currency: event?.currency,
                currentPicUrl: event?.currentPicUrl,
                eventFunnelGroupID: event?.eventFunnelGroupID,
                mediaType: event?.mediaType,
                currentVideoUrl: event?.currentVideoUrl,
                isPublic: event?.isPublic,
                isExclusive: event?.isExclusive,
                mask: event?.mask,
                attendeesVisibility: event?.attendeesVisibility,
                minPrice: event?.minPrice,
                maxPrice: event?.maxPrice,
                startTime: event?.startTime,
                endTime: event?.endTime,
                startDate: event?.startDate,
                endDate: event?.endDate,
                // expirationDate: "",
                location: event?.location,
                productTypeData: event?.productTypeData,
            })
            router.replace("/dashboard/event/create_event")
        } else if(dashboard){
            router.replace("/dashboard/settings/event-dashboard/" + event?.id)
        } else {
            router.replace("/dashboard/event/details/" + event?.id)
        }
    }

    return (
        <Box boxShadow={page ? "md" : "none"} as='button' onClick={() => clickHandler()} py={searchbar ? "2" : ["6", "6", "4"]} px={["6", "6", "4"]} roundedBottom={"32px"} flex={"1"} roundedTopLeft={"32px"} borderColor={"brand.chasescrollPalePurple"} borderBottomWidth={searchbar ? " ": "1px"} maxWidth={["400px", "400px", "full"]} width={"full"} >
            <Flex flexDirection={["column", "column", page ? "column" : "row"]} width={"full"} flex={"1"} alignItems={"center"} justifyContent={"space-between"} >
                <Box width={["full", "full", "fit-content"]} >
                    <EventImage date={date} data={event} searchbar={searchbar} width={searchbar ? "90px" : ["full", "full", page ? "full" : "230px"]} height={searchbar ? "80px" : ["230px", "230px", page ? "220px" : "150px"]} />
                </Box>
                <Box width={searchbar ? "full" : ["full", "full", page ? "full" : "250px"]} mt={["10px", "10px", page ? "10px" : "0px", page ? "10px" : "0px"]} ml={["0px", "0px", page ? "0px" : "10px", page ? "0px" : "10px"]} >
                    <Flex fontWeight={"semibold"} width={"full"} justifyContent={"space-between"} borderBottomColor={"#D0D4EB"} borderBottom={search ? "1px" : "0px"} pb={"1"} >
                        <Text fontSize={searchbar ? "16px" : "18px"} >{event.eventName?.length >= 17 ? event.eventName.slice(0, 17) + "..." : event.eventName}</Text>
                        <Text fontSize={searchbar ? "14px" : "16px"} >
                            <EventPrice minPrice={event?.minPrice} maxPrice={event?.maxPrice} currency={event?.currency} />
                        </Text>
                    </Flex>
                    {!date && (
                        <Flex alignItems={"center"} width={"full"} mt={searchbar ? "5px" : "10px"} mb={"4px"} gap={"1"} >
                            <Box width={"fit-content"} >
                                <Box width={searchbar ? "16px" : "20px"} display={"flex"} justifyContent={"center"} alignItems={"center"}  >
                                    <IoCalendarOutline size={searchbar ? "16px" : "20px"} />
                                </Box>
                            </Box>
                            <Text color={"gray.600"} fontSize={searchbar ? "13px" : "16px"} fontWeight={"medium"}>
                                {dateFormat(event.startDate)}
                            </Text>
                        </Flex>
                    )}
                    <Flex alignItems={"center"} width={"full"} pb={"2"} gap={"3"} justifyContent={"space-between"} >
                        <EventLocationDetail iconsize={searchbar ? "16px" : "20px"} fontWeight={"medium"} fontsize={searchbar ? "13px" : page ? "14px" : "16px"} color={"rgba(18, 18, 18, 0.80)"} location={event?.location} locationType={event?.locationType} length={20} />
                        {(!draft && !my_event && !profile) && (
                            <Flex alignItems={"center"} gap={"3"} >
                                <ShareEvent size='18px' id={event?.id} />
                                <SaveOrUnsaveBtn event={event} />
                            </Flex>
                        )}
                        {((draft || my_event) && !profile) && (
                            <DeleteEvent event={event} />
                        )}
                    </Flex>
                    {page && (
                        <InterestedUsers fontSize={14} event={event} border={"2px"} size={"28px"} />
                    )}
                </Box>
            </Flex>
        </Box>
    )
}

export default ExploreEventCard
