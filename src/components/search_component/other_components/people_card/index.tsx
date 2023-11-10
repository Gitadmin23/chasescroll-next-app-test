import CustomButton from '@/components/general/Button'
import AddOrRemoveUserBtn from '@/components/sharedComponent/add_remove_user_btn'
import UserImage from '@/components/sharedComponent/userimage'
import { Box, Flex, Text, border } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'

interface Props {
    person: any,
    index?: any,
    search?: boolean,
    profile?: boolean,
    connects?: boolean,
    request?: boolean,
    refund?: boolean,
    block?: boolean
}

function PeopleCard(props: Props) {
    const {
        person,
        index,
        search,
        profile,
        request,
        connects
    } = props

    const [isFriend, setisFriend] = React.useState(person?.joinStatus)
    const [isFriend, setisFriend] = React.useState(person?.joinStatus)
    const router = useRouter()

    console.log(person);


    return (
        <Flex as={"button"} onClick={() => router.replace("/dashboard/profile/" + person?.userId)} _hover={{ backgroundColor: "#f1f2ff" }} px={"2"} width={"full"} justifyContent={"space-between"} alignItems={"center"} py={"4"} borderBottomWidth={"1px"} >
            <Flex width={["60vw", "fit-content"]} gap={"2"} alignItems={"center"} >
                <Box>
                    <UserImage fontWeight={"semibold"} border={search ? "1px" : "5px"} data={person} size={search ? "32px" : 50} font={search ? "[16px]" : '[30px]'} />
                </Box>
                <Box>
                    <Text fontSize={request ? "14px" : search ? "14px" : "15px"} fontWeight={"medium"} >{(person?.firstName + " " + person?.lastName)?.length > 15 ? (person?.firstName + " " + person?.lastName)?.slice(0, 15) + "..." : (person?.firstName + " " + person?.lastName)}</Text>
                    <Text textAlign={"start"} fontSize={search ? "10px" : "12px"} fontWeight={search ? "medium" : "semibold"} color={"brand.chasescrollTextGrey2"} >@{person?.username?.length > 15 ? person?.username?.slice(0, 15) + "..." : person?.username}</Text>
                    <Text fontSize={request ? "14px" : search ? "14px" : "15px"} fontWeight={"medium"} >{(person?.firstName + " " + person?.lastName)?.length > 15 ? (person?.firstName + " " + person?.lastName)?.slice(0, 15) + "..." : (person?.firstName + " " + person?.lastName)}</Text>
                    <Text textAlign={"start"} fontSize={search ? "10px" : "12px"} fontWeight={search ? "medium" : "semibold"} color={"brand.chasescrollTextGrey2"} >@{person?.username?.length > 15 ? person?.username?.slice(0, 15) + "..." : person?.username}</Text>
                </Box>
            </Flex>
            {isFriend !== "SELF" && (
                <AddOrRemoveUserBtn index={index} connects={connects} request={request} profile={profile} search={search} width={request ? "85px" : search ? "85px" : '120px'} name={isFriend === "FRIEND_REQUEST_SENT" ? "Pending" : isFriend === "CONNECTED" ? "Disconnect" : "Connect"} setJoinStatus={setisFriend} user_index={person?.userId} />
            )}
        </Flex>
    )
}

export default PeopleCard
