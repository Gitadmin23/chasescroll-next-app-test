import PeopleCard from '@/components/search_component/other_components/people_card'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { URLS } from '@/services/urls'
import { Flex, Box } from '@chakra-ui/react' 
import React from 'react'

interface Props {}

function RequestUser(props: Props) {
    const {} = props
    const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({ url: URLS.FRIEND_REQUEST, limit: 10, filter: "id" })
 
    return (
        <Flex width={["full", "450px"]} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >
            <LoadingAnimation length={results?.length} loading={isLoading} refeching={isRefetching} >
                {results?.map((person: any, i: number) => {
                    if (results.length === i + 1) {
                        return (
                            <Box key={person?.userId} width={"full"} ref={ref} >
                                <PeopleCard index={person?.id} request={true} person={person?.fromUserID}/> 
                            </Box>
                        )
                    } else {
                        return (
                            <Box key={person?.userId} width={"full"}>
                                <PeopleCard index={person?.id} request={true} person={person?.fromUserID}/> 
                            </Box>
                        )
                    }
                })}
            </LoadingAnimation>
        </Flex>
    )
}

export default RequestUser
