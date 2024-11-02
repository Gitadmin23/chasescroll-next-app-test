import { Box, Button, Flex, Input, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import ModalLayout from '../sharedComponent/modal_layout'
import useCustomTheme from '@/hooks/useTheme'
import EventImage from '../sharedComponent/eventimage'
import { IEventType } from '@/models/Event'
import { textLimit } from '@/utils/textlimit'
import usePaystackStore from '@/global-state/usePaystack'
import httpService from '@/utils/httpService'
import { useMutation } from 'react-query'
import CircularProgressBar from '../sharedComponent/circleGraph'
import { formatNumber } from '@/utils/numberFormat'

export default function DonationBtn(props: IEventType) {

    const {
        eventName,
        location,
        createdBy: {
            firstName,
            lastName
        },
        donationName,
        donationTargetAmount,
        totalDonated,
        isBought,
        isOrganizer
    } = props

    const [open, setOpen] = useState(false)

    const [value, setValue] = useState("")

    const {
        primaryColor,
        borderColor,
        headerTextColor
    } = useCustomTheme()

    const donate = [
        "NGN 500",
        "NGN 1000",
        "NGN 1500",
        "NGN 2000",
        "NGN 5000",
    ]

    const toast = useToast()
    const PAYSTACK_KEY: any = process.env.NEXT_PUBLIC_PAYSTACK_KEY;

    const { setPaystackConfig, setDonation } = usePaystackStore((state) => state);

    const payForTicket = useMutation({
        mutationFn: (data: any) => httpService.get(`/payments/createDonationOrder?typeID=${props?.id}&donationAmount=${value}`),
        onSuccess: (data: any) => {
            setPaystackConfig({
                publicKey: PAYSTACK_KEY,
                email: data?.data?.content?.email,
                amount: (Number(data?.data?.content?.orderTotal) * 100), //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
                reference: data?.data?.content?.orderCode
            });
            setDonation(true)
            setOpen(false)
            setValue("")

            console.log(data?.data?.content);

        },
        onError: (error) => {
            // console.log(error);
            toast({
                title: 'Error',
                description: "Error occured",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
    });

    const clickHandler = React.useCallback(() => {
        payForTicket.mutate({
            eventID: props?.id,
            donationAmount: value,
        })
    }, [props?.id, value])


    return (
        <Flex w={"full"} flexDir={"column"} gap={"6"} >
            {!isOrganizer && (
                <Button onClick={() => setOpen(true)} width={"full"} borderColor={"brand.chasescrollBlue"} borderWidth={"1px"} bgColor={"#EFF5F8"} borderRadius={"32px"} height={"57px"} color={"brand.chasescrollBlue"} fontSize={"sm"} fontWeight={"semibold"} _hover={{ backgroundColor: "#EFF5F8" }} >Donate Now</Button>
            )}
            {(isBought || isOrganizer || totalDonated) && (
                <Flex flexDir={"column"} w={"full"} gap={"4"} bgColor={"#F4F4F499"} rounded={"12px"} p={"4"} >
                    <Text fontWeight={"600"} >Donations</Text>
                    <Flex alignItems={"center"} justifyContent={"space-between"} >
                        <Flex flexDir={"column"} gap={"2"} >
                            <Text fontWeight={"600"} >{donationName}</Text>
                            <Text fontSize={"14px"} >Target {formatNumber(donationTargetAmount)}</Text>
                        </Flex>
                        <CircularProgressBar progress={(Number(totalDonated) / Number(donationTargetAmount)) * 100 > 100 ? 100 : Number(((Number(totalDonated) / Number(donationTargetAmount)) * 100)?.toFixed(2))} />
                    </Flex>
                </Flex>
            )}
            <ModalLayout open={open} close={setOpen} >
                <Flex flexDir={"column"} gap={"5"} px={"4"} >
                    <Flex alignItems={"center"} rounded={"16px"} px={"8px"} pt={"12px"} >
                        <Box w={"fit-content"} >
                            <EventImage borderWidth='2px' rounded='16px' width={"153px"} height={"127px"} data={props} />
                        </Box>
                        <Flex height={"fit-content"} ml={"3"} flexDir={"column"} gap={"2px"} >
                            <Text fontSize={"16px"} fontWeight={"bold"} >{`You're supporting `} {firstName + " " + lastName} on {textLimit(eventName, 20)} Event</Text>
                        </Flex>
                    </Flex>
                    <Flex flexDir={"column"} w={"full"} overflowX={"hidden"} gap={"3"} pb={"5"}  >
                        <Text fontSize={"24px"} fontWeight={"600"} >Enter the Amount</Text>
                        <Flex w={"auto"} overflowX={"auto"}  sx={
                        {
                            '::-webkit-scrollbar': "none"
                        }
                    }>
                            <Flex w={"auto"} gap={"2"} sx={
                        {
                            '::-webkit-scrollbar': "none"
                        }
                    } >
                                {donate?.map((item) => (
                                    <Flex key={item} as={"button"} onClick={() => setValue(item?.replace("NGN ", ""))} rounded={"32px"} h={"25px"} w={"80px"} borderWidth={"2px"} justifyContent={"center"} alignItems={"center"} color={item.replace("NGN ", "") === value ? primaryColor : headerTextColor} borderColor={item.replace("NGN ", "") === value ? primaryColor : borderColor} fontSize={"12px"} fontWeight={"600"}  >
                                        {item}
                                    </Flex>
                                ))}
                            </Flex>
                        </Flex>
                        <Flex w={"full"} h={"50px"} pos={"relative"} >
                            <Input value={value} placeholder='0' onChange={(e)=> setValue(e.target.value)} w={"full"} h={"50px"} rounded={"32px"} pl={"8"} borderColor={borderColor} type='number' borderWidth={"1px"} />
                            <Flex w={"fit-content"} h={"50px"} pos={"absolute"} justifyContent={"center"} alignItems={"center"} px={"4"} >
                                ₦
                            </Flex>
                        </Flex>
                        <Button isLoading={payForTicket?.isLoading} onClick={clickHandler} isDisabled={value ? false : true} w={"full"} h={"50px"} rounded={"32px"} color={"white"} fontWeight={"600"} bgColor={"brand.chasescrollBlue"} _hover={{ backgroundColor: "brand.chasescrollBlue" }} >
                            Donate
                        </Button>
                    </Flex>
                </Flex>
            </ModalLayout>
        </Flex>
    )
}
