"use client"
import { BlockedUserIcon, ChangePasswordIcon, DeleteAccountIcon, EventCalenderIcon, FlaggedIcon, PaymentIcon, ProfileCircle, RequestEnhancementIcon, TermsAndPrivacy } from "@/components/svg"
import { Box, Flex } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import React from 'react'
import { IoIosArrowBack } from "react-icons/io"

interface Props { }

function Settings(props: Props) {
    const { } = props


    const SettingsPageList = [
        { 
            type: "Edit Profile",
            route: "/edit-profile",
            icon: <EventCalenderIcon />,
        },
        { 
            type: "Payment",
            route: "/payment",
            icon: <PaymentIcon />,
        },
        {
            // id: nanoid(),
            type: "Event Dash Board",
            route: "/event-dashboard",
            icon: <EventCalenderIcon />,
        },
        {
            // id: nanoid(),
            type: "Change Password",
            route: "",
            icon: <ChangePasswordIcon />,
        },
        {
            // id: nanoid(),
            type: "Account Settings",
            route: "",
            icon: <ProfileCircle />,
        },
        {
            // id: nanoid(),
            type: "Support & Help",
            // route: PATH_NAMES.suggestionPage,
            icon: "#",
        },
        {
            // id: nanoid(),
            type: "Terms and Conditions",
            route: "",
            icon: <TermsAndPrivacy />,
        },
        {
            // id: nanoid(),
            type: "Privacy Policy",
            route: "",
            icon: <TermsAndPrivacy />,
        },
        {
            // id: nanoid(),
            type: "Report a Bug",
            route: "",
            icon: <FlaggedIcon />,
        },
        {
            // id: nanoid(),
            type: "Request an Enhancement",
            route: "",
            icon: <RequestEnhancementIcon />,
        },
        {
            // id: nanoid(),
            type: "Blocked Users",
            route: "",
            icon: <BlockedUserIcon />,
        },
        {
            // id: nanoid(),
            type: "Delete Account",
            route: "",
            icon: <DeleteAccountIcon />,
        },
    ]

    const router = useRouter()

    const clickHandler =(item: {
        type: string,
        route?: any
    })=> {
        if(item?.type !== "Support & Help") {
            router.replace("/dashboard/settings"+item?.route)
        }
    }

    return (
        <Box px={"20px"} py={"30px"} overflowY={"auto"} width={"full"} >
            <Flex onClick={()=> router.back()} as={"button"} alignItems={"center"} fontWeight={"700"} fontSize={"20px"} gap={"3"} >
                <IoIosArrowBack size="24px" />
                Settings
            </Flex>
            <Flex mt={"6"} gap={"2"} px={"6"} flexDirection={"column"} >
                {SettingsPageList?.map((item: {
                    type: string;
                    icon?: any,
                    route?: any
                }, index: number) => {
                    return (
                        <Flex key={index} onClick={()=> clickHandler({...item})} as={item?.type !== "Support & Help" ? "button" : "div"} alignItems={"center"} color={item?.type !== "Support & Help" ? "black" : "#5D70F9"} my={item?.type !== "Support & Help" ? "0px" : "4"} fontWeight={item?.type !== "Support & Help" ? "400" : "bold"} fontSize={"15px"} py={"3"} gap={"1"}  >
                            {item?.type !== "Support & Help" && (
                                <Box width={"30px"} >
                                    {item?.icon}
                                </Box>
                            )}
                            {item?.type}
                        </Flex>
                    )
                })}
            </Flex>
        </Box>
    )
}

export default Settings
