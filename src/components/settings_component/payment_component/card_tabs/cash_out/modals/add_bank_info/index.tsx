import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import React from 'react'
import { useQuery, useMutation } from 'react-query';
import { useToast, Box, Text, Select, Input } from '@chakra-ui/react';
import CustomButton from '@/components/general/Button';
import axios from "axios"

interface Props { 
    close: any
}

function AddBankInfo(props: Props) {
    const { 
        close
    } = props

    const toast = useToast()

    const [data, setData] = React.useState([] as any)
    const [bankName, setBankName] = React.useState("")
    const [accountNumber, setAccountNumber] = React.useState("")

    // react query
    const { isLoading, isRefetching } = useQuery(['get-bank-list'], () => axios.get("https://api.paystack.co/bank"), {
        onError: (error: any) => {
            toast({
                status: "error",
                title: error.response?.data,
            });
        },
        onSuccess: (data) => { 
            setData(data?.data?.data);
        }
    })

        // mutations 
	const payStackMutation = useMutation({
		mutationFn: (data: any) => httpService.post(`/payments/account/onboardPaystack`, data),
		onSuccess: (data) => {
			// queryClient.invalidateQueries(['EventInfo'+id]) 

            toast({
                title: 'Success',
                description: "Bank Details Added",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });   
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
        payStackMutation.mutate({
            account_number: accountNumber,
            bank_code: bankName

        })
    }, [payStackMutation])

    return (
        <Box width={"full"} padding={"6"} >
            <Text>Bank Name</Text>
            <Select onChange={(e) => setBankName(e.target.value)} placeholder="Select Bank" >
                {data?.map((item: any, index: number) => {
                    return (
                        <option key={index} value={item?.code} >{item?.name}</option>
                    )
                })}
            </Select>
            <Text mt={"3"}>Account Number</Text>
            <Input type='number' onChange={(e)=> setAccountNumber(e.target.value)} placeholder="0000000000" />
            <CustomButton onClick={()=> clickHandler()} isLoading={payStackMutation.isLoading} text='Submit' mt={"5"} />
        </Box>
    )
}

export default AddBankInfo
