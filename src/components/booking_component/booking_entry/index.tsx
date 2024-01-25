'use client'
import CustomText from '@/components/general/Text'
import { Box, HStack, VStack } from '@chakra-ui/react'
import ReactStars from "react-rating-stars-component";
import React from 'react'
import { useRouter } from 'next/navigation';

function BookingEntry() {
    const router = useRouter();
    const ratingChanged = (newRating: any) => {
        console.log(newRating);
      };
  return (
   <HStack cursor={'pointer'} onClick={() => router.push('/dashboard/booking/information')} width='100%' marginBottom='20px'>
    <Box width={'70px'} height={'70px'} bg='lightgrey' borderRadius={'10px'}></Box>

    <VStack alignItems={'flex-start'} spacing={0}>
        <CustomText fontSize={'18px'} fontFamily={'DM-Medium'} color='black'>Flod&apos;s 99 barbershop</CustomText>
        <ReactStars
            count={5}
            onChange={ratingChanged}
            size={14}
            activeColor="#ffd700"
            value={3.6}
            edit={false}
            isHalf
        />
        <CustomText fontFamily={'DM-Light'} fontSize={'14px'} color='grey'>143 Histoeric Town square, Lancaster, 75146</CustomText>
    </VStack>
   </HStack>
  )
}

export default BookingEntry