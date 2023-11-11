import { Box, Text } from '@chakra-ui/react'
import React from 'react'

function Page({ params }: { params: { slug: string } }) {

    return (
        <Box width={"full"}  >
            <Text>Refund User</Text>
            {/* <DashboardDetail index={params?.slug} /> */}
        </Box>
    )
}

export default Page
