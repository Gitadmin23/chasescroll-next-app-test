import AddOrRemoveUserBtn from '@/components/sharedComponent/add_remove_user_btn';
import BlockBtn from '@/components/sharedComponent/blockbtn';
import LoadingAnimation from '@/components/sharedComponent/loading_animation';
import ShareEvent from '@/components/sharedComponent/share_event';
import { useDetails } from '@/global-state/useUserDetails';
import { IMAGE_URL, URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { IoMdSettings } from 'react-icons/io';
import { useQuery } from 'react-query';

interface Props {
    user_index: string
}

function ProfileImage(props: Props) {
    const {
        user_index
    } = props

    const toast = useToast()
    const [data, setData] = React.useState([] as any)
    const [showModal, setShowModal] = React.useState(false)
    const [isFriend, setisFriend] = useState(data?.joinStatus)
    const router = useRouter()

    const { userId } = useDetails((state) => state);

    // react query
    const { isLoading, isRefetching } = useQuery(['get-user-info'], () => httpService.get(URLS.GET_USER_DETAILS + "/" + user_index), {
        onError: (error: any) => {
            toast({
                status: "error",
                title: error.response?.data,
            });
        },
        onSuccess: (data) => {
            console.log(data?.data);

            setData(data?.data);
        }
    })

    const clickHandler = () => {
        if (userId === user_index) {
            router.replace("/dashboard/settings")
        } else {
            setShowModal((prev) => !prev)
        }
    }

    return (
        <LoadingAnimation loading={isLoading} >
            <Box position={"relative"} bg={"gray.500"} height={"442px"} >
                {data?.data?.imgMain?.value && (
                    <Image id='img_blur' objectFit={"cover"} backdropFilter={"blur(10px)"} width={"full"} height={"full"} position={"absolute"} zIndex={"10"} inset={"0px"} src={IMAGE_URL + data?.data?.imgMain?.value} alt='profile' />
                )}  
                {data?.data?.imgMain?.value && (
                    <Box />
                )}
                <Box position={"relative"} zIndex={"10"} width={"fit-content"} pt={"8"} ml={"auto"} mr={"9"} >
                    {userId !== user_index && (
                        <Flex as={"button"} onClick={() => clickHandler()} bgColor={"#FFFFFF66"} width={"32px"} rounded={"full"} height={"32px"} justifyContent={"center"} alignItems={"center"} >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 5.25C8.58579 5.25 8.25 5.58579 8.25 6C8.25 6.41421 8.58579 6.75 9 6.75H15C15.4142 6.75 15.75 6.41421 15.75 6C15.75 5.58579 15.4142 5.25 15 5.25H9Z" fill="white" />
                                <path d="M5 11.25C4.58579 11.25 4.25 11.5858 4.25 12C4.25 12.4142 4.58579 12.75 5 12.75H19C19.4142 12.75 19.75 12.4142 19.75 12C19.75 11.5858 19.4142 11.25 19 11.25H5Z" fill="white" />
                                <path d="M9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z" fill="white" />
                            </svg>
                        </Flex>
                    )}
                    {userId === user_index && (
                        <Flex as={"button"} onClick={() => clickHandler()} bgColor={"#FFFFFF66"} width={"32px"} rounded={"full"} height={"32px"} justifyContent={"center"} alignItems={"center"} >
                            <IoMdSettings size="25px" fontSize='30px' color='white' />
                        </Flex>
                    )}
                    {showModal && (
                        <Box width={"127px"} zIndex={"20"} position={"absolute"} top={"70px"} right={"0px"} shadow={"lg"} bg={"white"} rounded={"16px"} >
                            <Flex width={"full"} justifyContent={"center"} borderBottomColor={"#0000001F"} borderBottomWidth={"1px"} py={"2"} >
                                <BlockBtn isprofile={true} user_index={user_index} />
                            </Flex>
                            <Flex width={"full"} justifyContent={"center"} borderBottomWidth={"1px"} py={"2"} >
                                <ShareEvent isprofile={true} istext={true} id={user_index} />
                            </Flex>
                            <Flex onClick={() => setShowModal((prev) => !prev)} color={"#E90303"} as={"button"} width={"full"} justifyContent={"center"} borderBottomWidth={"0px"} py={"2"} >
                                <Text>Cancel</Text>
                            </Flex>
                        </Box>
                    )}
                    {showModal && (
                        <Box onClick={() => setShowModal((prev) => !prev)} inset={"0px"} position={"fixed"} zIndex={"10"} bg={"black"} opacity={"0.3"} />
                    )}
                </Box>
                <Flex zIndex={"20"} width={"full"} bottom={"0px"} insetX={"0px"} bg={"#00000099"} px={["6", "6", "9"]} height={"150px"} justifyContent={"space-between"} position={"absolute"} alignItems={"center"} >
                    <Box color={"white"} >
                        <Text fontSize={"24px"} fontWeight={"bold"} >{data?.firstName + " " + data?.lastName}</Text>
                        <Text fontSize={"sm"} >{data?.email}</Text>
                    </Box>
                    {userId === user_index && (
                        <ShareEvent isprofile={true} id={user_index} />
                    )}

                    {userId !== user_index && (
                        <Flex>
                            <AddOrRemoveUserBtn profile={true} name={(isFriend === "FRIEND_REQUEST_RECIEVED" || isFriend === "FRIEND_REQUEST_SENT" || isFriend === "CONNECTED" || isFriend === "CONNECTFriend") ? isFriend === "FRIEND_REQUEST_SENT" ? "Pending" : isFriend === "CONNECTFriend" ? "Disconnect" : "Disconnect" : "Connect"} setJoinStatus={setisFriend} user_index={userId} />
                        </Flex>
                    )}
                </Flex>
            </Box>
        </LoadingAnimation>
    )
}

export default ProfileImage
