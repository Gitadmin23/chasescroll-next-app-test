"use client"
import EventDetails from '@/components/event_details_component'
import CustomButton from '@/components/general/Button'
import Fundpaystack from '@/components/settings_component/payment_component/card_tabs/fund_wallet/fundpaystack'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import { WarningIcon, ChromesIcon, SafariIcon, ExplorerIcon } from '@/components/svg'
import usePaystackStore from '@/global-state/usePaystack'
import { URLS } from '@/services/urls'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import httpService from '@/utils/httpService'
import {Box, Button, Flex, Text, useToast} from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useQuery, focusManager } from 'react-query'
import {IEventType} from "@/models/Event";
import {PaginatedResponse} from "@/models/PaginatedResponse";
import {useDetails} from "@/global-state/useUserDetails";
import Scanner from "@/components/modals/Events/Scanner";

interface Props {
    event_index: any,
    dynamic?: boolean
}

function GetEventData(props: Props) {
    const {
        event_index,
        dynamic
    } = props
    const toast = useToast()
    const router = useRouter();
    const { userId } = useDetails((state) => state);
    const [data, setData] = React.useState<IEventType| null>(null);
    const [show, setShow] = useState(false);
    const pathname = usePathname()
    const [isCollaborator, setIsCollaborator] = React.useState(false);
    const [isAdmin, setIsAdmin] = React.useState(false);

    //show scanner
    const [showScanner, setShowScanner] = React.useState(false);

    const { configPaystack, setPaystackConfig } = usePaystackStore((state) => state);

    focusManager.setFocused(false)
    // react query
    const { isLoading, isRefetching } = useQuery(['all-events-details' ,  event_index], () => httpService.get(URLS.All_EVENT + "?id=" + event_index), {
        onError: (error: any) => {
            toast({
                status: "error",
                title: error.response?.data,
            });
        },
        onSuccess: (data: any) => {
            const item: PaginatedResponse<IEventType> = data.data;
            setData(item.content[0]);
            const ids = item.content[0].collaborators.map((item) => item.userId);
            const adminIds = item.content[0].admins.map((item) => item.userId);

            if (ids.includes(userId)) {
                setIsCollaborator(true);
            }
            if (userId === item.content[0].createdBy.userId || adminIds.includes(userId)) {
                setIsAdmin(true);
            }
        }
    })

    let token = sessionStorage.getItem('tp_token')+"";

    let clicked = sessionStorage.getItem('clicked')+"";
    

    useEffect(()=> {
        if(!pathname?.includes("dashboard") && !token){
            if(clicked !== "true"){
                setShow(true)
            }
        }
    }, [pathname]);

    const handleNavigation = () => {
        router.push(`/dashboard/settings/event-dashboard/${event_index}`);
    }

    return (
        <Box width={"full"}  >
            <Scanner isOpen={showScanner} onClose={() => setShowScanner(false)} />
            <LoadingAnimation loading={isLoading} refeching={isRefetching} length={data !== null} >
                <EventDetails
                    dynamic={dynamic}
                    dataInfo={data}
                    eventID={data?.id}
                    isBought={data?.isBought}
                    eventName={data?.eventName}
                    about={data?.eventDescription}
                    banner={data?.currentPicUrl ? data?.currentPicUrl : ""}
                    isFree={data?.isFree}
                    timeAndDate={data?.startDate}
                    endtimeAndDate={data?.endDate}
                    location={data?.location}
                    locationType={data?.locationType}
                    convener={capitalizeFLetter(data?.createdBy?.firstName) + " " + capitalizeFLetter(data?.createdBy?.lastName)}
                    username={data?.createdBy?.username}
                    userBy={data?.createdBy?.userId}
                    ticketInfo={data?.productTypeData}
                    eventLogo={data?.createdBy?.data?.imgMain?.value}
                    price={data?.productTypeData}
                    currency={data?.currency}
                    isOrganizer={data?.isOrganizer}
                    minPrice={data?.minPrice}
                    maxPrice={data?.maxPrice}
                    ticketBought={data?.ticketBought} attendees={undefined} />

                <Flex w={['100%', '40%']} direction={['column', 'row']} paddingLeft={'10px'}>
                    {(
                        <>
                            <Button display={['block']} width={['100%', '50%']} height={['40px']} bg={'brand.chasescrollButtonBlue'} marginTop={'5px'} color={'white'} onClick={() => handleNavigation()} >Event Details</Button>

                            <Button display={['block', 'none']} width={['100%', '50%']} height={['40px']} color={'brand.chasescrollButtonBlue'} onClick={() => setShowScanner(true)} borderColor={'brand.chasescrollButtonBlue'} bg={'white'} marginTop={'10px'} borderWidth={'2px'}>Scan Ticket</Button>
                        </>
                    )}
                    {isCollaborator && (
                        <Button display={['block', 'none']} width={['100%', '50%']} height={['40px']} bg={'brand.chasescrollButtonBlue'} color={'white'} onClick={() => setShowScanner(true)} marginTop={'10px'} >Scan Ticket</Button>
                    )}
                </Flex>
            </LoadingAnimation>
            <Fundpaystack id={data?.id} config={configPaystack} setConfig={setPaystackConfig} />

            <ModalLayout open={show} close={setShow} >
                <Flex py={"6"} width={"full"} flexDir={"column"} px={"6"} alignItems={"center"} >
                    <WarningIcon />
                    <Text maxW={"352px"} textAlign={"center"} color={"#121212"} fontWeight={"medium"} fontSize={"18px"} lineHeight={"28px"} >Make sure you are using a web browser to access this page to avoid any errors.</Text>
                    <Text color={"#667085"} fontSize={"14px"} lineHeight={"20px"} >supported Browsers:</Text>
                    <Flex gap={"8"} w={"fit-content"} py={"6"} alignItems={"center"} >
                        <ChromesIcon />
                        <SafariIcon />
                        <ExplorerIcon />
                    </Flex>
                    <CustomButton onClick={()=> setShow(false)} text={"Close"} backgroundColor={"transparent"} border={"1px solid #5465E0"} color={"#5465E0"} />
                </Flex>
            </ModalLayout>
        </Box>
    )
}

export default GetEventData
