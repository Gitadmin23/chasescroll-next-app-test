import React from 'react'
import { Box, Grid, SimpleGrid, Spinner, Text, VStack } from '@chakra-ui/react'
import { IBuisness } from '@/models/Business'
import httpService from '@/utils/httpService';
import { useQuery } from 'react-query';
import BusinessCard from '@/components/booking_component/BusinessCard';
import { PaginatedResponse } from '@/models/PaginatedResponse';
import { uniqBy } from 'lodash';
import { useDetails } from '@/global-state/useUserDetails';

function MyBusiness() {
    const [businesses, setBusinesses] = React.useState<IBuisness[]>([]);
    const [page, setPage] = React.useState(0);
    const [hasMore, setHasMore] = React.useState(true); 

    const userId = localStorage.getItem('user_id');

    const { isLoading, } = useQuery(['get-my-businesses', page], () => httpService.get('/business-service/search', {
        params: {
            vendorID: userId,
            page,
            size: 20,
        }
    }), {
        onSuccess: (data) => {
            console.log(data?.data?.content)
            const item: PaginatedResponse<IBuisness> = data.data;
            setBusinesses((prev) => uniqBy([...prev, ...item?.content], 'id'));
            if (item?.last) {
                setHasMore(false);
            }
        }
    })
    return (
        <Box w='full' h='full' pt='30px'>
            {!isLoading && businesses.length > 0 && (
                <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(3, 1fr)"]} gap={["4", "4", "6"]} >
                    {businesses.map((item: any, index) => (
                        <BusinessCard key={index.toString()} business={item} />
                    ))}
                </Grid>
            )}

            {!isLoading && businesses.length < 1 && (
                <VStack w='full' h='40px' borderRadius={'20px'} justifyContent={'center'} >
                    <Text>There are currently no business, you can start by creating one!</Text>
                </VStack>
            )}

            {isLoading && (
                <VStack w='full' h='80px' borderRadius={'20px'} justifyContent={'center'} >
                    <Spinner />
                    <Text>Loading Businesses</Text>
                </VStack>
            )}
        </Box>
    )
}

export default MyBusiness
