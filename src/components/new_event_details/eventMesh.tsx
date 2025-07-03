import useCustomTheme from '@/hooks/useTheme'
import { Button, Flex, Image, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import ModalLayout from '../sharedComponent/modal_layout'
import { truncate } from 'lodash'
import CustomButton from '../general/Button'
import { useQuery } from 'react-query'
import httpService from '@/utils/httpService'
import { IEventType } from '@/models/Event'
import { IUser } from '@/models/User'
import { IProduct } from '@/models/product'
import { textLimit } from '@/utils/textlimit'
import { IMAGE_URL } from '@/services/urls'
import { formatNumber } from '@/utils/numberFormat'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { useRouter } from 'next/navigation'
import { IoClose } from 'react-icons/io5'
import usePr from '@/hooks/usePr'
import CustomText from '../general/Text'
import useProduct, { IPinned } from '@/hooks/useProduct'
import PrBtn from './prBtn'

interface IProps {
    "id": string,
    "createdDate": number,
    "lastModifiedBy": string,
    "createdBy": string,
    "lastModifiedDate": number,
    "isDeleted": boolean,
    "status": string,
    "statusCode": number,
    "returnMessage": string,
    "typeId": string,
    "pinnedItemType": string,
    "returnProductDto": IProduct
}

export default function EventMesh({ data, setMeshSize }: { data: IEventType, setMeshSize: any }) {

    const { mainBackgroundColor, secondaryBackgroundColor, primaryColor } = useCustomTheme()

    const { push } = useRouter()

    const [eventData, setEventData] = useState<Array<IProps>>([])

    const { deleteFundraising } = usePr()

    const { pinProduct, open, setOpen } = useProduct()

    const [selectProduct, setSelectProduct] = useState<IProps>({} as IProps)

    // react query
    const { isLoading, isRefetching } = useQuery(['all-events-mesh', data?.id], () => httpService.get(`/pin-item/search`, {
        params: {
            typeId: data?.id
        }
    }), {
        onError: (error: any) => {
        },
        onSuccess: (data: any) => {
            setEventData(data?.data)
            setMeshSize(data?.data?.length)
        }
    })

    // export interface IPinned {
    //     pinnedItemType: "EVENT",
    //     typeId: string,
    //     productId: string
    // }
    const removeHandler = (item: string) => {
        let obj: Array<IPinned> = [{
            pinnedItemType: "EVENT",
            typeId: data?.id,
            productId: item
        }]

        pinProduct?.mutate({ pinnedItems: [...obj] })
    }

    const openHandler = (e: any, item: IProps) => {
        e.stopPropagation()
        setSelectProduct(item)
        setOpen(true)
    }




    return (
        <Flex position={"relative"} display={(eventData?.length > 0 || data?.isOrganizer) ? "flex" : "none"} flexDir={"column"} w={"full"} mb={["0px", "0px", "6"]} gap={"3"} >
            <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                {data?.isOrganizer ? (
                    <Text fontWeight={"500"} >Add  Product to enable your Audience connect to your event</Text>
                ) : (
                    <Text fontSize={["14px", "14px", "20px"]} fontWeight={"bold"} >Shop the ${data?.eventName} kiosk</Text>
                )}
                {!data?.isOrganizer && (
                    <Text fontSize={"12px"} fontWeight={"600"} onClick={() => push(`/dashboard/profile/${data?.createdBy?.userId}/kiosk`)} color={primaryColor} as={"button"} >See all</Text>
                )}
            </Flex>
            <Flex w={"full"} height={"180px"} />
            <Flex position={"absolute"} top={["9", "9", "12"]} maxW={"full"} overflowX={"auto"} sx={
                {
                    '::-webkit-scrollbar': {
                        display: "none"
                    }
                }
            } >
                <Flex w={"fit-content"} gap={"2"} pos={"relative"} >
                    <PrBtn data={data} product={true} />
                    {eventData?.map((item, index) => {
                        return (
                            <Flex pos={"relative"} bgColor={mainBackgroundColor} key={index} onClick={() => push(`/dashboard/kisok/details/${item?.returnProductDto?.id}`)} w={["170px", "170px", "230px"]} h={["170px", "170px", "219px"]} borderWidth={"1px"} borderColor={"#EBEDF0"} flexDir={"column"} gap={"2"} p={"2"} rounded={"16px"} >

                                {data?.isOrganizer && (
                                    <Flex w={"6"} h={"6"} onClick={(e) => openHandler(e, item)} justifyContent={"center"} alignItems={"center"} pos={"absolute"} top={"3"} right={"3"} zIndex={"50"} bg={"#F2A09B66"} color={"#F50A0A"} rounded={"full"} >
                                        <IoClose size={"14px"} />
                                    </Flex>
                                )}
                                <Flex w={"full"} h={["101px", "101px", "150px"]} p={"1"} justifyContent={"center"} alignItems={"center"} bgColor={secondaryBackgroundColor} rounded={"8px"} >
                                    <Image alt="logo" height={"full"} w={"auto"} objectFit={"contain"} rounded={"8px"} src={IMAGE_URL + item?.returnProductDto?.images[0]} />
                                </Flex>
                                <Flex flexDir={"column"} >
                                    <Text fontSize={"14px"} fontWeight={"700"} >{formatNumber(item?.returnProductDto?.price)}</Text>
                                    <Text fontSize={["12px", "12px", "14px"]} >{capitalizeFLetter(textLimit(item?.returnProductDto?.name, 20))}</Text>
                                </Flex>

                            </Flex>
                        )
                    })}

                    <ModalLayout open={open} close={setOpen} size={"xs"} >
                        <VStack width='100%' justifyContent={'center'} p={"4"} height='100%' alignItems={'center'} spacing={3}>
                            <Image alt='delete' src='/assets/images/deleteaccount.svg' />
                            <CustomText fontWeight={"700"} textAlign={'center'} fontSize={'20px'}>Remove Product </CustomText>
                            <CustomText textAlign={'center'} fontSize={'14px'} >Are you sure you want to remove <span style={{ fontWeight: "bold" }} >{capitalizeFLetter(selectProduct?.returnProductDto?.name)}</span>, this action cannot be undone.</CustomText>
                            <Button isDisabled={pinProduct.isLoading} onClick={() => removeHandler(selectProduct?.returnProductDto?.id)} isLoading={pinProduct.isLoading} fontSize={"14px"} width='100%' height='42px' bg='red' color="white" variant='solid'>Remove</Button>
                            <Button onClick={() => setOpen(false)} width='100%' height='42px' borderWidth={'0px'} color="grey">Cancel</Button>
                        </VStack>
                    </ModalLayout>
                </Flex>
            </Flex>
        </Flex>
    )
}
