import { ICommunityMember } from '@/models/Communitty'
import { Box, HStack, VStack, Image } from '@chakra-ui/react'
import React from 'react'
import CustomText from '../general/Text';
import { IMAGE_URL } from '@/services/urls';
import { THEME } from '@/theme';

function MemberCard({
    member,
    isAdmin = false,
}: {
    member: ICommunityMember,
    isAdmin: boolean;
}) {
  return (
    <HStack width={'100%'} height='60px' borderBottomWidth={'0.8px'} borderBottomColor={'lightgray'} justifyContent={'space-between'}>
        <HStack>
                <Box width='32px' height='32px' borderRadius={'20px 0px 20px 20px'} borderWidth={'2px'} borderColor={'#D0D4EB'} overflow={'hidden'}>
                    { member?.user.data?.imgMain.value === null && (
                        <VStack width={'100%'} height='100%' justifyContent={'center'} alignItems={'center'}>
                            <CustomText fontFamily={'DM-Regular'}>{member?.user.username[0].toUpperCase()}</CustomText>
                        </VStack>
                    )}
                    {
                        member?.user.data?.imgMain.value && (
                            <Image src={`${IMAGE_URL}${member?.user.data?.imgMain.value}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} />
                        )
                    }
                </Box>
                <VStack>
                    <CustomText>{member?.user?.firstName} {member?.user?.lastName}</CustomText>
                    <CustomText>{member?.user?.data?.about?.value || ''}</CustomText>
                </VStack>
        </HStack>
        { member.role === 'ADMIN' && <CustomText color={THEME.COLORS.chasescrollButtonBlue} fontFamily={'DM-Medium'} fontSize={'12px'}>Admin</CustomText>}
    </HStack>
  )
}

export default MemberCard