"use client"
import { GoogleIcon, AppleIcon } from '@/components/svg'
import { Flex, Button, Image, Text, Box } from '@chakra-ui/react' 
import React, { useState } from 'react'
import SignupModal from '../component/signupModal'
import { useRouter } from 'next/navigation'
import GoogleBtn from '@/components/sharedComponent/googlebtn'
import { IoIosArrowBack } from 'react-icons/io'

export default function Sigup() {

    const router = useRouter()
    const [open, setOpen] = useState(false)

    return (
        <Flex w={"full"} height={"100vh"} >
            <Flex w={"full"} h={"full"} display={["none", "none", "none", "flex"]}  justifyContent={"center"} alignItems={"center"} position={"relative"} >
                <Image alt='bg' src='/images/loginimg.jpg' objectPosition={"left"} pos={"absolute"} inset={"0px"} h={"full"} objectFit={"cover"} />
                <Image alt='bg' src='/images/bay.png' pos={"relative"} zIndex={"10"} w={"70%"} objectFit={"contain"} />
                <Box pos={"absolute"} inset={"0px"} w={"full"} h={"full"} bg={"black"} opacity={"40%"} />
                <Flex as={"button"} type='button' onClick={()=> router?.push("/")} pos={"absolute"} top={"12"} color={"white"} fontSize={"16px"} fontWeight={"600"} zIndex={"5"} gap={"1"} alignItems={"center"} left={"12"} >
                    <IoIosArrowBack size={"20px"} />
                    Home
                </Flex>
            </Flex>
            <Flex justifyContent={"center"} alignItems={"center"} bgColor={"#FCFCFC"} h={"full"} w={"full"} >
                <Flex style={{boxShadow: "0px 2px 8px 2px #00000003"}} flexDir={"column"} gap={"1"} justifyContent={"center"} alignItems={"center"} maxW={"500px"} p={"8"} rounded={"62px"} w={"full"} >
                    <Image alt='logo' src='/images/logo.png' />
                    <Text fontSize={"24px"} color={"#1F1F1F"} textAlign={"center"} fontWeight={"600"} >Join us at Chasescroll</Text>
                    <Text fontSize={"14px"} color={"#5C5C5C"} textAlign={"center"} fontWeight={"500"} >Create a memorable event now</Text>
                    
                    <GoogleBtn title="" newbtn={true} /> 
                    <Flex mt={"2"} flexDirection={"column"} pos={"relative"} alignItems={"center"} > 
                        <Box width={"400px"} height={"1px"} pos={"absolute"} top={"3"} bgColor={"#BCBCBC"} />
                        <Text px={"2"} bg={"white"} pos={"relative"} color={"#BCBCBC"} zIndex={"10"} >OR</Text>
                    </Flex> 
                    <SignupModal open={open} setOpen={setOpen} />
                    <Flex px={"12"} my={"3"} >
                        <Text fontSize={"14px"} color={"#434344"} >By signing up, you agree to the Terms of Service and  Privacy Policy , including Cookie Use.</Text>
                    </Flex>
                    <Text fontSize={"17px"} color={"#1F1F1F"} textAlign={"center"} fontWeight={"600"} >Already have an account?</Text>
                    <Button onClick={()=> router.push("/auth")} mt={"4"} h={"50px"} w={"full"} borderWidth={"0.5px"} borderColor={"#233DF3"} bgColor={"white"} rounded={"32px"} gap={"3"} _hover={{backgroundColor: "white"}} justifyContent={"center"} alignItems={"center"} > 
                        <Text color={"#233DF3"} textAlign={"center"} fontWeight={"600"} >Sign in</Text>
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    )
}
