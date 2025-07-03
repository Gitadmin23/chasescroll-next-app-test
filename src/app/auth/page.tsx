"use client"
import { AppleIcon, GoogleIcon } from '@/components/svg'
import { Button, Flex, Image, Text, Box, Input, Checkbox } from '@chakra-ui/react'
import React from 'react'
import { useRouter } from 'next/navigation'
import { CustomInput } from '@/components/Form/CustomInput'
import useAuth from '@/hooks/useAuth'
import PageLoader from '@/components/sharedComponent/pageLoader'
import GoogleBtn from '@/components/sharedComponent/googlebtn'
import { IoArrowForward } from 'react-icons/io5'
import { IoIosArrowBack, IoMdArrowRoundBack } from 'react-icons/io'

export default function NewPage() {

    const router = useRouter()

    const { renderForm, isLoading, isSuccess } = useAuth()

    return renderForm(
        <Flex w={"full"} height={"100vh"} >
            <Flex w={"full"} h={"full"} display={["none", "none", "none", "flex"]} justifyContent={"center"} alignItems={"center"} position={"relative"} >
                <Image alt='bg' src='/images/loginimg.jpg' objectPosition={"left"} pos={"absolute"} inset={"0px"} h={"full"} objectFit={"cover"} />
                <Image alt='bg' src='/images/bay.png' pos={"relative"} zIndex={"10"} w={"70%"} objectFit={"contain"} />
                <Box pos={"absolute"} inset={"0px"} w={"full"} h={"full"} bg={"black"} opacity={"40%"} />
                <Flex as={"button"} type='button' onClick={() => router?.push("/")} pos={"absolute"} top={"12"} color={"white"} fontSize={"16px"} fontWeight={"600"} zIndex={"5"} gap={"1"} alignItems={"center"} left={"12"} >
                    <IoIosArrowBack size={"20px"} />
                    Home
                </Flex>
            </Flex>
            <Flex justifyContent={"center"} alignItems={"center"} bgColor={"#FCFCFC"} h={"full"} w={"full"} position={"relative"} >
                <Flex as={"button"} display={["flex", "flex", "flex", "none"]} type='button' onClick={() => router?.push("/")} pos={"absolute"} top={"6"} color={"black"} fontSize={"16px"} fontWeight={"600"} zIndex={"5"} gap={"1"} alignItems={"center"} left={"6"} >
                    <IoIosArrowBack size={"20px"} />
                    Home
                </Flex>
                <Flex style={{ boxShadow: "0px 2px 8px 2px #00000003" }} flexDir={"column"} gap={"1"} justifyContent={"center"} alignItems={"center"} maxW={"500px"} p={"8"} rounded={"62px"} w={"full"} >
                    <Image alt='logo' src='/images/logo.png' />
                    <Text fontSize={"24px"} color={"#1F1F1F"} textAlign={"center"} fontWeight={"600"} >Welcome To Chasescroll</Text>
                    <Text fontSize={"14px"} color={"#5C5C5C"} textAlign={"center"} fontWeight={"500"} >{`We're thrilled to work with you on your event projects. Join us today.`}</Text>
                    <GoogleBtn title="Sign in" newbtn={true} />
                    <Flex mt={"2"} flexDirection={"column"} pos={"relative"} alignItems={"center"} >
                        <Box maxW={"400px"} w={"70vw"} height={"1px"} pos={"absolute"} top={"3"} bgColor={"#BCBCBC"} />
                        <Text px={"2"} bg={"white"} pos={"relative"} color={"#BCBCBC"} zIndex={"10"} >OR</Text>
                    </Flex>
                    <Flex flexDir={"column"} gap={"1"} mt={"4"} w={"full"} >
                        <Text color={"#1F1F1F"} ml={"1"} >Email/Username</Text>
                        <CustomInput newbtn={true} name='username' isPassword={false} type='text' placeholder='Enter your Email or Username' />
                    </Flex>
                    <Flex flexDir={"column"} gap={"1"} mt={"3"} w={"full"} >
                        <Text color={"#1F1F1F"} ml={"1"} >Password</Text>
                        <CustomInput newbtn={true} name='password' isPassword type='password' placeholder='Enter your password' />
                    </Flex>
                    <Flex justifyContent={"space-between"} w={"full"} mt={"3"} fontSize={"12px"} >
                        <Flex gap={"1"} >
                            <Checkbox w={"16px"} rounded={"8px"} />
                            <Text >Remember me</Text>
                        </Flex>
                        <Text onClick={() => router.push("/auth/forgotpassword")} as={"button"} type='button' color={"#233DF3"} >Forgot Password</Text>
                    </Flex>
                    <Button type='submit' color={"white"} isLoading={isLoading} isDisabled={isLoading} mt={"4"} h={"50px"} w={"full"} borderWidth={"0.5px"} borderColor={"#233DF3"} bgColor={"#233DF3"} rounded={"32px"} gap={"3"} _hover={{ backgroundColor: "#233DF3" }} justifyContent={"center"} alignItems={"center"} >
                        <Text textAlign={"center"} fontWeight={"600"} >Login</Text>
                    </Button>
                    <Text fontSize={"14px"} mt={"4"} >{`Don't have account ?`} <span style={{ color: "#233DF3", fontWeight: "600" }} role='button' onClick={() => router?.push("/auth/signup")} >Sign Up</span></Text>
                </Flex>
            </Flex>
            <PageLoader show={isSuccess} />
        </Flex>
    )
}
