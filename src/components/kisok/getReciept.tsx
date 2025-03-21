import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent';
import useCustomTheme from '@/hooks/useTheme';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import LoadingAnimation from '../sharedComponent/loading_animation';
import { Flex, Grid, HStack, Image, Text, Textarea, VStack } from '@chakra-ui/react';
import { IOrder, IReceipt } from '@/models/product';
import UserImage from '../sharedComponent/userimage';
import moment from 'moment';
import { capitalizeFLetter } from '@/utils/capitalLetter';
import { formatNumber } from '@/utils/numberFormat';
import CustomButton from '../general/Button';
import { IMAGE_URL } from '@/services/urls';
import { dateFormat, timeFormat } from '@/utils/dateFormat';
import ModalLayout from '../sharedComponent/modal_layout';
import { numberFormat } from '@/utils/formatNumberWithK';
import { textLimit } from '@/utils/textlimit';
import { IoIosClose } from 'react-icons/io';
import useProduct from '@/hooks/useProduct';
import Fundpaystack from '../settings_component/payment_component/card_tabs/fund_wallet/fundpaystack';
import { FiMinus, FiPlus } from 'react-icons/fi';

export default function GetReciept() {

    const { primaryColor, borderColor, bodyTextColor, secondaryBackgroundColor } = useCustomTheme()
    const { push } = useRouter()
    const userId = localStorage.getItem('user_id') + "";
    const [textSize, setTextSize] = useState(40)

    const [status, setStatus] = useState("")

    const [detail, setDetails] = useState({} as IReceipt)

    const { updateRecipt: reject, updateRecipt, configPaystack, dataID, message, setPaystackConfig, payForTicket, open, setOpen } = useProduct(null, true)

    const { results, isLoading, ref } = InfiniteScrollerComponent({ url: `/reciept/search?userId=${userId}`, limit: 20, filter: "id", name: "getreciept" })

    const clickHander = (item: IReceipt) => {
        setDetails(item)
        setOpen(true)
    }

    const updateHandler = (item: "PENDING" | "ACCEPTED" | "CANCELLED") => {
        setStatus(item)
        updateRecipt?.mutate({
            payload: {
                status: item
            }, id: detail?.id
        })
    }

    useEffect(() => {
        if (!updateRecipt?.isLoading) {
            setStatus("")
        }
    }, [updateRecipt?.isLoading])


    return (
        <LoadingAnimation loading={isLoading} length={results?.length} >
            <Grid templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(3, 1fr)"]} gap={["4", "4", "6"]} >
                {results?.map((item: IReceipt, index: number) => {
                    if (results?.length === index + 1) {
                        return (
                            <Flex ref={ref} as={"button"} alignItems={"start"} onClick={() => clickHander(item)} key={index} w={"full"} h={"fit-content"} flexDir={"column"} bgColor={"white"} rounded={"16px"} pb={"5"} gap={"4"} >
                                <Flex w={"full"} h={"full"} alignItems={"center"} gap={2} >
                                    <UserImage image={item?.createdBy?.data?.imgMain?.value} font={"16px"} data={item?.createdBy} border={"1px"} size={"32px"} />
                                    <Flex flexDir={"column"} alignItems={"start"} >
                                        <Text fontSize={"12px"} fontWeight={"600"} color={primaryColor} >
                                            {capitalizeFLetter(item?.createdBy?.firstName) + " " + capitalizeFLetter(item?.createdBy?.lastName)}
                                        </Text>
                                        <Text fontSize={"10px"} color={bodyTextColor} >
                                            {moment(item?.createdDate)?.fromNow()}
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Flex w={"full"} h={"210px"} rounded={"8px"} >
                                    <Image rounded={"8px"} borderColor={"#D0D4EB"} objectFit={"cover"} alt={item?.rental?.images[0]} width={["full"]} height={"full"} src={IMAGE_URL + item?.rental?.images[0]} />
                                </Flex>
                                <Flex w={"full"} h={"fit-content"} flexDir={"column"} gap={2} px={"2"} >
                                    <Text fontSize={"14px"} fontWeight={"600"} color={primaryColor} textAlign={"left"} >{capitalizeFLetter(item?.rental?.name)}</Text>
                                    <Flex alignItems={"center"} >
                                        <Text fontSize={"14px"} fontWeight={"700"} color={bodyTextColor} >{formatNumber(item?.rental?.price)}</Text>
                                        {/* <Text fontSize={"10px"} ml={"auto"} color={bodyTextColor} >{item?.product?.quantity} Avail</Text> */}
                                    </Flex>
                                    <Flex w={"full"} gap={"2"} alignItems={"center"} >
                                        <Text fontSize={"14px"} fontWeight={"500"} color={bodyTextColor} >Order On {dateFormat(item?.createdDate)}</Text>
                                    </Flex>
                                    <Flex display={["none", "none", "flex"]} >
                                        <CustomButton onClick={() => clickHander(item)} text={"View Details"} mt={"4"} px={"15px"} height={"54px"} fontSize={"sm"} backgroundColor={"#fff"} border={"1px"} borderColor={primaryColor} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"full"} />
                                    </Flex>
                                </Flex>
                            </Flex>
                        )
                    } else {
                        return (
                            <Flex as={"button"} alignItems="start" onClick={() => clickHander(item)} key={index} w={"full"} h={"fit-content"} flexDir={"column"} bgColor={"white"} rounded={"16px"} pb={"5"} gap={"4"} >
                                <Flex w={"full"} h={"full"} alignItems={"center"} gap={2} >
                                    <UserImage image={item?.createdBy?.data?.imgMain?.value} font={"16px"} data={item?.createdBy} border={"1px"} size={"32px"} />
                                    <Flex flexDir={"column"} alignItems={"start"} >
                                        <Text fontSize={"12px"} fontWeight={"600"} color={primaryColor} >
                                            {capitalizeFLetter(item?.createdBy?.firstName) + " " + capitalizeFLetter(item?.createdBy?.lastName)}
                                        </Text>
                                        <Text fontSize={"10px"} color={bodyTextColor} >
                                            {moment(item?.rental?.createdDate)?.fromNow()}
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Flex w={"full"} h={"210px"} rounded={"8px"} >
                                    <Image rounded={"8px"} borderColor={"#D0D4EB"} objectFit={"cover"} alt={item?.rental?.images[0]} width={["full"]} height={"full"} src={IMAGE_URL + item?.rental?.images[0]} />
                                </Flex>
                                <Flex w={"full"} h={"fit-content"} flexDir={"column"} gap={2} px={"2"} >
                                    <Text fontSize={"14px"} fontWeight={"600"} color={primaryColor} textAlign={"left"} >{capitalizeFLetter(item?.rental?.name)}</Text>
                                    <Flex alignItems={"center"} >
                                        <Text fontSize={"14px"} fontWeight={"700"} color={bodyTextColor} >{formatNumber(item?.rental?.price)}</Text>
                                        {/* <Text fontSize={"10px"} ml={"auto"} color={bodyTextColor} >{item?.product?.quantity} Avail</Text> */}
                                    </Flex>
                                    <Flex w={"full"} gap={"2"} alignItems={"center"} >
                                        <Text fontSize={"14px"} fontWeight={"500"} color={bodyTextColor} >Order On {dateFormat(item?.createdDate)}</Text>
                                    </Flex>
                                    <Flex display={["none", "none", "flex"]} >
                                        <CustomButton onClick={() => clickHander(item)} text={"View Details"} mt={"4"} px={"15px"} height={"54px"} fontSize={"sm"} backgroundColor={"#fff"} border={"1px"} borderColor={primaryColor} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"full"} />
                                    </Flex>
                                </Flex>
                            </Flex>
                        )
                    }
                })}
            </Grid>

            <ModalLayout size={"2xl"} open={open} close={setOpen} closeIcon={false} >
                <Flex flexDir={"column"} p={"4"} gap={"4"} fontSize={"14px"}  >
                    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                        <Text fontWeight={"500"} >e-invoice</Text>
                        <IoIosClose onClick={() => setOpen(false)} size={"30px"} />
                    </Flex>
                    <Flex w={"full"} gap={"4"} flexDir={["column", "column", "column"]} >
                        <Flex w={"full"} gap={"4"} flexDir={["column", "column", "row"]} >
                            <Flex w={["full", "full", "fit-content"]} >
                                <Flex flexDir={"column"} gap={"2"} w={["full", "full", "218px"]} >
                                    <Flex w={["full", "full", "218px"]} h={"157px"} rounded={"8px"} bgColor={"#00000066"} position={"relative"} justifyContent={"center"} alignItems={"center"} >
                                        <Flex w={"fit-content"} h={"fit-content"} p={"6px"} pr={"5"} rounded={"24px"} pos={"absolute"} top={"3"} left={"3"} borderColor={"white"} borderWidth={"1px"} alignItems={"center"} gap={2} zIndex={"20"} >
                                            <UserImage image={detail?.createdBy?.data?.imgMain?.value} font={"16px"} data={detail?.createdBy} border={"1px"} size={"32px"} />
                                            <Flex flexDir={"column"} alignItems={"start"} color={"white"} >
                                                <Text fontSize={"12px"} fontWeight={"700"} >
                                                    {capitalizeFLetter(detail?.createdBy?.firstName) + " " + capitalizeFLetter(detail?.createdBy?.lastName)}
                                                </Text>
                                                <Text fontSize={"10px"} color={"white"} fontWeight={"600"} >
                                                    Client
                                                </Text>
                                            </Flex>
                                        </Flex>
                                        <Flex pos={"absolute"} inset={"0px"} bgColor={"black"} opacity={"20%"} zIndex={"10"} rounded={"8px"} />
                                        <Image borderColor={"#D0D4EB"} objectFit={"cover"} alt={detail?.rental?.images[0]} w={["full", "full", "218px"]} h={"157px"} rounded={"8px"} src={detail?.rental?.images[0].startsWith('https://') ? detail?.rental?.images[0] : (IMAGE_URL as string) + detail?.rental?.images[0]} />
                                    </Flex>
                                </Flex>
                            </Flex>

                            <Flex flexDir={"column"} gap={"2"} w={"full"} >
                                <Flex flexDir={"row"} gap={"1"} w={"fit-content"} alignItems={"center"} >
                                    <Text fontWeight={400} fontSize={'12px'}>Reciept ID:</Text>
                                    <Text fontWeight={400} fontSize={'12px'} bgColor={secondaryBackgroundColor} p={"2px"} rounded={"8px"} px={"4px"} >{detail?.id}</Text>
                                </Flex>
                                <Flex justifyContent={["start", "start"]} w={"full"} flexDir={["column", "column", "column"]} >
                                    <Text fontWeight={500} fontSize={'12px'}>Customer Name:</Text>
                                    <Text fontSize={"16px"} fontWeight={"600"} >{textLimit(capitalizeFLetter(detail?.createdBy?.firstName) + " " + capitalizeFLetter(detail?.createdBy?.lastName), textSize)}</Text>
                                </Flex>
                                <Flex gap={"1"} flexDir={"column"} >
                                    <HStack w='full' justifyContent={'flex-start'} >
                                        <Text w={"80px"} fontSize={'14px'}>Email:</Text>
                                        <Text fontSize={'14px'}>{detail?.createdBy?.email}</Text>
                                    </HStack>

                                    <HStack w='full' justifyContent={'flex-start'} >
                                        <Text w={"80px"} fontSize={'14px'}>Phone:</Text>
                                        <Text fontSize={'14px'}>{detail?.createdBy?.data?.mobilePhone?.value ?? 'None'}</Text>
                                    </HStack>
                                    <HStack w='full' justifyContent={'flex-start'} >
                                        <Text w={"80px"} fontSize={'14px'}>Start Date:</Text>
                                        <Text fontSize={'14px'}>{dateFormat(detail?.startDate?.millis)}</Text>
                                    </HStack>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex w={"full"} mt={"2"} gap={"4"} >
                            <Flex w={"fit-content"} >

                                <Flex flexDir={"column"} gap={"1"} w={"218px"} >
                                    <Flex justifyContent={["start", "start", "space-between"]} w={"full"} p={"5px"} rounded={"8px"} bgColor={secondaryBackgroundColor} flexDir={["column", "column", "column"]} >
                                        <Text fontWeight={400} fontSize={'12px'}>Rental Details:</Text>
                                        <Text fontSize={"12px"} fontWeight={"600"} >{textLimit(capitalizeFLetter(detail?.rental?.description), textSize)}<span role='button' style={{ color: primaryColor, fontSize: "12px", fontWeight: "600" }} onClick={() => setTextSize((prev) => prev === 40 ? detail?.rental?.description?.length + 1 : 40)} >{detail?.rental?.description?.length > 40 ? (textSize < detail?.rental?.description?.length ? "show more" : "show less") : ""}</span></Text>
                                    </Flex>
                                    <Flex justifyContent={["start", "start", "start"]} alignItems={"center"} w={"full"} flexDir={["row", "row", "row"]} gap={"1"} >
                                        <Text fontWeight={400} fontSize={'12px'}>Duration Of Rental:</Text>
                                        <Text fontSize={"14px"} fontWeight={"600"} >{detail?.frequency} <span style={{ fontSize: "12px", fontWeight: "500" }} >{detail?.rental?.frequency === "DAILY" ? (detail?.frequency > 1 ? "days" : "day") : (detail?.frequency > 1 ? "hours" : "hour")}</span></Text>
                                    </Flex>
                                    <Flex justifyContent={["start", "start", "start"]} alignItems={"center"} w={"full"} flexDir={["row", "row", "row"]} gap={"1"} >
                                        <Text fontWeight={400} fontSize={'12px'}>Rental Initial Price:</Text>
                                        <Flex pos={"relative"}  >
                                            <Flex w={"full"} h={"1.5px"} pos={"absolute"} top={"11px"} bgColor={"black"} />
                                            <Text fontSize={"14px"} fontWeight={"600"} textDecor={""} >{formatNumber(detail?.rental?.price)}</Text>
                                        </Flex>
                                        <Text fontSize={"12px"} fontWeight={"500"}  >by {((detail?.rental?.price - detail?.price / detail?.frequency) * 100) / detail?.rental?.price}%</Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex w={"full"} flexDir={"column"} gap={"4"} >
                                <Flex w={"full"} flexDir={"column"} gap={"2"} >
                                    <Text fontSize={'14px'}>You can neogiate this price by 5%</Text>
                                    <Flex w={"full"} mt='10px' justifyContent={"space-between"} alignItems="center">
                                        <HStack width={'120px'} height={'35px'} borderRadius={'50px'} overflow={'hidden'} backgroundColor={'#DDE2E6'}>
                                            <Flex cursor={'pointer'} flex={1} height={'100%'} borderRightWidth={'1px'} borderRightColor={'gray'} justifyContent={'center'} alignItems={'center'}>
                                                <FiMinus size={12} color='black' />
                                            </Flex>
                                            <Flex cursor={'pointer'} flex={1} justifyContent={'center'} alignItems={'center'}>
                                                <FiPlus size={12} color='black' />
                                            </Flex>
                                        </HStack>
                                        <CustomButton fontSize={"sm"} isLoading={updateRecipt?.isLoading && status === "ACCEPTED"} onClick={() => updateHandler("ACCEPTED")} text={"Update Price"} borderRadius={"99px"} width={"150px"} />
                                    </Flex>
                                </Flex>
                                <Flex flexDir={["row", "row"]} justifyContent={'end'} gap={"5"} mt={"auto"} w='full' alignItems={'center'}>
                                    <Text fontSize={'14px'}>Total Price:</Text>
                                    <Text fontSize={'23px'} fontWeight={700}>{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(detail?.price || 0)}</Text>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex flexDir={"column"} gap={"2"} >
                            <Text fontWeight={"600"} >Shipped To :  <span style={{ fontWeight: "500" }} >{detail?.address?.location?.locationDetails}</span></Text>
                            {/* <Text fontWeight={"600"} >State: <span style={{ fontWeight: "500" }} >{detail?.address?.state}</span></Text> */}
                        </Flex>
                        {((detail?.rental?.createdBy !== userId) && (detail?.approvalStatus !== "PENDING")) && (
                            <Flex gap={"2"} >
                                <CustomButton isLoading={payForTicket?.isLoading} onClick={() => payForTicket.mutate({
                                    seller: detail?.rental?.createdBy,
                                    price: Number(detail?.price),
                                    currency: 'NGN',
                                    orderType: "RECEIPT",
                                    typeID: detail?.id
                                })} fontSize={"sm"} text={"Make Payment"} borderRadius={"99px"} width={"150px"} />
                            </Flex>
                        )}
                        {(detail?.approvalStatus === "PENDING" && detail?.rental?.createdBy !== userId) && (
                            <Flex gap={"2"} >
                                <CustomButton fontSize={"sm"} text={"Pending Approval"} borderRadius={"99px"} width={"150px"} backgroundColor={"#FF9500"} />
                            </Flex>
                        )}
                        {(detail?.rental?.createdBy === userId && detail?.approvalStatus !== "ACCEPTED") && (
                            <Flex gap={"2"} >
                                <CustomButton fontSize={"sm"} isLoading={updateRecipt?.isLoading && status === "ACCEPTED"} onClick={() => updateHandler("ACCEPTED")} text={"Accept"} borderRadius={"99px"} width={"150px"} />
                                <CustomButton fontSize={"sm"} isLoading={reject?.isLoading && status === "CANCELLED"} onClick={() => updateHandler("CANCELLED")} text={"Decline"} borderRadius={"99px"} borderWidth={"1px"} borderColor={borderColor} backgroundColor={"white"} color={"#FE0909"} width={"150px"} />
                            </Flex>
                        )}
                    </Flex>
                </Flex>
            </ModalLayout>
            <Fundpaystack id={dataID} config={configPaystack} setConfig={setPaystackConfig} message={message} />
        </LoadingAnimation>
    )
}
