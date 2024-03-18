import CustomButton from '@/components/general/Button'
import CustomText from '@/components/general/Text'
import { AddIconWithBorder } from '@/components/svg'
import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

interface Props {}

function ListUser(props: Props) {

    return (
        <Box width={"full"} >
            <HStack width='50%' height='40px' justifyContent={'space-between'}>
                <CustomText>Services</CustomText>
                <Link href="/dashboard/booking/create">
                    <Flex width={"40px"} height={"40px"} rounded={"full"} as={"button"} backgroundColor={"#5D70F9"} justifyContent={"center"} alignItems={"center"} >
                        <AddIconWithBorder />
                    </Flex>
                </Link>
            </HStack>
        </Box>
    )
}

export default ListUser
