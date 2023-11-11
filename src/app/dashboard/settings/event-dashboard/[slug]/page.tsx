"use client"
import DashboardDetail from "@/components/event_dashboard_component/dashboard_detail" 
import { Box } from "@chakra-ui/react"  

export default function EventDetailsPage({ params }: { params: { slug: string } }) { 

  return(
    <Box width={"full"}  >
      <DashboardDetail index={params?.slug} />
    </Box>
  )
}