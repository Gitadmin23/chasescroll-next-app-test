import CustomButton from '@/components/general/Button'
import PeopleCard from '@/components/search_component/other_components/people_card'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import httpService from '@/utils/httpService'
import { Box, Flex, useToast } from '@chakra-ui/react' 
import React from 'react' 

interface Props { 
    index: any
}

function DashboardRefund(props: Props) {
    const { 
        index
    } = props

    const toast = useToast()
    // const [eventUser, setEventUser] = React.useState([] as any)
    
    const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({ url: '/events/get-event-members/'+index, limit: 10, filter: "id" })
    
    console.log(results);
    

    return (
        <Flex width={"full"} flexDirection={"column"} > 
            <LoadingAnimation loading={isLoading} length={results?.filter((item: any) => item?.role !== "ADMIN")?.length} >
            {results?.filter((item: any) => item?.role !== "ADMIN")?.map((person: any, i: number) => {
                    if (results.length === i + 1) {
                        return (
                            <Box key={person?.userId} width={"full"} ref={ref} >
                                <PeopleCard index={index} refund={true} person={person?.user}/> 
                            </Box>
                        )
                    } else {
                        return (
                            <Box key={person?.userId} width={"full"}>
                                <PeopleCard index={index} refund={true} person={person?.user}/> 
                            </Box>
                        )
                    }
                })}
            </LoadingAnimation>
        </Flex>
    )
}

export default DashboardRefund
