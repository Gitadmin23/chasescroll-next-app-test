"use client"
import { Button, Flex, Grid, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import LoadingAnimation from '../sharedComponent/loading_animation';
import useCustomTheme from '@/hooks/useTheme';
import DonationGraph from './donationGraph';
import { dateFormat, timeFormat } from '@/utils/dateFormat';
import UserImage from '../sharedComponent/userimage';
import { capitalizeFLetter } from '@/utils/capitalLetter';
import { textLimit } from '@/utils/textlimit';
import { useRouter, useSearchParams } from 'next/navigation';
import DonationPayment from './donationPayment';
import usePaystackStore from '@/global-state/usePaystack';
import Fundpaystack from '../settings_component/payment_component/card_tabs/fund_wallet/fundpaystack';
import { IoArrowBack } from 'react-icons/io5';
import DonateUsers from '../sharedComponent/donateUser';
import { CalendarIcon, DashboardEditIcon, DashboardOrganizerIcon, WalletIcon } from '../svg';
import ShareEvent from '../sharedComponent/share_event';
import useDonationStore from '@/global-state/useDonationState';
import BlurredImage from '../sharedComponent/blurred_image';
import DonationCollaborator from '../create_donation/donationCollaborator';
import useGetSingleDonationList from '@/hooks/useGetSingleDonation';
import { isDateInPast } from '@/utils/isPast';
import { IMAGE_URL } from '@/services/urls';
import { IoIosArrowForward } from 'react-icons/io';
import EventMap from '../event_details_component/event_map_info';
import CustomButton from '../general/Button';
import ProductRating from '../kisok/productRating';
import RentalCheckout from '../kisok/rentalCheckout';
import DescriptionPage from '../sharedComponent/descriptionPage';
import GetCreatorData from '../kisok/getCreatorData';
import SignupModal from '@/app/auth/component/signupModal';
import ModalLayout from '../sharedComponent/modal_layout';
import CustomText from '../general/Text';
import GoogleBtn from '../sharedComponent/googlebtn';

export default function DonationDetails({ id, notAuth }: { id: string, notAuth?: boolean }) {

    // const { singleData: item, isLoading } = useGetDonationList(id)
    const { singleData: item, isLoading } = useGetSingleDonationList(id)

    const {
        borderColor,
        bodyTextColor,
        primaryColor,
        mainBackgroundColor,
        secondaryBackgroundColor
    } = useCustomTheme()

    const { back, push } = useRouter()
    const query = useSearchParams();
    const type = query?.get('type');

    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [openSignUp, setOpenSignUp] = useState(false) 
    const { configPaystack, setPaystackConfig, dataID, message, amount, setAmount } = usePaystackStore((state) => state);
    const [isCollaborator, setCollaborate] = useState<Array<any>>([])

    const userId = localStorage.getItem('user_id') + "";

    const { updateDontion, data } = useDonationStore((state) => state)

    React.useEffect(() => {
        if (!isLoading) {
            if (!data[0]?.name) {
                const clone = [{
                    bannerImage: item?.bannerImage,
                    creatorID: item?.createdBy?.userId,
                    description: item?.description,
                    endDate: item?.endDate,
                    goal: item?.goal,
                    name: item?.name,
                    purpose: item?.purpose,
                    visibility: item?.visibility,
                    funnelID: item?.funnelID,
                    collaborators: [] as any
                }]

                const collaborators: Array<string> = []

                item?.collaborators?.map((item: any) => {
                    return collaborators.push(item?.userId + "")
                })

                clone[0].collaborators = [...collaborators]

                updateDontion(clone)

            }
        }
    }, [isLoading, item])

    useEffect(() => {
        if (isCollaborator?.length <= 0) {
            const collaborators: Array<string> = []

            item?.collaborators?.map((item: any) => {
                return collaborators.push(item?.userId + "")
            })
            setCollaborate(collaborators)
        }
    }, [item])

    const signUpHandler = (itemData: boolean) => {
        router.push(`/donation/${item?.id}?type=modal`)
        setOpenSignUp(itemData)
    }

    return (
        <LoadingAnimation loading={isLoading} >
            <Flex w={"full"} flexDir={"column"} pos={"relative"} gap={"3"} overflowY={"auto"} h={"full"} px={["4", "4", "6"]} pb={["400px", "400px", "6"]} py={"6"} >
                {/* <Flex w={"full"} overflowX={"auto"} > */}
                <Flex w={"auto"} gap={"1"} alignItems={"center"} pb={"3"} >
                    <Text role='button' onClick={() => back()} fontSize={"14px"} color={primaryColor} fontWeight={"500"} >Back</Text>
                    <IoIosArrowForward />
                    <Text fontSize={"14px"} fontWeight={"500"} >details</Text>
                    <IoIosArrowForward />
                    <Text fontSize={"14px"} fontWeight={"500"} >{textLimit(item?.name, 13)}</Text>
                </Flex>
                {/* </Flex> */}
                <Flex w={"full"} gap={"4"} flexDir={["column", "column", "row"]} >

                    {item?.bannerImage?.length > 0 && (
                        <Flex w={"full"} h={["340px", "340px", "620px"]} pos={"relative"} borderWidth={"1px"} borderColor={borderColor} p={"1"} justifyContent={"center"} alignItems={"center"} bgColor={secondaryBackgroundColor} rounded={"8px"} >
                            <Image src={IMAGE_URL + item?.bannerImage} alt='logo' height={"full"} w={"auto"} objectFit={"contain"} rounded={"8px"} />
                            
                        </Flex>
                    )}
                    <Flex w={"full"} flexDir={"column"} gap={"3"} >
                        <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                            <Text fontWeight={"700"} fontSize={["16px", "16px", "24px"]} >{textLimit(capitalizeFLetter(item?.name), 70)}</Text>
                            {isDateInPast(item?.endDate) && (
                                <Flex w={"8"} zIndex={"40"} justifyContent={"center"} alignItems={"center"} h={"8"} bgColor={mainBackgroundColor} rounded={"full"} >
                                    <ShareEvent newbtn={true} showText={false} data={item} id={item?.id} type="DONATION" eventName={textLimit(item?.name, 17)} />
                                </Flex>
                            )}
                        </Flex>
                        <Flex display={["none", "none", "flex"]} >
                            <DonationGraph rounded='16px' item={item} />
                        </Flex>
                        <Flex display={["flex", "flex", "none"]} >
                            <DonationGraph rounded='16px' isDonation={true} item={item} />
                        </Flex>
                        <Flex w={"full"} flexDir={["column-reverse", "column-reverse", "column"]} gap={"2"} >
                            <DescriptionPage limit={200} label='Fundraiser Details' description={item?.description + ""} />
                            <Flex w={"full"} gap={"2"} flexDirection={((userId === item?.createdBy?.userId) || item?.isCollaborator) ? ["column", "column", "row"] : "row"} >
                                <Flex w={["fit-content", "fit-content", "full"]} >
                                    <GetCreatorData userData={item?.createdBy} data={item} donation={true} />
                                </Flex>
                                <Flex display={["flex", "flex", "none"]} w={"full"}  >
                                    {((userId === item?.createdBy?.userId) || item?.isCollaborator) ? (
                                        <Flex bgColor={mainBackgroundColor} borderWidth={"1px"} borderColor={borderColor} rounded={"full"} w={"full"} flexDir={"column"} overflowX={"hidden"} gap={"3"} px={["3", "3", "5", "5"]} h={"fit-content"} justifyContent={"center"} >
                                            <Flex width={["full"]} justifyContent={"space-between"} alignItems={"center"} gap={"3"}    >
                                                <Flex bgColor={mainBackgroundColor} w={"80px"} py={"2"} rounded={"2xl"} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} as={"button"} onClick={() => push(`/dashboard/settings/event-dashboard/${item?.id}/donate`)} gap={"4px"} flexDir={"column"} alignItems={"center"} justifyContent={"center"} >
                                                    <DashboardOrganizerIcon />
                                                    <Text fontSize={"12px"} fontWeight={"500"} >Dashboard</Text>
                                                </Flex>
                                                <Flex disabled={item?.isCollaborator || item?.total > 0 || !isDateInPast(item?.endDate)} bgColor={mainBackgroundColor} w={"80px"} py={"2"} rounded={"2xl"} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} role='button' as={"button"} onClick={() => push(`/dashboard/donation/edit/${item?.id}`)} gap={"4px"} flexDir={"column"} alignItems={"center"} justifyContent={"center"}>
                                                    <DashboardEditIcon />
                                                    <Text fontSize={"12px"} fontWeight={"500"} >Edit</Text>
                                                </Flex>
                                                <Flex disabled={item?.isCollaborator} bgColor={mainBackgroundColor} w={"80px"} py={"2"} rounded={"2xl"} as={"button"} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} onClick={() => push("/dashboard/settings/payment/details")} gap={"4px"} flexDir={"column"} alignItems={"center"} >
                                                    <WalletIcon color='#5D70F9' />
                                                    <Text fontSize={"12px"} fontWeight={"500"} >Cash Out</Text>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    ) : (
                                        <DonationPayment data={item} setOpen={setOpen} />
                                    )}
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex gap={"2"} alignItems={"center"}>
                            <Text fontWeight={"600"} w={"80px"} >End Date</Text>
                            <CalendarIcon color={primaryColor} />
                            <Text fontSize={["12px", "12px", "14px"]} >{dateFormat(item?.endDate)} {timeFormat(item?.endDate)}</Text>
                        </Flex>
                        {item?.createdBy?.userId === userId && (
                            <DonationCollaborator update={true} singleData={item} index={0} />
                        )}
                        <Flex w={"full"} justifyContent={"end"} >
                            <Flex maxW={"600px"} display={["none", "none", "flex"]}  >
                                {((userId === item?.createdBy?.userId) || item?.isCollaborator) ? (
                                    <Flex insetX={"3"} mt={["0px", "0px", "0px", "0px"]} bottom={["14", "14", "0px", "0px", "0px"]} pos={["fixed", "fixed", "relative", "relative"]} w={["auto", "auto", "full", "fit-content"]} zIndex={"50"} flexDir={"column"} gap={"4"} pb={"6"} px={["0px", "0px", "6", "6"]} >
                                        <Flex bgColor={mainBackgroundColor} w={["full", "full", "full", "450px"]} minW={["200px", "200px", "200px", "200px"]} maxW={["full", "full", "450px", "full"]} borderWidth={"1px"} borderColor={borderColor} rounded={"full"} flexDir={"column"} overflowX={"hidden"} gap={"3"} px={["3", "3", "5", "5"]} h={"90px"} justifyContent={"center"} >
                                            <Flex width={["full"]} justifyContent={"space-between"} alignItems={"center"} gap={"3"}    >
                                                <Flex bgColor={mainBackgroundColor} w={"80px"} py={"2"} rounded={"2xl"} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} as={"button"} onClick={() => push(`/dashboard/settings/event-dashboard/${item?.id}/donate`)} gap={"4px"} flexDir={"column"} alignItems={"center"} justifyContent={"center"} >
                                                    <DashboardOrganizerIcon />
                                                    <Text fontSize={"12px"} fontWeight={"500"} >Dashboard</Text>
                                                </Flex>
                                                <Flex disabled={item?.isCollaborator || item?.total > 0 || !isDateInPast(item?.endDate)} bgColor={mainBackgroundColor} w={"80px"} py={"2"} rounded={"2xl"} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} role='button' as={"button"} onClick={() => push(`/dashboard/donation/edit/${item?.id}`)} gap={"4px"} flexDir={"column"} alignItems={"center"} justifyContent={"center"}>
                                                    <DashboardEditIcon />
                                                    <Text fontSize={"12px"} fontWeight={"500"} >Edit</Text>
                                                </Flex>
                                                <Flex disabled={item?.isCollaborator} bgColor={mainBackgroundColor} w={"80px"} py={"2"} rounded={"2xl"} as={"button"} _disabled={{ opacity: "0.4", cursor: "not-allowed" }} onClick={() => push("/dashboard/settings/payment/details")} gap={"4px"} flexDir={"column"} alignItems={"center"} >
                                                    <WalletIcon color='#5D70F9' />
                                                    <Text fontSize={"12px"} fontWeight={"500"} >Cash Out</Text>
                                                </Flex>
                                            </Flex>
                                        </Flex>

                                    </Flex>
                                ) : (
                                    <Flex insetX={"6"} bottom={["14", "14", "0px", "0px", "0px"]} pos={["fixed", "fixed", "relative", "relative"]} w={["auto", "auto", "full", "fit-content"]} display={["none", "none", "flex"]} zIndex={"50"} flexDir={"column"} gap={"4"} pb={"6"} px={["0px", "0px", "6", "6"]} >
                                        <DonationPayment data={item} setOpen={setOpen} />
                                    </Flex>
                                )}
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Fundpaystack id={dataID} config={configPaystack} setConfig={setPaystackConfig} setAmount={setAmount} amount={amount} message={message} />

            <ModalLayout open={type === "modal" ? true : false} close={()=> router.push(`/donation/${item?.id}`)} title='' closeIcon={true} >
                <Flex w={"full"} flexDir={"column"} gap={"4"} p={"6"} >
                    <Flex flexDir={"column"} justifyContent={"center"} >
                        <Text fontSize={"24px"} textAlign={"center"} fontWeight={"700"} lineHeight={"32px"} >Fundraising</Text>
                        <Text color={"#626262"} textAlign={"center"}>Please choose your option and proceed with Chasescroll.</Text>
                    </Flex>
                    <GoogleBtn newbtn title='Sign in' type="DONATION" id={item?.id ? true : false} index={item?.id} height='50px' border='1px solid #B6B6B6' bgColor='white' />
                    <Flex justifyContent={"center"} gap={"2px"} alignItems={"center"} >
                        <Text color={"#BCBCBC"} fontSize={"14px"} lineHeight={"19.6px"} >OR</Text>
                    </Flex>
                    <Button onClick={() => router.push("/share/auth/temporary-account/?type=DONATION&typeID=" + item?.id)} backgroundColor={"#EDEFFF"} color={"#5465E0"} h={"50px"} w={"full"} borderWidth={"0.5px"} borderColor={"#EDEFFF"} rounded={"32px"} gap={"3"} _hover={{ backgroundColor: "#EDEFFF" }} justifyContent={"center"} alignItems={"center"} >
                        <Text textAlign={"center"} fontWeight={"600"} >Get Temporary Account</Text>
                    </Button>
                    <Button onClick={() => signUpHandler(true)} color={"white"} h={"50px"} w={"full"} borderWidth={"0.5px"} borderColor={"#233DF3"} bgColor={"#233DF3"} rounded={"32px"} gap={"3"} _hover={{ backgroundColor: "#233DF3" }} justifyContent={"center"} alignItems={"center"} >
                        <Text textAlign={"center"} fontWeight={"600"} >Sign up</Text>
                    </Button>
                    {/* <SignupModal index={item?.id} open={openSignUp} setOpen={signUpHandler} /> */}
                    <Flex>
                        <CustomText fontSize={'sm'} fontFamily={'Satoshi-Regular'} marginLeft='0px'>
                            Already have an account?
                        </CustomText>
                        <CustomText onClick={() => router.push("/share/auth/login/?type=DONATION&typeID=" + item?.id)} fontWeight={"700"} ml={"4px"} fontSize={'sm'} color='brand.chasescrollButtonBlue' fontFamily={'Satoshi-Regular'} cursor='pointer'>Log in</CustomText>
                    </Flex>
                </Flex>
            </ModalLayout>
            {openSignUp && (
                <SignupModal hide={true} index={item?.id} open={openSignUp} setOpen={signUpHandler} />
            )}
        </LoadingAnimation>
    )
}
