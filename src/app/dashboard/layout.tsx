"use client";

import { Avatar, Box, Flex, Grid, HStack, VStack, useToast, Image } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import CustomText from '@/components/general/Text';
import '../globals.css'
// import { BellIcon, HomeIcon, MessageIcon, ProfileIcon2, SearchIcon, UsersIcon } from "../../../public/assets/svg";
import { FiBell, FiPlusSquare, FiMessageCircle, FiHome, FiSearch, FiCalendar, FiUsers, FiPower, FiUser } from 'react-icons/fi';
import { THEME } from '@/theme';
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link';
import ThreadCard from '@/components/home/ThreadCard';
import Sidebar from './sidebar';
import { useDetails } from '@/global-state/useUserDetails';
import { useMutation, useQuery } from 'react-query';
import httpService from '@/utils/httpService';
import { IMAGE_URL, URLS } from '@/services/urls';
import SearchBar from '@/components/explore_component/searchbar';
import NotificationBar from '@/components/navbar/notification';
import { Notification, Message, AddSquare, SearchNormal1, Calendar, People, Home } from 'iconsax-react'
import { HomeIcon, UsersIcon } from '@/components/svg';
type IRoute = {
    icon: ReactNode;
    text: string;
    route: string;
}

const MenuItem = ({
    icon,
    text,
    active,
    route,
}: {
    icon: any,
    text: string;
    active: boolean;
    route: string;
}) => {
    return (
        <Link href={route} style={{ width: '100%' }}>
            <HStack paddingX={['20px', '40px']} color={active ? 'brand.chasescrollBlue' : 'grey'} width='100%' height='80px' alignItems={'center'}>
                {icon}
                <CustomText fontSize={'18px'}>{text}</CustomText>
            </HStack>
        </Link>
    )
}

