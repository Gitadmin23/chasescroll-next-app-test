import CustomText from '@/components/general/Text'
import { Box, HStack, VStack } from '@chakra-ui/react'
import React from 'react'

function CalenderEntryCard() {
  return (
    <HStack width='100%' height={'100px'} marginBottom={'30px'}>
        <VStack spacing={0}>
            <CustomText fontFamily={'DM-Medium'} fontSize={'20px'} color={'black'}>SUN</CustomText>
            <CustomText fontFamily={'DM-Regular'} fontSize={'18px'} color='grey'>12</CustomText>
        </VStack>

        {/* MAIN CARD AREA */}
        <HStack width='100%' height={'100%'} borderRadius={'10px'} borderLeftWidth={'10px'} borderLeftColor={'blue'} borderWidth={'1px'} borderColor={'lightgrey'} overflow={'hidden'}>
            <HStack borderLeftWidth={'10px'} borderLeftColor={'lightblue'} width={'100%'} height='100%' paddingX={'10px'}>
                <VStack alignItems={'flex-start'}>
                    <CustomText fontSize={'18px'} fontFamily={'DM-Medium'} color={'black'}>Meeting with mentor circle</CustomText>
                    <CustomText fontSize={'16px'} fontFamily={'DM-Medium'} color={'grey'}>10:00AM</CustomText>
                </VStack>

                <VStack alignItems={'flex-end'} flex={1}>
                    <Box borderRadius={'30px 0px 30px 30px'} bg='lightgrey' width='50px' height='50px' />
                    <CustomText fontSize={'16px'} color={'red'} fontFamily={'DM-Light'}>Cancelled</CustomText>
                </VStack>
            </HStack>
        </HStack>
    </HStack>
  )
}

export default CalenderEntryCard