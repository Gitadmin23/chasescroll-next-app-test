import CustomButton from '@/components/general/Button'
import CustomText from '@/components/general/Text'
import GoogleBtn from '@/components/sharedComponent/googlebtn'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import { useDetails } from '@/global-state/useUserDetails'
import { formatNumber } from '@/utils/numberFormat'
import { Box, Button, Flex, Text, useColorMode, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { LiaAngleDownSolid } from 'react-icons/lia'
import useCustomTheme from "@/hooks/useTheme";
import { dateFormat, timeFormat } from '@/utils/dateFormat'
import SignupModal from '@/app/auth/component/signupModal'
import { IEventType } from '@/models/Event'
import useModalStore from '@/global-state/useModalSwitch'
import { IoClose } from 'react-icons/io5'

interface Props {
    ticket: any,
    currency: any,
    data?: IEventType
}

function SelectTicket(props: Props) {
    const {
        ticket,
        currency,
        data
    } = props

    const {
        headerTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    // const { colorMode, toggleColorMode } = useColorMode();

    const [showModal, setShowModal] = React.useState(false)

    const [openSignUp, setOpenSignUp] = useState(false)
    const [open, setOpen] = React.useState(false)
    const token = sessionStorage.getItem('tp_token')
    const { userId: user_index } = useDetails((state) => state);

    const { ticketType, setTicketType } = useModalStore((state) => state);

    const toast = useToast()

    const router = useRouter()

    const clickHandler = (item: any) => {
        if (token) {
            setTicketType(item)
            setShowModal(false)
        } else {
            if (!user_index) {
                setOpen(true)
                setTicketType(item)
                // router.push("/share/auth/?type=EVENT&typeID=" + data?.id)
            } else {
                setTicketType(item)
                setShowModal(false)
            }
        }
    }

    useEffect(() => {
        setTicketType({} as any)
    }, [])

    const signUpHandler = (item: boolean) => {
        setOpen(false)
        setOpenSignUp(item)
    }

    return (
        <Flex gap={"3"} position={"relative"} flexDir={"column"} alignItems={"center"} justifyContent={"end"}  > 
            <Flex onClick={() => setShowModal((prev)=> !prev)} as={"button"}  w={"full"} borderWidth={"1px"} justifyContent={"space-between"} alignItems={"center"} borderColor={"#EAEBEDCC"} rounded={"12px"} p={"5"} >
                <Flex flexDir={"column"} textAlign={"left"} gap={"1"}  >
                    <Text fontSize={"14px"} >Ticket Type</Text>
                    <Text color={primaryColor}>
                        {ticketType?.ticketType ? ticketType?.ticketType : "Select Ticket"}{" "}
                        {ticketType?.ticketType ? formatNumber(ticketType?.ticketPrice, currency === "USD" ? "$" : "₦") : ""}
                    </Text>
                </Flex>
                <LiaAngleDownSolid />
            </Flex>
            {showModal && (
                <Box shadow={"xl"} width={"full"} borderWidth={"0px"} zIndex={"30"} top={["0px", "0px", "0px", "100px", "100px"]} position={["relative", "relative", "relative", "absolute", "absolute"]} rounded={"lg"} >
                    <Flex maxH={"400px"} overflowY={"auto"} overflowX={"hidden"} gap={"3"} pos={"relative"} flexDirection={"column"} shadow={"lg"} width={"full"} borderColor={borderColor} padding={"4"} borderBottomWidth={"0px"} bg={mainBackgroundColor} rounded={"lg"}>
                        <Flex as={"button"} onClick={()=> setShowModal(false)} w={"8"} h={"8"} ml={"auto"} bg={secondaryBackgroundColor} rounded={"full"} shadow={"2xl"} justifyContent={"center"} alignItems={"center"} >
                            <IoClose color={headerTextColor} />
                        </Flex>
                        {ticket?.filter((item: any) => item?.ticketType)?.map((item: any, index: number) => {
                            if (item?.ticketType === "Early Bird" && (new Date(item?.endDate) !== new Date(data?.endDate))) {
                                if ((new Date() >= new Date(item?.startDate)) && new Date() <= new Date(item?.endDate)) {
                                    return (
                                        <Flex key={index} w={"full"} flexDir={"column"} gap={"2px"} pb={"2"} borderBottomWidth={"1px"} borderBottomColor={borderColor} alignItems={"center"} >
                                            <Button color={primaryColor} isDisabled={item?.totalNumberOfTickets === item?.ticketsSold} key={index} onClick={() => clickHandler(item)} w={"full"} py={"14px"} borderBottomColor={"#D0D4EB"} rounded={"lg"} borderBottomWidth={"1px"} >
                                                {item?.totalNumberOfTickets === item?.ticketsSold ?
                                                    "Sold Out" :
                                                    item?.ticketType + " " + formatNumber(item?.ticketPrice, currency === "USD" ? "$" : "₦")
                                                }
                                            </Button>
                                            <Text color={"white"} px={"2"} rounded={"4px"} bg={"red"} textAlign={"center"} fontSize={"12px"} >Ends: {dateFormat(item?.endDate)} {timeFormat(item?.endDate)}</Text>
                                        </Flex>
                                    )
                                }
                            } else {
                                return (
                                    // <Flex w={"full"} flexDir={"column"} gap={"2px"} pb={"2"} borderBottomWidth={"1px"} borderBottomColor={borderColor} alignItems={"center"} >
                                    <Button isDisabled={item?.totalNumberOfTickets === item?.ticketsSold} key={index} onClick={() => clickHandler(item)} py={"14px"} borderBottomColor={"#D0D4EB"} rounded={"lg"} borderBottomWidth={"1px"} >
                                        {item?.totalNumberOfTickets === item?.ticketsSold ?
                                            "Sold Out" :
                                            item?.ticketType + " " + formatNumber(item?.ticketPrice, currency === "USD" ? "$" : "₦")
                                        }
                                    </Button>
                                )
                            }
                        })}
                    </Flex>
                </Box>
            )}
            {/* {showModal && (
                <Box onClick={() => setShowModal(false)} bg={"black"} inset={"0px"} position={"fixed"} opacity={"0.25"} zIndex={"20"} />
            )} */}
            <ModalLayout open={open} close={setOpen} title='' closeIcon={true} >
                <Flex w={"full"} flexDir={"column"} gap={"4"} p={"6"} >
                    <Flex flexDir={"column"} justifyContent={"center"} >
                        <Text fontSize={"24px"} textAlign={"center"} fontWeight={"700"} lineHeight={"32px"} >Get Ticket</Text>
                        <Text color={"#626262"} textAlign={"center"}>Please choose your option and proceed with Chasescroll.</Text>
                    </Flex>
                    <GoogleBtn newbtn title='Sign in' id={data?.id ? true : false} index={data?.id} height='50px' border='1px solid #B6B6B6' bgColor='white' />
                    <Flex justifyContent={"center"} gap={"2px"} alignItems={"center"} >
                        <Text color={"#BCBCBC"} fontSize={"14px"} lineHeight={"19.6px"} >OR</Text>
                    </Flex>
                    <Button onClick={() => router.push("/share/auth/temporary-account/?type=EVENT&typeID=" + data?.id)} backgroundColor={"#EDEFFF"} color={"#5465E0"} h={"50px"} w={"full"} borderWidth={"0.5px"} borderColor={"#EDEFFF"} rounded={"32px"} gap={"3"} _hover={{ backgroundColor: "#EDEFFF" }} justifyContent={"center"} alignItems={"center"} >
                        <Text textAlign={"center"} fontWeight={"600"} >Get Temporary Account</Text>
                    </Button>
                    <Button onClick={() => signUpHandler(true)} color={"white"} h={"50px"} w={"full"} borderWidth={"0.5px"} borderColor={"#233DF3"} bgColor={"#233DF3"} rounded={"32px"} gap={"3"} _hover={{ backgroundColor: "#233DF3" }} justifyContent={"center"} alignItems={"center"} >
                        <Text textAlign={"center"} fontWeight={"600"} >Sign up</Text>
                    </Button>
                    {/* <SignupModal index={data?.id} open={openSignUp} setOpen={signUpHandler} /> */}
                    <Flex>
                        <CustomText fontSize={'sm'} fontFamily={'Satoshi-Regular'} marginLeft='0px'>
                            Already have an account?
                        </CustomText>
                        <CustomText onClick={() => router.push("/share/auth/login/?type=EVENT&typeID=" + data?.id)} fontWeight={"700"} ml={"4px"} fontSize={'sm'} color='brand.chasescrollButtonBlue' fontFamily={'Satoshi-Regular'} cursor='pointer'>Log in</CustomText>
                    </Flex>
                </Flex>
            </ModalLayout>
            {openSignUp && (
                <SignupModal hide={true} index={data?.id} open={openSignUp} setOpen={signUpHandler} />
            )}
        </Flex>
    )
}

export default SelectTicket