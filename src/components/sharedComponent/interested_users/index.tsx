import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import UserImage from '../userimage'

interface Props {
    event: any,
    size?: any,
    border?: string,
    fontSize: number,
    refund?: boolean
}

function InterestedUsers(props: Props) {
    const {
        event,
        size,
        border,
        fontSize,
        refund
    } = props

    return (
        <>
            {event?.interestedUsers?.length > 0 && (
                <Flex alignItems={"center"} >
                    {event?.interestedUsers?.map((item: any, index: number) => {
                        return (
                            <Box key={index} ml={index === 0 ? "0px" : "-10px"} >
                                <UserImage data={item} size={size} font={fontSize + "px"} border={border} />
                            </Box>
                        )
                    })}
                    {!refund && (
                        <Text color={"#1732F7"} ml={"2"} fontSize={(fontSize - 2) + "px"} >
                            Interested
                        </Text>
                    )}
                </Flex>
            )}
        </>
    )
}

export default InterestedUsers
