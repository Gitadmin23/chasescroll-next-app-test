import { Box, Flex, Image, Text, useColorMode, useToast } from "@chakra-ui/react";
import CustomButton from "../general/Button";
import useCustomTheme from "@/hooks/useTheme";
import useModalStore from "@/global-state/useModalSwitch";
import React, { useRef, useState } from "react";
import ModalLayout from "../sharedComponent/modal_layout";
import { useQuery } from "react-query";
import httpService from "@/utils/httpService";
import { useDetails } from "@/global-state/useUserDetails";
import { DownloadTwoIcon } from "../svg";
import { useReactToPrint } from "react-to-print";
import { IoClose } from "react-icons/io5";
import LoadingAnimation from "../sharedComponent/loading_animation";
import { capitalizeFLetter } from "@/utils/capitalLetter";
import { textLimit } from "@/utils/textlimit";
import { dateFormat, timeFormat } from "@/utils/dateFormat";
import EventPrice from "../sharedComponent/event_price";
import UserImage from "../sharedComponent/userimage";
import QRCode from "react-qr-code";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import EventImage from "../sharedComponent/eventimage";
import { IEventType } from "@/models/Event";

export default function ViewTicket(
    {
        data
    }: {
        data: IEventType
    }) {

    const { ticketType, setTicketType } = useModalStore((state) => state);
    const [open, setOpen] = useState(false)

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        ticketBackgroundColor,
        headerTextColor
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const toast = useToast()

    const contentRef = useRef<HTMLDivElement>(null);
    const [datainfo, setTicketDetails] = useState({} as any)
    const [dataMultiple, setDataMultiple] = useState([] as any)
    const [length, setTicketLenght] = useState("" as any)

    let userId = sessionStorage?.getItem("user_id") + "";
    const { userId: user_index } = useDetails((state) => state);

    const reactToPrintFn = useReactToPrint({ contentRef });

    const { isLoading } = useQuery(['event_ticket', data?.id, userId], () => httpService.get(`/events/get-users-tickets?userID=${user_index ? user_index : userId}&eventID=${data?.id}`), {
        onError: (error: any) => {
            toast({
                status: "error",
                title: error.response?.data,
                position: 'top-right',
            });
        },
        onSuccess: (data) => {
            setTicketLenght(data?.data?.content?.length)
            setTicketDetails(data?.data?.content[0]);
            setDataMultiple(data?.data?.content)
            console.log(data?.data?.content);
            
        },
        enabled: data?.isBought
    })


    const checkEventDay = (item: any) => {
        return (new Date(item[item?.length - 1])?.getDate() >= new Date(datainfo?.event?.startDate)?.getDate()) && (new Date(item[item?.length - 1])?.getDate() <= new Date(datainfo?.event?.endDate)?.getDate())
    }



    const isToDay = (item: any) => {

        return (new Date()?.getDate() === new Date(item)?.getDate() || new Date(datainfo?.endDate)?.getDate() === new Date(item)?.getDate())
    }

    const ref: any = React.useRef(null);

    const scroll = (scrolloffset: number) => {
        ref.current.scrollLeft += scrolloffset
    };

    return (
        <>
            {data?.isBought && (
                <Flex w={"full"} display={[data?.isBought ? "block" : "block", "block", "block", "block"]} >
                    <CustomButton backgroundColor={"#F2F4FF"} borderWidth={"1px"} borderColor={primaryColor} color={primaryColor} borderRadius={"32px"} opacity={(!ticketType?.ticketType && !data?.isBought && ticketType?.ticketType) ? "30%" : ""} my={"auto"} onClick={() => setOpen(true)} disable={(((ticketType?.totalNumberOfTickets === ticketType?.ticketsSold) && !data?.isBought && ticketType?.ticketType)) ? true : (ticketType?.ticketType || data?.isBought) ? false : true} text={`View Ticket${length > 1 ? `s x${length}` : ""}`} width={["full"]} height={["37px", " 37px", "57px"]} fontSize={"sm"} fontWeight={"semibold"} />
                </Flex>
            )}
            <ModalLayout size={["full", "md", "3xl"]} title={""} open={open} close={setOpen} >

                <LoadingAnimation loading={isLoading} >
                    <Flex p={"4"} shadow={"lg"} position={"relative"} flexDirection={"column"} bg={mainBackgroundColor} roundedTop={"md"} width={"full"} alignItems={"center"} justifyContent={"center"} px={"2"} gap={"2"} >
                        <Flex bg={mainBackgroundColor} maxW={["750px"]} display={["none", "none", "flex"]} position={"relative"} gap={"4"} px={"4"} mb={"2"} width={"full"} justifyContent={"space-between"} alignItems={"center"} >

                            <Box display={["none", "none", "flex"]} zIndex={"10"} onClick={() => setOpen(false)} as='button' >
                                <IoClose size={"30px"} />
                            </Box>
                            <Flex pos={"absolute"} display={["none", "none", "flex"]} w={"full"} justifyContent={"center"} >
                                <Text fontSize={"20px"} fontWeight={"bold"} textAlign={"center"} >Ticket Details</Text>
                            </Flex>
                            {/* <Box as='button' pos={"relative"} zIndex={"10"} onClick={handlePrint} display={["block", "block", "none"]}>
                        <DownloadTwoIcon />
                    </Box> */}
                            <Box display={["none", "none", "block"]} >
                                <CustomButton width={"fit-content"} backgroundColor={"#3EC259"} color={"#FFF"} borderRadius={"full"} onClick={() => reactToPrintFn()} text='Download Ticket' />
                            </Box>
                        </Flex>
                        <Box pos={"absolute"} top={"2"} left={"2"} p={"1"} bgColor={mainBackgroundColor} rounded={"full"} display={["flex", "flex", "none"]} zIndex={"10"} onClick={() => setOpen(false)} as='button' >
                            <IoClose size={"25px"} />
                        </Box>
                        <Box bg={mainBackgroundColor} display={["none", "none", "block"]} >
                            <Flex ref={contentRef} width={"full"} flexDirection={"column"} alignItems={"center"} gap={"4"} px={["4", "4", "0px"]} >

                                {dataMultiple?.map((item: { id: string, scanTimeStamp: any, boughtPrice: any}, index: number) => {

                                    return (
                                        <Flex key={index} maxW={["750px"]} w={["fit-content"]} flexDir={["row"]} rounded={"16px"} pb={"4"} p={["4"]} bg={index === 0 ? secondaryBackgroundColor : ticketBackgroundColor} alignItems={["center"]} justifyContent={"center"} gap={"4"} >
                                            <Flex w={["fit-content"]} gap={"4"} >
                                                <EventImage width={["201px"]} height={["201px"]} data={datainfo?.event} />
                                            </Flex>
                                            <Flex flexDir={"column"} pos={"relative"} gap={"4"} px={["4", "4", "0px"]} >
                                                <Text fontSize={"24px"} lineHeight={"18px"} fontWeight={"bold"} >{capitalizeFLetter(textLimit(datainfo?.event?.eventName, 20))}</Text>
                                                {/* {(checkEventDay(datainfo?.scanTimeStamp[datainfo?.scanTimeStamp?.length - 1]) || isToDay(datainfo?.scanTimeStamp[datainfo?.scanTimeStamp?.length - 1])) && (
                                            <Box width={'fit-content'} height={'fit-content'} position={'absolute'} bottom={'50px'} right={"0"} bg={'transparent'}>
                                                <Image src={'/assets/approved.svg'} alt={'approved'} width={'100px'} height={'100px'} objectFit={'cover'} />
                                            </Box>
                                        )} */}
                                                {isToDay(item?.scanTimeStamp ? item?.scanTimeStamp[item?.scanTimeStamp?.length - 1] : "") && (
                                                    <>
                                                        {(checkEventDay(item?.scanTimeStamp)) && (
                                                            <Box width={'fit-content'} height={'fit-content'} position={'absolute'} bottom={'50px'} right={"0"} bg={'transparent'}>
                                                                <Image src={'/assets/approved.svg'} alt={'approved'} width={'100px'} height={'100px'} objectFit={'cover'} />
                                                            </Box>
                                                        )}
                                                    </>
                                                )}
                                                <Flex gap={"4"} alignItems={"center"} >
                                                    <Flex border={`0.5px solid ${index === 0 ? bodyTextColor : "#5465E0"}`} h={"34px"} justifyContent={"center"} alignItems={"center"} px={"3"} color={colorMode === 'light' ? "#5B5858" : bodyTextColor} fontSize={"10px"} lineHeight={"13.68px"} rounded={"full"} >
                                                        {dateFormat(datainfo?.event?.startDate)}
                                                    </Flex>
                                                    <Flex border={`0.5px solid ${index === 0 ? bodyTextColor : "#5465E0"}`} h={"34px"} justifyContent={"center"} alignItems={"center"} px={"3"} color={colorMode === 'light' ? "#5B5858" : bodyTextColor} fontSize={"10px"} lineHeight={"13.68px"} rounded={"full"} >
                                                        {timeFormat(datainfo?.event?.startDate)}
                                                    </Flex>
                                                </Flex>
                                                <Flex gap={"4"} >

                                                    <Flex flexDirection={"column"} >
                                                        <Text fontWeight={"bold"} fontSize={"10.26px"} lineHeight={"16.42px"} color={"brand.chasescrollBlue"} >Order ID</Text>
                                                        <Text color={bodyTextColor} fontSize={"10.26px"} lineHeight={"13.68px"}  >{textLimit(item?.id, 7)}</Text>
                                                    </Flex>
                                                    <Flex flexDirection={"column"} >
                                                        <Text fontWeight={"bold"} fontSize={"10.26px"} lineHeight={"16.42px"} color={"brand.chasescrollBlue"} >Ticket fee</Text>
                                                        <Text color={bodyTextColor} fontSize={"10.26px"} lineHeight={"13.68px"}  >
                                                            <EventPrice minPrice={item?.boughtPrice} maxPrice={item?.boughtPrice} currency={datainfo?.event?.currency} />
                                                        </Text>
                                                    </Flex>
                                                    <Flex flexDirection={"column"} alignItems={"center"} >
                                                        <Text fontWeight={"bold"} fontSize={"10.26px"} lineHeight={"16.42px"} color={"brand.chasescrollBlue"} >Quantity</Text>
                                                        <Text color={bodyTextColor} fontSize={"10.26px"} lineHeight={"13.68px"}  >{index + 1}/{dataMultiple?.length}</Text>
                                                    </Flex>
                                                </Flex>
                                                <Flex gap={"4"} fontSize={"xs"} >

                                                    <UserImage size={58} image={datainfo?.createdBy?.data?.imgMain?.value} data={datainfo?.createdBy} />
                                                    <Flex flexDirection={"column"} gap={"2"} >
                                                        <Text fontWeight={"bold"} color={headerTextColor} >Name</Text>
                                                        <Text color={bodyTextColor} >{datainfo?.createdBy?.firstName + " " + datainfo?.createdBy?.lastName}</Text>
                                                    </Flex>
                                                </Flex>
                                            </Flex>

                                            <Flex gap={"1"} borderLeft={["1px dashed black"]} w={["fit-content"]} alignItems={"center"} border={""} pl={["4"]} flexDir={"column"} >
                                                <Box bg={"white"} p={"3"} w={"fit-content"} rounded={"16px"} >
                                                    <QRCode
                                                        style={{ height: "200px", width: "200px", zIndex: 20 }}
                                                        value={item?.id}
                                                        viewBox={`0 0 256 256`}
                                                    />
                                                </Box>
                                                <Text textAlign={"center"} fontSize={"xs"} >Powered by Chasescroll</Text>
                                            </Flex>
                                        </Flex>
                                    )
                                }
                                )}
                            </Flex>
                        </Box>

                        {dataMultiple?.length > 1 && (
                            <Flex w={"full"} top={"200px"} position={"absolute"} display={["flex", "flex", "none"]} zIndex={"1000"} justifyContent={"space-between"} gap={"4"} px={"2"} >
                                <Flex onClick={() => scroll(-400)} as="button" position={"relative"} bgColor={mainBackgroundColor} w={"40px"} h={"40px"} borderWidth={"1px"} borderColor={bodyTextColor} justifyContent={"center"} alignItems={"center"} rounded={"full"} >
                                    <FaChevronLeft color={bodyTextColor} />
                                </Flex>
                                <Flex onClick={() => scroll(400)} as="button" bgColor={mainBackgroundColor} w={"40px"} h={"40px"} borderWidth={"1px"} borderColor={bodyTextColor} justifyContent={"center"} alignItems={"center"} rounded={"full"} >
                                    <FaChevronRight color={bodyTextColor} />
                                </Flex>
                            </Flex>
                        )}

                        <Flex ref={ref} position={"relative"} width={"full"} display={["flex", "flex", "none"]} sx={
                            {
                                '::-webkit-scrollbar': {
                                    display: 'none',
                                    scrollBehavior: "smooth"
                                }
                            }
                        } flexDirection={"row"} overflowX={"auto"} alignItems={"center"} gap={"4"} px={["1", "1", "0px"]} >
                            <Flex width={"full"} gap={"6"} >
                                {dataMultiple?.map((item: { id: string, scanTimeStamp: any, boughtPrice: any }, index: number) => {
                                    return (
                                        <Flex key={index} w={["full", "full", "750px"]} flexDir={["column", "column", "row"]} rounded={"16px"} pb={"4"} pt={["4"]} p={["0px", "0px", "4"]} bg={index === 0 ? secondaryBackgroundColor : ticketBackgroundColor} alignItems={["start", "start", "center"]} justifyContent={"center"} >
                                            <Flex width={"full"} justifyContent={"space-between"} pos={"relative"} px={"4"} pt={"4"} >
                                                <Flex pos={"absolute"} width={"full"} pr={"6"} justifyContent={"center"} >
                                                    <Text fontSize={"16px"} fontWeight={"bold"} textAlign={"center"} >Ticket Details</Text>
                                                </Flex>
                                                <Box ml={"auto"} as='button' pos={"relative"} zIndex={"10"} onClick={() => reactToPrintFn()} display={["block", "block", "none"]}>
                                                    <DownloadTwoIcon />
                                                </Box>
                                            </Flex>
                                            <Flex pos={"relative"} w={["full", "full", "fit-content"]} gap={"4"} mt={["4", "4", "0px"]} px={["4", "4", ""]} >
                                                <EventImage width={["full", "full", "201px"]} height={["201px", "201px", "201px"]} data={datainfo?.event} />
                                                {isToDay(item?.scanTimeStamp ? item?.scanTimeStamp[item?.scanTimeStamp?.length - 1] : "") && (
                                                    <>
                                                        {(checkEventDay(item?.scanTimeStamp)) && (
                                                            <Box width={'fit-content'} height={'fit-content'} position={'absolute'} bottom={'-50px'} right={"3"} bg={'transparent'}>
                                                                <Image src={'/assets/approved.svg'} alt={'approved'} width={'100px'} height={'100px'} objectFit={'cover'} />
                                                            </Box>
                                                        )}
                                                    </>
                                                )}
                                            </Flex>
                                            <Flex pos={"relative"} flexDir={"column"} mt={"2"} gap={"3"} px={["4", "4", "0px"]} >
                                                <Text fontSize={"18px"} fontWeight={"semibold"} >{capitalizeFLetter(textLimit(datainfo?.event?.eventName, 20))}</Text>

                                                <Flex gap={"4"} display={["flex", "flex", "none"]} fontSize={"xs"} >

                                                    <UserImage size={58} image={datainfo?.createdBy?.data?.imgMain?.value} data={datainfo?.createdBy} />
                                                    <Flex flexDirection={"column"} gap={"2"} >
                                                        <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Name</Text>
                                                        <Text color={bodyTextColor} >{datainfo?.createdBy?.firstName + " " + datainfo?.createdBy?.lastName}</Text>
                                                    </Flex>
                                                </Flex>
                                                <Flex gap={"4"} alignItems={"center"} >
                                                    <Flex border={`0.5px solid ${index === 0 ? "#CDD3FD" : "#5465E0"}`} h={"34px"} justifyContent={"center"} alignItems={"center"} px={"3"} color={bodyTextColor} fontSize={"10px"} lineHeight={"13.68px"} rounded={"full"} >
                                                        {dateFormat(datainfo?.event?.startDate)}
                                                    </Flex>
                                                    <Flex border={`0.5px solid ${index === 0 ? "#CDD3FD" : "#5465E0"}`} h={"34px"} justifyContent={"center"} alignItems={"center"} px={"3"} color={bodyTextColor} fontSize={"10px"} lineHeight={"13.68px"} rounded={"full"} >
                                                        {timeFormat(datainfo?.event?.startDate)}
                                                    </Flex>
                                                </Flex>
                                                <Flex gap={"4"} >

                                                    <Flex flexDirection={"column"} >
                                                        <Text fontWeight={"bold"} fontSize={"10.26px"} lineHeight={"16.42px"} color={"brand.chasescrollBlue"} >Order ID</Text>
                                                        <Text color={bodyTextColor} fontSize={"10.26px"} lineHeight={"13.68px"}  >{textLimit(item?.id, 7)}</Text>
                                                    </Flex>
                                                    <Flex flexDirection={"column"} >
                                                        <Text fontWeight={"bold"} fontSize={"10.26px"} lineHeight={"16.42px"} color={"brand.chasescrollBlue"} >Ticket fee</Text>
                                                        <Text color={bodyTextColor} fontSize={"10.26px"} lineHeight={"13.68px"}  >
                                                            <EventPrice minPrice={item?.boughtPrice} maxPrice={item?.boughtPrice} currency={datainfo?.event?.currency} />
                                                        </Text>
                                                    </Flex>
                                                    <Flex flexDirection={"column"} >
                                                        <Text fontWeight={"bold"} fontSize={"10.26px"} lineHeight={"16.42px"} color={"brand.chasescrollBlue"} >Number</Text>
                                                        <Text color={bodyTextColor} fontSize={"10.26px"} lineHeight={"13.68px"}  >{index + 1}/{dataMultiple?.length}</Text>
                                                    </Flex>
                                                </Flex>
                                                <Flex gap={"4"} display={["none", "none", "flex"]} fontSize={"xs"} >

                                                    <UserImage size={58} image={datainfo?.createdBy?.data?.imgMain?.value} data={datainfo?.createdBy} />
                                                    <Flex flexDirection={"column"} gap={"2"} >
                                                        <Text fontWeight={"bold"} color={"brand.chasescrollBlue"} >Name</Text>
                                                        <Text color={bodyTextColor} >{datainfo?.createdBy?.firstName + " " + datainfo?.createdBy?.lastName}</Text>
                                                    </Flex>
                                                </Flex>
                                            </Flex>

                                            <Flex gap={"1"} borderLeft={["", "", "1px dashed black"]} mt={"2"} borderTop={["1px dashed black", "1px dashed black", "0px"]} w={["full", "full", "fit-content"]} alignItems={"center"} border={""} py={["4", "4", "0px"]} pl={["0px", "0px", "4"]} flexDir={"column"} >
                                                <Box bg={"white"} p={"3"} w={"fit-content"} rounded={"16px"} >
                                                    <QRCode
                                                        style={{ height: "200px", width: "200px", zIndex: 20 }}
                                                        value={item?.id}
                                                        viewBox={`0 0 256 256`}
                                                    />
                                                </Box>
                                                <Text textAlign={"center"} fontSize={"xs"} >Powered by Chasescroll</Text>
                                            </Flex>
                                        </Flex>
                                    )
                                }
                                )}
                            </Flex>
                        </Flex>

                        {/* <CustomButton onClick={handlePrint} text='Download Ticket' /> */}

                    </Flex>
                </LoadingAnimation>
            </ModalLayout>
        </>
    )
}