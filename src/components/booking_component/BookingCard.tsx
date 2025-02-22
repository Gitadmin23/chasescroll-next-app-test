import Booking from '@/app/dashboard/newbooking/page'
import usePaystackStore from '@/global-state/usePaystack'
import { useDetails } from '@/global-state/useUserDetails'
import useCustomTheme from '@/hooks/useTheme'
import { IBooking } from '@/models/Booking'
import { IBuisness } from '@/models/Business'
import { IService } from '@/models/Service'
import { IMAGE_URL } from '@/services/urls'
import httpService from '@/utils/httpService'
import { VStack, HStack, Box, Text, Image, Flex, useToast, Button, Input, InputGroup, InputLeftElement, Divider } from '@chakra-ui/react'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import BlurredImage from '../sharedComponent/blurred_image'
import { PaginatedResponse } from '@/models/PaginatedResponse';
import Fundpaystack from '../settings_component/payment_component/card_tabs/fund_wallet/fundpaystack'
import { FiMinus, FiPlus } from 'react-icons/fi'

export interface ICategory {
    id: string;
    category: string;
}

interface IAction {
    value: number;
    type: 'ADDITION' | 'SUBSTRACTION',
}

const ServiceCard = ({ serviceID }: { serviceID: string }) => {

    const {
        primaryColor, secondaryBackgroundColor,
        headerTextColor,
        bodyTextColor,
        mainBackgroundColor,
        borderColor
    } = useCustomTheme();




    return (
        <VStack w='auto' h='25px' px='10px' backgroundColor={'#EFF1FE'} borderRadius={'full'} borderWidth={'1px'} borderColor={borderColor} justifyContent={'center'} alignItems={'center'} flexShrink={0}>
            <Text fontWeight={300} fontSize='16px' color={primaryColor}>{serviceID}</Text>
        </VStack>
    )
}

