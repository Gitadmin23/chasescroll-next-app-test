'use client'
import SearchBar from '@/components/explore_component/searchbar' 
import MobileCard from '@/components/sharedComponent/event_card/mobileCard'
import NewEventCard from '@/components/sharedComponent/event_card/newEventCard'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import useSearchStore from '@/global-state/useSearchData'
import { useDetails } from '@/global-state/useUserDetails'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { URLS } from '@/services/urls'
import { Box, Flex, HStack } from '@chakra-ui/react'
import React from 'react'

interface Props { }

function MyEvent(props: Props) {
    const { } = props

    const { search } = useSearchStore((state) => state);

    const { userId: user_index } = useDetails((state) => state);
    const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({ url: URLS.JOINED_EVENT + user_index+(search ? "?searchText="+search : ""), limit: 10, filter: "id" })

    return (
        <HStack height={"fit-content"} display={"flex"} flexDir={"column"} overflowX={"hidden"} gap={"4"} width={"full"} overflowY={"auto"} justifyContent={"center"}  >
            <SearchBar change={true} event={true} />
            <Box width={["full", "full", "500px"]} position={"relative"} >
                <Box width={"full"}  >
                    <LoadingAnimation  withimg={true} loading={isLoading} refeching={isRefetching} length={results?.length} >
                        <Flex gap={"4"} flexDirection={"column"} >
                            {results?.map((event: any, i: number) => {
                                if (results.length === i + 1) {
                                    return (
                                        <Box key={i} width={"full"} ref={ref} >
                                            {/* <ExploreEventCard my_event={true} event={event} /> */}
                                            <MobileCard {...event} />
                                        </Box>
                                    )
                                } else {
                                    return (
                                        <Box key={i} width={"full"}  >
                                            {/* <ExploreEventCard my_event={true} event={event} /> */}

                                            <MobileCard {...event} />
                                            {/* <NewEventCard {...event} /> */}
                                        </Box>
                                    )
                                }
                            })}
                        </Flex>
                    </LoadingAnimation>
                </Box>
            </Box>
        </HStack>
    )
}

export default MyEvent
