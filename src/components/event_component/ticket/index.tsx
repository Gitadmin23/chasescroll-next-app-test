import { Box, HStack, VStack, Image, Flex, Text } from "@chakra-ui/react";
import { FiChevronLeft } from "react-icons/fi";
import CustomText from "@/components/general/Text";
import { ITicket } from "@/models/Ticket";
import QRCode from "react-qr-code";
import { IMAGE_URL, RESOURCE_BASE_URL } from "@/services/urls";
import EventPrice from "@/components/sharedComponent/event_price";
import EventImage from "@/components/sharedComponent/eventimage";
import UserImage from "@/components/sharedComponent/userimage";
import { capitalizeFLetter } from "@/utils/capitalLetter";
import { dateFormat, timeFormat } from "@/utils/dateFormat";
import { textLimit } from "@/utils/textlimit";
import CustomButton from "@/components/general/Button";
import { DownloadTwoIcon } from "@/components/svg";
import { BsChevronLeft } from "react-icons/bs";
import CopyRightText from "@/components/sharedComponent/CopyRightText";
import Barcode from "react-barcode";
import EventLocationDetail from "@/components/sharedComponent/event_location";
import { IoClose } from "react-icons/io5";


interface ITicketprops {
    ticket?: ITicket;
    showStatus?: boolean; // use this to show accepted or denied
    approved?: boolean;
    showQrCode?: boolean;
    close: () => void
}

