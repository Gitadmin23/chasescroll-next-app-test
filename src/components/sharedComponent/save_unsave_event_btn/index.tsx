import { useDetails } from '@/global-state/useUserDetails';
import httpService from '@/utils/httpService';
import { Box, Spinner, useToast } from '@chakra-ui/react';
import { AxiosError, AxiosResponse } from 'axios';
import React from 'react'
import { useMutation } from 'react-query';

interface Props {
    event: any,
    size?: string,
    indetail?: boolean
}

function SaveOrUnsaveBtn(props: Props) {
    const {
        event,
        size,
        indetail
    } = props
 
    const { userId: user_index } = useDetails((state) => state);
    const [isSaved, setIsSaved] = React.useState(event.isSaved)
    const toast = useToast() 

    console.log(event);
    

    console.log(event);
    

    // save event
    const saveEvent = useMutation({
        mutationFn: (data: any) => httpService.post('/events/save-event', data),
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
            console.log(data);
            
            toast({
                title: 'Success',
                description: data.data?.message,
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            }); 
            setIsSaved(true)
        }
    });

    const deletedSavedEvent = useMutation({

        mutationFn: (data: any) => httpService.post('/events/remove-saved-event', data),
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
            setIsSaved(false)
        }
    });

    const handleSave = React.useCallback((e: any) => {

        e.stopPropagation();
        if (isSaved) {
            deletedSavedEvent.mutate({
                eventID: event.id,
                typeID: user_index,
                type: 'EVENT'
            })
        } else {
            saveEvent.mutate({
                eventID: event.id,
                typeID: user_index,
                type: 'EVENT'
            })
        }
    }, [deletedSavedEvent, saveEvent])

    return (
        <Box as='button' onClick={handleSave} width={size ? size+"px" : "18px"} display={"flex"} justifyContent={"center"} alignItems={"center"} disabled={saveEvent.isLoading || deletedSavedEvent.isLoading} >
            {(saveEvent.isLoading || deletedSavedEvent.isLoading) && <Spinner size='sm' color="brand.chasesccrollButtonBlue" />}
            {(!saveEvent.isLoading && !deletedSavedEvent.isLoading) && (
                <span className='text-2xl'>
                    {isSaved &&
                        <svg xmlns="http://www.w3.org/2000/svg" width={size ? size : "18"} height={size ? size : "18"} viewBox="0 0 18 18" fill="none">
                            <path d="M12.6133 1.5H5.38328C3.78578 1.5 2.48828 2.805 2.48828 4.395V14.9625C2.48828 16.3125 3.45578 16.8825 4.64078 16.23L8.30078 14.1975C8.69078 13.98 9.32078 13.98 9.70328 14.1975L13.3633 16.23C14.5483 16.89 15.5158 16.32 15.5158 14.9625V4.395C15.5083 2.805 14.2108 1.5 12.6133 1.5Z" fill={indetail ? 'white' : 'black' } stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12.6133 1.5H5.38328C3.78578 1.5 2.48828 2.805 2.48828 4.395V14.9625C2.48828 16.3125 3.45578 16.8825 4.64078 16.23L8.30078 14.1975C8.69078 13.98 9.32078 13.98 9.70328 14.1975L13.3633 16.23C14.5483 16.89 15.5158 16.32 15.5158 14.9625V4.395C15.5083 2.805 14.2108 1.5 12.6133 1.5Z" fill={indetail ? 'white' : 'black' } stroke={indetail ? 'white' : 'black' } stroke-linecap="round" stroke-linejoin="round" />
                        </svg>}
                    {!isSaved &&
                        <svg xmlns="http://www.w3.org/2000/svg" width={size ? size : "18"} height={size ? size : "18"} viewBox="0 0 18 18" fill="none">
                            <path d="M12.6133 1.5H5.38328C3.78578 1.5 2.48828 2.805 2.48828 4.395V14.9625C2.48828 16.3125 3.45578 16.8825 4.64078 16.23L8.30078 14.1975C8.69078 13.98 9.32078 13.98 9.70328 14.1975L13.3633 16.23C14.5483 16.89 15.5158 16.32 15.5158 14.9625V4.395C15.5083 2.805 14.2108 1.5 12.6133 1.5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12.6133 1.5H5.38328C3.78578 1.5 2.48828 2.805 2.48828 4.395V14.9625C2.48828 16.3125 3.45578 16.8825 4.64078 16.23L8.30078 14.1975C8.69078 13.98 9.32078 13.98 9.70328 14.1975L13.3633 16.23C14.5483 16.89 15.5158 16.32 15.5158 14.9625V4.395C15.5083 2.805 14.2108 1.5 12.6133 1.5Z" stroke={indetail ? 'white' : 'black' } stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    }
                </span>
            )}
        </Box>
    )
}

export default SaveOrUnsaveBtn