function Layout({ children }: {
    children: ReactNode
}) {
    const [id, setId] = React.useState<string | null>(null);
    const pathname = usePathname();
    const router = useRouter();
    const toast = useToast();

    const { username, lastName, firstName, userId, setAll, user } = useDetails((state) => state);

    const getUserDetails = useQuery(['getDetails', id], () => httpService.get(`${URLS.USER_PRIVATE_PROFILE}`), {
        enabled: id !== null,
        onSuccess: (data) => {
            console.log(data.data);
            setAll({ 
                user: data?.data, 
                userId: data?.data?.userId,
                firstName: data?.data?.firstName,
                lastName: data?.data?.lastName,
                email: data?.data?.email,
                dob: data?.data?.dob,
                username: data?.data?.username,
            });
        },
        onError: (error) => {
            console.log(error);
            toast({
                title: 'Error',
                description: 'An error occured while updating your profile',
                status: 'error',
                position: 'top-right',
                isClosable: true,
                duration: 3000,
            });
        },
    });

    React.useEffect(() => {
        const Id = localStorage.getItem('user_id');
        if (Id === null) {
            router.push('/auth')
        } else {
            setId(Id as string);
            setAll({ userId: Id });
        }
    }, [router, setAll]);

    const logout = () => {
        
    }

    const routes: IRoute[] = [
        {
            route: '/dashboard/home',
            icon: <FiHome fontSize='30px' />,
            text: 'Home'
        },
        {
            route: '/dashboard/explore',
            icon: <FiSearch fontSize='30px' />,
            text: 'Explore'
        },
        {
            route: '/dashboard/event',
            icon: <FiCalendar fontSize='30px' />,
            text: 'Events'
        },
        {
            route: '/dashboard/chats',
            icon: <FiMessageCircle fontSize='30px' />,
            text: 'Chats'
        },
        {
            route: '/dashboard/community',
            icon: <FiUsers fontSize='30px' />,
            text: 'Community'
        },
        {
            route: `/dashboard/profile/${userId}`,
            icon: <FiUser fontSize='30px' />,
            text: 'Profile'
        }
    ];

    return (

        <Box className='w-full h-screen'>
            <Grid h="100vh" w={"full"} overflowY={"hidden"} >
                <Box width="full" position={"absolute"} zIndex={"30"} top={"0px"} >
                    {/* NAVBAR SECTION */}
                    {!pathname?.includes("create_event") && (
                        <HStack position={"absolute"} zIndex={"30"} top={"0px"} width='100%' height='80px' borderBottomWidth={'1px'} borderBottomColor={'lightgrey'} backgroundColor={'white'} alignItems='center' justifyContent={'space-between'} paddingX={['20px', '40px']}>

                            <Flex alignItems={"center"} gap={"12"} >
                                <HStack justifyContent={'center'}>
                                    <Image src='/assets/images/chasescroll-logo.png' width={50} height={50} alt='logo' />
                                    <CustomText fontFamily={'Satoshi-Regular'} fontSize='lg' display={['none', 'inline']} color='#12299C'>Chasescroll</CustomText>
                                </HStack>
                                <Box display={["none", "none", "block"]} >
                                    <SearchBar />
                                </Box>
                            </Flex>
                            {/* LARGE SCREEN ICONS */}
                            <HStack display={['none', 'flex']}>
                                <CustomText>{username}</CustomText>

                                <Link href={`/dashboard/profile/${userId}`}>
                                    <Box width='32px' height='32px' borderRadius={'20px 0px 20px 20px'} borderWidth={'2px'} borderColor={'#D0D4EB'} overflow={'hidden'}>
                                        { user === null || user?.data.imgMain.value === null && (
                                            <VStack width={'100%'} height='100%' fontFamily={''} justifyContent={'center'} alignItems={'center'}>
                                                <CustomText fontFamily={'DM-Bold'} fontSize={'10px'} color='brand.chasescrollButtonBlue'>{firstName[0]?.toUpperCase()} {lastName[0]?.toUpperCase()}</CustomText>
                                            </VStack>
                                        )}
                                        {
                                            user?.data.imgMain.value !== null && (
                                                <>
                                                    { user?.data.imgMain.value.startsWith('https://') && <Image alt='pic' src={`${user?.data.imgMain.value}`} width={'100%'} height={'100%'} objectFit='cover' />}
                                                    { !user?.data.imgMain.value.startsWith('https://') && <Image alt='pic' src={`${IMAGE_URL}${user?.data.imgMain.value}`} width={'100%'} height={'100%'} objectFit='cover' />}
                                                </>
                                            )
                                        }
                                    </Box>
                                    {/* <Avatar name={`${firstName} ${lastName}`} size='md' marginX='10px' /> */}
                                </Link>

                                <NotificationBar />
                            </HStack>

                            {/* SMALL SCREEN ICONS */}
                            <HStack display={['flex', 'none']}>
                                <Link href="/dashboard/chats">
                                    <AddSquare variant='Outline' color={THEME.COLORS.chasescrollBlue} size='30px' />
                                </Link>

                                <NotificationBar />

                                <Link href='/dashboard/chats'>
                                    <Message color={THEME.COLORS.chasescrollBlue} size='30px' variant='Outline' />
                                </Link>

                                <Link href={userId ? `/dashboard/profile/${userId}` : ""}>
                                    <Box width='32px' height='32px' borderRadius={'20px 0px 20px 20px'} borderWidth={'2px'} borderColor={'#D0D4EB'} overflow={'hidden'}>
                                        {(
                                            <VStack width={'100%'} height='100%' fontFamily={''} justifyContent={'center'} alignItems={'center'}>
                                                <CustomText fontFamily={'DM-Bold'} fontSize={'10px'} color='brand.chasescrollButtonBlue'>{firstName[0]?.toUpperCase()} {lastName[0]?.toUpperCase()}</CustomText>
                                            </VStack>
                                        )}
                                        {/* {
                                            chat?.otherUser?.data.imgMain.value && (
                                                <Image src={`${IMAGE_URL}${chat?.otherUser?.data.imgMain.value}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} />
                                            )
                                        } */}
                                    </Box>
                                    {/* <Avatar name={`${firstName} ${lastName}`} size='md' marginX='10px' /> */} 
                                </Link>
                            </HStack>

                        </HStack>
                    )}
                </Box>
                <Flex flex={1} w="full" h="full" pt={!pathname?.includes("create_event") ? "80px" : "0px"} pb={["70px", "70px", "70px", "0px"]} overflow={"hidden"} bg={"brand.black"} >
                    {!pathname?.includes("create_event") && (
                        <Box width={"fit-content"} display={['none', 'none', 'none', 'flex']}>
                            <Sidebar />
                        </Box>
                    )}
                    {children}
                </Flex>
                {/* BOTTOM TAB */}
                <HStack paddingX='20px' position={"fixed"} bottom={"0px"} justifyContent={'space-evenly'} width='100%' height='70px' bg='white' borderTopWidth={1} borderTopColor={'lightgrey'} display={['flex', 'flex', 'flex', 'none']}>

                    <Link href='/dashboard/home'>
                        <VStack width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname.includes('home') ? 'brand.chasescrollBlue' : 'white'} color={pathname.includes('home') ? 'white' : 'brand.chasescrollBlue'} justifyContent={'center'} alignItems={'center'}>
                            <HomeIcon />
                        </VStack>
                    </Link>

                    <Link href='/dashboard/explore'>
                        <VStack width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname.includes('explore') ? 'brand.chasescrollBlue' : 'white'} color={pathname.includes('explore') ? 'white' : 'brand.chasescrollBlue'} justifyContent={'center'} alignItems={'center'}>
                            <SearchNormal1 size='20px' />
                        </VStack>
                    </Link>

                    <Link href='/dashboard/event'>
                        <VStack width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname.includes('events') ? 'brand.chasescrollBlue' : 'white'} color={pathname.includes('events') ? 'white' : 'brand.chasescrollBlue'} justifyContent={'center'} alignItems={'center'}>
                            <Calendar size='20px' />
                        </VStack>
                    </Link>

                    <Link href='/dashboard/community'>
                        <VStack width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname.includes('community') ? 'brand.chasescrollBlue' : 'white'} color={pathname.includes('community') ? 'white' : 'brand.chasescrollBlue'} justifyContent={'center'} alignItems={'center'}>
                            {/* <People size='20px' /> */}
                            <UsersIcon />
                        </VStack>
                    </Link>

                    <Link href={userId ? `/dashboard/profile/${userId}` : ""}>
                    <Link href={userId ? `/dashboard/profile/${userId}` : ""}>
                        <VStack width={'40px'} height='40px' borderBottomLeftRadius={'20px'} borderTopLeftRadius={'20px'} borderBottomRightRadius={'20px'} bg={pathname.includes('profile') ? 'brand.chasescrollBlue' : 'white'} color={pathname.includes('profile') ? 'white' : 'brand.chasescrollBlue'} justifyContent={'center'} alignItems={'center'}>
                        <Box width='32px' height='32px' borderRadius={'20px 0px 20px 20px'} borderWidth={'2px'} borderColor={'#D0D4EB'} overflow={'hidden'}>
                                        { user?.data.imgMain.value === null && (
                                            <VStack width={'100%'} height='100%' fontFamily={''} justifyContent={'center'} alignItems={'center'}>
                                                <CustomText fontFamily={'DM-Bold'} fontSize={'10px'} color='brand.chasescrollButtonBlue'>{firstName[0]?.toUpperCase()} {lastName[0]?.toUpperCase()}</CustomText>
                                            </VStack>
                                        )}
                                        {
                                            user?.data.imgMain.value !== null && (
                                                <>
                                                    { user?.data.imgMain.value.startsWith('https://') && <Image alt='pic' src={`${user?.data.imgMain.value}`} width={'100%'} height={'100%'} objectFit='cover' />}
                                                    { !user?.data.imgMain.value.startsWith('https://') && <Image alt='pic' src={`${IMAGE_URL}${user?.data.imgMain.value}`} width={'100%'} height={'100%'} objectFit='cover' />}
                                                </>
                                            )
                                        }
                        </Box>
                        </VStack>
                    </Link>
                </HStack>
            </Grid>
        </Box>
    )
}

export default Layout