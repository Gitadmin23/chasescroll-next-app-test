import CustomText from '@/components/general/Text'
import { HStack, VStack, Button, InputGroup, InputLeftElement, Input, Box, Avatar, useToast, Spinner, Image } from '@chakra-ui/react'
import { IoMdSearch } from 'react-icons/io'
import React from 'react'
import { THEME } from '@/theme'
import SidebarCard from './SidebarCard'
import { useDetails } from '@/global-state/useUserDetails'
import { useMutation, useQuery } from 'react-query'
import httpService from '@/utils/httpService'
import { IMAGE_URL, URLS } from '@/services/urls'
import { Chat } from '@/models/Chat'
import { PaginatedResponse } from '@/models/PaginatedResponse'
import useDebounce from '@/hooks/useDebounce'
import { useChatPageState } from './state'
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchNormal1 } from 'iconsax-react'
import { IUser } from '@/models/User'
import { uniq } from 'lodash'
import UserImage from '../sharedComponent/userimage'


const ARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const OnlineUser = ({ id, index }: { id: string, index: number }) => {
    const { setAll } = useChatPageState((state) => state)
    const [user, setUser] = React.useState<IUser|null>(null);
    const { isLoading, isError } =  useQuery(['getOnlineUserProfile', id], () => httpService.get(`${URLS.GET_PUBLIC_PROIFLE}/${id}`), {
        onSuccess: (data) => {
            setUser(data?.data);
            console.log(data.data);
        },
        onError: () => {},
    })

    // mutations
    const createChat = useMutation({
        mutationFn: () => httpService.post(`${URLS.CREATE_CHAT}`, {
            "type": "ONE_TO_ONE",
            "typeID": user?.userId,
            users: [
                user?.userId
            ]
          }),
          onSuccess: (data) => {
            setAll({ activeChat: data?.data, messages: [], pageNumber: 0, activeMessageId: undefined });
          },
          onError: () => {}
    });

    return (
        <Box onClick={() => createChat.isLoading ? null: createChat.mutate()} cursor='pointer' width={'45px'} height='45px' position={'relative'} >
            <Box width={'10px'} height={'10px'} borderRadius={'5px'} bg='brand.chasescrollButtonBlue' position={'absolute'} right='0px' top="-2px" />
            { isLoading && (
                <HStack justifyContent={'center'} alignItems={'center'} width='45px' height='45px' >
                    <Spinner />
                </HStack>
            ) }
             { !isLoading && (
                <HStack spacing={0} justifyContent={'center'} alignItems={'center'} width='45px' height='45px' >
                    <UserImage size={"40px"} border={"2px"} font={"16px"} data={user} image={user?.data?.imgMain?.value} />
                </HStack>
            ) }
        </Box>
    )
}

