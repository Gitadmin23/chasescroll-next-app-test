import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import UserImage from '../userimage'
import { formatNumberWithK } from '@/utils/formatNumberWithK'

interface Props {
    event: any,
    size?: any,
    border?: string,
    fontSize: number,
    refund?: boolean,
    color?: any
}

function InterestedUsers(props: Props) {
    const {
        event,
        size,
        border,
        fontSize,
        refund,
        color
    } = props  

    return (
        <>
            {event?.interestedUsers?.length > 0 && (
                <Flex alignItems={"center"} >
                    {event?.interestedUsers?.map((item: any, index: number) => {
                        if (index <= 3) {
                            return (
                                <Box key={index} ml={index === 0 ? "0px" : "-10px"} >
                                    <UserImage data={item} size={size} image={item?.data?.imgMain?.value} font={fontSize + "px"} border={border} />
                                </Box>
                            )
                        }
                    })}
                    {event?.memberCount >= 4 &&
                        <Box roundedBottom={"64px"} width={size} fontWeight={"bold"} height={size} fontSize={(fontSize - 2) + "px"} pr={"-3px"} pb={"-2px"} roundedTopLeft={"64px"} ml={"-10px"} display={'flex'} bgColor={"#3C41F0"} color={"#fff"} justifyContent={"center"} alignItems={"center"} >
                            {"+" + formatNumberWithK(event?.memberCount - 3)}
                        </Box>
                    }
                    {!refund && (
                        <Text color={color ? color : "#1732F7"} ml={"2"} fontSize={(fontSize - 2) + "px"} >
                            Interested
                        </Text>
                    )}
                </Flex>
            )}
        </>
    )
}

export default InterestedUsers
