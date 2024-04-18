import {Box, HStack, VStack, Image} from "@chakra-ui/react";
import {FiChevronLeft} from "react-icons/fi";
import CustomText from "@/components/general/Text";
import {ITicket} from "@/models/Ticket";
import QRCode from "react-qr-code";


interface ITicketprops {
    ticket?: ITicket;
    showStatus?: boolean; // use this to show accepted or denied
    approved?: boolean;
    showQrCode?: boolean;
}

export default function Ticket({ ticket, showStatus = false, approved = false, showQrCode = false }: ITicketprops) {
    // const { id, event } = ticket;
    return (
        <VStack width={'100%'} height={'100%'} paddingX={'20px'} bg={'white'} alignItems={'flex-start'}>
            {/*HEADER SECTION*/}
            <HStack height={'50px'} width={'100%'}>
                <FiChevronLeft size={25} />
                <HStack flex={1} justifyContent={'center'}>
                    <CustomText fontFamily={'DM-Medium'} fontSize={'18px'}>Ticket Details</CustomText>
                </HStack>
            </HStack>

            {/*EVENT DETAILS SECTION*/}
            <HStack width={'100%'} height={'100px'} borderBottomWidth={'1.5px'} borderBottomStyle={'dashed'} borderBottomColor={'black'}>
                <Box borderRadius={'30px 0px 30px 30px'} bg={'lightgrey'}>
                    <Image src={ticket?.event?.currentPicUrl} width={'100%'} height={'100%'} objectFit={'cover'} alt={'img'} />
                </Box>
                <VStack>
                    <CustomText fontSize={'18px'} color={'brand.chasescrollButtonBlue'} fontFamily={'DM-Medium'}>{ticket?.event?.eventName ?? 'davido man on fire'}</CustomText>
                    <CustomText fontSize={'16px'} color={'black'} fontFamily={'DM-Regular'}>{ticket?.event?.location?.address.substring(0, 10) ?? 'no 2 abode street'}</CustomText>
                </VStack>
            </HStack>

            <HStack width={'100%'}>
                <VStack spacing={2} alignItems={'flex-start'}>
                    <VStack alignItems={'flex-start'}>
                        <CustomText fontFamily={'DM-Medium'} fontSize={'18px'} color={'brand.chasescrollButtonBlue'}>Place</CustomText>
                        <CustomText>{ticket?.event?.location?.address ?? 'No 2 innoson road'}</CustomText>
                    </VStack>

                    <VStack alignItems={'flex-start'}>
                        <CustomText fontFamily={'DM-Medium'} fontSize={'18px'} color={'brand.chasescrollButtonBlue'}>OrderId</CustomText>
                        <CustomText>#{ticket?.id ?? 'feoefufoweof'}</CustomText>
                    </VStack>

                    <VStack alignItems={'flex-start'}>
                        <CustomText fontFamily={'DM-Medium'} fontSize={'18px'} color={'brand.chasescrollButtonBlue'}>Date</CustomText>
                        <CustomText>#{ticket?.createdDate ?? '20-24-2024'}</CustomText>
                    </VStack>

                    <VStack alignItems={'flex-start'}>
                        <CustomText fontFamily={'DM-Medium'} fontSize={'18px'} color={'brand.chasescrollButtonBlue'}>Price</CustomText>
                        <CustomText>#{ticket?.price ?? '20-24-2024'}</CustomText>
                    </VStack>
                </VStack>

                <VStack spacing={2} alignItems={'flex-start'} paddingLeft={'20px'}>
                    <Box width={'100px'} height={'100px'} bg={'lightgrey'} borderRadius={'8px'} overflow={'hidden'}>
                        <Image src={ticket?.event?.currentPicUrl} width={'100%'} height={'100%'} objectFit={'cover'} alt={'img'}  />
                    </Box>

                    <VStack alignItems={'flex-start'}>
                        <CustomText fontFamily={'DM-Medium'} fontSize={'18px'} color={'brand.chasescrollButtonBlue'}>Name</CustomText>
                        <CustomText>{ticket?.createdBy?.firstName ?? '20-24-2024'}</CustomText>
                    </VStack>

                    <VStack alignItems={'flex-start'}>
                        <CustomText fontFamily={'DM-Medium'} fontSize={'18px'} color={'brand.chasescrollButtonBlue'}>Time</CustomText>
                        <CustomText>#{ticket?.event?.startTime ?? '20-24-2024'}</CustomText>
                    </VStack>

                    <VStack alignItems={'flex-start'}>
                        <CustomText fontFamily={'DM-Medium'} fontSize={'18px'} color={'brand.chasescrollButtonBlue'}>Price</CustomText>
                        <CustomText>{ticket?.index ?? 3}</CustomText>
                    </VStack>

                </VStack>
            </HStack>

            {/*BAR CODE*/}
            { showQrCode && (
                <HStack width={'100%'} height={'150px'} justifyContent={'center'}>
                    <QRCode value={ticket?.id ?? 'hellotherepeople'} style={{ width: '100px', height: '100px'}} />
                </HStack>
            )}
        </VStack>
    )
}
