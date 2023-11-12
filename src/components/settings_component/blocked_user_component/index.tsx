import CustomButton from '@/components/general/Button'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import UserImage from '@/components/sharedComponent/userimage'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import httpService from '@/utils/httpService'
import { useToast, Flex, Box, Text } from '@chakra-ui/react'
import { AxiosError, AxiosResponse } from 'axios'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'

interface Props { person: any }

function BlockedUsersComponent() {

    const toast = useToast()
    const [loading, setLoading] = React.useState("") 

    const queryClient = useQueryClient()

    const unblockUser = useMutation({
        mutationFn: (data: any) => httpService.delete("/user/delete-block/" + data?.id),
        onError: (error: AxiosError<any, any>) => {
            toast({
                title: 'Error',
                description: "Error UnBlocking Users",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
        onSuccess: (data: AxiosResponse<any>) => { 
            toast({
                title: 'Success',
                description: data?.data?.message,
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });

            setLoading("")
            queryClient.invalidateQueries(["/user/blocklist"]) 

        }
    });

    const unblockHandler = React.useCallback((e: any, index: any) => { 
        e.stopPropagation();
        setLoading(index)
        unblockUser.mutate({
            id: index
        })
    }, [unblockUser])

    const PeopleCard = (props: Props) => {

        const { person } = props 
        return (

            <Flex _hover={{ backgroundColor: "#f1f2ff" }} px={"2"} width={"full"} justifyContent={"space-between"} alignItems={"center"} py={"4"} borderBottomWidth={"1px"} >
                <Flex width={["60vw", "fit-content"]} gap={"2"} alignItems={"center"} >
                    <Box>
                        <UserImage fontWeight={"semibold"} border={"3px"} data={person?.blockObject} size={50} font={'[30px]'} />
                    </Box>
                    <Box>
                        <Text fontSize={"15px"} fontWeight={"medium"} >{(person?.blockObject?.firstName + " " + person?.blockObject?.lastName)?.length > 15 ? (person?.blockObject?.firstName + " " + person?.blockObject?.lastName)?.slice(0, 15) + "..." : (person?.blockObject?.firstName + " " + person?.blockObject?.lastName)}</Text>
                        <Text textAlign={"start"} fontSize={"12px"} fontWeight={"semibold"} color={"brand.chasescrollTextGrey2"} >@{person?.blockObject?.email?.length > 15 ? person?.blockObject?.email?.slice(0, 15) + "..." : person?.blockObject?.email}</Text>
                    </Box>
                </Flex>
                <CustomButton isLoading={loading === person?.id} borderRadius={"md"} onClick={(e) => unblockHandler(e, person?.id)} text='Unblock' fontSize={"sm"} color={"gray.500"} backgroundColor={"#EDF4FE"} height={"43px"} px={"4"} width={"fit-content"} />

            </Flex>
        )
    }

    const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({ url: "/user/blocklist", limit: 10, filter: "id" })
 

    return (
        <Flex width={"full"} flexDirection={"column"}  >
            <LoadingAnimation loading={isLoading} length={results?.length} refeching={isRefetching} >
                {results?.map((person: any, i: number) => {
                    if (results.length === i + 1) {
                        return (
                            <Box key={person?.userId} width={"full"} ref={ref} >
                                <PeopleCard person={person} />
                            </Box>
                        )
                    } else {
                        return (
                            <Box key={person?.userId} width={"full"}>
                                <PeopleCard person={person} />
                            </Box>
                        )
                    }
                })}
            </LoadingAnimation>
        </Flex>
    )
}

export default BlockedUsersComponent
