"use client"
import Head from "next/head";
import FirstSetion from "@/components/landing_component/aboutus/FirstSection";
import MissionAndGoal from "@/components/landing_component/aboutus/MissionAndGoal";
import MissionAndVision from "@/components/landing_component/aboutus/MissionAndVision";
import TeamSection from "@/components/landing_component/aboutus/TeamSection";
import DiscoverApp from "@/components/landing_component/home/discoverApp";
import VersionInfo from "@/components/landing_component/home/versionInfo";
import { Flex } from "@chakra-ui/react";

function AboutUs() {
    return (
        <>
            <Head>
                <title>About Us | ChaseScroll</title>
                <meta name="description" content="Transforming event management across Africa by empowering young creators and entrepreneurs—providing a platform to showcase their talents, highlight their skills, and connect them to real business opportunities." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Flex flexDir={"column"} w={"full"} >
                <FirstSetion />
                <MissionAndGoal />
                <MissionAndVision />
                <TeamSection />
                <VersionInfo />
                <DiscoverApp hide={true} />
            </Flex>
        </>
    )
}

export default AboutUs