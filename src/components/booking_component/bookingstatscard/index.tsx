import CustomText from '@/components/general/Text'
import { VStack } from '@chakra-ui/react'
import React from 'react'

interface IProps {
    title: string;
    stats: number;
}


const BookingStatsCard = ({title, stats}: IProps) => {
  return (
    <VStack alignItems={'center'} width='136px'>
      <CustomText fontFamily={'DM-Regular'} fontSize={'18px'}>{title}</CustomText>
      <VStack width='136px' height='41px' bg='#5DF9F0' justifyContent={'center'} alignItems={'center'}>
        <CustomText fontFamily={'DM-Bold'} fontSize={'25px'} color='white'>{stats.toString()}</CustomText>
      </VStack>
    </VStack>
  )
}

export default BookingStatsCard