import SignupModal from '@/app/auth/component/signupModal'
import usePaystackStore from '@/global-state/usePaystack'
import useCustomTheme from '@/hooks/useTheme'
import { IDonationList } from '@/models/donation'
import httpService from '@/utils/httpService'
import { Button, Flex, Input, Text, useToast } from '@chakra-ui/react' 

import React, { useState } from 'react'
import { useMutation } from 'react-query'
import CustomText from '../general/Text'
import GoogleBtn from '../sharedComponent/googlebtn'
import ModalLayout from '../sharedComponent/modal_layout'
import { useDetails } from '@/global-state/useUserDetails'
import DonationTermAndCondition from './donationTermAndCondition'
import { useRouter, useSearchParams } from 'next/navigation' 

export default function DonationPayment({ data, fullWidth, setOpen }: { data?: IDonationList, fullWidth?: boolean, setOpen?: any }) {
 
    const [openSignUp, setOpenSignUp] = useState(false) 

    const [value, setValue] = useState("")
    // const { googlesign ,setGoogle } = useModalStore((state) => state);

    const {
        primaryColor,
        borderColor,
        headerTextColor,
        mainBackgroundColor
    } = useCustomTheme()

    const donate = [
        "NGN 5000", 
        "NGN 15000",
        "NGN 25000", 
        "NGN 35000", 
        "NGN 50000",  
    ]

    const toast = useToast()
    const router = useRouter()
    const PAYSTACK_KEY: any = process.env.NEXT_PUBLIC_PAYSTACK_KEY;

    const userId = localStorage.getItem('user_id') + "";
    const { userId: user_index } = useDetails((state) => state);
    const token = sessionStorage.getItem('tp_token')   
    const tokendata = localStorage.getItem('token');

    const { setPaystackConfig, setMessage, message, setDataID, setAmount } = usePaystackStore((state) => state);

    const payForTicket = useMutation({
        mutationFn: (data: {
            seller: string,
            price: number,
            currency: string,
            orderType: "DONATION",
            typeID: string
        }) => httpService.post(`/payments/createCustomOrder`, data),
        onSuccess: (data: any) => {

            setPaystackConfig({
                publicKey: PAYSTACK_KEY,
                email: data?.data?.content?.email,
                amount: (Number(data?.data?.content?.orderTotal) * 100), //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
                reference: data?.data?.content?.orderCode
            });
            setMessage({...message, donation: true})
            setOpen(false)
            setValue("")
 
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

    const clickHandler = () => {

        setDataID(data?.id+"")

        setAmount(Number(value))

        if(user_index || token || tokendata) {
            payForTicket.mutate({
                seller: data?.createdBy?.userId+"",
                price: Number(value),
                currency: "NGN",
                orderType: "DONATION",
                typeID: data?.id + ""
            })
        } else {
            router.push(`/donation/${data?.id}?type=modal`)
        }
    }
 

    return (
        <Flex bgColor={mainBackgroundColor} w={["full", "full", "full", fullWidth ? "full" : "450px"]} minW={["200px", "200px", "200px", "200px"]} maxW={["full", "full", "450px", "full"]} shadow={"lg"} borderWidth={"1px"} borderColor={borderColor} rounded={"16px"} flexDir={"column"} overflowX={"hidden"} gap={"3"} p={["3", "3", "5"]}  >
            <Text fontSize={"18px"} fontWeight={"600"} >Enter the Amount</Text>
            {/* <Text fontSize={"14px"} >Enter the amount you wish to donate </Text> */}

            <Flex w={"fit-content"} flexWrap={"wrap"} gap={"2"}>
                {donate?.map((item) => (
                    <Flex key={item} as={"button"} onClick={() => setValue(item?.replace("NGN ", ""))} rounded={"32px"} h={"25px"} w={"80px"} borderWidth={"2px"} justifyContent={"center"} alignItems={"center"} color={item.replace("NGN ", "") === value ? primaryColor : headerTextColor} borderColor={item.replace("NGN ", "") === value ? primaryColor : borderColor} fontSize={"12px"} fontWeight={"600"}  >
                        {item}
                    </Flex>
                ))}
            </Flex>
            <Flex w={"full"} h={"50px"} pos={"relative"} >
                <Input value={value} placeholder='0' onChange={(e) => setValue(e.target.value)} w={"full"} h={"50px"} rounded={"32px"} pl={"8"} borderColor={borderColor} type='number' borderWidth={"1px"} />
                <Flex w={"fit-content"} h={"50px"} pos={"absolute"} justifyContent={"center"} alignItems={"center"} px={"4"} >
                    ₦
                </Flex>
            </Flex>
            <Button isLoading={payForTicket?.isLoading} onClick={clickHandler} borderWidth={"1px"} borderColor={primaryColor} isDisabled={value ? false : true} w={"full"} h={"50px"} rounded={"32px"} color={primaryColor} fontWeight={"600"} bgColor={"#EFF5F8"} _hover={{ backgroundColor: "#EFF5F8" }} >
                Donate
            </Button>
            <Flex w={"full"} justifyContent={"center"} >
                <DonationTermAndCondition refund={true} />
            </Flex> 
        </Flex>
    )
}
