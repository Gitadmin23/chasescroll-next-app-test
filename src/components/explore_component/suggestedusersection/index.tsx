'use client'
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Box, Flex, Link, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import UserExploreCard from '../userexplorecard';

// interface Props {}

function SugestedUserSection() {
    // const {} = props

    const toast = useToast()
    const [data, setData] = React.useState([] as any)
    const [BlockedUser, setblockedUser] = useState([] as any)

    // react query
    const { isLoading, isRefetching } = useQuery(['get-suggested-user'], () => httpService.get(URLS.GET_SUGGESTED_FRIENDS), {
        onError: (error: any) => {
            toast({
                status: "error",
                title: error.response?.data,
            });
        },
        onSuccess: (data) => {
            setData(data?.data?.content) 
        }
    })

    return (
        <Flex pb={"8"} pt={["16"]} flexDirection={"column"} flex={"1"} overflowY={"auto"} overflowX={"hidden"} >
            <Flex width={"full"} justifyContent={"space-between"} py={"5"} >
                <Text fontSize={"sm"} fontWeight={"bold"} >People you may know</Text>
                <Link href={"/dashboard/explore/suggested"} color={"brand.chasescrollBlue"} fontSize={"sm"} fontWeight={"bold"} >See all</Link>
            </Flex>
            <Box width={"full"} overflowX={"auto"} > 
                <Flex gap={"4"} width={"fit-content"} py={"4"} >
                    {data?.slice(0, 6)?.filter((item: any) => !BlockedUser.includes(item?.userId))?.map((suggestion: any) => {
                        return (
                            <UserExploreCard
                                key={suggestion.id}
                                userId={suggestion?.userId}
                                data={suggestion}
                                firstName={suggestion?.firstName}
                                lastName={suggestion?.lastName}
                                publicProfile={suggestion?.publicProfile}
                                setDeleted={setblockedUser}
                                deleted={BlockedUser} />
                        )
                    })}
                </Flex>
            </Box>
        </Flex>
    )
}

export default SugestedUserSection
