"use client"
import { IMAGE_URL } from '@/services/urls'
import { Box, Button, Flex, Grid, HStack, Image, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import EventHeader from './event_header'
import EventCreator from './event_creator'
import EventDate from './event_date'
import EventUserOption from './event_user_options'
import OtherEventInfo from './other_event_info'
import EventLocationDetail from '../sharedComponent/event_location'
import SaveOrUnsaveBtn from '../sharedComponent/save_unsave_event_btn'
import { LuShare2 } from 'react-icons/lu'
import { BsChevronLeft } from 'react-icons/bs'
import { useRouter } from 'next/navigation'
import ModalLayout from '../sharedComponent/modal_layout'
import EventImage from '../sharedComponent/eventimage'
import SelectTicketNumber from './event_modal/select_ticket_number'
import RefundPolicy from './event_modal/refund_policy'
import PaymentMethod from './event_modal/payment_method'
import GetEventTicket from './get_event_ticket'
import ShareEvent from '../sharedComponent/share_event'
import useModalStore from '@/global-state/useModalSwitch'
import StripePopup from './event_modal/stripe_btn/stripe_popup'
import useStripeStore from '@/global-state/useStripeState'
import { loadStripe } from '@stripe/stripe-js'
import BlurredImage from '../sharedComponent/blurred_image'

interface Props {
    dynamic?: boolean
    banner: any,
    eventID: any,
    userBy: any,
    eventName: any,
    eventLogo: any,
    attendees: any,
    price: any,
    convener: any,
    timeAndDate: any,
    endtimeAndDate: any,
    location: any,
    locationType: any,
    about: any,
    isFree: any,
    currency: any,
    isOrganizer: any,
    isBought: any,
    minPrice: any,
    maxPrice: any,
    username: any,
    dataInfo: any,
    ticketBought: any, 
    ticketInfo: any, 
}

function EventDetails(props: Props) {
    const { 
        dynamic,
        banner,
        eventID,
        userBy,
        eventName,
        eventLogo,
        // attendees,
        price,
        convener,
        timeAndDate,
        endtimeAndDate,
        location,
        locationType,
        about,
        isFree,
        currency,
        isOrganizer,
        isBought,
        minPrice,
        maxPrice,
        username,
        dataInfo, 
    } = props

    const [selectedCategory, setSelectedCategory] = useState({} as any)
    const router = useRouter() 

    return (
        <Box width={"full"} display={"flex"} flexDirection={"column"} pt={["6", "6", "0"]} position={"relative"} paddingBottom={"12"} >
            <Flex width={"full"} alignItems={"center"} justifyContent={"center"} >
                <Box as='button' display={"flex"} onClick={() => router.back()} px={"3"} mt={"20px"} ml={"-30px"} justifyContent={"center"} alignItems={"center"} zIndex={"20"} >
                    <BsChevronLeft color={"black"} size={"25px"} />
                </Box>
                
                <Box height={["230px", "230px", "350px"]} position={"relative"} width={"full"} rounded={"16px"} roundedTopRight={"none"} >
                    <BlurredImage height={["230px", "230px", "350px"]} image={dataInfo?.currentPicUrl} />
                    {/* <Image style={{ borderBottomLeftRadius: "32px", borderBottomRightRadius: "32px", borderTopLeftRadius: "32px" }} objectFit="cover" alt={dataInfo?.currentPicUrl} width={"full"} height={"full"} src={IMAGE_URL + dataInfo?.currentPicUrl} /> */}
                    <Box width={"fit-content"} h={"40px"} px={"2"} display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"center"} rounded={"md"} bg={"#101828D2"} position={"absolute"} bottom={"4"} right={"4"} gap={"4"} >
                        {/* <LuShare2 size={24} color="white" /> */}
                        <SaveOrUnsaveBtn indetail={true} event={dataInfo} size='24' />
                    </Box>
                </Box>
            </Flex>
            <Box width={"full"} px={[dynamic ? "6" : "0px", "6"]}>
                <EventHeader name={eventName} maxPrice={maxPrice} minPrice={minPrice} currency={currency} />
                <EventCreator isOrganizer={isOrganizer} convener={convener} username={username} data={dataInfo} />
                <Flex py={"3"} justifyContent={"end"} >
                    <ShareEvent id={dataInfo?.id} type="EVENT" eventName={eventName} />
                </Flex>
                <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} py={"3"} gap={6}>
                    <EventDate name='Event Start date and time' date={timeAndDate} />
                    <EventDate name='Event End date and time' date={endtimeAndDate} />
                    <EventUserOption event={dataInfo} isOrganizer={isOrganizer} isBought={isBought} ticket={price} currency={currency} selectedticket={selectedCategory} setCategory={setSelectedCategory} />
                </Grid> 
                <OtherEventInfo name={'About this event'} data={about} />
                <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} py={"3"} gap={6}>

                <EventLocationDetail location={location} locationType={locationType} indetail={true} />
                    <GetEventTicket ticket={price} setSelectedTicket={setSelectedCategory} data={dataInfo} selectedTicket={selectedCategory} isBought={isBought} isFree={isFree} />
                </Grid>
                <OtherEventInfo name={'Venue Details'} data={location?.address} />
                {/* <Flex width={"full"} justifyContent={"center"} py="6" >
                    <GetEventTicket ticket={price} setSelectedTicket={setSelectedCategory} data={dataInfo} selectedTicket={selectedCategory} isBought={isBought} isFree={isFree} />
                </Flex> */}

            </Box>
        </Box>
    )
}

export default EventDetails
