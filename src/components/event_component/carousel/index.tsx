import { CustomCarousel } from '@/components/customCarousel';
import GetEventTicket from '@/components/event_details_component/get_event_ticket';
import BlurredImage from '@/components/sharedComponent/blurred_image';
import EventLocationDetail from '@/components/sharedComponent/event_location';
import EventPrice from '@/components/sharedComponent/event_price';
import InterestedUsers from '@/components/sharedComponent/interested_users';
import LoadingAnimation from '@/components/sharedComponent/loading_animation';
import SaveOrUnsaveBtn from '@/components/sharedComponent/save_unsave_event_btn';
import ShareEvent from '@/components/sharedComponent/share_event';
import { useDetails } from '@/global-state/useUserDetails';
import { IMAGE_URL } from '@/services/urls';
import httpService from '@/utils/httpService';
import { textLimit } from '@/utils/textlimit';
import { Box, Flex, Image, useToast, Text, useColorMode, Skeleton } from '@chakra-ui/react';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import Router from 'next/router';
import React, { useState } from 'react'
import { focusManager, useQuery } from 'react-query';
import useCustomTheme from "@/hooks/useTheme";

interface Props { }

function EventCarousel(props: Props) {
    const { } = props;

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const toast = useToast()
    const [data, setData] = React.useState([] as any)
    const router = useRouter()

    const { userId, email } = useDetails((state) => state);

    focusManager.setFocused(false)

    
    const { isLoading, isRefetching } = useQuery(['get-events-for-carousel'], () => httpService.get('/events/events'), {
        onError: (error: any) => {
            toast({
                status: "error",
                title: error.response?.data,
            });
        },
        onSuccess: (data) => {
            setData(data.data.content);
        }
    })

    return (
        <LoadingAnimation loading={isLoading} customLoader={
            <Skeleton w={"full"} roundedBottom={["32px", "32px", "32px", "32px", "32px"]} roundedTopLeft={"32px"} height={["411px", "411px", "449px", "449px", "449px"]} />
        } >
            <Box width={"full"} position={"relative"} height={["380px", "380px", "480px"]} pt={"6"} pb={"10"} >
                {(!isLoading && !isRefetching) && (
                    <CustomCarousel
                        slides={
                            data?.map((item: any, index: any) => {
                                return (
                                    <>
                                        <Box onClick={() => router.push("/dashboard/event/details/" + item?.id)} key={index} role='button' rounded={["16px", "16px", "32px"]} roundedTopRight={"0px"} width={"full"} height={["fit-content", "fit-content", "fit-content"]} p={["3", "3", "3"]} bg={secondaryBackgroundColor} >
                                            <Box position={"relative"} width={"full"} >
                                                <BlurredImage height={["256px", "256px", "350px"]} image={item?.currentPicUrl} />
                                                {/* <Image style={{ borderTopRightRadius: "0px", borderRadius: "32px" }} objectFit="cover" alt={item?.currentPicUrl} width={"full"} height={["256px", "256px", "350px"]} src={IMAGE_URL + item?.currentPicUrl} /> */}
                                                <Box color={colorMode === 'light' ? "#121212" : bodyTextColor} zIndex={"10"} roundedBottom={"8px"} roundedTopLeft={"8px"} alignItems={"center"} justifyContent={"center"} display={"flex"} flexDirection={"column"} fontWeight={"semibold"} position={"absolute"} bottom={"10px"} left={"10px"} width={["36px", "36px", "57px"]} height={["36px", "36px", "51px"]} bgColor={secondaryBackgroundColor} >
                                                    <Text fontSize={["20px", "20px", "24px"]} >{moment(item?.startDate).format("D")}</Text>
                                                    <Text fontSize={["11px", "11px", "13px"]} mt={"-8px"} >{moment(item?.startDate).format("MMM")}</Text>
                                                </Box>
                                            </Box>
                                            <Flex width={"full"} pt={"4"} pb={"1"} px={"1"} flexDirection={"column"} gap={"1"} >
                                                <Flex color={colorMode === 'light' ? "#121212" : bodyTextColor} flexDir={["column", "column", "row"]} fontSize={["16px", "16px", "20px"]} bg={secondaryBackgroundColor} alignItems={["start", "start", "center"]} justifyContent={"space-between"} fontWeight={"medium"} gap={"1"} >
                                                    <Text fontSize={"large"} display={["none", "none", "block"]} fontWeight={"semibold"} >{textLimit(item?.eventName, 40)}</Text>
                                                    <Text fontSize={"14px"} display={["block", "block", "none"]} fontWeight={"medium"} >{textLimit(item?.eventName, 20)}</Text>
                                                    <Flex mt="-4px" >
                                                        <EventPrice minPrice={item?.minPrice} maxPrice={item?.maxPrice} currency={item?.currency} />
                                                    </Flex>
                                                </Flex>
                                                <Flex alignItems={"start"} flexDir={"column"} width={"full"} gap={"2"} justifyContent={"space-between"} >
                                                    <Box display={"flex"} flexDirection={"column"} gap={"2"} >
                                                        <EventLocationDetail height='fit-content' fontWeight={"medium"} fontsize={"16px"} color={"rgba(18, 18, 18, 0.80)"} location={item?.location} locationType={item?.locationType} length={20} isLimited={true} />
                                                    </Box>
                                                    <Flex alignItems={"center"} w={"full"} justifyContent={"space-between"} gap={"3"} >
                                                        {item?.attendeesVisibility && (
                                                            <InterestedUsers refund={true} fontSize={16} event={item} border={"2px"} size={"32px"} />
                                                        )}
                                                        <Flex ml={"auto"} alignItems={"center"} gap={"3"}  >
                                                            <ShareEvent data={item} type="EVENT" size='18px' id={item?.id} eventName={item?.eventName} />
                                                            {(userId && email) && (
                                                                <SaveOrUnsaveBtn event={item} />
                                                            )}
                                                        </Flex>
                                                    </Flex>
                                                </Flex>
                                            </Flex>
                                        </Box>
                                    </>
                                )
                            })
                        }
                        autoplay={true} interval={5000}
                    />
                )}
            </Box>
        </LoadingAnimation>
    )
}

export default EventCarousel
