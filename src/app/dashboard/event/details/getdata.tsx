import EventDetails from '@/components/event_details_component'
import LoadingAnimation from '@/components/sharedComponent/loading_animation' 
import { URLS } from '@/services/urls'
import httpService from '@/utils/httpService'
import { Box, useToast } from '@chakra-ui/react' 
import React from 'react'
import { useQuery, focusManager } from 'react-query'

interface Props {
    event_index: any
}
function GetEventData(props: Props) {
    const {
        event_index
    } = props
    const toast = useToast()
    const [data, setData] = React.useState({} as any) 

focusManager.setFocused(false)
    // react query
    const { isLoading, isRefetching } = useQuery(['all-events-details' + event_index,], () => httpService.get(URLS.All_EVENT + "?id=" + event_index), {
        onError: (error: any) => {
            toast({
                status: "error",
                title: error.response?.data,
            });
        },
        onSuccess: (data: any) => { 
            setData(data?.data?.content[0]); 
        }
    })

    // console.log(data);

    return (
        <Box width={"full"}  >
            <LoadingAnimation loading={isLoading} refeching={isRefetching} length={data?.length} >
                <EventDetails
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
                    convener={data?.createdBy?.firstName + " " + data?.createdBy?.lastName}
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
            </LoadingAnimation>
        </Box>
    )
}

export default GetEventData