function Sidebar() {
    const [chats, setChats] = React.useState<Chat[]>([])
    const [onlineUsers, setOnlineUsers] = React.useState<string[]>([])
    const [search, setSearch] = React.useState('');
    const [last, setLast] = React.useState(false);
    const [page, setPage] = React.useState(0);

    const intObserver = React.useRef<IntersectionObserver>();
    const query = useSearchParams();


    const router = useRouter();
    const toast = useToast();
    const debounceValue = useDebounce(search);
    const { userId } = useDetails((state) => state);
    const { setAll, chatsIds } = useChatPageState((state) => state);
    const getonlineUsers = useQuery(['onlineUser', userId], () => httpService.get(`${URLS.ONLINE_USERS}`), {
        
        onSuccess: (data) => {
            const item: string[] = data.data;
            console.log(item);
            setOnlineUsers(prev =>  uniq(item.filter((item) => !chatsIds.includes(item)) ));
        },
        onError: (error) => { },
    }) 
    
    const { isLoading, isError, } = useQuery(['getChats', userId], () => httpService.get(`${URLS.GET_CHATS}`, {
        params: {
            page: 0,
            searchText: debounceValue,
            size: 20,
        }
    }), {
        onSuccess: (data) => {
            const item: PaginatedResponse<Chat> = data.data;
            setLast(item.last);
            setChats(item.content);
            console.log(item.content[0]);
            //setAll({ chatsIds: item.content.map((itemm) => itemm?.otherUser?.userId )});
        }
    });

    React.useEffect(() => {
        const activeID = query?.get('activeID');
        if (activeID && chats.length > 0) {
            const activeChat = chats.filter((item) => item.id === activeID);
            if (activeChat.length > 0) {
                setAll({ activeChat: activeChat[0] })
            }
        }
    }, [chats, query, setAll])

    const lastChildRef = React.useCallback((post: any) => {
        if (isLoading) return;
        if (intObserver.current) intObserver.current.disconnect();
        intObserver.current = new IntersectionObserver((posts) => {
            if (posts[0].isIntersecting && last) {
                setPage(prev => prev + 1);
            }
        });
        if (post) intObserver.current.observe(post);
    }, [isLoading, last, setPage]);
    return (
        <VStack width='100%' height={'100%'} paddingX={'0px'}>

            <VStack width={'100%'} paddingX={'10px'}>

                {/* ONLINE USERS */}
                {
                    !getonlineUsers.isLoading && !getonlineUsers.isError && onlineUsers.length > 0 && (
                        <VStack width='100%' height={'120px'} paddingBottom={'10px'} alignItems={'flex-start'} borderBottomWidth={'1px'} borderBottomColor={'lightgrey'} paddingTop={'10px'}>

                            <Box width='100%' height={'100%'} overflowX={'auto'} display={'flex'} gap={"1"} paddingTop={'10px'} >
                                {onlineUsers.map((item, index) => (
                                    <OnlineUser id={item} index={index} key={index.toString()} /> 
                                ))}
                            </Box>
                            <CustomText fontFamily={'Satoshi-Medium'} fontSize={'14px'}>Users Online</CustomText>
                        </VStack>
                    )
                }

                <HStack width={'100%'} height={'60px'} justifyContent={'space-between'}>

                    <HStack alignItems={'center'}>
                        <CustomText fontFamily={'DM-Medium'} fontSize={'3xl'}>Chats</CustomText>
                    </HStack>

                    {/* <Button onClick={() => router.push('/dashboard/chats/create')} variant={'unstyled'} width='120px' height={'30px'} borderWidth={'1px'} borderRadius={'20px'} borderColor={'brand.chasescrollButtonBlue'} color='brand.chasescrollButtonBlue' >
                        Create Group
                    </Button> */}

                </HStack>

                {/* SEARCH BAR */}
                <InputGroup>
                    <InputLeftElement>
                        <SearchNormal1 size='25px' color={THEME.COLORS.chasescrollButtonBlue} />
                    </InputLeftElement>
                    <Input width='100%' height={'45px'} placeholder='search message' borderRadius={'10'} borderWidth={'1px'} borderColor={'lightgrey'} bg='whitesmoke' />
                </InputGroup>
            </VStack>

            {/* CHATS */}
            {
                !isLoading && !isError && chats.length > 0 && (
                    <Box width={'100%'} height={'100%'} overflowY={'auto'} paddingBottom={'100px'}>
                        {
                            !isLoading && !isError && chats.length > 0 && chats.sort((a: Chat, b: Chat) => {
                                if (a.lastModifiedDate > b.lastModifiedDate) {
                                    return -1
                                } else {
                                    return 1
                                }
                                return 0
                            }).map((item, index) => {
                                if (index === chats.length - 1) {
                                    return <SidebarCard ref={lastChildRef} key={index.toString()} chat={item} />
                                } else {
                                    return <SidebarCard key={index.toString()} chat={item} />
                                }
                            })
                        }
                    </Box>
                )
            }

            {
                !isLoading && !isError && chats.length < 1 && (
                    <HStack width={'100%'} height='50px' justifyContent={'center'} alignItems={'center'}>
                        <CustomText fontFamily={'Satoshi-Medium'} fontSize={'18'} textAlign={'center'}>You do not have any active chat</CustomText>
                    </HStack>
                )
            }

            {
                !isLoading && isError && (
                    <HStack width={'100%'} height='50px' justifyContent={'center'} alignItems={'center'}>
                        <CustomText fontFamily={'Satoshi-Medium'} fontSize={'18'} textAlign={'center'}>An errorr occured</CustomText>
                    </HStack>
                )
            }

        </VStack>
    )
}

export default Sidebar