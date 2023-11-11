'use client'
import SelectEventPage from '@/components/event_component/select_event_page'
import CustomButton from '@/components/general/Button'
import InterestedUsers from '@/components/sharedComponent/interested_users'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import { URLS } from '@/services/urls'
import httpService from '@/utils/httpService'
import { Box, Flex, Text, useToast } from '@chakra-ui/react'
import { AxiosError, AxiosResponse } from 'axios'
import { usePathname, useRouter } from 'next/navigation'
import React, { ReactNode, useState } from 'react'
import { BsChevronLeft } from 'react-icons/bs'
import { useMutation, useQuery, useQueryClient } from 'react-query'

function Layout({ children, params }: {
    children: ReactNode,
    params: { slug: string }
}) {

    const router = useRouter()
    const toast = useToast()

    const [data, setData] = useState([] as any)
    const queryClient = useQueryClient()

    const pathname = usePathname();

    const { isLoading, isRefetching } = useQuery(['all-events-details' + params?.slug], () => httpService.get(URLS.All_EVENT + "?id=" + params?.slug), {
        onError: (error: any) => {
            toast({
                status: "error",
                title: error.response?.data,
            });
        },
        onSuccess: (data: any) => {
            setData(data?.data?.content[0]);
        }
    })

    const refundallUser = useMutation({
        mutationFn: () => httpService.get('/payments/refundEvent?eventID='+params?.slug),
        onError: (error: AxiosError<any, any>) => {
            toast({
                title: 'Error',
                description: "Error Refunding All Users",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
        onSuccess: (data: AxiosResponse<any>) => {
            toast({
                title: 'Success',
                description: "Refunded All Users",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });

            queryClient.invalidateQueries(['all-events-details'+params?.slug])   
            queryClient.invalidateQueries(['/events/get-event-members/'+params?.slug]) 
        }
    });

    const clickHandler = React.useCallback((e: any) => {

        e.stopPropagation();
        refundallUser.mutate()
    }, [refundallUser])


    return (
        <Box height={"auto"} display={"flex"} width={"full"} overflowY={"auto"} justifyContent={"center"} position={"relative"}  >

            <LoadingAnimation loading={isLoading} >
                <Box width={["full", "full", "600px"]} px={"6"} py={"10"} position={"relative"} >
                    <Flex alignItems={"center"} gap={"4"} width={"full"} justifyContent={"center"} paddingBottom={"6"}>
                        <Box onClick={() => router.replace(pathname?.includes("refund")  ? "/dashboard/settings/event-dashboard/"+params?.slug : "/dashboard/settings/event-dashboard")} as='button' position={"absolute"} zIndex={"10"} left={"0px"} width={"fit-content"} >
                            <BsChevronLeft color={"black"} size={"25px"} />
                        </Box>
                        <Text textAlign={"center"} fontSize={"2xl"} fontWeight={"bold"} >{pathname?.includes("refund") ? "Refund" : data?.eventName}</Text>
                    </Flex>

                    {pathname?.includes("refund") && (
                        <Flex width={"full"} flexDirection={"column"}  > 
                            <Flex mt={"6"} width={"full"} justifyContent={"center"} alignItems={"center"} position={"relative"} >
                                <InterestedUsers fontSize={14} event={data} border={"2px"} size={"40px"} refund={true} />
                                <CustomButton isLoading={refundallUser?.isLoading} onClick={clickHandler} text='refund all' color={"#E90303"} position={"absolute"} width={"fit-content"} right={"2px"} backgroundColor={"transparent"} />
                            </Flex>
                        </Flex>
                    )}

                    <Box width={"full"}  >
                        {children}
                    </Box>
                </Box>
            </LoadingAnimation>
        </Box>
    )
}

export default Layout
