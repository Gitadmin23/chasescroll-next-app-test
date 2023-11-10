import { LocationIcon } from '@/components/svg'
import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { MdLocationPin } from 'react-icons/md'

interface Props {
    location: any,
    locationType?: any
    fontsize?: string,
    length?: number,
    color?: string,
    iconsize?: string,
    indetail?: boolean,
    noicon?: boolean,
    fontWeight?: string
}

function EventLocationDetail(props: Props) {
    const {
        location,
        // locationType,
        fontsize,
        color,
        length,
        iconsize,
        indetail,
        noicon,
        fontWeight
    } = props

    const clickHandler = (item: any, e: any) => {
        e.stopPropagation();
        window.open(item, "_blank", "noreferrer");
    }

    return (
        <>
            {!indetail && (
                <Flex gap={"1"} height={"50px"} alignItems={"center"} >
                    {!noicon && (
                        <Box width={"fit-content"} >
                            <Box width={iconsize ? iconsize : "20px"} display={"flex"} justifyContent={"center"} alignItems={"center"} >
                                <LocationIcon style={{ width: iconsize ? iconsize : "20px" }} />
                            </Box>
                        </Box>
                    )}
                    <Text textAlign={"left"} fontWeight={fontWeight ? fontWeight : "semibold"} color={color ? color : "brand.chasescrollBlue"} fontSize={fontsize ? fontsize : "sm"} >
                        {location?.locationDetails && (
                            <p>{location?.locationDetails?.length >= (length ? length : 17) ? location?.locationDetails.slice(0, (length ? length : 17)) + "..." : location?.locationDetails}</p>
                        )}
                        {(location?.toBeAnnounced && !location?.locationDetails) && (
                            <p>To Be Announced</p>
                        )}
                        {(location?.link) && (
                            <Text as={"button"} onClick={(e) => clickHandler(location?.link, e)} style={{ color: "#5D70F9", fontSize: fontsize ? fontsize : "sm", fontWeight: fontWeight ? fontWeight : "semibold" }} >Join Online</Text>
                        )}
                    </Text>
                </Flex>
            )}
            {indetail && (
                <Box display={"flex"} flexDirection={"column"} height={"50px"} borderBottomWidth={"1px"} roundedBottom={"lg"} py={"2"} >
                    <Text fontSize={"sm"} fontWeight={"semibold"} >{"Event location"}</Text>
                    <Flex width={"full"} gap={"3"} mt={"3"} alignItems={"center"} >
                        <LocationIcon className="" />
                        <Box>
                            <Text textAlign={"left"} fontWeight={"semibold"} color={color ? color : "gray.600"} fontSize={fontsize ? fontsize : "sm"} >
                                {location?.locationDetails && (
                                    <p>{location?.locationDetails?.length >= (length ? length : 17) ? location?.locationDetails.slice(0, (length ? length : 17)) + "..." : location?.locationDetails}</p>
                                )}
                                {(location?.toBeAnnounced && !location?.locationDetails) && (
                                    <p>To Be Announced</p>
                                )}
                                {(location?.link) && (
                                    <Text as={"button"} onClick={(e) => clickHandler(location?.link, e)}  className=' font-bold text-sm text-chasescrollBlue ' >Join Online</Text>
                                )}
                            </Text>
                        </Box>
                    </Flex>
                </Box>
            )}
        </>
    )
}

export default EventLocationDetail
