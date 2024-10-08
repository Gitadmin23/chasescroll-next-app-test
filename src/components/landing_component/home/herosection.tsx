import { THEME } from "@/theme";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import MobileAppLink from "../mobileapplink";
import AnimatedText from "@/components/sharedComponent/animated_text";


export default function HeroSection() { 

    return (
        <Flex px={["6", "6", "8"]} gap={["8"]} background={"linear-gradient(0deg, #5465E0, #5465E0), linear-gradient(180deg, #5465E0 0%, #0F1292 100%)"} w={"full"} flexDir={"column"} alignItems={"center"} pt={"12"} >
            <Text className="rotate" fontSize={["24px", "24px", "60px"]} fontWeight={"bold"} maxW={"1300"} textAlign={"center"} lineHeight={["33.89px", "33.89px", "72.61px"]} color={"white"} >{"Redefining Experiences for Effortless Event  Management."}</Text>
            <Text className="rotate" fontSize={["12px", "12px", "18px"]} maxW={"888px"} lineHeight={["22px", "22px", "26.1px"]} fontWeight={"medium"} color={"white"} mt={["0px", "0px", "3"]} textAlign={"center"} >Experience a new age of event management as we transform how you design, interact with your attendees, and manage your free or paid events.</Text>
            <MobileAppLink />
            <Flex className="animated-text-two" w={["full", "full", "637px"]} roundedTop={["45.93px", "45.93px", "92px"]} justifyContent={"center"} background={"#4e5dce"} mt={"5"} pt={"10"} >
                <Image w={["65%", "65%", "365.65px"]} src="/images/iphone.png" alt="apple" rounded={"8px"} />
            </Flex>
        </Flex>
    )
}