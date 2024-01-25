'use client';
import CalenderEntryCard from '@/components/booking_component/CalendarEntryCard';
import BookingEntry from '@/components/booking_component/booking_entry';
import CalendarTab from '@/components/booking_component/calendarTab';
import CustomText from '@/components/general/Text'
import { Flex, VStack, Box, HStack } from '@chakra-ui/react'
import React from 'react'
import { FiCheck, FiChevronLeft } from 'react-icons/fi'
import CalendarComponent from 'react-calendar';

const array = [1,2,3,4,5,6,7,8,9,10];
function Calendar() {
    const [activeTab, setActiveTab] = React.useState(1);
    return (
        <Flex width={'100%'} height={'100%'} justifyContent={['flex-start', 'center']}>
            <HStack width={['100%', '70%']} height='100%' alignItems={'flex-start'}>

                <Box paddingX={'20px'} flex='1' bg='white' height='100%' overflowY={'auto'} overflowX={'hidden'}>
                    <HStack>
                        <FiChevronLeft size='24px' color='black' />
                        <CustomText fontFamily={'DM-Medium'} fontSize={'24px'}>Dashboard</CustomText>
                    </HStack>

                    <CalendarTab activeTab={activeTab} setActiveTab={(data) => setActiveTab(data)} />

                    { array.map((item, index) => (
                        <CalenderEntryCard key={index.toString()} />
                    ))}
                </Box>

                {/* calendar section */}
                <Box flex='1' bg='white'  overflowY={'auto'} overflowX={'hidden'}>
                    <BookingEntry />
                    <Box marginY={'30px'} />
                    <CalendarComponent  />
                </Box>
            </HStack>
        </Flex>
    )
}

export default Calendar