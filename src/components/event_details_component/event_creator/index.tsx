import AddOrRemoveUserBtn from '@/components/sharedComponent/add_remove_user_btn';
import ChatBtn from '@/components/sharedComponent/chat_btn';
import UserImage from '@/components/sharedComponent/userimage'
import { MessageIcon } from '@/components/svg';
import { useDetails } from '@/global-state/useUserDetails';
import { Box, Flex, Text } from '@chakra-ui/react'
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { TbMessage } from "react-icons/tb";

interface Props {
    data: any,
    convener: string,
    username: string,
    isOrganizer: any,
    dynamic?: boolean
}

function EventCreator(props: Props) {
    const {
        data,
        convener,
        username,
        isOrganizer,
        dynamic
    } = props

    const [isFriend, setisFriend] = useState(data?.createdBy?.joinStatus)

    const router = useRouter()
    const { userId: user_index } = useDetails((state) => state);

    const clickHandler =()=> { 
        if (!user_index) {
            router.push("/share/auth/login?type=EVENT&typeID=" + data?.id)
        } else { 
            router.push("/dashboard/profile/" + data?.createdBy?.userId)
        } 
    } 

    return (
        <Flex width={"full"} roundedBottom={"lg"} borderBottomWidth={"1px"} justifyContent={"space-between"} mt={"5"} pb={"2"} alignItems={"center"} >
            <Flex as={"button"} onClick={clickHandler} alignItems={"center"} gap={"2"} >
                <Box width={"fit-content"} >
                    <UserImage size={58} image={data?.createdBy?.data?.imgMain?.value} data={data?.createdBy} />
                </Box>
                <Box>
                    <Text fontWeight={"medium"} >{convener?.length > 10 ? convener?.slice(0, 10) + "..." : convener}</Text>
                    <Text textAlign={"left"} fontSize={"sm"} >{username}</Text>
                </Box>
            </Flex>
            {!dynamic && (
                <> 
                    {!isOrganizer && (
                        <Flex alignItems={"center"} gap={"2"} >
                            <AddOrRemoveUserBtn icon={true} name={(isFriend === "FRIEND_REQUEST_RECIEVED" || isFriend === "FRIEND_REQUEST_SENT" || isFriend === "CONNECTED" || isFriend === "CONNECTFriend") ? isFriend === "FRIEND_REQUEST_SENT" ? "Pending" : isFriend === "CONNECTFriend" ? "Disconnect" : "Disconnect" : "Connect"} setJoinStatus={setisFriend} user_index={data?.createdBy?.userId} />

                            <ChatBtn profile={data} userId={data?.createdBy?.userId} />
                        </Flex>
                    )}
                </>
            )}
        </Flex>
    )
}

export default EventCreator
