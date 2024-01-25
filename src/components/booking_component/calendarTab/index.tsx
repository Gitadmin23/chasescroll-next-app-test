import CustomText from '@/components/general/Text';
import { THEME } from '@/theme';
import { HStack } from '@chakra-ui/react';
import React from 'react'

interface IProps {
    activeTab: number;
    setActiveTab: (data: number) => void
}

function CalendarTab({ activeTab, setActiveTab }: IProps) {
    return (
        <HStack width='100%' height='20px' spacing={6} marginY={'30px'}>
            <CustomText fontFamily={'DM-Regular'} fontSize={'18px'} color='grey' borderBottomWidth={activeTab === 1 ? 1:0} borderBottomColor={THEME.COLORS.chasescrollButtonBlue} onClick={() => setActiveTab(1)} cursor={'pointer'}>
                All
            </CustomText>

            <CustomText fontFamily={'DM-Regular'} fontSize={'18px'} color='grey' borderBottomWidth={activeTab === 2 ? 1:0} borderBottomColor={THEME.COLORS.chasescrollButtonBlue} onClick={() => setActiveTab(2)} cursor={'pointer'}>
                Requests
            </CustomText>

            <CustomText fontFamily={'DM-Regular'} fontSize={'18px'} color='grey' borderBottomWidth={activeTab === 3 ? 1:0} borderBottomColor={THEME.COLORS.chasescrollButtonBlue} onClick={() => setActiveTab(3)} cursor={'pointer'}>
                Scheduled
            </CustomText>

            <CustomText fontFamily={'DM-Regular'} fontSize={'18px'} color='grey' borderBottomWidth={activeTab === 4 ? 1:0} borderBottomColor={THEME.COLORS.chasescrollButtonBlue} onClick={() => setActiveTab(4)} cursor={'pointer'}>
                Cancelled
            </CustomText>

            <CustomText fontFamily={'DM-Regular'} fontSize={'18px'} color='grey' borderBottomWidth={activeTab === 5 ? 1:0} borderBottomColor={THEME.COLORS.chasescrollButtonBlue} onClick={() => setActiveTab(5)} cursor={'pointer'}>
                Completed
            </CustomText>
        </HStack>
    )
}

export default CalendarTab