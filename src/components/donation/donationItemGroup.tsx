import useGetDonationList from '@/hooks/useGetDonationList'
import { IMAGE_URL } from '@/services/urls'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { textLimit } from '@/utils/textlimit'
import { Grid, GridItem, Flex, Text, Image } from '@chakra-ui/react'
import moment from 'moment'
import React, { useState } from 'react'
import { IoClose, IoInformationCircleOutline } from 'react-icons/io5'
import CustomButton from '../general/Button'
import LoadingAnimation from '../sharedComponent/loading_animation'
import UserImage from '../sharedComponent/userimage'
import DonationGraph from './donationGraph'
import useCustomTheme from '@/hooks/useTheme'
import { IDonationGroup, IDonationList } from '@/models/donation'
import useGetDonationGroup from '@/hooks/useGetDonationGroup'
import ModalLayout from '../sharedComponent/modal_layout'
import { useRouter } from 'next/navigation'
import DonationGroupModal from './donationGroupModal'
import { dateFormat } from '@/utils/dateFormat'
import DonationPayment from './donationPayment'
import DonationBtn from './donationBtn'
import ShareEvent from '../sharedComponent/share_event'
import InfiniteScrollerComponent from '@/hooks/infiniteScrollerComponent'
import DeleteEvent from '../sharedComponent/delete_event'
import useSearchStore from '@/global-state/useSearchData'
import BlurredImage from '../sharedComponent/blurred_image'
import { isDateInPast } from '@/utils/isPast'



