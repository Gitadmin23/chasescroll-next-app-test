import { THEME } from "@/theme";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import MobileAppLink from "../mobileapplink";


export default function HeroSection() {
    return (
        <Flex px={"8"} gap={"8"} background={"linear-gradient(0deg, #5465E0, #5465E0), linear-gradient(180deg, #5465E0 0%, #0F1292 100%)"} w={"full"} flexDir={"column"} alignItems={"center"} pt={"12"} >
            <Text fontSize={"60px"} fontWeight={"bold"} maxW={"1300"} textAlign={"center"} lineHeight={"72.61px"} color={"white"} >Redefining Experiences for Effortless Event  Management.</Text>
            <Text fontSize={"18px"} maxW={"888px"} lineHeight={"26.1px"} fontWeight={"medium"} color={"white"} mt={"3"} textAlign={"center"} >Discover a new era of event management as we redefine the way you plan, organise, and execute your events.Join us for an unforgettable journey as we revolutionise the world of events.</Text>
            <MobileAppLink />
            <Flex  w={"637px"} roundedTop={"92px"} justifyContent={"center"} background={THEME?.COLORS?.chasescrollButtonBlue} pt={"10"} >
                <Image w={"365.65px"} src="/images/iphone.png" alt="apple" rounded={"8px"} />
            </Flex>
        </Flex>
    )
}