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

    const clickHandler =(item: any)=> {
        
    window.open(item, "_blank", "noreferrer");
    }

    return (
        <>
            {!indetail && (
                <Flex gap={"1"}  height={"50px"} bgColor={"gray.200"}  alignItems={"center"} >
                    {!noicon && (
                        <Box width={"fit-content"} >
                            <Box width={iconsize ? iconsize : "20px"} display={"flex"} justifyContent={"center"} alignItems={"center"} >
                                <LocationIcon style={{ width: iconsize ? iconsize : "20px" }} />
                            </Box>
                        </Box>
                    )}
                    <Text fontWeight={fontWeight ? fontWeight : "semibold"} color={color ? color : "brand.chasescrollBlue"} fontSize={fontsize ? fontsize : "sm"} >
                        {location?.locationDetails && (
                            <p>{location?.locationDetails?.length >= (length ? length : 17) ? location?.locationDetails.slice(0, (length ? length : 17)) + "..." : location?.locationDetails}</p>
                        )}
                        {(location?.toBeAnnounced && !location?.locationDetails) && (
                            <p>To Be Announced</p>
                        )}
                        {(location?.link) && (
                            <Text as={"button"} textAlign={"left"} onClick={(e)=> clickHandler(location?.link)} style={{ color: "#5D70F9", fontSize: fontsize ? fontsize : "sm", fontWeight: fontWeight ? fontWeight : "semibold" }} className=' font-bold text-sm text-chasescrollBlue ' >Join Online</Text>
                        )}
                    </Text>
                </Flex>
            )}
            {indetail && (
                <Box display={"flex"} flexDirection={"column"} borderBottomWidth={"1px"} roundedBottom={"lg"} py={"2"} >
                    <Text fontSize={"sm"} fontWeight={"semibold"} >{"Event location"}</Text>
                    <Flex width={"full"} gap={"3"} mt={"3"} alignItems={"center"} >
                        <LocationIcon className="" />
                        <Box>
                            <Text fontWeight={"semibold"} color={color ? color : "gray.600"} fontSize={fontsize ? fontsize : "sm"} >
                                {location?.locationDetails && (
                                    <p>{location?.locationDetails?.length >= (length ? length : 17) ? location?.locationDetails.slice(0, (length ? length : 17)) + "..." : location?.locationDetails}</p>
                                )}
                                {(location?.toBeAnnounced && !location?.locationDetails) && (
                                    <p>To Be Announced</p>
                                )}
                                {(location?.link) && (
                                    <a href={location?.link} target="_blank" className=' font-bold text-sm text-chasescrollBlue ' >Join Online</a>
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
