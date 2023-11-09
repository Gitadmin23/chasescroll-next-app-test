import React from 'react'
import { useQuery, useMutation } from 'react-query';
import { useToast, Box, Text, Select, Input } from '@chakra-ui/react';
import CustomButton from '@/components/general/Button';
import httpService from '@/utils/httpService';
import useAmountStore from '@/global-state/useSettingsState';

interface Props { 
    currency: string,
    transferCode: string,
    close: any, 
}

function BankOtp(props: Props) {
    const { 
        currency,
        transferCode,
        close 
    } = props
 
    const [otp, setOtp] = React.useState("")  
    const { setAmount } = useAmountStore((state) => state); 

    const toast = useToast() 
   
        // mutations 
	const withdrawMutation = useMutation({
		mutationFn: (data: any) => httpService.get(`/payments/account/withdrawOTP`, data),
		onSuccess: (data) => {
			// queryClient.invalidateQueries(['EventInfo'+id]) 

            toast({
                title: 'Success',
                description: "Withdraw Success",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            }); 
            setAmount("")
            close(false)  
		},
		onError: (error: any) => {
            toast({
                title: 'Error',
                description: "Error Occurred",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            }); 
		},
	});  


    const clickHandler = React.useCallback(() => {
        withdrawMutation.mutate({
            "transfer_code": transferCode,
            "otp": otp 
        })
    }, [withdrawMutation])

    return (
        <Box width={"full"} padding={"6"} >
            <Text>Enter OTP</Text>
            <Input type='number' onChange={(e)=> setOtp(e.target.value)} placeholder="oooooo" />
            <CustomButton onClick={()=> clickHandler()} isLoading={withdrawMutation.isLoading} text='Submit' mt={"5"} />
        </Box>
    )
}

export default BankOtp
