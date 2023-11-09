import PeopleCard from '@/components/search_component/other_components/people_card';
import LoadingAnimation from '@/components/sharedComponent/loading_animation';
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent';
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Box, Flex, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useQuery } from 'react-query';

interface Props {
    user_index: string
}

function ConnectedUser(props: Props) {
    const {
        user_index
    } = props

    const toast = useToast()
    const [data, setData] = React.useState([] as any)

    // react query

    const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({ url: URLS.GET_USER_CONNECTION_LIST + user_index, limit: 10, filter: "userId" })
    // const { isLoading, isRefetching } = useQuery(['get-joined-network'], () => httpService.get(URLS.GET_USER_CONNECTION_LIST + "" + user_index), {
    //     onError: (error: any) => {
    //         toast({
    //             status: "error",
    //             title: error.response?.data,
    //         });
    //     },
    //     onSuccess: (data) => { 
    //         setData(data.data);
    //     }
    // })

    return (
        <Flex width={["full", "450px"]} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >
            <LoadingAnimation length={results?.length} loading={isLoading} refeching={isRefetching} >
                {results?.map((person: any, i: number) => {
                    if (results.length === i + 1) {
                        return (
                            <Box key={person?.userId} width={"full"} ref={ref} >
                                <PeopleCard connects={true} person={person} />
                            </Box>
                        )
                    } else {
                        return (
                            <Box key={person?.userId} width={"full"}>
                                <PeopleCard connects={true} person={person} />
                            </Box>
                        )
                    }
                })}
                {/* {data?.filter((item: any)=> item?.joinStatus !== "SELF")?.map((person: any, i: number) => {
                    return (
                        <Box key={i} width={"full"}>
                            <PeopleCard connects={true} person={person} />
                        </Box>
                    )
                })} */}
            </LoadingAnimation>
        </Flex>
    )
}

export default ConnectedUser
