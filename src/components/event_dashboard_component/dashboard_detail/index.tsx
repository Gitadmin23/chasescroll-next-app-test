'use client'
import { formatNumberWithK } from '@/utils/formatNumberWithK'
import httpService from '@/utils/httpService'
import { Box, Flex, Text } from '@chakra-ui/react'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useQuery } from 'react-query'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Props {
    index: any
}

function DashboardDetail(props: Props) {
    const {
        index
    } = props


    const [history, setHistory] = React.useState([] as any)
    const router = useRouter()

    const { isLoading } = useQuery(['history' + index], () => httpService.get('/payments/analytics/tickets', {
        params: {
            eventID: index
        }
    }), {
        onError: (error: AxiosError<any, any>) => {
            console.error(error.response?.data);
        },
        onSuccess: (data) => { 
            setHistory(data.data);
        }
    }) 

    return (
        <Flex width={"full"} flexDirection={"column"} >
            <Flex onClick={()=> router.replace("/dashboard/settings/event-dashboard/"+index+"/refund")} as={"button"} width={"fit-content"} mt={"8"} bgColor={"#E90303"} gap={"2"} alignItems={"center"} color={"white"} py={"2px"} px={"2"} fontSize={"13px"} fontWeight={"medium"} rounded={"md"} >
                <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Group">
                        <path id="Vector" d="M0.75 14.75V2.75C0.75 2.35218 0.908035 1.97064 1.18934 1.68934C1.47064 1.40804 1.85218 1.25 2.25 1.25H9.75C10.1478 1.25 10.5294 1.40804 10.8107 1.68934C11.092 1.97064 11.25 2.35218 11.25 2.75V14.75L9 13.25L7.5 14.75L6 13.25L4.5 14.75L3 13.25L0.75 14.75Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                        <path id="Vector_2" d="M8.25 9.5V8C8.25 7.60218 8.09196 7.22064 7.81066 6.93934C7.52936 6.65804 7.14782 6.5 6.75 6.5H3.75M3.75 6.5L5.25 5M3.75 6.5L5.25 8" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                </svg>
                Refund
            </Flex>

            <Flex width={"full"} borderTopWidth={"1px"} borderBottomWidth={"1px"} borderColor={"#D0D4EB"} justifyContent={"center"} mt={"8"} py={"7"} px={"4"} >
                <Box rounded={"36px"} px={"8"} py={"6"} width={"fit-content"} bgColor={"#D0F2D9"} >
                    <Flex alignItems={"center"} gap={"2"}>
                        <Flex width={"10"} height={"10"} bgColor={"#101828"} rounded={"full"} justifyContent={"center"} alignItems={"center"} >
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="vuesax/linear/ticket">
                                    <g id="ticket">
                                        <path id="Vector" d="M20 12.5C20 11.12 21.12 10 22.5 10V9C22.5 5 21.5 4 17.5 4H7.5C3.5 4 2.5 5 2.5 9V9.5C3.88 9.5 5 10.62 5 12C5 13.38 3.88 14.5 2.5 14.5V15C2.5 19 3.5 20 7.5 20H17.5C21.5 20 22.5 19 22.5 15C21.12 15 20 13.88 20 12.5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path id="Vector_2" d="M10.5 4L10.5 20" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="5 5" />
                                    </g>
                                </g>
                            </svg>
                        </Flex>
                        <Text fontSize={"15px"} fontWeight={"medium"} >Tickets</Text>
                    </Flex>
                    <Flex pt={"7"} alignItems={"center"}>
                        <Box pt={"3px"} px={"4"} borderRight={"1px"} borderColor={"black"} >
                            <Text fontWeight={"normal"} fontSize={"xs"} textAlign={"center"} >Created</Text>
                            <Text fontWeight={"medium"} fontSize={"30px"} textAlign={"center"} className=" text-[30px]  font-medium text-center " >{formatNumberWithK(history?.totalNumberOfTickets ? history?.totalNumberOfTickets : 0)}</Text>
                        </Box>
                        <Box pt={"3px"} px={"4"} borderRight={"1px"} borderColor={"black"} >
                            <Text fontWeight={"normal"} fontSize={"xs"} textAlign={"center"} >Sold</Text>
                            <Text fontWeight={"medium"} fontSize={"30px"} textAlign={"center"} className=" text-[30px]  font-medium text-center " >{history?.currency === "USD" ? "$" : "₦" + formatNumberWithK(history?.totalActiveSales ? history?.totalActiveSales : 0)}</Text>
                        </Box>
                        <Box pt={"3px"} px={"4"} borderRight={"1px"} borderColor={"black"} >
                            <Text fontWeight={"normal"} fontSize={"xs"} textAlign={"center"} >Cancelled</Text>
                            <Text fontWeight={"medium"} fontSize={"30px"} textAlign={"center"} className=" text-[30px]  font-medium text-center " >{history?.currency === "USD" ? "$" : "₦" + formatNumberWithK(history?.totalRefunds ? history?.totalRefunds : 0)}</Text>
                        </Box>
                        <Box pt={"3px"} px={"4"} >
                            <Text fontWeight={"normal"} fontSize={"xs"} textAlign={"center"} >Available</Text>
                            <Text fontWeight={"medium"} fontSize={"30px"} textAlign={"center"} className=" text-[30px]  font-medium text-center " >{formatNumberWithK(history?.totalNumberOfAvailableTickets ? history?.totalNumberOfAvailableTickets : 0)}</Text>
                        </Box>
                    </Flex>
                </Box>
            </Flex>

            <Box width={"full"} borderBottomWidth={"1px"} borderBottomColor={"#D0D4EB"} mt={"8"} py={"7"} px={"4"} >
                <ResponsiveContainer width="100%" height={500}>
                    <BarChart
                        width={500}
                        height={300}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        data={history.tickets}
                    >
                        <XAxis dataKey="ticketType" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid strokeDasharray="3 3" />

                        <Bar dataKey="totalActiveSales" stackId="a" fill="#B7B00E" />
                        <Bar dataKey="totalRefund" stackId="a" fill="#E90303" />
                        <Bar dataKey="totalNumberOfAvailableTickets" fill="#ffc658" />
                        {/* <Bar dataKey="totalActiveSales" fill="#B7B00E" background={{ fill: '#eee' }} />
                                    <Bar dataKey="totalRefund" fill="#E90303" background={{ fill: '#eee' }} />
                                    <Bar dataKey="totalPendingSales" fill="#DB9E00" background={{ fill: '#eee' }} /> */}
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Flex>
    )
}

export default DashboardDetail
