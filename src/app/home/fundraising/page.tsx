"use client"
import Head from "next/head";
import FundHeroSection from '@/components/landing_component/home/fundraising/fundHeroSection'
import HowItWorks from '@/components/landing_component/home/fundraising/HowItWorks'
import PlansSection from '@/components/landing_component/home/fundraising/PlansSection'
import { Flex } from '@chakra-ui/react'
import React from 'react'

export default function Fundraising() {
    return (
        <>
            <Head>
                <title>Fundraising | ChaseScroll</title>
                <meta name="description" content="Transforming event management across Africa by empowering young creators and entrepreneurs—providing a platform to showcase their talents, highlight their skills, and connect them to real business opportunities." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Flex flexDir={"column"} color={"black"} w={"full"} >
                <FundHeroSection />
                <HowItWorks />
                <PlansSection />
            </Flex>
        </>
    )
}
