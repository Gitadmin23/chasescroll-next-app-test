import useCustomTheme from '@/hooks/useTheme'
import { IEventType } from '@/models/Event'
import { Flex, Input, Switch, Text, useToast } from '@chakra-ui/react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CustomButton from '../general/Button'
import ModalLayout from '../sharedComponent/modal_layout'
import usePr from '@/hooks/usePr'
import ListProduct from './listProduct'
import useProduct, { IPinned } from '@/hooks/useProduct'
import ListDonation from './listDonation'
import ListService from './listService'
import ListRental from './listRental'
import { IoIosArrowBack } from 'react-icons/io'
import { ITag } from '@/models/product'


export default function PrBtn({ data, donation, product }: { data: IEventType, donation?: boolean, product?: boolean }) {

    const {
        mainBackgroundColor,
        primaryColor,
        secondaryBackgroundColor
    } = useCustomTheme()

    const { pinProduct } = useProduct()
    const router = useRouter()

    const [tab, setTab] = useState(false)
    const [index, setIndex] = useState(product ? 2 : 1)
    const [prCheck, setPrCheck] = useState(false)
    const [percent, setPercentage] = useState("")
    const [lengthDonation, setLengthDonation] = useState(0)
    const [lengthProduct, setLengthProduct] = useState(0)

    const [selectProduct, setSelectProduct] = useState<Array<IPinned>>([])
    const [selectService, setSelectService] = useState<Array<ITag>>([])
    const [selectRental, setSelectRental] = useState<Array<ITag>>([])
    const [selectDonation, setSelectDonation] = useState("")
    const [selectDonationInitial, setSelectDonationInitial] = useState("")
    const param = useParams();
    const id = param?.slug

    console.log(id);

    const { createPr, tagServiceAndRental, createFundraising, open, setOpen, updateUserEvent, updateEvent } = usePr()

    const toast = useToast()

    const clickHander = () => {
        createPr?.mutate({
            eventID: data?.id,
            affiliateType: data?.affiliates[0]?.affiliateType,
            percent: data?.affiliates[0]?.percent
        })
    }

    useEffect(() => {
        setTab((donation || product) ? true : false)
    }, [open])

    const submitHandler = () => {
        if (index === 2) {
            if (lengthProduct === 0) {
                router?.push(`/dashboard/kisok/create?event=${data?.id}`)
            } else if (selectProduct?.length > 0) {
                pinProduct?.mutate({ pinnedItems: selectProduct })
                setOpen(false)
                setTab(false)
            } else {
                toast({
                    status: "warning",
                    title: "Added a product",
                    isClosable: true,
                    duration: 5000,
                    position: "top-right",
                })
            }
        } else if (index === 3) {
            tagServiceAndRental?.mutate({
                serviceCategories: [],
                rentalCategories: selectRental,
                eventID: data?.id,
                state: data?.location?.placeIds ? data?.location?.placeIds : "Rivers"
            })
        } else if (index === 4) {
            tagServiceAndRental?.mutate({
                serviceCategories: selectService,
                rentalCategories: [],
                eventID: data?.id,
                state: data?.location?.placeIds ? data?.location?.placeIds : "Rivers"
            })
        } else if (index === 1) {
            if (lengthProduct === 0) {
                router?.push(`/dashboard/donation/create?event=${data?.id}`)
            } else if (!selectDonation) {
                toast({
                    status: "warning",
                    title: "Select a Fundraising",
                    isClosable: true,
                    duration: 5000,
                    position: "top-right",
                })
            } else if (selectDonation === selectDonationInitial) {
                toast({
                    status: "warning",
                    title: "This Fundraising is Pinned",
                    isClosable: true,
                    duration: 5000,
                    position: "top-right",
                })
            } else {
                if (selectDonation) {
                    createFundraising?.mutate({
                        fundRaiserID: selectDonation,
                        eventID: data?.id,
                        userID: data?.createdBy?.userId
                    })
                }
            }
        }
    }

    useEffect(() => {
        if (data?.affiliates?.length > 0) {
            setPercentage(data?.affiliates[0]?.percent + "")
            setPrCheck(true)
        } else {
            setPercentage("")
            setPrCheck(false)
        }
    }, [open])

    const updatePrPercent = (item: boolean) => {
        updateEvent?.mutate({
            id: data?.id,
            affiliates: item ? [] : [
                {
                    affiliateType: data?.affiliates[0]?.affiliateType ? data?.affiliates[0]?.affiliateType : "pr",
                    percent: Number(percent)
                }
            ]
        })
    }


    const changeHandler = (item: string) => {

        if (item?.toString()?.length <= 2) {
            setPercentage(item)
        }
    }


    return (
        <>
            {(data?.isOrganizer && !donation && !product) && (
                <Flex pos={["relative"]} w={"full"} bgColor={data?.isOrganizer ? primaryColor : data?.prStatus === "ACTIVE" ? primaryColor : data?.prStatus === "PENDING" ? "#FF9500" : "#EEEEFF"} color={data?.prStatus ? "white" : !data?.isOrganizer ? primaryColor : "white"} flexDir={"column"} roundedTop={data?.isOrganizer ? ["0px"] : "32px"} roundedBottomRight={data?.isOrganizer ? ["0px", "0px", "12px"] : "32px"} roundedBottomLeft={data?.isOrganizer ? "12px" : "32px"} gap={"3"} >
                    <Flex onClick={() => setOpen(true)} as={"button"} w={"full"} gap={"2"} h={"55px"} px={"1"} alignItems={"center"} justifyContent={"center"} >
                        <Text fontSize={"14px"} fontWeight={"500"} >My Support Center</Text>
                        {/* <IoIosArrowDown size={"20px"} /> */}
                    </Flex>
                </Flex>
            )}

            {(donation && data?.isOrganizer) && (
                <Flex px={"8"} onClick={() => { setOpen(true), setTab(true), setIndex(1) }} as={"button"} justifyContent={"center"} alignItems={"center"} h={"102px"} rounded={"16px"} w={"full"} bgColor={secondaryBackgroundColor} >
                    <Text fontWeight={"500"} fontSize={"14px"} color={primaryColor} >+ Add Fundraising</Text>
                </Flex>
            )}
            {(product && data?.isOrganizer) && (
                <Flex px={"8"} onClick={() => { setOpen(true), setTab(true), setIndex(2) }} as={"button"} justifyContent={"center"} alignItems={"center"} h={["170px","170px","219px"]} rounded={"16px"} w={"fit-content"} bgColor={secondaryBackgroundColor}  >
                    <Text fontWeight={"500"} fontSize={"14px"} color={primaryColor} >+ Add a product</Text>
                </Flex>
            )}

            {(!data?.isOrganizer && data?.affiliates?.length > 0 && data?.affiliates[0]?.percent) && (
                <Flex flexDirection={"column"} gap={"1"} w={(data.eventMemberRole === "ADMIN" || data.eventMemberRole === "COLLABORATOR") ? "full" : "fit-content"}  >
                    {data.eventMemberRole !== "ADMIN" && data.eventMemberRole !== "COLLABORATOR" && (
                        <Text fontSize={["14px", "14px", "16px"]} fontWeight={"600"} >Apply to be a PR</Text>
                    )}
                    {data.eventMemberRole !== "ADMIN" && data.eventMemberRole !== "COLLABORATOR" ? (
                        <CustomButton
                            isLoading={createPr?.isLoading} onClick={clickHander}
                            disable={(data?.prStatus === "PENDING" || data?.prStatus === "ACTIVE" || createPr?.isLoading) ? true : false}
                            text={data?.prStatus === "PENDING" ? "Pending" : data?.prStatus === "ACTIVE" ? "Already a PR" : `Earn ${data?.affiliates[0]?.percent}%`}
                            backgroundColor={[data?.prStatus === "PENDING" ? "#FF9500" : primaryColor, data?.prStatus === "PENDING" ? "#FF9500" : primaryColor, data?.prStatus === "PENDING" ? "#FF9500" : primaryColor]}
                            color={["white", "white", "white"]} borderRadius={"999px"} fontSize={["xs", "xs", "sm"]}
                            px={"4"}
                            width={(data.eventMemberRole === "ADMIN" || data.eventMemberRole === "COLLABORATOR") ? ["90%", "90%", "full", "full"] : ["120px", "120px", "fit-content"]}
                            height={(data.eventMemberRole === "ADMIN" || data.eventMemberRole === "COLLABORATOR") ? "55px" : " 45px "}
                            borderTopRadius={(data.eventMemberRole === "ADMIN" || data.eventMemberRole === "COLLABORATOR") ? ["0px"] : "32px"}
                            borderBottomRightRadius={(data.eventMemberRole === "ADMIN" || data.eventMemberRole === "COLLABORATOR") ? ["0px", "0px", "12px"] : "32px"}
                            borderBottomLeftRadius={(data.eventMemberRole === "ADMIN" || data.eventMemberRole === "COLLABORATOR") ? "12px" : "32px"} />
                    ) : (
                        <CustomButton
                            isLoading={createPr?.isLoading} onClick={clickHander}
                            disable={(data?.prStatus === "PENDING" || data?.prStatus === "ACTIVE" || createPr?.isLoading) ? true : false}
                            text={data?.prStatus === "PENDING" ? "Pending" : data?.prStatus === "ACTIVE" ? "Already a PR" : `Apply to be a PR - ${data?.affiliates[0]?.percent}%`}
                            backgroundColor={[data?.prStatus === "PENDING" ? "#FF9500" : primaryColor, data?.prStatus === "PENDING" ? "#FF9500" : primaryColor, data?.prStatus === "PENDING" ? "#FF9500" : primaryColor]}
                            color={["white", "white", "white"]} borderRadius={"999px"} fontSize={["xs", "xs", "sm"]}
                            px={"4"}
                            width={(data.eventMemberRole === "ADMIN" || data.eventMemberRole === "COLLABORATOR") ? ["90%", "90%", "full", "full"] : ["120px", "120px", "fit-content"]}
                            height={(data.eventMemberRole === "ADMIN" || data.eventMemberRole === "COLLABORATOR") ? "55px" : " 45px "}
                            borderTopRadius={(data.eventMemberRole === "ADMIN" || data.eventMemberRole === "COLLABORATOR") ? ["0px"] : "32px"}
                            borderBottomRightRadius={(data.eventMemberRole === "ADMIN" || data.eventMemberRole === "COLLABORATOR") ? ["0px", "0px", "12px"] : "32px"}
                            borderBottomLeftRadius={(data.eventMemberRole === "ADMIN" || data.eventMemberRole === "COLLABORATOR") ? "12px" : "32px"} />
                    )}

                </Flex>
            )}
            <ModalLayout open={open} size={"md"} close={setOpen} closeIcon={true} >
                <Flex flexDir={"column"} gap={"4"} w={"full"} px={"4"} mb={"4"} >
                    <Flex gap={"2"} alignItems={"center"} >
                        {tab && (
                            <Flex as={"button"} onClick={() => setTab(false)} >
                                <IoIosArrowBack size={"20px"} />
                            </Flex>
                        )}
                        <Text fontWeight={"500"}  >My support center</Text>
                    </Flex>
                    {!tab && (
                        <Flex bgColor={secondaryBackgroundColor} w={"full"} flexDir={"column"} rounded={"16px"} >
                            <Flex w={"full"} flexDirection={"column"} >
                                <Flex w={"full"} justifyContent={"space-between"} borderBottomWidth={data?.isOrganizer ? "1px" : "0px"} h={"50px"} px={"3"} alignItems={"center"} >
                                    <Text fontSize={"14px"} >Request PR Service</Text>
                                    <Flex gap={"2"} alignItems={"center"} >
                                        {data?.isOrganizer && (
                                            <Switch isChecked={prCheck} onChange={(e) => setPrCheck(e.target.checked)} />
                                        )}
                                        {data?.affiliates?.length > 0 && (
                                            <CustomButton backgroundColor={"red"} disable={updateEvent?.isLoading} isLoading={updateEvent?.isLoading} onClick={() => updatePrPercent(true)} width={"80px"} height={"30px"} fontSize={"12px"} text={"Stop Pr"} rounded={"full"} />
                                        )}
                                    </Flex>
                                    {!data?.isOrganizer && (
                                        <CustomButton isLoading={createPr?.isLoading} disable={createPr?.isLoading} onClick={clickHander} width={"80px"} height={"30px"} fontSize={"12px"} text={"Join"} rounded={"full"} />
                                    )}
                                </Flex>
                                {prCheck && (
                                    <Flex justifyContent={["space-between"]} alignItems={"center"} h={"50px"} px={"4"} borderBottomWidth={data?.isOrganizer ? "1px" : "0px"} gap={"3"} >
                                        <Flex alignItems={"center"} gap={"1"} >
                                            <Input w={"50px"} type="number" fontSize={"14px"} px={"2"} value={percent} onChange={(e) => changeHandler(e.target.value + "")} height={"35px"} />
                                            <Text fontWeight={"800"} >%</Text>
                                        </Flex>
                                        <CustomButton width={"100px"} isLoading={updateEvent?.isLoading} disable={updateEvent?.isLoading} onClick={() => updatePrPercent(false)} text={"Update"} fontSize={"12px"} height={"35px"} />
                                    </Flex>
                                )}
                            </Flex>
                            {data?.isOrganizer && (
                                <Flex flexDirection={"column"} >
                                    <Flex w={"full"} onClick={() => { setTab(true), setIndex(1) }} as={"button"} justifyContent={"space-between"} borderBottomWidth={"1px"} h={"50px"} px={"3"} alignItems={"center"} >
                                        <Text fontSize={["10px", "14px", "14px"]}  >Add fundraising </Text>
                                    </Flex>
                                    <Flex w={"full"} onClick={() => { setTab(true), setIndex(2) }} as={"button"} justifyContent={"space-between"} borderBottomWidth={"1px"} h={"50px"} px={"3"} alignItems={"center"} >
                                        <Text fontSize={["10px", "14px", "14px"]}  >Add kiosk</Text>
                                    </Flex>
                                    <Flex w={"full"} onClick={() => { setTab(true), setIndex(3) }} as={"button"} justifyContent={"space-between"} borderBottomWidth={"1px"} h={"50px"} px={"3"} alignItems={"center"} >
                                        <Text fontSize={["10px", "14px", "14px"]}  >Request Service - Photographer, makeup Artist...</Text>
                                    </Flex>
                                    <Flex w={"full"} onClick={() => { setTab(true), setIndex(4) }} as={"button"} justifyContent={"space-between"} h={"50px"} px={"3"} alignItems={"center"} >
                                        <Text fontSize={["10px", "14px", "14px"]}  >Rent an item(s)</Text>
                                    </Flex>
                                </Flex>
                            )}
                        </Flex>
                    )}
                    {tab && (
                        <Flex w={"full"} gap={"4"} pos={"relative"} flexDir={"column"} >
                            <Flex p={"4px"} h={"45px"} rounded={"full"} w={"full"} bgColor={secondaryBackgroundColor} >
                                <Flex w={"full"} as={"button"} fontSize={"12px"} fontWeight={"500"} rounded={"full"} h={"full"} justifyContent={"center"} alignItems={"center"} bgColor={index !== 1 ? "transparent" : mainBackgroundColor} onClick={() => setIndex(1)} >
                                    My Fundraising
                                </Flex>
                                <Flex w={"full"} as={"button"} fontSize={"12px"} fontWeight={"500"} rounded={"full"} h={"full"} justifyContent={"center"} alignItems={"center"} bgColor={index !== 2 ? "transparent" : mainBackgroundColor} onClick={() => setIndex(2)} >
                                    Add Kiosk
                                </Flex>
                                <Flex w={"full"} as={"button"} fontSize={"12px"} fontWeight={"500"} rounded={"full"} h={"full"} justifyContent={"center"} alignItems={"center"} bgColor={index !== 4 ? "transparent" : mainBackgroundColor} onClick={() => setIndex(4)} >
                                    Services
                                </Flex>
                                <Flex w={"full"} as={"button"} fontSize={"12px"} fontWeight={"500"} rounded={"full"} h={"full"} justifyContent={"center"} alignItems={"center"} bgColor={index !== 3 ? "transparent" : mainBackgroundColor} onClick={() => setIndex(3)} >
                                    Rental
                                </Flex>
                            </Flex>
                            <Flex w={"full"} pb={"4"} gap={"4"} bgColor={(index === 1 || index === 2) ? "transparent" : "transparent"} rounded={"16px"} flexDir={"column"} >
                                {index === 1 && (
                                    <ListDonation length={setLengthDonation} setOpen={setOpen} item={data} setSelectInitialDonation={setSelectDonationInitial} initialDonation={selectDonationInitial} selectDonation={selectDonation} setSelectDonation={setSelectDonation} />
                                )}
                                {index === 2 && (
                                    <ListProduct length={setLengthProduct} setOpen={setOpen} setTab={setTab} selectProduct={selectProduct} setSelectProduct={setSelectProduct} data={data} />
                                )}
                                {index === 3 && (
                                    <ListRental item={data} rental={selectRental} updateRental={setSelectRental} />
                                )}
                                {index === 4 && (
                                    <ListService service={selectService} selectService={setSelectService} />
                                )}
                                {(index !== 1 && index !== 2) && (
                                    <Flex w={"full"} py={"1"} bgColor={(index === 1 || index === 2) ? "white" : "white"} position={"sticky"} bottom={"-4px"} >
                                        <CustomButton onClick={submitHandler} isLoading={pinProduct?.isLoading || createFundraising?.isLoading || tagServiceAndRental?.isLoading} text={index === 2 ? "Add to product" : "Add"} width={"150px"} height={"40px"} fontSize={"14px"} borderRadius={"999px"} />
                                    </Flex>
                                )}
                            </Flex>
                        </Flex>
                    )}
                </Flex>

            </ModalLayout>
        </>
    )
}
