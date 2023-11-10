import { PayStackLogo } from '@/components/svg'
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Flex, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query';
import { usePaystackPayment } from 'react-paystack'
import LoadingAnimation from '@/components/sharedComponent/loading_animation';

interface Props {  
    selectedCategory: {
        ticketType: string
    },
    ticketCount: any,
    datainfo: {
        id: any
    }
}

function PayStackBtn(props: Props) {
    const {  
        selectedCategory,
        ticketCount,
        datainfo
    } = props   

    const PAYSTACK_KEY: any = process.env.NEXT_PUBLIC_PAYSTACK_KEY; 

    const queryClient = useQueryClient()  
	const [orderCode, setOrderCode] = useState("")
    const [clientKey, setClientKey] = useState("")
    const toast = useToast()
    const [config, setConfig] = useState({
        email: "",
        amount: 0,
        reference: "",
        publicKey: PAYSTACK_KEY,
    })

	const initializePayment: any = usePaystackPayment(config);

    const createTicket = useMutation({
        mutationFn: (data: any) => httpService.post(URLS.CREATE_TICKET, data),
        onSuccess: (data: any) => { 
            console.log(data); 
            toast({
                title: 'Success',
                description: "Ticket Created",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            setConfig({
                ...config,
                email: data?.data?.content?.email,
                amount: (Number(data?.data?.content?.orderTotal) * 100), //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
                reference: data?.data?.content?.orderCode
            });
        },
        onError: (error) => { 
            console.log(error);
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

	const payStackMutation = useMutation({
		mutationFn: (data: any) => httpService.post(`/payments/verifyWebPaystackTx?orderCode=${data}`),
		onSuccess: () => {         -    
            toast({
                title: 'Success',
                description: "Payment verified",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
			queryClient.invalidateQueries(['all-events-details'+datainfo.id])
			// getData() 
			// toast.success('Payment verified');
			// setLoading(false)  
			// closeModal()
            // close(false)
		},
		onError: (error: any) => { 
            toast({
                title: 'Error',
                description: "Error Occured",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            }); 
		},
	}); 


	const onSuccess = (reference: any) => { 
		// setOrderCode(reference?.reference) 
        
        payStackMutation.mutate(reference?.reference);
	};  
	
	// you can call this function anything
	const onClose = () => {
	  // implementation for  whatever you want to do when the Paystack dialog closed.
	  console.log('closed')
	} 

	React.useEffect(()=> { 
		if(config?.reference?.length !== 0) {  
			initializePayment(onSuccess, onClose)
		} 
	}, [config, clientKey])
 
	// React.useEffect(()=> { 
    //     if (orderCode) {
    //         console.log(`Making paystack payment`); 
    //         payStackMutation.mutate(orderCode);
    //         return;
    //     } 
    // }, [orderCode]);

    const clickHandler = React.useCallback(() => {
        createTicket.mutate({
            eventID: datainfo?.id ,
            ticketType: selectedCategory,
            numberOfTickets: ticketCount
        })
    }, [createTicket]) 

    return (
        <Flex onClick={clickHandler} as={"button"} width={"full"} justifyContent={(createTicket?.isLoading || payStackMutation?.isLoading) ? "center":"start"} px={"4"} mt={"6"} borderColor={"#D0D4EB"} borderWidth={"1px"} gap={"3"} py={"8"} bg={"#F4F5FA"} rounded={"lg"} alignItems={"center"} >
            <LoadingAnimation fix_height={true} loading={(createTicket?.isLoading || payStackMutation?.isLoading)} > 
                <PayStackLogo />
            </LoadingAnimation>
        </Flex>
    )
}

export default PayStackBtn
