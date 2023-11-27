/* eslint-disable react/display-name */
import { useCommunityPageState } from '@/components/Community/chat/state';
import CustomText from '@/components/general/Text'
import CommunityImage from '@/components/sharedComponent/community_image';
import { ICommunity } from '@/models/Communitty'
import { IMAGE_URL, RESOURCE_BASE_URL } from '@/services/urls';
import { Avatar, HStack, Image, VStack, Box } from '@chakra-ui/react'
import React from 'react'

interface IProps {
    community?: ICommunity;
}

const SidebarCard = React.forwardRef<HTMLDivElement, IProps>(({ community: comm }, ref) => {
    const [community, setCommunity] = React.useState(comm);
    const { setAll, activeCommunity } = useCommunityPageState((state) => state);
    return (
        <HStack bg={ activeCommunity?.id === comm?.id ? '#EAEAFC66':'white'} onClick={() => setAll({ activeCommunity: comm, pageNumber: 0, messages: [], hasNext: false })} ref={ref} paddingX='10px' width='100%' height='60px' borderRadius={activeCommunity?.id === comm?.id ?'8px':'8px'} alignItems={'center'} justifyContent={'space-between'} borderBottomWidth={activeCommunity?.id === comm?.id ?'1px':'1px'} borderBottomColor={'lightgrey'} >

            <HStack>
                {/* <Box width='32px' height='32px' borderRadius={'20px 0px 20px 20px'} borderWidth={'2px'} borderColor={'#D0D4EB'} overflow={'hidden'}> */}
                    {/* { comm?.data?.imgSrc === null && (
                        <VStack width={'100%'} height='100%' justifyContent={'center'} alignItems={'center'}>
                            <CustomText fontFamily={'DM-Regular'}>{comm.data.name[0].toUpperCase()}</CustomText>
                        </VStack>
                    )}
                    {
                        comm?.data?.imgSrc && (
                            <>
                                { comm?.data.imgSrc.startsWith('https://') && <Image src={`${comm.data.imgSrc}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} /> }

                                { !comm?.data.imgSrc.startsWith('https://') && <Image src={`${IMAGE_URL}${comm.data.imgSrc}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} /> }
                            </>
                        )
                    } */}
                    <Box width={"fit-content"} > 
                        <CommunityImage data={comm} size={"32px"} font="13px" />
                    </Box>
                {/* </Box> */}

                <VStack alignItems={'flex-start'} spacing={0}>
                    <CustomText fontFamily={'DM-Bold'} fontSize={'14px'}>{comm?.data.name.substring(0, 20)}</CustomText>
                    <CustomText fontFamily={'DM-Light'} fontSize={'12px'}>{comm?.data.description.substring(0, 25)}</CustomText>
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