'use client';
import ServicesTab from '@/components/booking_component/detail_component/services_tab'
import { Box, Button, Flex, HStack, Input, Select, Spinner, Text, Textarea, VStack, useToast } from '@chakra-ui/react'
import TabController from '@/components/booking_component/detail_component/tab_controller'
import React from 'react'
import InformationTab from '@/components/booking_component/detail_component/information_tab';
import PortfolioTab from '@/components/booking_component/detail_component/portfolio_tab';
import ReviewTab from '@/components/booking_component/detail_component/review_tab';
import ModalLayout from '@/components/sharedComponent/modal_layout';
import CustomText from '@/components/general/Text';
import { IService } from '@/models/Service';
import { useMutation, useQuery } from 'react-query';
import httpService from '@/utils/httpService';
import { URLS } from '@/services/urls';
import { useParams } from 'next/navigation'
import { PaginatedResponse } from '@/models/PaginatedResponse';
import { useDetails } from '@/global-state/useUserDetails';
import { useRouter } from 'next/navigation'
import BookingsTab from '@/components/booking_component/detail_component/booking_tab';

type Props = {
    params: { id: string } 
  } 

function BookingDetails(props: Props) { 

    const {
        params: id
    } = props

    // const { id }: any = useParams();
    const { userId } = useDetails((state) => state);
    const router = useRouter();

    // console.log(`this is the id ${props?.params?.id}`);

    const [service, setService] = React.useState<IService|null>(null);
    const [active, setActive] = React.useState(1);
    const [description, setDescription] = React.useState('');
    const [bookingType, setBookingType] = React.useState('')
    const [startTime, setStartTime] = React.useState('');
    const [endTime, setEndTime] = React.useState('');
    const [availableDays, setAvaliableDays] = React.useState(1);
    const [showModal, setShowModal] = React.useState(false);

    const toast = useToast();
<<<<<<< HEAD
    const { isLoading, isError } = useQuery(['getService',  id], () => httpService.get(URLS.GET_SERVICES, {
=======
    const { isLoading, isError } = useQuery(['getService', id], () => httpService.get(URLS.GET_SERVICES, {
>>>>>>> 1ff80b5 (finished booking)
        params: {
            id,
        }
    }), {
        onSuccess: (data) => {
            const item: PaginatedResponse<IService> = data.data;
            console.log(item.content[0]);
            setService(item.content[0]);
        },
        onError: () => {},
    });

    const createBookingMutation = useMutation({
        mutationFn: (data: any) => httpService.post(URLS.CREATE_BOOKING, data),
        onSuccess: () => {
            toast({
                title: 'Success',
                description: 'Booking Created',
                position: 'top-right',
                duration: 5000,
                isClosable: true,
                status: 'success'
            });
            setDescription('');
            setBookingType('');
            setStartTime('');
            setEndTime('');
            setAvaliableDays(1);
            setShowModal(false);
        },
        onError: () => {
            toast({
                title: 'Error',
                description: 'An Error Occured while booking, please try again',
                position: 'top-right',
                duration: 5000,
                isClosable: true,
                status: 'error'
            });
        }
    })

    const activePage = React.useCallback(() => {
        switch (active) {
            case 1: {
                return <BookingsTab serviceId={service?.id as string} userId={service?.createdBy?.userId} />
            }
            case 2: {
                return <InformationTab />
            }
            case 3: {
                return <PortfolioTab />
            }
            case 4: {
                return <ReviewTab />
            }
        }
    }, [active, service]);

    const handleTimeChange = (event: string) => {
        // Split the time string into hours and minutes
        const [hoursStr, minutesStr] = event.split(':');
        // Convert hours and minutes to numbers
        const hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr, 10);
        // Calculate time in minutes
        const totalMinutes = hours * 60 + minutes;
        return totalMinutes;
    };

    const submit = () => {
        const object = {
            description,
            userID: userId,
            vendorID: service?.createdBy?.userId,
            serviceID: service?.id,
            bookingType,
            bookingTime: {
                startTime: handleTimeChange(startTime),
                endTime: handleTimeChange(endTime),
                availabilityDayOfWeek: availableDays
            }
        }
        createBookingMutation.mutate(object);
    }

    if (isLoading) {
        return (
            <VStack width='100%' height='60px'>
                <Spinner />
                <CustomText>Loading Service...</CustomText>
            </VStack>
        )
    }

    if (!isLoading && isError) {
        return (
            <VStack width='100%' height='60px'>
                    <CustomText color='red' fontFamily={'DM-Bold'} fontSize={'18px'}>An Error Occured while getting this service</CustomText>
            </VStack>
        )
    }

    if (!isLoading && !isError && service === null) {
        return (
            <VStack width='100%' height='60px'>
                    <CustomText color='red' fontFamily={'DM-Bold'} fontSize={'18px'}>An Error Occured while getting this service</CustomText>
            </VStack>
        )
    }

    return (
        <Box width={"full"} px={["5", "8"]} py={"8"} overflowX={"hidden"} >
            {/* MODALS */}
            <ModalLayout open={showModal} close={() => setShowModal(false)}>
                <VStack width='100%' padding='20px' alignItems={'flex-start'}>
                    <CustomText>Book this service</CustomText>
                    <VStack width='100%' alignItems={'flex-start'}>
                        <CustomText fontFamily={'DM-Regular'} fontSize={'16px'}>Description</CustomText>
                        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} width='100%'></Textarea>
                    </VStack>

                    <Select value={bookingType} defaultValue={'Appointment'} onChange={(e) => setBookingType(e.target.value)}>
                        <option value='Busy'>Busy</option>
                        <option value='Appointment' >Appointment</option>
                        <option value='OutOfOffice' >OutOfOffice</option>
                    </Select>

                    <HStack>
                        <VStack width='full' alignItems={'flex-start'} >
                            <CustomText fontSize='14px'>Start Time</CustomText>
                            <Input type='time' value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                        </VStack>

                        <VStack width='full' alignItems={'flex-start'} fontSize='14px'>
                            <CustomText fontSize='14px'>End Time</CustomText>
                            <Input type='time' value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                        </VStack>

                        <VStack width='full' alignItems={'flex-start'} fontSize='14px'>
                                <CustomText fontSize='14px'>End Time</CustomText>
                                <Select value={availableDays} defaultValue={1} onChange={(e) => setAvaliableDays(+e.target.value)}>
                                    <option value={0}>Sunday</option>
                                    <option value={1}>Monday</option>
                                    <option value={2}>Tuesday</option>
                                    <option value={3}>Wednesday</option>
                                    <option value={4}>Thursday</option>
                                    <option value={5}>Friday</option>
                                    <option value={6}>Saturday</option>
                                </Select>
                            </VStack>
                    </HStack>

                    <Button width='100%' isLoading={createBookingMutation.isLoading} onClick={submit} marginTop={'10px'} bg='brand.chasescrollButtonBlue' color='white' height="35px">Book</Button>

                </VStack>
            </ModalLayout>
            <Flex rounded={"16px"} w={"full"} h={"300px"} bg={"gray.300"} >
                <Flex mt={"auto"} w={"100%"} h={"40px"} roundedBottom={"16px"} position={"relative"} justifyContent={"center"} alignItems={"center"} bg={"#5D70F9"} color={"white"} >
                    <Text fontWeight={"medium"} >Promote Now</Text>
                </Flex>
            </Flex>
            <HStack justifyContent={'space-between'} alignItems='center'>
                <VStack alignItems={'flex-start'}>
                    <Text fontWeight={"bold"} fontSize={"2xl"} color={"#131418"} mt={"4"} >{service?.serviceName}</Text>
                    <Text color={"#101828B2s"} >{service?.serviceDescription}</Text>
                </VStack>

                <Button bg='brand.chasescrollButtonBlue' onClick={() => setShowModal(true)} color='white' height="35px">Book</Button>
            </HStack>
            <TabController activeTab={active} setActiveTab={(tab) => setActive(tab)} />
            <Box width={"full"} mt={"6"} >
                {activePage()}
            </Box>
        </Box>
    )
}

export default BookingDetails