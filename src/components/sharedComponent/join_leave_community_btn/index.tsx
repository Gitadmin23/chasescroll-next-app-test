import { useDetails } from '@/global-state/useUserDetails';
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Button, useToast } from '@chakra-ui/react';
import { AxiosError, AxiosResponse } from 'axios';
import React from 'react'
import { useMutation } from 'react-query';

interface Props {
    data: any,
    
}

function JoinOrLeaveCommunityBtn(props: Props) {
    const {
        data
    } = props
    
    const toast = useToast()

    const [ joined, setJoined] = React.useState(data.joinStatus+"")
    const { userId: user_index } = useDetails((state) => state); 

    // save event
    const JoinCommunity = useMutation({
        mutationFn: (data: any) => httpService.post(URLS.JOIN_GROUP, data),
        onError: (error: AxiosError<any, any>) => {
            toast({
                title: 'Error',
                description: error?.response?.data?.message,
                status: 'success',
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
            setJoined("NOT_CONNECTED")
        }
    });

    const LeaveCommunity = useMutation({
        mutationFn: () => httpService.delete(`${URLS.LEAVE_GROUP}?groupID=${data?.id}&userID=${user_index}`),
        onError: (error: AxiosError<any, any>) => {
            toast({
                title: 'Error',
                description: error?.response?.data?.message,
                status: 'success',
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
            setJoined("CONNECTED")
        }
    }); 

    const handleCommunity = React.useCallback(() => {
        if (joined === "NOT_CONNECTED") {
            JoinCommunity.mutate({ 
                groupID: data?.id,
                joinID: user_index
            })
        } else {
            LeaveCommunity.mutate()
        }
    }, [data, LeaveCommunity, JoinCommunity])

    return (
        <Button onClick={handleCommunity} disabled={JoinCommunity.isLoading || LeaveCommunity.isLoading} width={"120px"} color={"white"} rounded={"md"} fontSize={"sm"} bg={joined !== "NOT_CONNECTED"  ? "brand.chasescrollRed" : "brand.chasescrollBlue"} >
            {JoinCommunity.isLoading || LeaveCommunity.isLoading ? "Loading..." : joined === "NOT_CONNECTED" ? "Join" : "Leave"}
        </Button>
    )
}

export default JoinOrLeaveCommunityBtn