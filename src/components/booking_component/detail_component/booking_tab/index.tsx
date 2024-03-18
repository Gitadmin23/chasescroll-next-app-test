import CustomText from '@/components/general/Text'
import { useDetails } from '@/global-state/useUserDetails'
import { IBooking } from '@/models/Booking'
import { PaginatedResponse } from '@/models/PaginatedResponse'
import { URLS } from '@/services/urls'
import httpService from '@/utils/httpService'
import { Box, Spinner, VStack } from '@chakra-ui/react'
import React from 'react'
import { useQuery } from 'react-query'

function BookingsTab({
    serviceId,
    userId: userID
}: {
    serviceId: string,
    userId?: string,
}) {
    const [bookings, setBookings] = React.useState<IBooking[]>([])
    const { userId } = useDetails((state) => state);

    const { isLoading, isError } = useQuery(['getServiceBookings', serviceId], () => httpService.get(URLS.GET_BOOKING,{
        params: {
            serviceID: serviceId,
            userID: userID,
        }
    }), {
        onSuccess: (data) => {
            const item: PaginatedResponse<IBooking> = data.data;
            setBookings(item.content);
        },
        onError: () => {},
    })
    if (isLoading) {
        return (
            <VStack width='100%' height='50px'>
                <Spinner />
                <CustomText>Loading Bookings...</CustomText>
            </VStack>
        )
    }

    if (!isLoading && isError) {
        return (
            <VStack width='100%' height='50px'>
                <CustomText color='red'>An Error Occured</CustomText>
            </VStack>
        )
    }
  return (
    <Box width='100%' height='100%'>
        {bookings.length < 1 && (
            <CustomText>No Bookings Yet</CustomText>
        )}
        {bookings.map((item, index) => (
            <Box key={index.toString()} width='50%' height='70%' bg='whitesmoke'>
                <CustomText>{item?.description}</CustomText>
                <CustomText>{item?.bookingType}</CustomText>
            </Box>
        ))}
    </Box>
  )
}

export default BookingsTab