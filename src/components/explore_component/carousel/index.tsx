import { CustomCarousel } from '@/components/customCarousel';
import GetEventTicket from '@/components/event_details_component/get_event_ticket';
import EventLocationDetail from '@/components/sharedComponent/event_location';
import EventPrice from '@/components/sharedComponent/event_price';
import InterestedUsers from '@/components/sharedComponent/interested_users';
import { IMAGE_URL } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Box, Flex, Image, useToast, Text } from '@chakra-ui/react';
import moment from 'moment';
import { useRouter } from 'next/navigation'; 
import React, { useState } from 'react'
import { useQuery } from 'react-query';

interface Props { }

function ExploreCarousel(props: Props) {
    const { } = props

    const toast = useToast()
    const [data, setData] = React.useState([] as any)
    const router = useRouter()

    // react query
    const { isLoading, isRefetching } = useQuery(['get-top-events'], () => httpService.get('/events/get-top-events'), {
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

    const [selectedTicket, setSelectedTicket] = useState({} as any)

    return (
        <Box width={"full"} position={"relative"} height={["380px", "380px", "480px"]} pb={"10"} >
            {(!isLoading && !isRefetching) && ( 
                <CustomCarousel 
                    slides={
                        data?.map((item: any, index: any)=> {
                            return(  
                                <>  
                                    <Box onClick={()=> router.replace("/dashboard/event/details/" + item?.id)}  key={index} role='button' bg={"white"} rounded={"32px"} roundedTopRight={"0px"} width={"full"} height={["fit-content", "fit-content", "fit-content"]} p={"3"} >
                                        <Box position={"relative"} width={"full"} >
                                            <Image style={{ borderTopRightRadius: "0px", borderRadius: "32px" }} objectFit="cover" alt={item?.currentPicUrl} width={"full"} height={["256px", "256px", "350px"]} src={IMAGE_URL + item?.currentPicUrl} />
                                            <Box color={"#121212"} zIndex={"10"} roundedBottom={"8px"} roundedTopLeft={"8px"} alignItems={"center"} justifyContent={"center"} display={"flex"} flexDirection={"column"} fontWeight={"semibold"} position={"absolute"} bottom={"10px"} left={"10px"} width={["36px", "36px", "57px"]} height={["36px", "36px", "51px"]} bgColor={"white"} >
                                                <Text fontSize={["20px", "20px", "24px"]} >{moment(item?.startDate).format("D")}</Text>
                                                <Text fontSize={["11px", "11px", "13px"]} mt={"-8px"} >{moment(item?.startDate).format("MMM")}</Text>
                                            </Box>
                                        </Box>
                                        <Box width={"full"} pb={"10px"} px={"1"} >
                                            <Flex color={"#121212"} fontSize={"20px"} bg={"white"} alignItems={"center"} justifyContent={"space-between"} fontWeight={"medium"} pt={"3"}  >
                                                <Text >{item?.eventName}</Text>
                                                <EventPrice maxPrice={item?.maxPrice} currency={item?.currency} />
                                            </Flex>
                                            <Flex alignItems={"center"} width={"full"} py={"2"} gap={"3"} justifyContent={"space-between"} >
                                                <Box display={"flex"} flexDirection={"column"} gap={"2"} >
                                                    <EventLocationDetail fontWeight={"medium"} fontsize={"16px"} color={"rgba(18, 18, 18, 0.80)"} location={item?.location} locationType={item?.locationType} length={20} />
                                                    <InterestedUsers fontSize={16} event={item} border={"2px"} size={"32px"} />
                                                </Box>
                                                <Box display={["none", "none", "block", "block"]} >
                                                    <GetEventTicket isBought={item?.isBought} isFree={item?.isFree} selectedTicket={selectedTicket} ticket={item?.productTypeData} setSelectedTicket={setSelectedTicket} carousel={true} data={item} />
                                                </Box>
                                            </Flex>
                                        </Box>
                                    </Box>
                                </>
                            )
                        })
                    }
                    autoplay={true} interval={5000} 
                />
            )}
        </Box>
    )
}

export default ExploreCarousel
