import { StripeLogo } from '@/components/svg'
import { Flex, useToast } from '@chakra-ui/react'
import React from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { useMutation } from 'react-query';
import httpService from '@/utils/httpService';
import { URLS } from '@/services/urls';
import LoadingAnimation from '@/components/sharedComponent/loading_animation';
import StripePopup from './stripe_popup';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';

interface Props { 
    selectedCategory: {
        ticketType: string
    },
    ticketCount: any,
    datainfo: {
        id: any
    }
}

function StripeBtn(props: Props) {
    const { 
        selectedCategory,
        ticketCount,
        datainfo
    } = props

    const STRIPE_KEY: any = process.env.NEXT_PUBLIC_STRIPE_KEY;
    // const [stripePromise, setStripePromise] = React?.useState(() => loadStripe(STRIPE_KEY))

    const stripePromise = loadStripe(STRIPE_KEY);

    const [clientSecret, setClientSecret] = React.useState("");
    const [open, setOpen] = React.useState(false)
    const [configData, setconfigData] = React.useState({} as any);
    const toast = useToast()

    const createTicket = useMutation({
        mutationFn: (data: any) => httpService.post(URLS.CREATE_TICKET, data),
        onSuccess: (data: any) => {
            toast({
                title: 'Success',
                description: "Ticket Created",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });

            if (data?.data?.content?.orderTotal > 0) { 
                setconfigData({  
                    amount: data?.data?.content?.orderTotal, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
                    reference: data?.data?.content?.orderId
                }); 
                
                stripeRequest.mutate(data?.data?.content?.orderId)
            }

        },
        onError: () => {
            toast({
                title: 'Error',
                description: "Error Creating Ticket",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
    });

    const stripeRequest = useMutation({
        mutationFn: (data: any) => httpService.post(URLS.PAY_STRIPE + "?orderId=" + data),
        
        onSuccess: (data: any) => {   
            setClientSecret(data?.data?.gatewayReferenceID)
            setOpen(true)
        },
        onError: () => {
            toast({
                title: 'Error',
                description: "Error On Stripe Request",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
    });

    const clickHandler = React.useCallback(() => {
        createTicket.mutate({
            eventID: datainfo?.id,
            ticketType: selectedCategory,
            numberOfTickets: ticketCount
        })
    }, [createTicket]) 

    return (
        <LoadingAnimation loading={createTicket?.isLoading || stripeRequest?.isLoading} >
            {!open && (
                <Flex onClick={clickHandler} as={"button"} width={"full"} justifyContent={"start"} px={"4"} mt={"6"} borderColor={"#D0D4EB"} borderWidth={"1px"} gap={"3"} py={"8"} bg={"#F4F5FA"} rounded={"lg"} alignItems={"center"} >
                    <StripeLogo />
                </Flex>
            )}
            {open && ( 
                <StripePopup index={datainfo?.id} stripePromise={stripePromise} clientSecret={clientSecret} configData={configData} />
            )}
        </LoadingAnimation>
    )
}

export default StripeBtn