/* eslint-disable react/display-name */
import { useCommunityPageState } from '@/app/dashboard/community/chat/state';
import CustomText from '@/components/general/Text'
import { ICommunity } from '@/models/Communitty'
import { RESOURCE_BASE_URL } from '@/services/urls';
import { Avatar, HStack, Image, VStack, Box } from '@chakra-ui/react'
import React from 'react'

interface IProps {
    community?: ICommunity;
}

const SidebarCard = React.forwardRef<HTMLDivElement, IProps>(({ community: comm }, ref) => {
    const [community, setCommunity] = React.useState(comm);
    const { setAll, activeCommunity } = useCommunityPageState((state) => state);
    return (
        <HStack bg={ activeCommunity?.id === comm?.id ? '#EAEAFC66':'white'} onClick={() => setAll({ activeCommunity: comm })} ref={ref} paddingX='10px' width='100%' height='60px' borderRadius={activeCommunity?.id === comm?.id ?'8px':'0px'} alignItems={'center'} justifyContent={'space-between'} borderBottomWidth={activeCommunity?.id === comm?.id ?'0px':'1px'} borderBottomColor={'lightgrey'}>

            <HStack>
                <Box width='32px' height='32px' borderRadius={'20px 0px 20px 20px'} borderWidth={'2px'} borderColor={'brand.chasescrollBlue'} overflow={'hidden'}>
                    { comm?.data.imgSrc === null && (
                        <VStack width={'100%'} height='100%' justifyContent={'center'} alignItems={'center'}>
                            <CustomText fontFamily={'DM-Regular'}>{comm.data.name[0].toUpperCase()}</CustomText>
                        </VStack>
                    )}
                    {
                        comm?.data.imgSrc && (
                            <Image src={`${RESOURCE_BASE_URL}${comm.data.imgSrc}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} />
                        )
                    }
                </Box>

                <VStack alignItems={'flex-start'} spacing={0}>
                    <CustomText fontFamily={'DM-Bold'} fontSize={'14px'}>{comm?.data.name}</CustomText>
                    <CustomText fontFamily={'DM-Light'} fontSize={'12px'}>{comm?.data.description}</CustomText>
                </VStack>
            </HStack>

            <VStack alignItems={'flex-end'}>
                {/* <CustomText fontFamily={'Satoshi-Light'} fontSize={'12px'}>{new Date(comm?.createdOn as number).toDateString()}</CustomText> */}
                <VStack width='67px' height='21px' borderRadius={'4px'} justifyContent={'center'} alignItems={'center'} bg='#D0D4EB52' color='white'>
                    <CustomText fontSize={'10px'} color='brand.chasescrollButtonBlue' fontFamily={'DM-Regular'}>{comm?.data.memberCount} Members</CustomText>
                </VStack>
            </VStack>
        
    </HStack>
    )
});

export default SidebarCard