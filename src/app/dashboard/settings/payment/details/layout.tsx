"use client"
import UserImage from '@/components/sharedComponent/userimage';
import useSettingsStore from '@/global-state/useSettingsState';
import { useDetails } from '@/global-state/useUserDetails';
import { Box, Flex, Switch, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react'
import { IoIosArrowBack } from 'react-icons/io'


function Layout({ children }: { children: ReactNode }) {

    const { firstName, lastName, username, user } = useDetails((state) => state);
    const router = useRouter()

    const { currency, setCurrency } = useSettingsStore((state) => state);

    const toggleCurrency = (item: any) => {
        if (item) {
            setCurrency("USD")
        } else {
            setCurrency("NGN")
        }
    }
    return (
        <Flex flexDirection={"column"} height={"full"} width={"full"} overflowY={"auto"} >
            <Flex justifyContent={"space-between"} py={"36px"} px={["6", "59px"]} width={"full"} alignItems={"center"} >
                <Flex onClick={()=> router.push("/dashboard/settings/payment")} as={"button"} gap={"3"} width={"fit-content"} alignItems={"center"}  >
                    <IoIosArrowBack size="24px" />
                    <Flex gap={"2"} justifyContent={"start"} alignItems={"center"} >
                        <Box width={"fit-content"} > 
                            <UserImage data={user} size={"46px"} font={"18px"} image={user?.data?.imgMain?.value} />    
                        </Box> 
                        <Box>
                            <Text fontSize={"14px"} textAlign={"start"} color={"#353945"} >Hello</Text>
                            <Text fontSize={"17px"} fontWeight={"semibold"} mt={"-3px"} color={"#14131B"} >{firstName + " " + lastName}</Text>
                        </Box>
                    </Flex>
                </Flex>

                <Flex gap={"2"} >
                    <Text color={"brand.chasescrollTextGrey"} fontWeight={"semibold"}>{currency}</Text>

                    <Switch
                        colorScheme="green"
                        onChange={(e) => toggleCurrency(e.target.checked)}
                        isChecked={currency === "USD" ? true : false}
                        h="28px"
                    // sx={{
                    //     '.chakra-switch__track::after': {
                    //         content: currency === "USD" ? '"USD"' : '"NGM"',
                    //         color: currency === "USD" ? 'white' : 'black',
                    //         display: 'block',
                    //         position: 'absolute',
                    //         transform: 'translate(-50%,-50%)',
                    //         top: "14px", // calc half of height
                    //         left: currency === "USD" ? '28%' : '70%',
                    //         fontWeight: 'bold',
                    //         fontSize: '2xs',
                    //     },
                    // }}
                    // {...restProps}
                    />
                </Flex>
            </Flex>
            <Box width={["full", "400px"]} mx={"auto"} px={["6", "0px"]} py={"6"} >
                {children}
            </Box>
        </Flex>
    )
}

export default Layout
