'use client'
import SelectEventPage from '@/components/event_component/select_event_page'
import { Box, Flex } from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'
import React, { ReactNode } from 'react' 

function Layout({ children }: {
    children: ReactNode
}) {

    const pathname = usePathname();
    const route = useRouter()

    return (
        <Box width={"full"} px={"8"} py={"8"} overflowX={"hidden"} >
            {(!pathname?.includes("details") && !pathname?.includes("create_event") && !pathname?.includes("edit_event")) && (
                <Flex width={"full"} justifyContent={"space-between"} pb={"8"} alignItems={"center"}  >
                    <SelectEventPage />
                    <Flex onClick={()=> route.replace("/dashboard/event/create_event")} as={"button"} width={"fit-content"} fontWeight={"semibold"} border={"1px solid #3C41F0"} px={"10px"} color={"brand.chasescrollBlue"} fontSize={"12px"} height={"25px"} rounded={"32px"}  alignItems={"center"} gap={"2"} > 
                        Create Event
                    </Flex>
                </Flex>
            )}
            {children}
        </Box>
    )
}

export default Layout

