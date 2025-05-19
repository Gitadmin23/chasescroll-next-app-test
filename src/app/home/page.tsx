"use client"
import Head from "next/head";
import Faq from "@/components/landing_component/home/FAQ"
import UserComment from "@/components/landing_component/home/userComment"
import AboutEventSection from "@/components/landing_component/newhome/AboutEventSection"
import EventOrganiser from "@/components/landing_component/newhome/EventOrganiser"
import GetThingDone from "@/components/landing_component/newhome/getThingDone"
import HeroSection from "@/components/landing_component/newhome/HeroSection"
import ProfessionService from "@/components/landing_component/newhome/ProfessionService"
import ServiceProvider from "@/components/landing_component/newhome/serviceProvider"
import { Flex } from "@chakra-ui/react"
import React from "react"

export default function Home() {
  return (
    <>
      <Head>
        <title>ChaseScroll - Event Management Platform</title>
        <meta name="description" content="Transforming event management across Africa by empowering young creators and entrepreneurs—providing a platform to showcase their talents, highlight their skills, and connect them to real business opportunities." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Flex flexDir={"column"} color={"black"} w={"full"} >
        <HeroSection />
        <AboutEventSection />
        <GetThingDone />
        <EventOrganiser />
        <ProfessionService />
        <ServiceProvider />
        <UserComment />
        <Faq />
      </Flex>
    </>
  )
}