function BookingCard({ business, booking, isVendor = false, shouldNavigate = true, showBorder = true }: { business: IService, booking: IBooking, isVendor?: boolean, shouldNavigate?: boolean, showBorder?: boolean }) {
    const toast = useToast()
    const router = useRouter();
    const { userId } = useDetails((state) => state);

    const [bookingState, setBookingState] = React.useState(booking);
    const [price, setPrice] = React.useState(bookingState?.price.toString());
    const [updatedPrice, setUpdatedPrice] = React.useState(bookingState?.price.toString());
    const [service, setService] = React.useState<IService | null>(null);

    const [loading, setLoading] = useState(false)
    const [loadingReject, setLoadingReject] = useState(false);
    const [type, setType] = useState("");

    React.useEffect(() => {
        if (bookingState?.price !== parseInt(updatedPrice)) {
            setUpdatedPrice(bookingState?.price.toString());
        }
    }, [bookingState?.price]);


    const items: IAction[] = [
        {
            value: 500,
            type: 'ADDITION',
        },
        {
            value: 1000,
            type: 'ADDITION',
        },
        {
            value: 10000,
            type: 'ADDITION',
        },
        {
            value: 500,
            type: 'SUBSTRACTION',
        },
        {
            value: 1000,
            type: 'SUBSTRACTION',
        },
        {
            value: 10000,
            type: 'SUBSTRACTION',
        },
    ];

    const {
        primaryColor, secondaryBackgroundColor,
        headerTextColor,
        bodyTextColor,
        mainBackgroundColor,
        borderColor
    } = useCustomTheme();

    const queryClient = useQueryClient();

    // queries
    const { isLoading: isLoadingBoking } = useQuery([`get-booking-${booking?.id}`, booking?.id], () => httpService.get("/booking/search", {
        params: {
            id: booking?.id,
        }
    }), {
        refetchInterval: 2000,
        onSuccess: (data: any) => {
            const item: PaginatedResponse<IBooking> = data?.data;

            if (item?.content?.length > 0) {
                setBookingState(item.content[0]);
            }
        },
        onError: (error: any) => { },
    });

    const { isLoading: isLoadingBusiness } = useQuery([`get-business-${business?.id}`, business?.id], () => httpService.get("/business-service/search", {
        params: {
            id: business?.id,
        }
    }), {
        onSuccess: (data: any) => {
            const item: PaginatedResponse<IService> = data?.data;

            if (item?.content?.length > 0) {
                setService(item.content[0]);
            }
        },
        onError: (error: any) => { },
    });

    // mutations
    const userUpdatePrice = useMutation({
        mutationFn: () => httpService.put('/booking/update-price', {
            bookingID: booking?.id,
            isVendor: false,
            newPrice: price
        }),
        onSuccess: (data) => {
            toast({
                title: 'Success',
                description: data?.data?.message,
                status: 'success',
                position: 'top-right',
                isClosable: true,
                duration: 5000,
            })
            queryClient.invalidateQueries([`get-booking-${booking?.id}`]);

            setLoading(false)
            setLoadingReject(false)
        }
    });

    const vendorUpdatePrice = useMutation({
        mutationFn: () => httpService.put('/booking/update-price', {
            bookingID: booking?.id,
            isVendor: true,
            newPrice: price
        }),
        onSuccess: (data) => {
            toast({
                title: 'Success',
                description: data?.data?.message,
                status: 'success',
                position: 'top-right',
                isClosable: true,
                duration: 5000,
            })
            queryClient.invalidateQueries([`get-booking-${booking?.id}`]);
            setLoading(false)
            setLoadingReject(false)
        }
    });

    const vendorAcceptOrDecline = useMutation({
        mutationFn: (data: boolean) => httpService.put('/booking/accept-or-decline', {
            bookingID: booking?.id,
            accepted: data,
        }),
        onSuccess: (data) => {
            toast({
                title: 'Success',
                description: data?.data?.message,
                status: 'success',
                position: 'top-right',
                isClosable: true,
                duration: 5000,
            })
            queryClient.invalidateQueries([`get-booking-${booking?.id}`]);
            setLoading(false)
            setLoadingReject(false)
        }
    });

    const vendorMarkAsDone = useMutation({
        mutationFn: () => httpService.put('/booking/vendor-mark-as-done', {
            bookingID: booking?.id,
            vendorID: booking?.vendor?.id,
        }),
        onSuccess: (data) => {
            toast({
                title: 'Success',
                description: data?.data?.message,
                status: 'success',
                position: 'top-right',
                isClosable: true,
                duration: 5000,
            });
            queryClient.invalidateQueries([`get-booking-${booking?.id}`]);

        }
    });

    const userMarkAsDone = useMutation({
        mutationFn: (data: boolean) => httpService.put('/booking/user-mark-as-done', {
            bookingID: booking?.id,
            completedWithIssues: data,
            userID: userId,
        }),
        onSuccess: (data) => {
            toast({
                title: 'Success',
                description: data?.data?.message,
                status: 'success',
                position: 'top-right',
                isClosable: true,
                duration: 5000,
            })
            queryClient.invalidateQueries([`get-booking-${booking?.id}`]);

        }
    });

    const cancelBooking = useMutation({
        mutationFn: () => httpService.put('/booking/cancel-booking', {
            bookingID: booking?.id,
            userID: userId,
        }),
        onSuccess: (data) => {
            toast({
                title: 'Success',
                description: data?.data?.message,
                status: 'success',
                position: 'top-right',
                isClosable: true,
                duration: 5000,
            })
            queryClient.invalidateQueries([`get-booking-${booking?.id}`]);
        },
        onError: (error: any) => {
            toast({
                title: 'Error',
                description: error?.message,
                status: 'error',
                position: 'top-right',
                isClosable: true,
                duration: 5000,
            })
        }
    });

    const deleteBooking = useMutation({
        mutationFn: () => httpService.delete(`/booking/delete/${booking?.id}`),
        onSuccess: (data) => {
            toast({
                title: 'Success',
                description: data?.data?.message,
                status: 'success',
                position: 'top-right',
                isClosable: true,
                duration: 5000,
            })
            queryClient.invalidateQueries(['get-my-bookings']);
        },
        onError: (error: any) => {
            toast({
                title: 'Error',
                description: error?.message,
                status: 'error',
                position: 'top-right',
                isClosable: true,
                duration: 5000,
            })
        }
    });

    const clickHandle = (item: boolean) => {
        if (item) {
            setLoading(true)
        } else {
            setLoadingReject(true)
        }
        vendorAcceptOrDecline.mutate(item)
    }
    const PAYSTACK_KEY: any = process.env.NEXT_PUBLIC_PAYSTACK_KEY;


    const { setPaystackConfig, setBooking } = usePaystackStore((state) => state);
    const { configPaystack, donation, dataID } = usePaystackStore((state) => state);


    const payForTicket = useMutation({
        mutationFn: (data: {
            seller: string,
            price: number,
            currency: string,
            orderType: "BOOKING",
            typeID: string
        }) => httpService.post(`/payments/createCustomOrder`, data),
        onSuccess: (data: any) => {
            setPaystackConfig({
                publicKey: PAYSTACK_KEY,
                email: data?.data?.content?.email,
                amount: (Number(data?.data?.content?.orderTotal) * 100), //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
                reference: data?.data?.content?.orderCode
            });
            setBooking(true)
            queryClient.invalidateQueries([`get-booking-${booking?.id}`]);
        },
        onError: (error) => {
            // console.log(error);
            toast({
                title: 'Error',
                description: "Error occured",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
    });

    const handlePayment = () => {
        payForTicket.mutate({
            seller: booking?.businessOwner?.userId,
            price: Number(booking?.price),
            currency: "NGN",
            orderType: "BOOKING",
            typeID: booking?.id + ""
        })
    }

    const handlePriceChange = (item: IAction) => {
        if (item.type === 'ADDITION') {
            // calculate 5% fo the inital price
            const Percentage = parseInt(price) * 0.05;
            const newPrice = parseInt(price) + Percentage;
            setPrice(newPrice.toString());
        } else {
            if (parseInt(price) > 0) {
                const Percentage = parseInt(price) * 0.05;
                const newPrice = parseInt(price) - Percentage;
                setPrice(newPrice.toString());
            }
        }
    }

    return (
        <VStack style={{ boxShadow: "0px 4px 4px 0px #0000000D" }} w='full' h='auto' borderWidth={showBorder ? '0.5px' : '0px'} borderColor={borderColor} borderRadius={'15px'} p='10px' alignItems={'flex-start'} overflowX={'hidden'} spacing={3}>

            <Fundpaystack id={dataID} config={configPaystack} setConfig={setPaystackConfig} booking={true} donation={false} />

            <HStack w='full'>
                <Box w='30px' h='30px' borderBottomLeftRadius={'50px'} borderTopLeftRadius={'50px'} borderBottomRightRadius={'50px'} overflow={'hidden'} bg={secondaryBackgroundColor}>
                    <Image src={bookingState?.createdBy?.data?.imgMain?.value?.startsWith('https://') ? bookingState?.createdBy?.data?.imgMain?.value : (IMAGE_URL as string) + bookingState?.createdBy?.data?.imgMain?.value} alt="banner image" w='full' h='full' objectFit={'cover'} />
                </Box>
                <VStack spacing={-5} alignItems={'flex-start'}>
                    <Text fontWeight={600} fontSize={'14px'} color={primaryColor}>{bookingState?.user?.firstName} {bookingState?.user?.lastName}</Text>
                    <Text fontSize={'12px'} color={bodyTextColor}>{moment(service?.createdDate as number).fromNow()}</Text>
                </VStack>
            </HStack>

            <Box onClick={() => {
                if (shouldNavigate) router.push(`/dashboard/newbooking/booking/${bookingState?.id}`);
            }} w='full' h='250px' borderRadius={'10px'} overflow={'hidden'}>
                <BlurredImage forEvent={false} image={service?.images[0].startsWith('https://') ? service?.images[0] : (IMAGE_URL as string) + service?.images[0]} height={'100%'} />
            </Box>

            <VStack spacing={-3} alignItems={'flex-start'}>
                <Text fontWeight={400} fontSize={'12px'}>Business Name</Text>
                <Text fontWeight={600} fontSize={'16px'}>{service?.name}</Text>
            </VStack>

            <VStack alignItems='flex-start' spacing={4} w='full' borderBottomWidth='0.5px' borderBottomColor={borderColor} pb='20px' >
                <Text fontSize={'14px'} fontWeight={600}>User Information</Text>
                <HStack w='full' justifyContent={'flex-start'} spacing={6} >
                    <Text fontSize={'12px'}>Name:</Text>
                    <Text fontSize={'16px'}>{bookingState?.user?.firstName} {bookingState?.user?.lastName}</Text>
                </HStack>

                <HStack w='full' justifyContent={'flex-start'} spacing={6} >
                    <Text fontSize={'14px'}>Email:</Text>
                    <Text fontSize={'16px'}>{bookingState?.user?.email}</Text>
                </HStack>

                <HStack w='full' justifyContent={'flex-start'} spacing={6} >
                    <Text fontSize={'14px'}>Phone:</Text>
                    <Text fontSize={'16px'}>{bookingState?.user?.data?.mobilePhone?.value ?? 'None'}</Text>
                </HStack>
            </VStack>

            <Box pb='5px' w='full'>
                <HStack spacing={8}>
                    <Text fontWeight={400} fontSize={'16px'}>Service Offered</Text>
                    <ServiceCard serviceID={service?.category as string} />
                </HStack>


                {(
                    <HStack justifyContent={'space-between'} my='20px' w='full' alignItems={'center'}>
                        <Text fontSize={'16px'}>Total Price</Text>
                        <Text fontSize={'25px'} fontWeight={700}>{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(parseInt(price) || 0)}</Text>
                    </HStack>
                )}

                {booking?.bookingStatus === 'PENDING' && (
                    <VStack spacing={5} mt='10px' alignItems="center">
                        <Text fontSize={'14px'}>You can neogiate this price by 5%</Text>
                        <HStack width={'150px'} height={'50px'} borderRadius={'50px'} overflow={'hidden'} backgroundColor={'#DDE2E6'}>
                            <Flex cursor={'pointer'} onClick={() => handlePriceChange({ type: 'SUBSTRACTION', value: 0 })} flex={1} height={'100%'} borderRightWidth={'1px'} borderRightColor={'gray'} justifyContent={'center'} alignItems={'center'}>
                                <FiMinus size={20} color='black' />
                            </Flex>
                            <Flex cursor={'pointer'} onClick={() => handlePriceChange({ type: 'ADDITION', value: 0 })} flex={1} justifyContent={'center'} alignItems={'center'}>
                                <FiPlus size={20} color='black' />
                            </Flex>
                        </HStack>
                    </VStack>
                )}
            </Box>



            <Box h='10px' />
            {!isVendor && (
                <>
                    {bookingState.bookingStatus === 'PENDING' && (
                        <VStack width='100%'>
                            <HStack spacing={10} width="100%">
                                <Button onClick={() => userUpdatePrice.mutate()} isLoading={userUpdatePrice.isLoading} w='full' minHeight={'45px'} h='56px' borderRadius='full' borderWidth={'1px'} borderColor={primaryColor} color={'white'} bg={primaryColor}>
                                    <Text fontSize={'14px'} color={'white'}>Update Price</Text>
                                </Button>

                                <Button cursor={'not-allowed'} opacity={0.4} disabled w='full' h='56px' borderRadius='full' borderWidth={'1px'} borderColor={primaryColor} bg={secondaryBackgroundColor}>
                                    <Text fontSize={'14px'} color={primaryColor}>Awaiting Vendor Approval</Text>
                                </Button>
                            </HStack>

                            <Button onClick={() => cancelBooking.mutate()} isLoading={cancelBooking.isLoading} w='100%' h='45px' borderRadius='full' borderWidth={'0px'} borderColor={primaryColor} bg={"transparent"}>
                                <Text fontSize={'14px'} color={'red'}>Cancel Booking</Text>
                            </Button>
                        </VStack>
                    )}
                    {bookingState.bookingStatus === 'REJECTED' && (
                        <>
                            <Button cursor={'not-allowed'} opacity={0.4} disabled w='full' h='45px' borderRadius='full' borderWidth={'1px'} borderColor={primaryColor} bg={'red'}>
                                <Text fontSize={'14px'} color={'white'}>Rejected</Text>
                            </Button>

                            {/* <Button onClick={() => deleteBooking.mutate()} isLoading={deleteBooking.isLoading}  w='full' minHeight={'45px'} h='45px' borderRadius='full' borderWidth={'1px'} borderColor={primaryColor} bg={'red'}>
                                <Text fontSize={'14px'} color={'white'}>Delete Booking</Text>
                            </Button> */}
                        </>
                    )}
                    {bookingState.bookingStatus === 'APPROVED' && !bookingState?.hasPaid && (
                        <>
                            <Button isLoading={payForTicket?.isLoading} isDisabled={payForTicket?.isLoading} onClick={() => handlePayment()} w='full' minHeight={'45px'} h='45px' borderRadius='full' borderWidth={'1px'} borderColor={primaryColor} bg={primaryColor}>
                                <Text fontSize={'14px'} color={'white'}>Make Payment</Text>
                            </Button>

                            <Button onClick={() => cancelBooking.mutate()} isLoading={cancelBooking.isLoading} w='full' h='45px' borderRadius='full' minHeight={'45px'} borderWidth={'1px'} borderColor={primaryColor} bg={'red'}>
                                <Text fontSize={'14px'} color={'white'}>Cancel Booking</Text>
                            </Button>
                        </>
                    )}
                    {bookingState.bookingStatus === 'IN_PROGRESS' && (
                        <Button cursor={'not-allowed'} opacity={0.4} disabled w='full' h='45px' borderRadius='full' borderWidth={'1px'} minHeight={'45px'} borderColor={primaryColor} bg={primaryColor}>
                            <Text fontSize={'14px'} color={'white'}>{bookingState?.bookingStatus?.replaceAll('_', ' ')}</Text>
                        </Button>
                    )}
                    {bookingState.bookingStatus === 'AWAITING_CONFIRMATION' && bookingState.isCompleted && (
                        <>
                            <Button isLoading={userMarkAsDone.isLoading} onClick={() => userMarkAsDone.mutate(false)} w='full' h='45px' minHeight={'45px'} borderRadius='full' borderWidth={'1px'} borderColor={primaryColor} bg={primaryColor}>
                                <Text fontSize={'14px'} color={'white'}>Mark As Done</Text>
                            </Button>

                            <Button isLoading={userMarkAsDone.isLoading} onClick={() => userMarkAsDone.mutate(true)} w='full' h='45px' minHeight={'45px'} borderRadius='full' borderWidth={'1px'} borderColor={'red'} bg={mainBackgroundColor}>
                                <Text fontSize={'14px'} color={'red'}>Done with Issues</Text>
                            </Button>
                        </>
                    )}
                    {
                        bookingState.bookingStatus === "COMPLETED" && (
                            <Button cursor={'not-allowed'} opacity={0.4} disabled w='full' h='45px' borderRadius='full' borderWidth={'1px'} borderColor={primaryColor} bg={primaryColor}>
                                <Text fontSize={'14px'} color={'white'}>Completed</Text>
                            </Button>
                        )
                    }
                    {
                        bookingState.bookingStatus === "COMPLETED_WITH_ISSUES" && (
                            <Button cursor={'not-allowed'} opacity={0.4} disabled w='full' h='45px' borderRadius='full' borderWidth={'1px'} borderColor={primaryColor} bg={primaryColor}>
                                <Text fontSize={'14px'} color={'white'}>Raise Complain</Text>
                            </Button>
                        )
                    }
                    {
                        bookingState.bookingStatus === "CANCELLED" && (
                            <Button cursor={'not-allowed'} opacity={0.4} disabled w='full' h='45px' borderRadius='full' borderWidth={'1px'} borderColor={primaryColor} bg={'red'}>
                                <Text fontSize={'14px'} color={'white'}>CANCELLED</Text>
                            </Button>
                        )
                    }
                </>
            )}

            {isVendor && (
                <>
                    {bookingState.bookingStatus === 'PENDING' && (
                        <VStack width='100%'>
                            <HStack width='100%' spacing={10}>
                                <Button onClick={() => vendorUpdatePrice.mutate()} isLoading={vendorUpdatePrice.isLoading} w='full' h='56px' borderRadius='full' borderWidth={'1px'} borderColor={primaryColor} color={'white'} bg={primaryColor}>
                                    <Text fontSize={'14px'} color={'white'}>Update Price</Text>
                                </Button>
                                <Button isLoading={vendorAcceptOrDecline.isLoading || loading} onClick={() => clickHandle(true)} w='full' h='56px' borderRadius='full' borderWidth={'1px'} borderColor={primaryColor} bg={"#F7FBFE"} _hover={{ backgroundColor: "#F7FBFE" }}>
                                    <Text fontSize={'14px'} color={primaryColor}>Approve</Text>
                                </Button>
                            </HStack>

                            <Button isLoading={vendorAcceptOrDecline.isLoading || loadingReject} onClick={() => clickHandle(false)} w='full' h='45px' borderRadius='full' borderWidth={'0px'} borderColor={'red'} bg={mainBackgroundColor} _hover={{ backgroundColor: mainBackgroundColor }} >
                                <Text fontSize={'14px'} color={'red'}>Decline</Text>
                            </Button>
                        </VStack>
                    )}
                    {bookingState.bookingStatus === 'IN_PROGRESS' && bookingState.hasPaid && (
                        <Button isLoading={vendorMarkAsDone.isLoading} onClick={() => vendorMarkAsDone.mutate()} w='full' h='45px' borderRadius='full' borderWidth={'1px'} borderColor={primaryColor} bg={primaryColor}>
                            <Text fontSize={'14px'} color={'white'}>Mark As Done</Text>
                        </Button>
                    )}
                    {bookingState.bookingStatus === 'APPROVED' && !bookingState?.hasPaid && (
                        <Button cursor={'not-allowed'} opacity={0.4} disabled w='full' h='45px' borderRadius='full' borderWidth={'1px'} borderColor={primaryColor} bg={primaryColor}>
                            <Text fontSize={'14px'} color={'white'}>Awaiting Payment</Text>
                        </Button>
                    )}
                    {bookingState.bookingStatus === 'AWAITING_CONFIRMATION' && bookingState.isCompleted && (
                        <Button cursor={'not-allowed'} opacity={0.4} disabled w='full' h='45px' borderRadius='full' borderWidth={'1px'} borderColor={primaryColor} bg={primaryColor}>
                            <Text fontSize={'14px'} color={'white'}>Awaiting User Confirmation</Text>
                        </Button>
                    )}
                    {
                        bookingState.bookingStatus === "COMPLETED" && (
                            <Button cursor={'not-allowed'} opacity={0.4} disabled w='full' h='45px' borderRadius='full' borderWidth={'1px'} borderColor={primaryColor} bg={primaryColor}>
                                <Text fontSize={'14px'} color={'white'}>Completed</Text>
                            </Button>
                        )
                    }
                    {
                        bookingState.bookingStatus === "COMPLETED_WITH_ISSUES" && (
                            <Button disabled w='full' h='45px' borderRadius='full' borderWidth={'1px'} borderColor={primaryColor} bg={primaryColor}>
                                <Text fontSize={'14px'} color={'white'}>Raise Complain</Text>
                            </Button>
                        )
                    }
                    {
                        bookingState.bookingStatus === "CANCELLED" && (
                            <Button cursor={'not-allowed'} opacity={0.4} disabled w='full' h='45px' borderRadius='full' borderWidth={'1px'} borderColor={primaryColor} bg={'red'}>
                                <Text fontSize={'14px'} color={'white'}>CANCELLED</Text>
                            </Button>
                        )
                    }
                </>
            )}

        </VStack>
    )
}

export default BookingCard