export default function DonationItemGroup({ details, singleData, creator, pasted }: { details?: boolean, singleData?: IDonationList, creator?: boolean, publicData?: boolean, pasted?: boolean }) {

    const {
        bodyTextColor,
        borderColor, 
        mainBackgroundColor
    } = useCustomTheme()


    const { search } = useSearchStore((state) => state);


    const userId = localStorage.getItem('user_id') + "";
    const [selected, setSelected] = useState({} as IDonationList)
    // const { data: groupData, isLoading: loading, isRefetching } = useGetDonationGroup(singleData?.fundRasingGroupId?.id)
    const [open, setOpen] = useState(false)

    const { results, isLoading: loadingList, ref, isRefetching: refetchingList } = InfiniteScrollerComponent({ url:`/fund-raiser-group/search${search ? `?name=${search.toLowerCase()}` : ``}`, limit: 20, filter: "id", name: "donationlist", search: search })

    const router = useRouter()

    const clickHander = (item: IDonationGroup, index: string) => {
        if(creator || pasted){
            router?.push("/dashboard/donation/" + index)
        } else if (item?.fundRaisers?.length > 1) {
            // setSelected(item)
            router?.push("/dashboard/donation/group/" + index)
        } else {
            router?.push("/dashboard/donation/" + item?.fundRaisers[0]?.id)
        }
    } 

    return (
        (<Flex w={"full"} flexDir={"column"} gap={"5"} >
            {!details && (
                <LoadingAnimation loading={loadingList} refeching={refetchingList} length={results?.length} withimg={true} >
                    <Grid w={"full"} templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={6} >
                        {results?.filter((item: IDonationGroup)=> item?.fundRaisers?.length > 0 && item?.fundRaisers[0]?.visibility === "PUBLIC")?.map((item: IDonationGroup, index: number) => {
                            if (results?.filter((item: IDonationGroup)=> item?.fundRaisers?.length > 0 && item?.fundRaisers[0]?.visibility === "PUBLIC")?.length === index + 1) {
                                return (
                                    // <GridItem w={"full"}  >
                                    // </GridItem>
                                    (<Flex w={"full"} height={"fit-content"} ref={ref} key={index} pos={"relative"} gap={"4"} flexDir={"column"} p={"4"} borderWidth={"1px"} borderColor={borderColor} rounded={"16px"} >
                                        <Flex w={"full"} pos={"relative"} alignItems={"center"} justifyContent={"space-between"} >
                                            <Flex as={"button"} w={"fit-content"} alignItems={"center"} onClick={() => router?.push(`/dashboard/profile/${item?.user?.userId}`)} gap={"3"} >
                                                <UserImage size={"45px"} font={"20px"} data={item?.user} image={item?.user?.data?.imgMain?.value} border={"1px"} />
                                                <Flex display={["block"]} flexDir={"column"} textAlign={"left"}  >
                                                    <Text color={"#233DF3"} fontSize={"14px"} fontWeight={"600"} >{textLimit(capitalizeFLetter(item?.user?.firstName) + " " + capitalizeFLetter(item?.user?.lastName), 15)}</Text>
                                                    <Text fontSize={"12px"} color={bodyTextColor} >{moment(item?.createdDate).fromNow()}</Text>
                                                </Flex>
                                            </Flex>
                                            <DeleteEvent donation={true} event={item} />
                                        </Flex>
                                        <Flex as={"button"} onClick={() => clickHander(item, item?.fundRaisers?.filter((item)=> isDateInPast(item?.endDate))[0]?.id)} w={'full'} h={"200px"} pos={"relative"} rounded={"8px"} >

                                            <BlurredImage height={["200px"]} image={item?.fundRaisers?.filter((item)=> isDateInPast(item?.endDate))[0]?.bannerImage} />
                                            {/* <Image rounded={"8px"} objectFit="cover" alt={item?.name} width={"full"} height={"full"} src={IMAGE_URL + item?.bannerImage} /> */}
                                        </Flex>
                                        <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                                            <Flex flexDir={"column"} >
                                                <Text fontSize={"14px"} color={bodyTextColor} >Fundraising Title</Text>
                                                <Text fontWeight={"700"} >{textLimit(capitalizeFLetter(item?.fundRaisers?.filter((item)=> isDateInPast(item?.endDate))[0]?.name), 35)}</Text>
                                            </Flex>
                                            <ShareEvent newbtn={true} showText={false} data={item?.fundRaisers?.filter((item)=> isDateInPast(item?.endDate))[0]} id={item?.fundRaisers?.filter((item)=> isDateInPast(item?.endDate))[0]?.id} type="EVENT" eventName={textLimit(item?.name, 17)} />
                                        </Flex>
                                        <Flex w={"full"} borderWidth={(item?.fundRasingGroupId?.id && !creator && !pasted) ? "1px" : "0px"} borderColor={borderColor} rounded={"8px"} py={"7px"} px={"8px"} justifyContent={"space-between"} >
                                            {(item?.fundRasingGroupId?.id && !creator && !pasted) && (
                                                <Flex gap={"1"} alignItems={"center"} >
                                                    <IoInformationCircleOutline />
                                                    <Text fontSize={"12px"} >{item?.fundRaisers?.filter((item)=> isDateInPast(item?.endDate))?.length} More fundraising available  </Text>
                                                </Flex>
                                            )}
                                            <CustomButton ml={"auto"} onClick={() => clickHander(item, item?.fundRaisers?.filter((item)=> isDateInPast(item?.endDate))[0]?.id)} text={"View"} px={"6"} borderRadius={"32px"} width={"fit-content"} height={"29px"} fontSize={"sm"} />
                                        </Flex>
                                        <DonationGraph item={item?.fundRaisers?.filter((item)=> isDateInPast(item?.endDate))[0]} />
                                        {(userId !== item?.user?.userId && !pasted) && (
                                            <DonationBtn item={item?.fundRaisers?.filter((item)=> isDateInPast(item?.endDate))[0]} user={item?.user} />
                                        )}
                                    </Flex>)
                                );
                            } else {
                                return (
                                    // <GridItem w={"full"} key={index} >
                                    // </GridItem>
                                    (<Flex w={"full"} height={"fit-content"} key={index} gap={"4"} pos={"relative"} flexDir={"column"} p={"4"} borderWidth={"1px"} borderColor={borderColor} rounded={"16px"} >
                                        <Flex w={"full"} pos={"relative"} alignItems={"center"} justifyContent={"space-between"} >
                                            <Flex as={"button"} w={"fit-content"} alignItems={"center"} onClick={() => router?.push(`/dashboard/profile/${item?.user?.userId}`)} gap={"3"} >
                                                <UserImage size={"45px"} font={"20px"} data={item?.user} image={item?.user?.data?.imgMain?.value} border={"1px"} />
                                                <Flex display={["block"]} flexDir={"column"} textAlign={"left"}  >
                                                    <Text color={"#233DF3"} fontSize={"14px"} fontWeight={"600"} >{textLimit(capitalizeFLetter(item?.user?.firstName) + " " + capitalizeFLetter(item?.user?.lastName), 15)}</Text>
                                                    <Text fontSize={"12px"} color={bodyTextColor} >{moment(item?.createdDate).fromNow()}</Text>
                                                </Flex>
                                            </Flex>
                                            <DeleteEvent donation={true} event={item} />
                                        </Flex>
                                        <Flex as={"button"} onClick={() => clickHander(item, item?.fundRaisers?.filter((item)=> isDateInPast(item?.endDate))[0]?.id)} w={'full'} h={"200px"} rounded={"8px"} >

                                            <BlurredImage height={["200px"]} image={item?.fundRaisers?.filter((item)=> isDateInPast(item?.endDate))[0]?.bannerImage} />
                                            {/* <Image rounded={"8px"} objectFit="cover" alt={item?.name} width={"full"} height={"full"} src={IMAGE_URL + item?.bannerImage} /> */}
                                        </Flex>
                                        <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                                            <Flex flexDir={"column"} >
                                                <Text fontSize={"14px"} color={bodyTextColor} >Fundraising Title</Text>
                                                <Text fontWeight={"700"} >{textLimit(capitalizeFLetter(item?.fundRaisers?.filter((item)=> isDateInPast(item?.endDate))[0]?.name), 35)}</Text>
                                            </Flex>
                                            <ShareEvent newbtn={true} showText={false} data={item?.fundRaisers?.filter((item)=> isDateInPast(item?.endDate))[0]} id={item?.fundRaisers?.filter((item)=> isDateInPast(item?.endDate))[0]?.id} type="EVENT" eventName={textLimit(item?.name, 17)} />
                                        </Flex>
                                        <Flex w={"full"} borderWidth={(item?.fundRaisers?.length > 1 && !creator && !pasted) ? "1px" : "0px"} borderColor={borderColor} rounded={"8px"} py={"7px"} px={"8px"} justifyContent={"space-between"} >
                                            {(item?.fundRaisers?.length > 1 && !creator && !pasted) && (
                                                <Flex gap={"1"} alignItems={"center"} >
                                                    <IoInformationCircleOutline />
                                                    <Text fontSize={"12px"} >{item?.fundRaisers?.filter((item)=> isDateInPast(item?.endDate))?.length} More fundraising available  </Text>
                                                </Flex>
                                            )}
                                            <CustomButton ml={"auto"} onClick={() => clickHander(item, item?.fundRaisers?.filter((item)=> isDateInPast(item?.endDate))[0]?.id)} text={"View"} px={"6"} borderRadius={"32px"} width={"fit-content"} height={"29px"} fontSize={"sm"} />
                                        </Flex>
                                        <DonationGraph item={item?.fundRaisers?.filter((item)=> isDateInPast(item?.endDate))[0]} />
                                        {(userId !== item?.user?.userId && !pasted) && (
                                            <DonationBtn item={item?.fundRaisers?.filter((item)=> isDateInPast(item?.endDate))[0]} user={item?.user}  />
                                        )}
                                    </Flex>)
                                );
                            }
                        })}
                    </Grid>
                </LoadingAnimation>
            )}
            <ModalLayout open={open} close={setOpen} size={"xl"} >
                <Flex flexDir={"column"} w={"full"} p={"5"} pt={"0px"} pos={"relative"} >
                    <Flex position={"relative"} zIndex={"50"} w={"full"} justifyContent={"space-between"} pt={"5"} pb={"2"} bgColor={mainBackgroundColor} pos={"sticky"} top={"0px"} gap={"3"} alignItems={"center"} >
                        <Flex flexDirection={"column"} >
                            <Text fontSize={"14px"} color={bodyTextColor} >Chasescroll Fundraising</Text>
                            <Text fontWeight={"600"} >Fundraising Available in {selected?.name}</Text>
                        </Flex>
                        <Flex as={"button"} onClick={() => setOpen(false)} >
                            <IoClose size="20px" color={bodyTextColor} />
                        </Flex>
                    </Flex>
                    <Flex mt={"6"} flexDirection={"column"} gap={"4"} >
                        <DonationGroupModal selectedData={selected} />
                    </Flex>
                </Flex>
            </ModalLayout>
        </Flex>)
    );
}