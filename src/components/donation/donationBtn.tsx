import { Box, Button, Flex, Input, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import ModalLayout from '../sharedComponent/modal_layout'
import useCustomTheme from '@/hooks/useTheme'
import EventImage from '../sharedComponent/eventimage' 
import { textLimit } from '@/utils/textlimit'
import usePaystackStore from '@/global-state/usePaystack'
import httpService from '@/utils/httpService'
import { useMutation } from 'react-query' 
import CustomButton from '../general/Button' 
import DonationTermAndCondition from './donationTermAndCondition' 
import { useRouter } from 'next/navigation'
import { IDonationList } from '@/models/donation'

export default function DonationBtn(props: {
    item: IDonationList,
    data?: any,
    user: any;
    event?: any;
}) {

    const {
        user,
        item, 
        event
    } = props

    const [open, setOpen] = useState(false)

    const [value, setValue] = useState("")  

    let token = localStorage.getItem("token") 

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
    const PAYSTACK_KEY: any = process.env.NEXT_PUBLIC_PAYSTACK_KEY;

    const userId = localStorage.getItem('user_id') + "";

    const  router =  useRouter()

    const { setDataID, setPaystackConfig, setMessage, message, setAmount } = usePaystackStore((state) => state);
 

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
        payForTicket.mutate({
            seller: user?.userId,
            price: Number(value),
            currency: "NGN",
            orderType: "DONATION",
            typeID: item?.id
        }) 
        setAmount(Number(value))

        setDataID(item?.id)

    }

 

    const openHandler = (e: any) => {
        if(token) {
            e.stopPropagation()
            setOpen(true)
        } else { 
            router?.push("/auth")
        }
    }

    return (
        <>

            {(userId !== props?.user?.userId && !event) && (
                <CustomButton onClick={(e) => openHandler(e)} text={"Donate now"} height={"40px"} fontSize={"14px"} backgroundColor={"#F4F5FF"} borderRadius={"32px"} fontWeight={"600"} color={primaryColor} width={"full"} />
            )}

            {event &&
                <Box w={["45px", "45px", "70px"]} pos={"relative"} >
                    <Box w={["fit-content"]} position={"relative"} top={"0px"} >
                        <CustomButton onClick={(e) => openHandler(e)} text={"Donate now"} transform={["rotate(-90deg)"]} backgroundColor={"#5D70F9"} left={["-32px", "-32px", "-37px"]} top={["-20px"]} zIndex={"50"} position={["absolute"]} height={["35px", "35px", "45px"]} fontSize={["10px", "10px", "xs"]} width={["80px", "80px", "100px"]} borderRadius={"full"} />
                    </Box>
                </Box>
            }

            <ModalLayout open={open} close={setOpen} >
                <Flex flexDir={"column"} bg={mainBackgroundColor} gap={"5"} px={"4"} >
                    <Flex alignItems={"center"} rounded={"16px"} px={"8px"} pt={"12px"} >
                        <Box w={"fit-content"} >
                            <EventImage borderWidth='2px' rounded='16px' width={"153px"} height={"127px"} data={item} />
                        </Box>
                        <Flex height={"fit-content"} ml={"3"} flexDir={"column"} gap={"2px"} >
                            <Text fontSize={"16px"} fontWeight={"bold"} >{`You're supporting `} {user?.firstName + " " + user?.lastName} on {textLimit(item?.name, 20)} Event</Text>
                        </Flex>
                    </Flex>
                    <Flex flexDir={"column"} w={"full"} overflowX={"hidden"} gap={"3"} pb={"5"}  >
                        <Text fontSize={"24px"} fontWeight={"600"} >Enter the Amount</Text>
                        <Flex w={"full"} gap={"2"} overflowX={"auto"} sx={{
                            '::-webkit-scrollbar': {
                                display: 'none'
                            }
                        }}>
                            <Flex w={"fit-content"} gap={"2"}>
                                {donate?.map((item) => (
                                    <Flex key={item} as={"button"} onClick={() => setValue(item?.replace("NGN ", ""))} rounded={"32px"} h={"25px"} w={"80px"} borderWidth={"2px"} justifyContent={"center"} alignItems={"center"} color={item.replace("NGN ", "") === value ? primaryColor : headerTextColor} borderColor={item.replace("NGN ", "") === value ? primaryColor : borderColor} fontSize={"12px"} fontWeight={"600"}  >
                                        {item}
                                    </Flex>
                                ))}
                            </Flex>
                        </Flex>
                        <Flex w={"full"} h={"50px"} pos={"relative"} >
                            <Input value={value} placeholder='0' onChange={(e) => setValue(e.target.value)} w={"full"} h={"50px"} rounded={"32px"} pl={"8"} borderColor={borderColor} type='number' borderWidth={"1px"} />
                            <Flex w={"fit-content"} h={"50px"} pos={"absolute"} justifyContent={"center"} alignItems={"center"} px={"4"} >
                                ₦
                            </Flex>
                        </Flex>
                        <Button isLoading={payForTicket?.isLoading} onClick={()=> clickHandler()} isDisabled={value ? false : true} w={"full"} h={"50px"} rounded={"32px"} color={"white"} fontWeight={"600"} bgColor={"brand.chasescrollBlue"} _hover={{ backgroundColor: "brand.chasescrollBlue" }} >
                            Donate
                        </Button>
                        <Flex w={"full"} justifyContent={"center"} >
                            <DonationTermAndCondition refund={true} />
                        </Flex>
                    </Flex>
                </Flex>
            </ModalLayout>
        </>
    )
}
