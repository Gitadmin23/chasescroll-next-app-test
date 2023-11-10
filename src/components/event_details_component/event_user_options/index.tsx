import { Box, Button, Flex } from '@chakra-ui/react'
import React from 'react'
import SelectTicket from '../select_ticket'
import { useRouter } from 'next/navigation'
import useEventStore from '@/global-state/useCreateEventState'

interface Props {
    isOrganizer: boolean,
    currency: any,
    ticket: any,
    selectedticket: any,
    setCategory: any,
    isBought: boolean,
    event: any
}

function EventUserOption(props: Props) {
    const {
        isOrganizer,
        currency,
        ticket,
        selectedticket,
        setCategory,
        isBought,
        event
    } = props

    const router = useRouter()
    const { updateEvent } = useEventStore((state) => state);

    const clickHandler = () => {
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
        router.replace("/dashboard/event/edit_event")
    }

    return (
        <Box my={"auto"} >
            {isOrganizer && (
                <Flex flexDirection={["column", "column", "row"]} width={"full"} justifyContent={"center"} alignItems={"center"} gap={"3"} >
                    <Button width={"full"} bg={"brand.chasescrollBlue"} height={"49px"} color={"white"} fontSize={"sm"} fontWeight={"semibold"} >My Dashboard</Button>
                    <Button onClick={() => clickHandler()} _disabled={{ opacity: "0.4" }} width={"full"} bg={"brand.chasescrollBlue"} height={"49px"} color={"white"} fontSize={"sm"} fontWeight={"semibold"} >Edit Event</Button>
                </Flex>
            )}
            {!isBought && (
                <>
                    {(!isOrganizer) && (
                        <SelectTicket ticket={ticket} selectedticket={selectedticket} currency={currency} setCategory={setCategory} />
                    )}
                </>
            )}
        </Box>
    )
}

export default EventUserOption
