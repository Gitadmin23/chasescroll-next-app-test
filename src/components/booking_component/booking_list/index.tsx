"use client"
import CustomText from '@/components/general/Text'
import { HeartIcon, LocationStroke, ReviewIcon, ShareIconb } from '@/components/svg'
import { PaginatedResponse } from '@/models/PaginatedResponse'
import { IService } from '@/models/Service'
import { URLS } from '@/services/urls'
import { THEME } from '@/theme'
import httpService from '@/utils/httpService'
import { Box, Flex, Image, Spinner, Text, VStack } from '@chakra-ui/react'
import { uniqBy } from 'lodash'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FiUser } from 'react-icons/fi'
import { useQuery } from 'react-query'

interface Props { }

function BookingList(props: Props) {
    const [service, setService] = React.useState<IService[]>([]);
    const { } = props 

    const Router = useRouter();

    const { isLoading, data } = useQuery(['getServices'], () => httpService.get(URLS.GET_SERVICES), {
        onSuccess: (data) => {
            const item: PaginatedResponse<IService> = data.data;
            setService(uniqBy(item.content, 'id'));
        },
        onError: (error) => {
            console.log(error);
        }
    });

    if (isLoading) {
        return (
            <VStack width='100%' height={'100px'} justifyContent={'center'}>
                <Spinner />
                <CustomText>Getting services...</CustomText>
            </VStack>
        )
    }

    if (!isLoading && service.length <1) {
        return (
            <VStack width='100%' height={'100px'}>
                <CustomText>No service avaliable yet...</CustomText>
            </VStack>
            
        )
    }

    return (
        <Box width={['100%', "50%"]} py={"8"} >
           {service.length > 0 && service.map((item, index) => (
             <Flex key={index.toString()} marginBottom={'20px'} as={"button"} onClick={()=> Router.push("/dashboard/booking/information/" + item.id)} rounded={"32px"} flexDir={"column"} borderColor={"#D0D4EB"} borderWidth={"1px"} roundedTopRight={"0px"} width={"full"}  >
             <Box p={"2"} >
                 <Flex gap={"1"} alignItems={"center"} >
                     <Box width={"60px"} height={"60px"} overflow={'hidden'} rounded={"full"} roundedTopRight={"0px"} bgColor={"gray.300"}>
                        {item?.createdBy?.data?.imgMain.value !== null && (
                            <Image alt="image" src={item?.createdBy?.data?.imgMain?.value} width='100%' height='100%' />
                        )}
                        {item?.createdBy?.data?.imgMain.value === null && (
                            <VStack flex='1' width='100%' height={'100%'} justifyContent={'center'}>
                                <FiUser color={THEME.COLORS.chasescrollButtonBlue} size={30} />
                            </VStack>
                        )}
                     </Box>
                     <VStack alignItems={'flex-start'} spacing={0}>
                         <Flex>
                            <Text fontWeight={"bold"} color={"#131418"} >{item?.createdBy?.firstName} {item?.createdBy?.lastName} </Text>
                            <CustomText fontFamily={'DM-Light'} fontSize={'14px'} color='grey' marginLeft={'10px'}>@{item?.createdBy?.username}</CustomText>
                         </Flex>
                         <Text fontWeight={"normal"} fontSize={"xs"} color={"#5D70F9"} >Business Owner</Text>
                     </VStack>
                 </Flex>
             </Box>
             <Box width={"full"} p={"3"} roundedTop={"8px"} borderColor={"#D0D4EB"} borderTopWidth={"1px"}>
                 <Flex width={"full"} bg={"gray.200"} h={"350px"} rounded={"8px"} p={"3"} >
                     <Flex w={"full"} mt={"auto"} gap={"3"} >
                         <Box w={"80px"} h={"87px"} rounded={"8px"} bg={"green.400"} />
                         <Box w={"80px"} h={"87px"} rounded={"8px"} bg={"green.400"} />
                         <Box w={"80px"} h={"87px"} rounded={"8px"} bg={"green.400"} />
                     </Flex>
                 </Flex>

                 <Box width={"full"} px={"2"} mt={"4"} > 
                     <Text fontSize={"2xl"} textAlign={"left"} fontWeight={"bold"} color={"#131418"} >{item.serviceName}</Text>

                     <Flex gap={"1"} py={"10px"} >
                         {/* <LocationStroke /> */}
                         <Text color={"#00000080"} >{item.serviceDescription}</Text>
                     </Flex>
                     {/* <Flex justifyContent={"space-between"} w={"full"} py={"3"} >
                         <Flex gap={"3px"} flexDir={"column"} alignItems={"center"} >
                             <Flex justifyContent={"center"} alignItems={"center"} w={"7"} h={"7"} >
                                 <HeartIcon />
                             </Flex>
                             <Text fontWeight={"normal"} fontSize={"xs"} color={"#101828B2"} >3 likes</Text>
                         </Flex>
                         <Flex gap={"3px"} flexDir={"column"} alignItems={"center"} >
                             <Flex justifyContent={"center"} alignItems={"center"} w={"7"} h={"7"} >
                                 <ReviewIcon />
                             </Flex>
                             <Text fontWeight={"normal"} fontSize={"xs"} color={"#101828B2"} >12k Review</Text>
                         </Flex>
                         <Flex gap={"3px"} flexDir={"column"} alignItems={"center"} >
                             <Flex justifyContent={"center"} alignItems={"center"} w={"7"} h={"7"} >
                                 <ShareIconb />
                             </Flex>
                             <Text fontWeight={"normal"} fontSize={"xs"} color={"#101828B2"} >9k Shares</Text>
                         </Flex>
                     </Flex> */}
                 </Box>

             </Box>
         </Flex>
           ))}
        </Box>
    )
}

export default BookingList