export default function Ticket({ ticket, showStatus = false, approved, close }: ITicketprops) {
    // const { id, event } = ticket; 
    return (
        // <VStack width={'100%'} height={'100%'} paddingX={'20px'} bg={'white'} alignItems={'flex-start'}>
        //     {/*HEADER SECTION*/}
        //     <HStack height={'50px'} width={'100%'}>
        //         <FiChevronLeft size={25} />
        //         <HStack flex={1} justifyContent={'center'}>
        //             <CustomText fontFamily={'DM-Medium'} fontSize={'18px'}>Ticket Details</CustomText>
        //         </HStack>
        //     </HStack>

        //     {/*EVENT DETAILS SECTION*/}
        //     <HStack width={'100%'} height={'100px'} borderBottomWidth={'1.5px'} borderBottomStyle={'dashed'} borderBottomColor={'black'}>
        //         <Box borderRadius={'30px 0px 30px 30px'} bg={'lightgrey'} width={'60px'} height={'60px'} overflow={'hidden'}>
        //             <Image src={`${IMAGE_URL as string}${ticket?.event?.currentPicUrl as string}`} width={'100%'} height={'100%'} objectFit={'cover'} alt={'img'} />
        //         </Box>
        //         <VStack>
        //             <CustomText fontSize={'18px'} color={'brand.chasescrollButtonBlue'} fontFamily={'DM-Medium'}>{(ticket?.event?.eventName as string).length > 20 ? ticket?.event?.eventName.substring(0, 20) : ticket?.event?.eventName ?? 'davido man on fire'}</CustomText>
        //             <CustomText fontSize={'16px'} color={'black'} fontFamily={'DM-Regular'}>{ticket?.event?.location?.address.substring(0, 10) ?? 'no 2 abode street'}</CustomText>
        //         </VStack>
        //     </HStack>

        //     <HStack width={'100%'}>
        //         <VStack spacing={2} alignItems={'flex-start'}>
        //             <VStack alignItems={'flex-start'}>
        //                 <CustomText fontFamily={'DM-Medium'} fontSize={'18px'} color={'brand.chasescrollButtonBlue'}>Place</CustomText>
        //                 <CustomText wordBreak={'break-word'}>{ticket?.event?.location?.address ?? 'No 2 innoson road'}</CustomText>
        //             </VStack>

        //             <VStack alignItems={'flex-start'}>
        //                 <CustomText fontFamily={'DM-Medium'} fontSize={'18px'} color={'brand.chasescrollButtonBlue'}>OrderId</CustomText>
        //                 <CustomText wordBreak={'break-word'}>#{ticket?.id ?? 'feoefufoweof'}</CustomText>
        //             </VStack>

        //             <VStack alignItems={'flex-start'}>
        //                 <CustomText fontFamily={'DM-Medium'} fontSize={'18px'} color={'brand.chasescrollButtonBlue'}>Date</CustomText>
        //                 <CustomText wordBreak={'break-word'}>{new Date(ticket?.createdDate as number).toDateString() ?? '20-24-2024'}</CustomText>
        //             </VStack>

        //             <VStack alignItems={'flex-start'}>
        //                 <CustomText fontFamily={'DM-Medium'} fontSize={'18px'} color={'brand.chasescrollButtonBlue'}>Price</CustomText>
        //                 <CustomText wordBreak={'break-word'}>{ticket?.price ?? '20-24-2024'}</CustomText>
        //             </VStack>
        //         </VStack>

        //         <VStack spacing={2} alignItems={'flex-start'} paddingLeft={'20px'}>
        //             <Box width={'60px'} height={'60px'} bg={'lightgrey'} borderRadius={'8px'} overflow={'hidden'}>
        //                 <Image src={`${IMAGE_URL as string}/${ticket?.event?.currentPicUrl as string}`} width={'100%'} height={'100%'} objectFit={'cover'} alt={'img'}  />
        //             </Box>

        //             <VStack alignItems={'flex-start'}>
        //                 <CustomText fontFamily={'DM-Medium'} fontSize={'18px'} color={'brand.chasescrollButtonBlue'}>Name</CustomText>
        //                 <CustomText wordBreak={'break-word'}>{ticket?.createdBy?.firstName ?? '20-24-2024'}</CustomText>
        //             </VStack>

        //             <VStack alignItems={'flex-start'} style={{ wordWrap: 'break-word'}}>
        //                 <CustomText fontFamily={'DM-Medium'} fontSize={'18px'} color={'brand.chasescrollButtonBlue'}>Time</CustomText>
        //                 <CustomText width={'100%'} wordBreak={'break-word'}>{ticket?.event?.startTime ?? '20-24-2024'}</CustomText>
        //             </VStack>

        //             <VStack alignItems={'flex-start'} spacing={'1'}>
        //                 <CustomText fontFamily={'DM-Medium'} fontSize={'18px'} color={'brand.chasescrollButtonBlue'}>Price</CustomText>
        //                 <CustomText wordBreak={'break-word'}>{ticket?.index ?? 3}</CustomText>
        //             </VStack>

        //         </VStack>
        //     </HStack>

        //     {/*BAR CODE*/}
        //     { showQrCode && (
        //         <HStack width={'100%'} height={'150px'} justifyContent={'center'}>
        //             <QRCode value={ticket?.id ?? 'hellotherepeople'} style={{ width: '100px', height: '100px'}} />
        //         </HStack>
        //     )}
        // </VStack>

        // <Flex p={"6"} shadow={"lg"} flexDirection={"column"} bg={"#eee"} roundedTop={"md"} width={"full"} alignItems={"center"} justifyContent={"center"} px={"2"} gap={"2"} >
        //     <Flex position={"relative"} gap={"4"} mb={"4"} width={"full"} justifyContent={"space-between"} alignItems={"start"} >
        //         <Box as='button' >
        //             <BsChevronLeft color={"black"} size={"25px"} />
        //         </Box>
        //         <Flex pos={"absolute"} w={"full"} justifyContent={"center"} >
        //             <Text fontSize={"20px"} fontWeight={"bold"} textAlign={"center"} >Ticket Details</Text>
        //         </Flex>
        //     </Flex>
        //     <Flex maxW={["400px", "400px", "750px"]} w={["full", "full", "fit-content"]} flexDir={["column", "column", "row"]} rounded={"16px"} pb={"4"} pt={["4"]} p={["0px", "", "4"]} bg={"white"} alignItems={["start", "start", "center"]} justifyContent={"center"} gap={"4"} >
        //         <Flex w={["full", "full", "fit-content"]} gap={"4"} mt={["4", "4", "0px"]} px={["4", "4", ""]} >
        //             <EventImage width={["full", "full", "201px"]} height={["201px", "201px", "201px"]} data={ticket?.event} />
        //         </Flex>
        //         <Flex position={"relative"} flexDir={"column"} gap={"4"} px={["4", "4", "0px"]} >

        //             <Box width={'250px'} height={'250px'} position={'absolute'} top={'160px'} left={'220px'} bg={'transparent'}>
        //                 <Image src={approved ? '/assets/approved.svg' : '/assets/denied.svg'} alt={'approved'} width={'100px'} height={'100px'} objectFit={'cover'} />
        //             </Box>
        //             <Text fontSize={"24px"} lineHeight={"18px"} fontWeight={"bold"} >{capitalizeFLetter(ticket?.event?.eventName)}</Text>


        //             <Flex gap={"4"} display={["flex", "flex", "none"]} fontSize={"xs"} >

        //                 <UserImage size={58} image={ticket?.createdBy?.data?.imgMain?.value} data={ticket?.createdBy} />
        //                 <Flex flexDirection={"column"} gap={"2"} >
        //                     <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Name</Text>
        //                     <Text color={"brand.chasescrollTextGrey"} >{ticket?.createdBy?.firstName + " " + ticket?.createdBy?.lastName}</Text>
        //                 </Flex>
        //             </Flex>
        //             <Flex gap={"4"} alignItems={"center"} >
        //                 <Flex border={`0.5px solid #CDD3FD`} h={"34px"} justifyContent={"center"} alignItems={"center"} px={"3"} color={"#5B5858"} fontSize={"10px"} lineHeight={"13.68px"} rounded={"full"} >
        //                     {dateFormat(ticket?.event?.startDate)}
        //                 </Flex>
        //                 <Flex border={`0.5px solid #CDD3FD`} h={"34px"} justifyContent={"center"} alignItems={"center"} px={"3"} color={"#5B5858"} fontSize={"10px"} lineHeight={"13.68px"} rounded={"full"} >
        //                     {timeFormat(ticket?.event?.startDate)}
        //                 </Flex>
        //             </Flex>
        //             <Flex gap={"4"} >

        //                 <Flex flexDirection={"column"} >
        //                     <Text fontWeight={"bold"} fontSize={"10.26px"} lineHeight={"16.42px"} color={"brand.chasescrollBlue"} >Order ID</Text>
        //                     <Text color={"brand.chasescrollTextGrey"} fontSize={"10.26px"} lineHeight={"13.68px"}  >{textLimit(ticket?.id + "", 7)}</Text>
        //                 </Flex>
        //                 <Flex flexDirection={"column"} >
        //                     <Text fontWeight={"bold"} fontSize={"10.26px"} lineHeight={"16.42px"} color={"brand.chasescrollBlue"} >Ticket fee</Text>
        //                     <Text color={"brand.chasescrollTextGrey"} fontSize={"10.26px"} lineHeight={"13.68px"}  >
        //                         <EventPrice minPrice={ticket?.boughtPrice} maxPrice={ticket?.boughtPrice} currency={ticket?.event?.currency} />
        //                     </Text>
        //                 </Flex>
        //                 {/* <Flex flexDirection={"column"} >
        //                 <Text fontWeight={"bold"} fontSize={"10.26px"} lineHeight={"16.42px"} color={"brand.chasescrollBlue"} >Number</Text>
        //                 <Text color={"brand.chasescrollTextGrey"} fontSize={"10.26px"} lineHeight={"13.68px"}  >{index + 1}/{dataMultiple?.length}</Text>
        //             </Flex> */}
        //             </Flex>
        //             <Flex gap={"4"} display={["none", "none", "flex"]} fontSize={"xs"} >

        //                 <UserImage size={58} image={ticket?.createdBy?.data?.imgMain?.value} data={ticket?.createdBy} />
        //                 <Flex flexDirection={"column"} gap={"2"} >
        //                     <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Name</Text>
        //                     <Text color={"brand.chasescrollTextGrey"} >{ticket?.createdBy?.firstName + " " + ticket?.createdBy?.lastName}</Text>
        //                 </Flex>
        //             </Flex>
        //         </Flex>

        //         <Flex borderLeft={["", "", "1px dashed black"]} borderTop={["1px dashed black", "1px dashed black", "0px"]} w={["full", "full", "fit-content"]} alignItems={"center"} border={""} py={["4", "4", "0px"]} pl={["0px", "0px", "4"]} flexDir={"column"} >
        //             <Box bg={"white"} p={"3"} w={"fit-content"} rounded={"16px"} >
        //                 <QRCode
        //                     style={{ height: "200px", width: "200px", zIndex: 20 }}
        //                     value={ticket?.id + ""}
        //                     viewBox={`0 0 256 256`}
        //                 />
        //             </Box>
        //         </Flex>
        //     </Flex>
        // </Flex>
        (<Flex p={"4"} shadow={"lg"} flexDirection={"column"} bg={"white"} roundedTop={"md"} width={"full"} alignItems={"center"} justifyContent={"center"} gap={"2"} >
            <Flex gap={"4"} width={"full"} alignItems={"center"} justifyContent={"space-between"} >

                <Text fontSize={"20px"} fontWeight={"bold"} textAlign={"center"} >Ticket Details</Text>
                <Box onClick={() => close()} as='button' >
                    <IoClose color={"black"} size={"25px"} />
                </Box>
            </Flex>
            <Flex width={"full"} flexDirection={"column"} alignItems={"center"} >

                <Flex width={"fit-content"} flexDirection={"column"} bg={"white"} alignItems={"center"} justifyContent={"center"} gap={"2"} >

                    <Flex alignItems={"center"} gap={"4"} py={"2"} px={"2"} borderBottom={"1px solid #E2E8F0"}  >
                        <Box w={"fit-content"} >
                            <EventImage width={"140px"} height={"110px"} data={ticket?.event} />
                        </Box>
                        <Box>
                            <Text fontSize={"17px"} fontWeight={"bold"} >{textLimit(ticket?.event?.eventName + "", 15)}</Text>
                            <EventLocationDetail isLimited={true} location={ticket?.event?.location} fontWeight={"medium"} color={"brand.chasescrollBlue"} fontsize='sm' noicon={true} locationType={ticket?.event?.locationType} />
                        </Box>
                    </Flex>
                    <Flex width={"full"} pos={"relative"} pb={"2"} justifyContent={"center"} borderBottom={"1px solid #E2E8F0"}  >
                        <Box width={'fit-content'} height={'fit-content'} position={'absolute'} bottom={'10px'} right={"6"} bg={'transparent'}>
                            <Image src={approved ? '/assets/approved.svg' : '/assets/denied.svg'} alt={'approved'} width={'150px'} height={'150px'} objectFit={'cover'} />
                        </Box>
                        <Flex p={"2"} width={"full"} flexDirection={"column"} gap={"4"} fontSize={"xs"} >
                            <Flex flexDirection={"column"} gap={"2"} >
                                <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Place</Text>
                                <EventLocationDetail isLimited={true} color={"brand.chasescrollTextGrey"} fontsize={"xs"} location={ticket?.event?.location} fontWeight={"medium"} noicon={true} locationType={ticket?.event?.locationType} />
                            </Flex>
                            <Flex flexDirection={"column"} gap={"2"} >
                                <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Order ID</Text>
                                <Text color={"brand.chasescrollTextGrey"} >{textLimit(ticket?.id + "", 10)}</Text>
                            </Flex>
                            <Flex flexDirection={"column"} gap={"2"} >
                                <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Date</Text>
                                <Text color={"brand.chasescrollTextGrey"} >{dateFormat(ticket?.createdDate)}</Text>
                            </Flex>
                            <Flex flexDirection={"column"} gap={"2"} >
                                <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Ticket Fee</Text>
                                <Text color={"brand.chasescrollTextGrey"} >
                                    <EventPrice minPrice={ticket?.boughtPrice} maxPrice={ticket?.boughtPrice} currency={ticket?.event?.currency} />
                                </Text>
                            </Flex>
                            <Flex flexDirection={"column"} gap={"2"} >
                                <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Ticket Type</Text>
                                <Text color={"brand.chasescrollTextGrey"} >
                                    {ticket?.ticketType}
                                </Text>
                            </Flex>
                        </Flex>
                        <Flex p={"2"} width={"full"} flexDirection={"column"} gap={"4"} fontSize={"xs"} >

                            <UserImage size={58} image={ticket?.createdBy?.data?.imgMain?.value} data={ticket?.createdBy} />
                            <Flex flexDirection={"column"} gap={"2"} >
                                <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Name</Text>
                                <Text color={"brand.chasescrollTextGrey"} >{ticket?.createdBy?.username}</Text>
                            </Flex>
                            <Flex flexDirection={"column"} gap={"2"} >
                                <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Time</Text>
                                <Text color={"brand.chasescrollTextGrey"} >{timeFormat(ticket?.createdDate)}</Text>
                            </Flex>
                        </Flex>
                    </Flex>

                    <Flex gap={"2"} borderLeft={["", "", "1px dashed black"]} borderTop={["1px dashed black", "1px dashed black", "0px"]} w={["full", "full", "fit-content"]} alignItems={"center"} border={""} py={["4", "4", "0px"]} pl={["0px", "0px", "4"]} flexDir={"column"} >
                        <Box bg={"white"} p={"3"} w={"fit-content"} rounded={"16px"} >
                            <QRCode
                                style={{ height: "100px", width: "100px", zIndex: 20 }}
                                value={ticket?.id + ""}
                                viewBox={`0 0 256 256`}
                            />
                        </Box> 
                        <Text textAlign={"center"} fontSize={"xs"} >Powered by Chasescroll</Text>
                    </Flex>
                </Flex>

            </Flex>
        </Flex>)
    );
}
