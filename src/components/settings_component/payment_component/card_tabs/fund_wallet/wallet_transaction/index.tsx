import LoadingAnimation from '@/components/sharedComponent/loading_animation' 
// import Toggle from 'react-toggle'
import { CreditWallet, DebitWallet, OtherPurchase, TicketPurchase } from '@/components/svg'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import { URLS } from '@/services/urls'
import { dateFormat } from '@/utils/dateFormat'
import { formatNumber } from '@/utils/numberFormat'
import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

interface Props { }

function WalletTransaction(props: Props) {
    const { } = props

    const { results, isLoading, ref, isRefetching } = InfiniteScrollerComponent({ url: URLS.GET_TRANSACTIONS, limit: 10, filter: "id" })

    return (
        <LoadingAnimation loading={isLoading} refeching={isRefetching} length={results?.length} > 
            <Box width={"full"} py={"6"} >
                {results?.map((item: {
                    purpose: string,
                    description: string,
                    title: string,
                    timestamp: any,
                    currency: string,
                    payableAmount: any,
                    value?: any,
                    status?: string
                }, index: number) => {
                    return (
                        <Flex key={index} gap={"2"} py={"3"} >
                            <Box width={"fit-content"} >
                                {item?.purpose === 'PAY_FOR_TICKET' ? (
                                    <TicketPurchase />
                                ) : item?.purpose === 'FUND_WALLET' ? (
                                    <CreditWallet />
                                ) : item?.purpose === 'CASHOUT' ? (
                                    <DebitWallet />
                                ) : (
                                    <OtherPurchase />
                                )}
                            </Box>
                            <Flex width={"full"} color={"gray.600"} justifyContent={"space-between"} >
                                <Box>
                                    <Text fontWeight={"medium"} >
                                        {
                                            item?.description ??
                                                item?.title ??
                                                item?.purpose === 'PAY_FOR_TICKET'
                                                ? 'Ticket Purchase'
                                                : item?.purpose === 'FUND_WALLET'
                                                    ? 'Fund Wallet'
                                                    : 'CASHOUT' && 'Withdrawal'
                                        }
                                    </Text>
                                    <Text fontSize={"12px"} fontWeight={"medium"} color={"#777E90"} >{dateFormat(item?.timestamp * 1000)}</Text>
                                </Box>
                                <Flex textAlign={"right"} flexDir={"column"} alignItems={"end"} >
                                    <Text fontSize={"sm"} fontWeight={"medium"} >
                                        {item?.purpose === 'FUND_WALLET' ||
                                            item?.purpose === 'PAY_FOR_TICKET'
                                            ? "+ "
                                            : item?.purpose === 'CASHOUT' && "- "}
                                        {formatNumber(item?.payableAmount / 100 ?? item?.value / 100, item?.currency === "USD" ? "$" : "₦")}
                                    </Text>
                                    <Box width={"fit-content"} textAlign={"right"} fontWeight={"bold"} fontSize={"11px"} >
                                        {item?.status === 'PAID' && <Text bgColor={"green.2001"} rounded={"lg"} px={"0px"} py={"0px"} textColor={"green.400"} >Succesful</Text>}
                                        {item?.status === 'STARTED' && <Text bgColor={"yellow.2001"} rounded={"lg"} px={"0px"} py={"0px"} textColor={"yellow.400"} >pending</Text>}
                                        {item?.status === 'CANCELLED' && <Text bgColor={"red.2001"} rounded={"lg"} px={"0px"} py={"0px"} textColor={"red.400"} >cancelled</Text>}
                                        {item?.status === 'REFUNDED' && <Text bgColor={"red.2001"} rounded={"lg"} px={"0px"} py={"0px"} textColor={"red.400"} >refunded</Text>}
                                        {item?.status === 'ERROR' && <Text bgColor={"red.2001"} rounded={"lg"} px={"0px"} py={"0px"} textColor={"red.400"} >failed</Text>}
                                    </Box>
                                </Flex>
                            </Flex>
                        </Flex>
                    )
                })}
            </Box>
        </LoadingAnimation>
    )
}

export default WalletTransaction
