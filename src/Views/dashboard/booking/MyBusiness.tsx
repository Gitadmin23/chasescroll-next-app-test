import React from 'react'
import { Box, Grid, SimpleGrid, Spinner, Text, VStack } from '@chakra-ui/react'
import { IBuisness } from '@/models/Business'
import httpService from '@/utils/httpService';
import { useQuery } from 'react-query';
import BusinessCard from '@/components/booking_component/BusinessCard';
import { PaginatedResponse } from '@/models/PaginatedResponse';
import { uniqBy } from 'lodash';
import { useDetails } from '@/global-state/useUserDetails';
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent';
import { cleanup } from '@/utils/cleanupObj';
import LoadingAnimation from '@/components/sharedComponent/loading_animation';

function MyBusiness({ name, state, category }: { name?: string, state?: string, category?: string }) {
    const [businesses, setBusinesses] = React.useState<IBuisness[]>([]);
    const [page, setPage] = React.useState(0);
    const [hasMore, setHasMore] = React.useState(true);

    const userId = localStorage.getItem('user_id');

    // const { isLoading, } = useQuery(['get-my-businesses', page], () => httpService.get('/business-service/search', {
    //     params: {
    //         vendorID: userId,
    //         page,
    //         size: 20,
    //     }
    // }), {
    //     onSuccess: (data) => {
    //         console.log(data?.data?.content)
    //         const item: PaginatedResponse<IBuisness> = data.data;
    //         setBusinesses((prev) => uniqBy([...prev, ...item?.content], 'id'));
    //         if (item?.last) {
    //             setHasMore(false);
    //         }
    //     }
    // })


    const { results, isLoading, isRefetching: refetchingList } = InfiniteScrollerComponent({
        url: `/business-service/search`, limit: 20, filter: "id", name: "mybusinessservice", paramsObj: cleanup({
            name: name,
            vendorID: userId,
            category: category,
            state: state
        })
    })

    return (
        <LoadingAnimation loading={isLoading} refeching={refetchingList} length={results?.length} >

            <Box w='full' h='full' pt='30px'>
                {!isLoading && results.length > 0 && (
                    <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]} gap={["2", "2", "6"]} >
                        {results.map((item: any, index: number) => (
                            <BusinessCard key={index.toString()} business={item} mybusiness={true} />
                        ))}
                    </Grid>
                )} 
            </Box>
        </LoadingAnimation>
    )
}

export default MyBusiness
