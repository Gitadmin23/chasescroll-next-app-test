"use client"
import CreateEventHeader from '@/components/create_event_component/create_event_header'
import EventInformation from '@/components/create_event_component/event_information'
import EventTheme from '@/components/create_event_component/event_theme'
import EventTicket from '@/components/create_event_component/event_ticket'
import useEventStore from '@/global-state/useCreateEventState'
import {Box, Flex, useColorMode} from '@chakra-ui/react'
import React, { useState } from 'react'
import useCustomTheme from "@/hooks/useTheme";

interface Props { }

function CreateEvent(props: Props) {
    const { } = props

    const {
        bodyTextColor,
        primaryColor,
        secondaryBackgroundColor,
        mainBackgroundColor,
        borderColor,
    } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();

    const { tab, changeTab } = useEventStore((state) => state);

    React.useEffect(() => {
        changeTab(0)
    }, [])

    return (
        <>

            <Flex width={"full"} h={["auto", "auto", "auto", "100vh"]} pt={"74px"} display={["none", "none", "none", "flex"]} flexDir={["column", "column", "column", "row"]} >
                <CreateEventHeader name="Create Events" />
                <Flex bgColor={colorMode === 'light' ? "gray.300":secondaryBackgroundColor} w={"full"} p={["0px", "0px", "0px", "3"]}   >
                    <Flex bgColor={colorMode === 'light' ? "white":mainBackgroundColor} rounded={["0px", "0px", "0px", "2xl"]} w={"full"} h={["auto"]} overflowY={["auto"]}>
                        <Box bgColor={colorMode === 'light' ? "white":mainBackgroundColor} w={"full"} px={"3"} h={["auto"]} >
                            {tab === 0 && (
                                <EventTheme />
                            )}
                            {tab === 1 && (
                                <EventInformation />
                            )}
                            {tab === 2 && (
                                <EventTicket />
                            )}
                        </Box>
                    </Flex>
                </Flex>
            </Flex>
            {/* <Flex width={"full"} h={["auto", "auto", "auto", "100vh"]} pt={"74px"} display={["none", "none", "none", "flex"]} flexDir={["column", "column", "column", "row"]} >
                <CreateEventHeader name="Create Events"  />
                <Flex bgColor={"gray.300"} w={"full"} p={["0px", "0px", "0px", "3"]} overflowY={["auto"]}  >
                    <Flex bgColor={"white"} w={"full"} px={"3"} h={["fit-content"]} rounded={["0px", "0px", "0px", "2xl"]} >
                        {tab === 0 && (
                            <EventTheme />
                        )}
                        {tab === 1 && (
                            <EventInformation />
                        )}
                        {tab === 2 && (
                            <EventTicket />
                        )}
                    </Flex>
                </Flex>
            </Flex> */}
            <Box width={"full"} display={["block", "block", "block", "none"]}  >
                <CreateEventHeader name="Create Events" />
                {tab === 0 && (
                    <EventTheme />
                )}
                {tab === 1 && (
                    <EventInformation />
                )}
                {tab === 2 && (
                    <EventTicket />
                )}
            </Box>
        </>
    )
}

export default CreateEvent
