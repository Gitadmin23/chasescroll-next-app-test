"use client"
import ExploreEventCard from '@/components/sharedComponent/event_card'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import { useDetails } from '@/global-state/useUserDetails'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { URLS } from '@/services/urls'
import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { BsChevronLeft } from 'react-icons/bs'

interface Props {}

function EventDashboard(props: Props) {
    const {} = props 
  
    const { userId: user_index } = useDetails((state) => state);
    const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({ url: URLS.All_EVENT+"?createdBy="+user_index, limit: 10, filter: "id" })
    const router = useRouter()

    return (
        <Box height={"auto"} display={"flex"} width={"full"} overflowY={"auto"} justifyContent={"center"} position={"relative"}  > 
            <Box width={["full", "full", "600px"]} px={"6"} py={"10"} position={"relative"} >
                <Flex alignItems={"center"} gap={"4"} width={"full"} justifyContent={"center"} paddingBottom={"6"}> 
                    <Box onClick={()=> router.back()} as='button' position={"absolute"} zIndex={"10"} left={"0px"} width={"fit-content"} >
                        <BsChevronLeft color={"black"} size={"25px"} />
                    </Box>
                    <Text textAlign={"center"} fontSize={"2xl"} fontWeight={"bold"} >Events Dash Board</Text>
                </Flex>
                <Box width={"full"}  >
                    <LoadingAnimation loading={isLoading} refeching={isRefetching} length={results?.length} >
                        <Flex gap={"4"} flexDirection={"column"} >
                            {results?.map((event: any, i: number) => {
                                if (results.length === i + 1) {
                                    return (
                                        <Box key={event?.userId} width={"full"} ref={ref} >
                                            <ExploreEventCard event={event} profile={true} />
                                        </Box>
                                    )
                                } else {
                                    return (
                                        <Box key={event?.userId} width={"full"}  >
                                            <ExploreEventCard event={event} profile={true} />
                                        </Box>
                                    )
                                }
                            })}
                        </Flex>
                    </LoadingAnimation>
                </Box>
            </Box>
        </Box>
    )
}

export default EventDashboard

"use client"
import ExploreEventCard from '@/components/sharedComponent/event_card'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import { useDetails } from '@/global-state/useUserDetails'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { URLS } from '@/services/urls'
import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { BsChevronLeft } from 'react-icons/bs'

interface Props {}

function EventDashboard(props: Props) {
    const {} = props 
  
    const { userId: user_index } = useDetails((state) => state);
    const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({ url: URLS.All_EVENT+"?createdBy="+user_index, limit: 10, filter: "id" })
    const router = useRouter()

    return (
        <Box height={"auto"} display={"flex"} width={"full"} overflowY={"auto"} justifyContent={"center"} position={"relative"}  > 
            <Box width={["full", "full", "600px"]} px={"6"} py={"10"} position={"relative"} >
                <Flex alignItems={"center"} gap={"4"} width={"full"} justifyContent={"center"} paddingBottom={"6"}> 
                    <Box onClick={()=> router.back()} as='button' position={"absolute"} zIndex={"10"} left={"0px"} width={"fit-content"} >
                        <BsChevronLeft color={"black"} size={"25px"} />
                    </Box>
                    <Text textAlign={"center"} fontSize={"2xl"} fontWeight={"bold"} >Events Dash Board</Text>
                </Flex>
                <Box width={"full"}  >
                    <LoadingAnimation loading={isLoading} refeching={isRefetching} length={results?.length} >
                        <Flex gap={"4"} flexDirection={"column"} >
                            {results?.map((event: any, i: number) => {
                                if (results.length === i + 1) {
                                    return (
                                        <Box key={event?.userId} width={"full"} ref={ref} >
                                            <ExploreEventCard event={event} profile={true} />
                                        </Box>
                                    )
                                } else {
                                    return (
                                        <Box key={event?.userId} width={"full"}  >
                                            <ExploreEventCard event={event} profile={true} />
                                        </Box>
                                    )
                                }
                            })}
                        </Flex>
                    </LoadingAnimation>
                </Box>
            </Box>
        </Box>
    )
}

export default EventDashboard
