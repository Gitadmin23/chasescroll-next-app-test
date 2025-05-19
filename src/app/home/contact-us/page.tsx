"use client"
import Head from "next/head";
import AddressSection from "@/components/landing_component/contactus/AddressSection";
import FirstSetion from "@/components/landing_component/contactus/FirstSection";
import DiscoverApp from "@/components/landing_component/home/discoverApp";
import VersionInfo from "@/components/landing_component/home/versionInfo";
import { Flex } from "@chakra-ui/react";

function ContactPage() {
    return (
        <>
            <Head>
                <title>Contact Us | ChaseScroll</title>
                <meta name="description" content="Transforming event management across Africa by empowering young creators and entrepreneurs—providing a platform to showcase their talents, highlight their skills, and connect them to real business opportunities." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Flex flexDir={"column"} w={"full"} >
                <FirstSetion />
                <AddressSection />
                <VersionInfo />
                <DiscoverApp hide={true} />
            </Flex>
        </>
    )
}

export default ContactPage