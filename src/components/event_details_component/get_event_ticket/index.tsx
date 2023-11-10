import ModalLayout from '@/components/sharedComponent/modal_layout'
import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import PaymentMethod from '../event_modal/payment_method'
import SelectTicketNumber from '../event_modal/select_ticket_number'
import RefundPolicy from '../event_modal/refund_policy'
import CustomButton from '@/components/general/Button'
import PaymentType from '../event_modal/payment_type'
import httpService from '@/utils/httpService'
import { useQuery } from 'react-query'
import { URLS } from '@/services/urls'
import { useDetails } from '@/global-state/useUserDetails'
import ViewTicket from '../event_modal/view_ticket'
import SelectTicketType from '../event_modal/select_ticket_type'
import StripePopup from '../event_modal/stripe_btn/stripe_popup'
import { loadStripe } from '@stripe/stripe-js'
import useStripeStore from '@/global-state/useStripeState'
import { BsChevronLeft } from 'react-icons/bs'
import useModalStore from '@/global-state/useModalSwitch'
import { setConfig } from 'next/config'

interface Props {
    isBought: any,
    isFree: any,
    data: any,
    selectedTicket: any,
    setSelectedTicket: any,
    ticket: any,
    carousel?: boolean
}

function GetEventTicket(props: Props) {
    const {
        isBought,
        isFree,
        data,
        selectedTicket,
        setSelectedTicket,
        ticket,
        carousel
    } = props

    const STRIPE_KEY: any = process.env.NEXT_PUBLIC_STRIPE_KEY;
    // const [stripePromise, setStripePromise] = React?.useState(() => loadStripe(STRIPE_KEY))

    const { showModal, setShowModal } = useModalStore((state) => state); 
    const { setModalTab, modalTab } = useStripeStore((state) => state); 

    // const [modalTab, setModalTab] = useState(1)
    const [numbOfTicket, setNumberOfTicket] = React.useState(1)
    // const [open, setopen] = useState(false) 
    const [ticketDetails, setTicketDetails] = useState({} as any)
    const [ticketLenght, setTicketLenght] = useState(0)
    const { userId: user_index } = useDetails((state) => state);
    const toast = useToast()

    const clickHandler = (event: any) => {

        event.stopPropagation();
        setModalTab(carousel ? 6 : isBought ? 5 : 1)
        setShowModal(true)
    }
 
    const { } = useQuery(['event_ticket' + data?.id], () => httpService.get(URLS.GET_TICKET + user_index + "&eventID=" + data?.id), {
        onError: (error: any) => {
            toast({
                status: "error",
                title: error.response?.data,
            });
        },
        onSuccess: (data) => {
            // console.log(data);
            setTicketLenght(data?.data?.content?.length)
            setTicketDetails(data?.data?.content[0]);
        }
    }) 

    return (
        <>
            {!carousel && (
                <CustomButton my={"auto"} onClick={clickHandler} disable={(selectedTicket?.ticketType || isBought) ? false : true} text={((isBought) ? "View" : isFree ? "Register" : "Buy") + " Ticket"} width={["full", "full"]} />
            )}
            {carousel && (
                <Box >
                    <CustomButton onClick={clickHandler} backgroundColor={"transparent"} fontSize={"sm"} borderColor={"brand.chasescrollBlue"} color={"brand.chasescrollBlue"} borderWidth={"1px"} text={"Get Ticket"} width={["172px"]} />
                </Box>
            )}
            <ModalLayout title={modalTab === 6 ? "Ticket available for this event" : ""} open={showModal} close={setShowModal} >
                {modalTab === 1 && (
                    <SelectTicketNumber close={setShowModal} numbOfTicket={numbOfTicket} setNumberOfTicket={setNumberOfTicket} next={setModalTab} selectedTicket={selectedTicket} data={data} />
                )}
                {modalTab === 2 && (
                    <RefundPolicy data={data} />
                )}
                {modalTab === 3 && (
                    <PaymentMethod />
                )}
                {modalTab === 4 && (
                    <PaymentType data={data} ticketCount={numbOfTicket} currency={data?.currency} selectedCategory={selectedTicket?.ticketType} click={setModalTab} />
                )}
                {modalTab === 5 && (
                    <ViewTicket
                        userName={ticketDetails?.createdBy?.firstName + " " + ticketDetails?.createdBy?.lastName}
                        date={ticketDetails?.event?.startDate}
                        time={ticketDetails?.event?.startDate}
                        ticketFee={ticketDetails?.ticketType === "Free"
                            ? "Free"
                            : ticketDetails?.boughtPrice
                        }
                        click={setShowModal}
                        orderId={ticketDetails?.id}
                        length={ticketLenght}
                        currency={ticketDetails?.event?.currency}
                        location={ticketDetails?.event?.locationDetails}
                        datainfo={ticketDetails} />
                )}
                {modalTab === 6 && (
                    <SelectTicketType ticket={ticket} setSelectedTicket={setSelectedTicket} currency={data?.currency} click={setModalTab} />
                )} 
            </ModalLayout> 
        </>
    )
}

export default GetEventTicket
