import { useCommunityPageState } from '@/components/Community/chat/state';
// import EventDetails from '@/components/event_details_component';
import CustomText from '@/components/general/Text';
import { useDetails } from '@/global-state/useUserDetails'
import useDebounce from '@/hooks/useDebounce';
import { IEvent } from '@/models/Events'
import { PaginatedResponse } from '@/models/PaginatedResponse';
import { IMAGE_URL, URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import {
    Box,
    Button,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    VStack,
    useToast,
    Image,
    Input,
    InputGroup,
    InputLeftAddon, InputLeftElement
} from '@chakra-ui/react';
import { uniqBy } from 'lodash';
import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {FiSearch} from "react-icons/fi";

const EventBox = ({ event }: {
    event: IEvent,
}) => {
    const toast = useToast();
    const queryClient = useQueryClient();
    const { activeCommunity } = useCommunityPageState((state) => state);
    const { userId } = useDetails((state) => state);


    const savedEvent = useMutation({
        mutationFn: (data: any) => httpService.post(`${URLS.SAVE_EVENT}`, data),
        onSuccess: (data) => {
            toast({
                title: 'Success',
                description: 'Event saved!',
                status: 'success',
                position: 'top-right',
                duration: 5000
            });
            queryClient.invalidateQueries([`getAllMyEvents-${activeCommunity?.id}`]);
            queryClient.invalidateQueries([`getMyEventsss`, userId]);
        },
        onError: () => {
            toast({
                title: 'Error',
                description: 'An error occured while trying to save an event',
                status: 'error',
                position: 'top-right',
                duration: 5000
            })
        }
    })
    return (
        <HStack alignItems={'center'} width='100%' height={'130px'} paddingY={'10px'} borderBottomWidth={'1px'} borderBottomColor={'lightgrey'} justifyContent={'space-between'}>

           <HStack>

                <Box width='150px' height={'110px'} borderRadius={'10px'} bg={'lightgrey'} overflow={'hidden'}>
                    <Image alt='om' src={`${IMAGE_URL}${event.currentPicUrl}`} width='100%' height='100%' objectFit={'cover'} />
                </Box>

                <VStack flex={1} alignItems={'flex-start'} spacing={2}>
                <Box>
                    <CustomText fontFamily={'DM-Bold'} fontSize={'18px'}>{event.eventName.length > 20 ? event.eventName.substring(0, 20) + '...':event.eventName}</CustomText>

                    <CustomText fontFamily={'DM-Regular'} fontSize={'16px'} color='grey'>{event?.eventDescription?.length >20 ? event?.eventDescription?.substring(0, 20) + '...' : event?.eventDescription}</CustomText>

                    <CustomText fontFamily={'DM-Regular'} marginTop={'10px'} fontSize={'12px'} color='brand.chasescrollButtonBlue'>{event?.location?.address?.length >20 ? event?.location?.address?.substring(0, 20) + '...' : event?.location?.address}</CustomText>
                </Box>

                
            </VStack>

           </HStack>

            <Button onClick={() => savedEvent.mutate({
                    eventID: event.id,
                    typeID: activeCommunity?.id,
                    type: 'EVENT',
                })}
                    isLoading={savedEvent.isLoading}
                    width='100px' height='40px' borderRadius={'30px'} bg='brand.chasescrollButtonBlue' color='white' variant={'outline'} fontSize={'12px'}>Add</Button>

        </HStack>
    )
}

function AddEventsModal({ isOpen, onClose }: {
    isOpen: boolean,
    onClose: () => void,
}) {
    const [events, setEvents] = React.useState<IEvent[]>([]);
    const { userId } = useDetails((state) => state);
    const [search, setSeearch] = React.useState('');
    const toast = useToast();
    const { events: savedEvents } = useCommunityPageState((state) => state);

    const debounceValue = useDebounce(search, 500);
    const { isLoading, isError } = useQuery(['getMyEventsss', userId, debounceValue], () => httpService.get(`${URLS.GET_EVENTS}`, {
        params: {
            // createdBy: userId,
            page: 0,
            eventName: debounceValue,
        }
    }), {
        onSuccess: (data) => {
            const item: PaginatedResponse<IEvent> = data.data;
            const ids = savedEvents.map((item) => item.id);
            setEvents(uniqBy(item.content.filter((item) => !ids.includes(item.id)), 'id'))
        },
        onError: () => { },
    });


    return (
        <Modal isOpen={isOpen} onClose={() => onClose()} size='lg' isCentered>
            <ModalOverlay />
            <ModalContent padding='0px' borderRadius={'20px'}>
                <ModalCloseButton />
                <ModalBody padding='0px'>
                    <VStack paddingX='10px' width='100%' height={'100px'} borderBottomWidth={'1px'} borderBottomColor={'lightgrey'} alignItems={'flex-start'} justifyContent={'center'} spacing={0}>
                        <CustomText fontFamily={'DM-Bold'} fontSize={'20px'}>Events</CustomText>
                        <CustomText fontFamily={'DM-Regular'} fontSize={'15px'} color={'grey'}>Please select an event to add to your community</CustomText>
                    </VStack>
                    <HStack paddingX='20px' width='100%' paddingY='10px'>
                        <InputGroup>
                            <InputLeftElement>
                                <FiSearch size={30} color={'grey'} />
                            </InputLeftElement>
                            <Input value={search} onChange={(e) =>setSeearch(e.target.value)} placeholder='Search for event' height={'50px'} borderRadius={'30px'} />
                        </InputGroup>

                    </HStack>
                    <Box width='100%' height='450px' overflowY={'auto'} paddingX='20px'>
                        {!isLoading && !isError && events.length < 1 && (
                            <VStack width='100%' height={'100%'} justifyContent={'center'} alignItems={'center'}>
                                <CustomText fontFamily={'DM-Regular'} fontSize={'18px'}>You have no Events to add!</CustomText>
                            </VStack>
                        )}
                        {
                            events?.map((event: IEvent, index) => (
                                <EventBox key={index} event={event} />
                            ))
                        }
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default AddEventsModal
