import LoadingAnimation from '@/components/sharedComponent/loading_animation';
import { ClosedEyeIcon, EyeIcon, OpenEyeIcon } from '@/components/svg'
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService'
import { formatNumber } from '@/utils/numberFormat';
import { Box, Flex, useToast, Text } from '@chakra-ui/react';
import React from 'react'
import { useQuery } from 'react-query';

interface Props {
    showEscrow: boolean
    currency?: string
}

function UserWalletAmount(props: Props) {
    const {
        showEscrow,
        currency
    } = props

    const [showText, setShowText] = React.useState(false)
    const [data, setData] = React.useState([] as any)
    const toast = useToast()

    // react query
    const { isLoading, isRefetching, refetch } = useQuery(['get-wallet-balance' + currency], () => httpService.get(URLS.GET_WALLET_BALANCE + "?currency=" + currency), {
        onError: (error: any) => {
            toast({
                status: "error",
                title: error.response?.data,
            });
        },
        onSuccess: (data) => {
            setData(data.data);
        }
    })

    return (
        <Flex flexDirection={"column"} maxWidth={"full"} color={"white"} alignItems={"center"} py={"20px"} >
            <Flex justifyContent={"space-between"} gap={"3"} alignItems={"center"} >
                <Text fontSize={"lg"} fontWeight={"medium"} >Total</Text>
                <Box as={"button"} onClick={() => setShowText((prev) => !prev)} >
                    {!showText ? <ClosedEyeIcon /> : <OpenEyeIcon />}
                </Box>
            </Flex>
            <Flex height={"30px"} justifyContent={"center"} alignItems={"center"} > 
                <LoadingAnimation fix_height={true} color='white' loading={isLoading} refeching={isRefetching} >
                    {(!isRefetching && !isLoading ) && (
                        <Text fontSize={"xl"} fontWeight={"bold"} >{showEscrow ? formatNumber(showText ? data?.escrowBalances?.balance / 100 : "***", currency === "USD" ? "$" : "₦") : formatNumber(showText ? data?.walletBalances?.balance / 100 : "***", currency === "USD" ? "$" : "₦")}</Text>
                    )}
                </LoadingAnimation>
            </Flex>
        </Flex>
    )
}

export default UserWalletAmount 
