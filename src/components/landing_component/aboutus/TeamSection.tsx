import { ABOUT_FOOTER } from "@/constants";
import { THEME } from "@/theme";
import { Flex, Image, Text } from "@chakra-ui/react";



function TeamSection() {
    return (
        <Flex w={"full"} flexDir={"column"} >
            <Flex w={"full"} py={"20"} px={"12"} alignItems={"center"} background={"linear-gradient(300.69deg, rgba(93, 112, 249, 0) -25.23%, rgba(93, 112, 249, 0.15) 134.56%)"} >
                <Flex w={"full"} gap={"4"} flexDir={"column"} >
                    <Text fontSize={"24px"} lineHeight={"29.05px"} color={THEME?.COLORS?.chasescrollBlue} >THE TEAM</Text>
                    <Text maxW={"457px"} fontSize={"45px"} lineHeight={"54.46px"} fontWeight={"500"} color={"#2B2D31"} >Meet the Chasescroll team</Text>
                </Flex>
                <Flex w={"full"} justifyContent={"end"}  >
                    <Text fontSize={"18px"} lineHeight={"21.78px"} color={"#222222CC"} >Meet the creative team on a mission to simplify selling digital products. Our team of makers and shakers come together with many decades of experience in the SaaS and creator space. Please don’t be a stranger, say hello and connect with us any time.</Text>
                </Flex>
            </Flex>
            <Flex w={"full"} py={"20"} px={"12"} justifyContent={"center"} background={"linear-gradient(114.94deg, rgba(93, 112, 249, 0) -32.34%, rgba(93, 112, 249, 0.15) 181.63%)"} gap={"4"} >
                {ABOUT_FOOTER?.map((item:{
                    id:number,
                    img: string,
                    text: string,
                    text1: string
                })=> {
                    return(
                        <Flex key={item?.id} maxW={"421px"} w={"full"} h={"536px"} rounded={"4px"} justifyContent={"center"} alignItems={"end"} pb={"6"} px={"4"} pos={"relative"} >
                            <Image src={item?.img} alt={item?.img} w={"full"} h={"full"} objectFit={"cover"} pos={"absolute"} inset={"0px"} rounded={"4px"} />
                            <Flex w={"full"} gap={"1"} justifyContent={"center"} alignItems={"center"} fontWeight={"700"} zIndex={"20"} rounded={"8px"} h={"105px"} flexDir={"column"} bgColor={"#FFFFFFCC"} >
                                <Text color={"#1A202C"} lineHeight={"28px"} fontSize={"24px"} >{item?.text}</Text>
                                <Text fontSize={"15.88px"} color={"#F60B0B"} lineHeight={"24px"} fontWeight={"700"} >{item?.text1}</Text>
                            </Flex>
                        </Flex>
                    )
                })}
            </Flex>
        </Flex>
    )
}

export default TeamSection