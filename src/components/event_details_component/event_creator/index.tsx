import AddOrRemoveUserBtn from '@/components/sharedComponent/add_remove_user_btn';
import ChatBtn from '@/components/sharedComponent/chat_btn';
import UserImage from '@/components/sharedComponent/userimage'
import { MessageIcon } from '@/components/svg';
import { useDetails } from '@/global-state/useUserDetails';
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { TbMessage } from "react-icons/tb";
import EventQrCode from '../event_qrcode';
import { IEventType } from '@/models/Event';
import { formatNumberWithK } from '@/utils/formatNumberWithK';
import ModalLayout from '@/components/sharedComponent/modal_layout';
import Chatcollaborator from './chatcollaborator';
import CollaboratorBtn from '@/components/create_event_component/event_ticket/collaborators';
import { CreateEvent } from '@/global-state/useCreateEventState';

interface Props {
    data: CreateEvent,
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

    const [open, setOpen] = useState(false)

    const router = useRouter()
    const { userId: user_index } = useDetails((state) => state);

    const clickHandler = () => {
        if (!user_index) {
            router.push("/share/auth/login?type=EVENT&typeID=" + data?.id)
        } else {
            router.push("/dashboard/profile/" + data?.createdBy?.userId)
        }
    }

    return (
        <Flex flexDir={"column"} gap={"4"} w={"full"} >
            <Flex width={"full"} rounded={"8px"} borderWidth={["1px", "1px", "0px"]} borderBottomWidth={["1px", "1px", "0.5px"]} borderColor={["#B6B6B6", "#B6B6B6", "rgba(0, 0, 0, 0.50)"]} borderBottomColor={["#B6B6B6", "#B6B6B6", "rgba(0, 0, 0, 0.50)"]} justifyContent={"space-between"} mt={"5"} px={["8px", "8px", "0px"]} py={"8px"} alignItems={"center"} >
                <Flex position={"relative"} border={"0px solid #CDD3FD"} rounded={"full"} p={"3"} alignItems={"center"} gap={"3"} >
                    <Flex width={"fit-content"} position={"relative"} >
                        <UserImage size={"42px"} image={data?.createdBy?.data?.imgMain?.value} data={data?.createdBy} />
                        {(data?.collaborators || data?.admins) && (
                            <>
                                {(data?.collaborators?.length !== 0 || data?.admins?.length !== 0) && (
                                    <Box role='button' onClick={() => setOpen(true)} top={"0px"} roundedBottom={"64px"} border={"2px solid #5D70F9"} width={"42px"} fontWeight={"bold"} height={"42px"} fontSize={"15px"} pr={"-3px"} pb={"-2px"} roundedTopLeft={"64px"} ml={"-30px"} display={'flex'} bgColor={"#FFF"} color={"#5D70F9"} justifyContent={"center"} alignItems={"center"} >
                                        {"+" + formatNumberWithK(((data?.admins ? data?.admins?.length : 0) + (data?.collaborators ? data?.collaborators?.length : 0)))}
                                    </Box>
                                )}
                            </>
                        )}
                    </Flex>
                    <Box as={"button"} onClick={clickHandler} >
                        <Text textAlign={"left"} display={["none", "block"]} fontWeight={"medium"} >{convener}</Text>
                        <Text textAlign={"left"} display={["block", "none"]} fontWeight={"medium"} >{convener?.length > 10 ? convener?.slice(0, 10) + "..." : convener}</Text>
                        <Text textAlign={"left"} fontSize={"sm"} >{username}</Text>
                    </Box>
                    {isOrganizer && (
                        <Box display={["block"]} >
                            {(data?.collaborators || data?.admins) && (
                                <CollaboratorBtn collaborate={data?.collaborators?.length !== 0 || data?.admins?.length !== 0} btn={true} data={data} />
                            )}
                        </Box>
                    )}
                </Flex>
                {!dynamic && (
                    <Box display={["none", "none", "block"]} >
                        {!isOrganizer && (
                            <Flex border={"1px solid #E8E8E8"} rounded={"32px"} gap={"8"} py={"8px"} px={"16px"}  >
                                <AddOrRemoveUserBtn icon={true} name={(isFriend === "FRIEND_REQUEST_RECIEVED" || isFriend === "FRIEND_REQUEST_SENT" || isFriend === "CONNECTED" || isFriend === "CONNECTFriend") ? isFriend === "FRIEND_REQUEST_SENT" ? "Pending" : isFriend === "CONNECTFriend" ? "Disconnect" : "Disconnect" : "Connect"} setJoinStatus={setisFriend} user_index={data?.createdBy?.userId} />

                                <ChatBtn profile={data} userId={data?.createdBy?.userId ?? ""} />
                            </Flex>
                        )}
                    </Box>
                )}
                <ModalLayout open={open} close={setOpen} title='Event Organizers' >
                    <Chatcollaborator admins={data?.admins} collaborators={data?.collaborators} />
                </ModalLayout>
            </Flex>
            <Flex display={["flex", "flex", "none"]} w={"full"} alignItems={"center"} justifyContent={"end"} >
                <Flex display={["flex", "flex", "none"]} border={"1px solid #E8E8E8"} ml={"auto"} rounded={"32px"} gap={"8"} py={"8px"} px={"16px"} >
                    {!dynamic && (
                        <>
                            {!isOrganizer && (
                                <AddOrRemoveUserBtn icon={true} name={(isFriend === "FRIEND_REQUEST_RECIEVED" || isFriend === "FRIEND_REQUEST_SENT" || isFriend === "CONNECTED" || isFriend === "CONNECTFriend") ? isFriend === "FRIEND_REQUEST_SENT" ? "Pending" : isFriend === "CONNECTFriend" ? "Disconnect" : "Disconnect" : "Connect"} setJoinStatus={setisFriend} user_index={data?.createdBy?.userId} />
                            )}
                        </>
                    )}
                    <EventQrCode notext={true} data={data} id={data?.id} />

                    {!dynamic && (
                        <>
                            {!isOrganizer && (
                                <ChatBtn profile={data} userId={data?.createdBy?.userId ?? ""} />
                            )}
                        </>
                    )}
                </Flex>
            </Flex>
            <ModalLayout open={open} close={setOpen} title='Event Organizers' >
                <Chatcollaborator admins={data?.admins} collaborators={data?.collaborators} />
            </ModalLayout>
        </Flex>
    )
}

export default EventCreator
