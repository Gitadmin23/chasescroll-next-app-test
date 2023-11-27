import { ShareType } from '@/app/share/page';
import CustomButton from '@/components/general/Button';
import LoadingAnimation from '@/components/sharedComponent/loading_animation';
import UserImage from '@/components/sharedComponent/userimage';
import { useDetails } from '@/global-state/useUserDetails';
import useDebounce from '@/hooks/useDebounce';
import { Chat } from '@/models/Chat';
import { IUser } from '@/models/User';
import { URLS, WEBSITE_URL } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Avatar, Box, Button, Checkbox, HStack, Heading, Input, InputGroup, InputLeftElement, Spinner, Text, VStack, useToast } from '@chakra-ui/react'
import React from 'react'
import { FiSearch } from 'react-icons/fi';
import { useMutation, useQuery } from 'react-query';

interface Props { }

const UserCard = (props: IUser & { checked: boolean, handleCheck: (e: string) => void }) => {
    const { username, userId, data: { imgMain: { value: imgMain } }, firstName, lastName } = props;
    return (
        <HStack width='100%' height={'60px'} justifyContent={'space-between'} paddingX='20px'>
            <HStack>
                <UserImage data={props} image={props?.data?.imgMain?.value} size={"40px"} border={"2px"} font={"20px"}  />
                {/* <Avatar src={`${CONFIG.RESOURCE_URL}${imgMain}`} size='sm' name={`${firstName} ${lastName}`} /> */}
                <VStack alignItems={'flex-start'} spacing={0}>
                    <Heading fontSize={'16px'} color='black'>{firstName || ''} {lastName || ''}</Heading>
                    <Text color='grey' fontSize={'14px'}>@{username || ''}</Text>
                </VStack>
            </HStack>

            <Checkbox isChecked={props.checked} onChange={(e) => props.handleCheck(userId)} />
        </HStack>
    )
}

function SendMesageModal({ onClose, id, isprofile, type }: { 
    onClose: () => void,
    id: string,
    isprofile?: boolean,
    type: ShareType
}) {

    const [search, setSearch] = React.useState('');
    const searchText = useDebounce(search, 1000);
    const [users, setUsers] = React.useState<IUser[]>([]);
    const [userIds, setUserIds] = React.useState<string[]>([]);

    const { userId } = useDetails((state) => state);
    const toast = useToast()

    const { isLoading, isError } = useQuery(['getUserFriends', searchText, userId], () => httpService.get(`/user/get-users-connections/${userId}`, {
        params: {
            searchText
        }
    }), {
        onSuccess: (data) => {
            setUsers(data?.data.content);
        }
    });

    const { isLoading: chatCreationLoading, mutate } = useMutation({
        mutationFn: (data: any) => httpService.post(`/chat/chat`, data),
        onSuccess: (data) => {
            const chat = data?.data as Chat;
            const obj = {
                message: type === "EVENT" ? `${WEBSITE_URL}/event/${id}` : `${WEBSITE_URL}/share?type=${type}&typeID=${id}`,
                chatID: chat?.id,
            }
            sendMessage.mutate(obj)
        }

    });

    const sendMessage = useMutation({
        mutationFn: (data: any) => httpService.post(`/chat/message`, data),
        onSuccess: () => {   
            toast({
                title: 'Success',
                description: 'Message Sent',
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        }
    });

    const handleShare = () => {
        userIds.forEach((idd) => {
            mutate({
                type: 'ONE_TO_ONE',
                typeID: userId,
                name: idd,
                users: [
                    idd
                ]
            });
        })
    }

    const handleCheck = (iem: string) => {
        if (userIds.includes(iem)) {
            setUserIds(userIds.filter((id) => id !== iem));
        } else {
            setUserIds([...userIds, iem]);
        }
    }
    return (
        <Box width={"full"} >
            <InputGroup marginY='20px' borderLeftWidth={'0px'} borderRightWidth={'0px'} borderRadius={'0px'} borderTopWidth='0.5px' borderBottomWidth={'0.5px'} borderTopColor={'lightgrey'} borderBottomColor='lightgrey' >
                <InputLeftElement>
                    <FiSearch color='grey' fontSize='20px' />
                </InputLeftElement>
                <Input value={search} onChange={(e) => setSearch(e.target.value)} borderWidth={'0px'} borderRadius={'10px'} />
            </InputGroup>

            <Box width='100%' height='220px' overflowY='auto'>
                {/* {
                    isLoading && (
                        <VStack width='100%' justifyContent={'center'} alignItems={'center'}>
                            <Spinner size='md' colorScheme='blue' />
                        </VStack>
                    )
                }
                {!isLoading && !isError && users.length > 0 &&
                    {
                    !isLoading && isError && (
                <Text> An error occured while getting your friends list.</Text>
                )
                } */}
                <LoadingAnimation loading={isLoading} >
                    {users.map((item, index) => (
                        <UserCard {...item} checked={userIds.includes(item.userId)} handleCheck={(e) => handleCheck(e)} key={index.toString()} />
                    ))}
                </LoadingAnimation>
            </Box>
            <Box paddingX={'20px'} shadow='lg' bg='white' paddingTop={'20px'} zIndex={10} paddingBottom={'20px'} borderTopWidth={'0.5px'} borderTopColor={'lightgrey'}>
                <CustomButton text='Share' onClick={handleShare} disable={userIds.length === 0} isLoading={chatCreationLoading || sendMessage.isLoading} width='100%' height='50px' bg='brand.chasescrollButtonBlue' color={'white'} />
            </Box>
        </Box>
    )
}

export default SendMesageModal
