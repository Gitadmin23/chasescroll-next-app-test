'use client'
import BookingStatsCard from '@/components/booking_component/bookingstatscard'
import CustomButton from '@/components/general/Button'
import CustomText from '@/components/general/Text'
import { Box, Button, Flex, HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import { FiChevronLeft, FiPlus } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import BookingEntry from '@/components/booking_component/booking_entry'

const arr = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,10];
function Dashboard() {
    const router = useRouter();

  return (
    <Flex direction={'column'} width='100%' height='100%' alignItems={'center'}>
       <Box width={['100%', '40%']} height='100%'>
        <HStack width={'100%'}>
                <FiChevronLeft color='grey' size='24px' />
                <CustomText fontFamily={'DM-Regular'} fontSize={'24px'}>Booking Dashboard</CustomText>
            </HStack>

            <HStack marginTop={'20px'}>
                <CustomButton onClick={() => router.push('/dashboard/booking/calendar')} text='My Booking' backgroundColor={'rgba(106, 111, 123, 0.10)'} rounded={'10px'} fontFamily={'DM-SemiBold'} color={'grey'} width='136px' height='48px' fontSize={'xs'} />

                <CustomButton text='Notification' backgroundColor={'rgba(106, 111, 123, 0.10)'} rounded={'10px'} fontFamily={'DM-SemiBold'} color={'grey'} width='136px' height='48px' fontSize={'xs'} />

                <CustomButton text='Chat' backgroundColor={'rgba(106, 111, 123, 0.10)'} rounded={'10px'} fontFamily={'DM-SemiBold'} color={'grey'} width='136px' height='48px' fontSize={'xs'} />

                <CustomButton text='Transaction' backgroundColor={'rgba(106, 111, 123, 0.10)'} rounded={'10px'} fontFamily={'DM-SemiBold'} color={'grey'} width='136px' height='48px' fontSize={'xs'} />
            </HStack>

            <HStack width='100%' marginY={'30px'}>
                <Box borderRadius={'49px 0px 49px 49px'} width='75px' height='75px' bg='lightgrey'/>
                <VStack>
                    <CustomText fontFamily={'DM-Medium'} color='black' fontSize={'18px'}>Reza Biazar</CustomText>
                    <CustomText fontSize={'14px'} color={'lightgrey'} fontFamily={'DM-Light'}>@reza_biazar</CustomText>
                </VStack>
            </HStack>

            <HStack marginBottom={'20px'} flexWrap={'wrap'} justifyContent={['center', 'flex-start']}>
                <BookingStatsCard title='Booking Types' stats={0} />
                <BookingStatsCard title='Active' stats={0} />
                <BookingStatsCard title='Paid' stats={0} />
                <BookingStatsCard title='Free' stats={0} />
            </HStack>


            <Button onClick={() => router.push('/dashboard/booking/create')} width={['100%', '92%']} height={'48px'} borderRadius={'10px'} bg={'brand.chasescrollButtonBlue'} color='white'>
                <FiPlus color='white' size='20px' />
                Create Business
            </Button>

            <Box marginTop={'40px'} paddingY={'30px'} width='92%' height={'auto'} overflow={'auto'} borderTopWidth={'1px'} borderTopColor={'lightgrey'}> 
                { arr.map((item, index) => (
                    <BookingEntry key={index.toString()} />
                ))}
            </Box>
       </Box>
    </Flex>
  )
}

export default Dashboard