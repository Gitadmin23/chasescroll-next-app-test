import { IEventType } from '@/models/Event'
import { Box, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import UserImage from '../sharedComponent/userimage'
import { usePathname, useRouter } from 'next/navigation'
import { useDetails } from '@/global-state/useUserDetails'
import { formatNumberWithK } from '@/utils/formatNumberWithK'
import ModalLayout from '../sharedComponent/modal_layout'
import Chatcollaborator from './chatcollaborator'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import { textLimit } from '@/utils/textlimit'
import ChatBtn from '../sharedComponent/chat_btn'
import AddOrRemoveUserBtn from '../sharedComponent/add_remove_user_btn'
import CollaboratorBtn from '../create_event_component/event_ticket/collaborators'

export default function EventCreator(props: IEventType) {

    const {
        collaborators,
        admins,
        createdBy,
        id
    } = props

    const [isFriend, setisFriend] = useState(createdBy?.joinStatus)

    const [open, setOpen] = useState(false)

    const router = useRouter()
    const { userId: user_index } = useDetails((state) => state);

    const pathname = usePathname();

    const clickHandler = () => {
        if (!user_index) {
            router.push("/share/auth/login?type=EVENT&typeID=" + id)
        } else {
            router.push("/dashboard/profile/" + createdBy?.userId)
        }
    }


    return (
        <Flex w={"full"} bgColor={"#FAFAFF"} rounded={"64px"} alignItems={"center"} h={"86px"} px={"4"} py={"3"} >
            <Flex position={"relative"} border={"0px solid #CDD3FD"} rounded={"full"} alignItems={"center"} gap={"3"} >
                <Flex width={"fit-content"} position={"relative"} >
                    <UserImage border={"1px"} size={"50px"} font={"16px"} image={createdBy?.data?.imgMain?.value} data={createdBy} />
                    {(collaborators || admins) && (
                        <>
                            {(collaborators?.length !== 0 || admins?.length !== 0) && (
                                <Box role='button' onClick={() => setOpen(true)} top={"0px"} roundedBottom={"64px"} border={"2px solid #5D70F9"} width={"50px"} fontWeight={"bold"} height={"50px"} fontSize={"15px"} pr={"-3px"} pb={"-2px"} roundedTopLeft={"64px"} ml={"-20px"} display={'flex'} bgColor={"#FFF"} color={"#5D70F9"} justifyContent={"center"} alignItems={"center"} >
                                    {"+" + formatNumberWithK(((admins ? admins?.length : 0) + (collaborators ? collaborators?.length : 0)))}
                                </Box>
                            )}
                        </>
                    )}
                </Flex>
                <Box as={"button"} onClick={clickHandler} >
                    <Text textAlign={"left"} display={["none", "block"]} fontWeight={"medium"} >{capitalizeFLetter(createdBy?.firstName) + " " + capitalizeFLetter(createdBy?.lastName)}</Text>
                    <Text textAlign={"left"} display={["block", "none"]} fontWeight={"medium"} fontSize={"14px"} >{textLimit(capitalizeFLetter(createdBy?.firstName) + " " + capitalizeFLetter(createdBy?.lastName), 15)}</Text>
                    <Text textAlign={"left"} mt={"-2px"} fontSize={["13px", "13px", "sm"]} >{createdBy?.username?.includes("@gmail") ? textLimit(createdBy?.username, 4) : createdBy?.username}</Text>
                </Box>
            </Flex>
            <Flex rounded={"64px"} h={"47px"} ml={"auto"} bgColor={"white"} p={"12px"} style={{ boxShadow: "0px 20px 70px 0px #C2C2C21A" }} >
                {createdBy?.userId !== user_index ? (
                    <Flex color={"#5465E0"} rounded={"32px"} justifyContent={"center"} alignItems={"center"} gap={"8"} py={"8px"} px={"16px"} >
                        <ChatBtn userId={createdBy?.userId ?? ""} />
                        <AddOrRemoveUserBtn icon={true} name={(isFriend === "FRIEND_REQUEST_RECIEVED" || isFriend === "FRIEND_REQUEST_SENT" || isFriend === "CONNECTED" || isFriend === "CONNECTFriend") ? isFriend === "FRIEND_REQUEST_SENT" ? "Pending" : isFriend === "CONNECTFriend" ? "Disconnect" : "Disconnect" : "Connect"} setJoinStatus={setisFriend} user_index={createdBy?.userId} />
                    </Flex>
                ) :
                    (
                        <>

                            {((collaborators || admins) && !pathname?.includes("pastdetails")) && (
                                <CollaboratorBtn collaborate={collaborators?.length !== 0 || admins?.length !== 0} btn={true} data={props} />
                            )}
                        </>
                    )
                }
            </Flex>

            <ModalLayout open={open} close={setOpen} title='Event Organizers' >
                <Chatcollaborator admins={admins} collaborators={collaborators} />
            </ModalLayout>
        </Flex>
    )
}