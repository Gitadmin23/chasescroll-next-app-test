import useCustomTheme from '@/hooks/useTheme'
import { URLS } from '@/services/urls'
import httpService from '@/utils/httpService'
import { Button, Flex, useColorMode, useToast } from '@chakra-ui/react'
import { AxiosError, AxiosResponse } from 'axios'
import React, { useState } from 'react'
import { useQueryClient, useMutation } from 'react-query'

interface IProps {
    index: string,
    setIndex: any
}

interface IRequest {
    id: string,
    resolve: boolean
}

export default function (props: IProps) {

    const {
        setIndex,
        index
    } = props

    const [loading, setLoading] = useState("0") 
    const toast = useToast() 

    const { bodyTextColor, primaryColor, secondaryBackgroundColor, mainBackgroundColor, borderColor } = useCustomTheme();
    const { colorMode, toggleColorMode } = useColorMode();
    const queryClient = useQueryClient();

    const resolveRequest = useMutation({
        mutationFn: (data: IRequest) => httpService.post("/group/resolve-request", data),
        onError: (error: AxiosError<any, any>) => {
            toast({
                title: 'Error',
                description: error?.response?.data?.message,
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
        onSuccess: (data: AxiosResponse<any>) => {
            toast({
                title: 'Success',
                description: data.data?.message,
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            setLoading("0") 
			queryClient.invalidateQueries(["getMyCommunities"])  
        }
    });
 

    const handleAcceptRequest = React.useCallback((event: any) => { 
        event.stopPropagation();
        setLoading("accept")
        resolveRequest.mutate({id: index, resolve: true})
    }, [index])


    const handleRejectRequest = React.useCallback((event: any) => { 
        event.stopPropagation();
        setLoading("decline")
        resolveRequest.mutate({id: index, resolve: false})
    }, [index])  


    return (
        <Flex gap={"3"} fontSize={"sm"} >
            <Button isDisabled={(resolveRequest?.isLoading && loading === "accept")} onClick={(e) => handleAcceptRequest(e)} fontSize={"sm"} maxW={"100px"} width={"full"} bgColor={primaryColor} color={'white'} height={"40px"} >
                {(resolveRequest?.isLoading && loading === "accept") ? "Loading..." : "Accept"}
            </Button>
            <Button isDisabled={(resolveRequest?.isLoading && loading === "decline")} onClick={(e) => handleRejectRequest(e)} fontSize={"sm"} maxW={"100px"} width={"full"} bgColor={"#FCE7F3"} height={"40px"} color={"#DD2B2C"} >
                {(resolveRequest?.isLoading && loading === "decline") ? "Loading..." : "Decline"}
            </Button>
        </Flex>
    )
}