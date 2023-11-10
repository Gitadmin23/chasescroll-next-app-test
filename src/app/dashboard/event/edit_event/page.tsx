"use client"
import CreateEventHeader from '@/components/create_event_component/create_event_header'
import EventInformation from '@/components/create_event_component/event_information'
import EventTheme from '@/components/create_event_component/event_theme'
import EventTicket from '@/components/create_event_component/event_ticket'
import useEventStore from '@/global-state/useCreateEventState'
import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'

interface Props { }

function CreateEvent(props: Props) {
    const { } = props
 
    const { tab } = useEventStore((state) => state); 


    return (
        <Box width={"full"} >
            <CreateEventHeader/>
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
    )
}

export default CreateEvent
