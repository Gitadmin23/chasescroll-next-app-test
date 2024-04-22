"use client"
import CustomButton from '@/components/general/Button'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import UserImage from '@/components/sharedComponent/userimage'
import { CloseIcon, CollaboratorIcon } from '@/components/svg'
import useEventStore, { CreateEvent } from '@/global-state/useCreateEventState'
import { useDetails } from '@/global-state/useUserDetails'
import useDebounce from '@/hooks/useDebounce' 
import { IUser } from '@/models/User'
import httpService from '@/utils/httpService'
import { textLimit } from '@/utils/textlimit'
import { Box, Button, Checkbox, Flex, Heading, Input, InputGroup, InputLeftElement, Text, VStack, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { URLS } from '@/services/urls'
import { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/navigation'

type IProps = {
    btn?: boolean,
    data?: CreateEvent,
    collaborate?: boolean
}

export default function CollaboratorBtn(props: IProps) {

    const {
        btn,
        data,
        collaborate
    } = props

    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState(false)
    const [users, setUsers] = React.useState<IUser[]>([]);
    const [usersFilter, setUserFilter] = React.useState<IUser[]>([]);
    const { eventdata, updateEvent } = useEventStore((state) => state);

    const router = useRouter()

    const queryClient = useQueryClient()

    const { userId } = useDetails((state) => state);
    // const toast = useToast()

    const [search, setSearch] = React.useState('');
    const searchText = useDebounce(search, 1000);

    const { isLoading, isError } = useQuery(['getUserFriends', searchText, userId], () => httpService.get(`/user/get-users-connections/${userId}`, {
        params: {
            searchText: searchText
        }
    }), {
        onSuccess: (data) => {
            setUsers(data?.data.content);
        }
    });

    const AddAdmin =(userIndex: string)=> {

        let admin = !eventdata?.admins ? [] : [...eventdata?.admins]
        let collaborators = !eventdata?.collaborators ? [] : [...eventdata?.collaborators]

        let clone = { ...eventdata }

        if (eventdata?.collaborators?.includes(userIndex)) {


            const index = collaborators.indexOf(userIndex);
            clone?.collaborators.splice(index, 1); 

            if (!eventdata?.admins?.includes(userIndex)) { 

                clone.admins = [...admin, userIndex] 
            } else { 

                const index = admin.indexOf(userIndex);
                clone?.admins.splice(index, 1); 
            }

            updateEvent(clone);

        } else if (eventdata?.admins?.includes(userIndex)) {

            const index = admin.indexOf(userIndex);
            clone?.admins.splice(index, 1); 

            updateEvent(clone); 
        } else {

            if (!clone.admins) {
                clone.admins = [userIndex]
            } else {
                clone.admins = [...admin, userIndex]
            } 

            updateEvent(clone); 

        }
    }

    const AddCollaborators =(userIndex: string)=> {

        let admin = !eventdata?.admins ? [] : [...eventdata?.admins]
        let collaborators = !eventdata?.collaborators ? [] : [...eventdata?.collaborators]

        let clone = { ...eventdata }
        if (eventdata?.admins?.includes(userIndex)) {


            const index = admin.indexOf(userIndex);
            clone?.admins.splice(index, 1);

            if (!eventdata?.collaborators?.includes(userIndex)) {

                clone.collaborators = [...collaborators, userIndex] 
            } else {


                const index = collaborators.indexOf(userIndex);
                clone?.collaborators.splice(index, 1);
                // clone?.collaborators?.filter((id) => id !== userIndex)
                clone.collaborators = [...collaborators, userIndex] 
            }
            updateEvent(clone);

        } else if (eventdata?.collaborators?.includes(userIndex)) { 

            const index = collaborators.indexOf(userIndex);
            clone?.collaborators.splice(index, 1);

            // clone?.collaborators?.filter((id) => id !== userIndex)

            updateEvent(clone); 
        } else {

            clone.collaborators = [...collaborators, userIndex]
            // clone.collaborators.push(item)

            updateEvent(clone); 

        } 
    }



    const UserCard = (props: IUser & { collaborators: boolean, admin: boolean }) => {
        const { username, userId, data: { imgMain: { value: imgMain } }, firstName, lastName, collaborators, admin } = props;

        const [show, setShow] = useState(false)

        const removeHandler = (userIndex: string) => {
            let clone = { ...eventdata }

            let admin = !eventdata?.admins ? [] : [...eventdata?.admins]
            let collaborators = !eventdata?.collaborators ? [] : [...eventdata?.collaborators]


            if (show || collaborators || admin) {
                if (eventdata?.admins?.includes(userIndex)) {


                    const index = admin.indexOf(userIndex);
                    clone?.admins.splice(index, 1);

                    updateEvent(clone);
                } else if (eventdata?.collaborators?.includes(userIndex)) {

                    const index = collaborators.indexOf(userIndex);
                    clone?.collaborators.splice(index, 1);

                    // clone?.collaborators?.filter((id) => id !== userIndex)

                    updateEvent(clone);
                }
            }
            setShow((prev) => !prev)
        }

        return (
            <Flex width='100%' height={'fit-content'} flexDir={"column"} rounded={"16px"} borderColor={"#B6B6B6"} borderWidth={"1px"} justifyContent={'space-between'} padding='15px'>
                <Flex as={"button"} onClick={() => removeHandler(userId)} justifyContent={'space-between'} w={"full"} alignItems={"center"}  >
                    <Flex gap={"1"} height={"full"} alignItems={"center"} >
                        <Box w={"fit-content"} >
                            <UserImage data={props} image={props?.data?.imgMain?.value} size={"40px"} border={"2px"} font={"20px"} />
                        </Box>
                        {/* <Avatar src={`${CONFIG.RESOURCE_URL}${imgMain}`} size='sm' name={`${firstName} ${lastName}`} /> */}
                        <VStack alignItems={'flex-start'} spacing={0}>
                            <Heading fontSize={'16px'} color='black'>{firstName || ''} {lastName || ''}</Heading>
                            <Text color='grey' fontSize={'14px'}>@{textLimit(username, 12) || ''}</Text>
                        </VStack>
                    </Flex>
                    <Checkbox isChecked={show || collaborators || admin} rounded={"full"} onChange={(e) => removeHandler(userId)} />
                </Flex>
                {(show || collaborators || admin) && (
                    <Flex gap={"6"} pt={"4"} justifyContent={"center"} alignItems={"center"} >

                        <Flex as='button' onClick={() => AddAdmin(userId)} alignItems={"center"} gap={"2"} >
                            <Text>Admin</Text>
                            <Flex as='button' w={"24px"} h={"24px"} rounded={"full"} borderWidth={"2px"} borderColor={admin ? "#5465E0" : "#8AA7C5"} alignItems={"center"} justifyContent={"center"} >
                                {admin && (
                                    <Box w={"9.6px"} h={"9.6px"} bgColor={"#5465E0"} rounded={"full"} />
                                )}
                            </Flex>
                        </Flex>
                        <Flex as='button' onClick={() => AddCollaborators(userId)} alignItems={"center"} gap={"2"} >
                            <Text>Coordinator</Text>
                            <Flex as='button' w={"24px"} h={"24px"} rounded={"full"} borderWidth={"2px"} borderColor={collaborators ? "#5465E0" : "#8AA7C5"} alignItems={"center"} justifyContent={"center"} >
                                {collaborators && (
                                    <Box w={"9.6px"} h={"9.6px"} bgColor={"#5465E0"} rounded={"full"} />
                                )}
                            </Flex>
                        </Flex>
                    </Flex>
                )}
            </Flex>
        )
    }

    const toast = useToast()  

    const clickHandler = () => {

        setTab(false)
        setOpen(true)
        setSearch("")

        if (data?.eventName) {

            const clone: CreateEvent = {
                id: data?.id,
                picUrls: data?.picUrls,
                eventType: data?.eventType,
                eventName: data?.eventName,
                eventDescription: data?.eventDescription,
                joinSetting: data?.joinSetting,
                locationType: data?.locationType,
                currency: data?.currency,
                currentPicUrl: data?.currentPicUrl,
                eventFunnelGroupID: data?.eventFunnelGroupID,
                mediaType: data?.mediaType,
                currentVideoUrl: data?.currentVideoUrl,
                isPublic: data?.isPublic,
                isExclusive: data?.isExclusive,
                mask: data?.mask,
                attendeesVisibility: data?.attendeesVisibility,
                minPrice: data?.minPrice,
                maxPrice: data?.maxPrice,
                startTime: data?.startTime,
                endTime: data?.endTime,
                startDate: data?.startDate,
                endDate: data?.endDate,
                // expirationDate: "",
                location: data?.location,
                productTypeData: data?.productTypeData,
                collaborators: data?.collaborators,
                admins: data?.admins
            }  


            const admin: any = []
            const collaborator: any = []

            clone?.admins?.map((item: IUser) => {
                return admin.push(item?.userId)
            })
            clone?.collaborators?.map((item: IUser) => {
                return collaborator.push(item?.userId)
            })

            clone.admins = admin
            clone.collaborators = collaborator

            updateEvent(clone)
        }

    } 
    // Edit Event
    const updateUserEvent = useMutation({
        mutationFn: (newdata: any) => httpService.put(URLS.UPDATE_EVENT, newdata),
        onError: (error: AxiosError<any, any>) => {
            toast({
                title: 'Error',
                description: error?.response?.data?.message,
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        },
        onSuccess: (message: AxiosResponse<any>) => {
            queryClient.invalidateQueries(['all-events-details'])

            // router.refresh(

            toast({
                title: 'Success',
                description: "Event has been updated successfully",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            setOpen(false)
        }
    });


    const updateEventCollaboration = React.useCallback((item: any) => {
        updateUserEvent.mutate(item)
    }, [])

    useEffect(() => {
        if (!isLoading) {

            let userData: Array<IUser> = []

            let admin: any = data?.admins
            let collaborator: any = data?.collaborators


            if (admin?.length > 0 && collaborator?.length > 0) {
                userData = users.filter((obj1: IUser) =>
                    data?.admins.every((obj2: IUser) => obj1?.userId !== obj2?.userId) &&
                    data?.collaborators.every((obj2: IUser) => obj1?.userId !== obj2?.userId)
                );

            } else if (admin?.length > 0 && collaborator?.length <= 0) {
                userData = users.filter((obj1: IUser) =>
                    data?.admins.every((obj2: IUser) => obj1?.userId !== obj2?.userId && obj1?.firstName !== obj2?.firstName)
                );
            } else {
                userData = users.filter((obj1: IUser) =>
                    data?.collaborators.every((obj2: IUser) => obj1?.userId !== obj2?.userId)
                );
            }

            setUserFilter(userData)

        }
    }, [data, open])

    const changeTabHandler = (item: boolean) => {
        setTab(item)
        setSearch("")
    }

    return (
        <>
            {btn && (
                <> 
                    <Button onClick={() => clickHandler()} bgColor={"#5D70F9"} px={"2"} fontSize={"9px"} color={"white"} h={"25px"} pt={"0.9px"} rounded={"32px"}>{collaborate ? "Edit" : "Add"} Collaborator</Button> 
                </>
            )}
            {!btn && (
                <Flex flexDir={"column"} w={"fit-content"} gap={"3"} alignItems={"end"} >
                    <Flex onClick={() => setOpen(true)} as={'button'} gap={"1"} alignItems={"center"} mr={"auto"} >
                        <CollaboratorIcon />
                        {(eventdata?.admins?.length <= 0 && eventdata?.collaborators?.length <= 0) && (
                            <Text color={"#1732F7"} lineHeight={"22px"} >Add Collaborators</Text>
                        )}
                        {(eventdata?.admins?.length > 0 || eventdata?.collaborators?.length > 0) && (
                            <Flex alignItems={"center"} gap={"2"} >
                                <Text color={"#1732F7"} lineHeight={"22px"} >Edit Collaborators</Text>
                            </Flex>
                        )}
                    </Flex>
                    <Flex gap={"3"} >

                        {eventdata?.admins?.length > 0 && (
                            <Flex height={"23px"} px={"2"} justifyContent={"center"} alignItems={"center"} fontWeight={"bold"} fontSize={"xs"} rounded={"32px"} bg={"#DCF9CF66"} color={"#3EC30F"} >
                                {eventdata?.admins?.length + " Admin" + (eventdata?.admins?.length > 1 ? "s" : "")}
                            </Flex>
                        )}
                        {eventdata?.collaborators?.length > 0 && (
                            <Flex height={"23px"} px={"2"} justifyContent={"center"} alignItems={"center"} fontWeight={"bold"} fontSize={"xs"} rounded={"32px"} bg={"#FDF3CF6B"} color={"#FDB806"} >
                                {eventdata?.collaborators?.length + " Collaborator" + (eventdata?.collaborators?.length > 1 ? "s" : "")}
                            </Flex>
                        )}
                    </Flex>
                </Flex>
            )}
            <ModalLayout open={open} close={setOpen} closeIcon={false} >
                <Flex w={"full"} px={"6"} pt={"8"} >
                    <Box>
                        <Text color={"#121212"} fontSize={"24px"} lineHeight={"31.25px"} fontWeight={"bold"} >Select Collaborators</Text>
                        <Text color={"#626262"} lineHeight={"20.83px"} >Kindly select users to collaborate with on this event and assign roles.</Text>
                    </Box>
                    <Box w={"fit-content"} >
                        <Box onClick={() => setOpen(false)} as='button'>
                            <CloseIcon second={true} />
                        </Box>
                    </Box>
                </Flex>
                <Flex px={"6"} py={"4"} flexDir={"column"} gap={"2"}  >
                    {btn && (
                        <Flex rounded={"lg"} w={"full"} bg={"#EFF1FE"} py={"3px"} px={"9px"} >
                            <Button onClick={() => changeTabHandler(false)} _hover={{ backgroundColor: !tab ? "white" : "transparent" }} borderBottom={!tab ? "1px solid #5465E0" : ""} width={"full"} bgColor={!tab ? "white" : "transparent"} h={"36px"} color={"#5465E0"} fontWeight={"medium"} fontSize={"sm"} >My Network</Button>
                            <Button onClick={() => changeTabHandler(true)} _hover={{ backgroundColor: tab ? "white" : "transparent" }} borderBottom={tab ? "1px solid #5465E0" : ""} width={"full"} bgColor={tab ? "white" : "transparent"} h={"36px"} color={"#5465E0"} fontWeight={"medium"} fontSize={"sm"} >Collaborators</Button>
                        </Flex>
                    )}
                    <InputGroup width={["full", "full", "full"]} zIndex={"20"} position={"relative"} >
                        <InputLeftElement pointerEvents='none'>
                            <IoSearchOutline size={"25px"} color='#B6B6B6' />
                        </InputLeftElement>
                        <Input width={["full", "full", "full"]} value={search} onChange={(e) => setSearch(e.target.value)} type='text' borderColor={"#CCCCCC"} rounded={"12px"} focusBorderColor={'brand.chasescrollBlue'} bgColor={"white"} placeholder='Search for users, event or...' />
                    </InputGroup>
                </Flex>

                {!tab && (
                    <LoadingAnimation loading={isLoading} >
                        {btn && (
                            <Flex flexDir={"column"} gap={"4"} maxH={btn ? "200px" : "300px"} pb={"4"} px={"5"} overflowY={"auto"} >
                                {!searchText && (
                                    <>
                                        {usersFilter?.map((item: IUser, index: number) => (
                                            <UserCard {...item} collaborators={eventdata?.collaborators?.includes(item.userId)} admin={eventdata?.admins?.includes(item.userId)} key={index.toString()} />
                                        ))}
                                    </>
                                )}
                                {searchText && (
                                    <>
                                        {users?.map((item: IUser, index: number) => (
                                            <UserCard {...item} collaborators={eventdata?.collaborators?.includes(item.userId)} admin={eventdata?.admins?.includes(item.userId)} key={index.toString()} />
                                        ))}
                                    </>
                                )}
                            </Flex>
                        )}
                        {!btn && (
                            <Flex flexDir={"column"} gap={"4"} maxH={"250px"} pb={"4"} px={"5"} overflowY={"auto"} >
                                {users?.map((item: IUser, index: number) => (
                                    <UserCard {...item} collaborators={eventdata?.collaborators?.includes(item.userId)} admin={eventdata?.admins?.includes(item.userId)} key={index.toString()} />
                                ))}
                            </Flex>
                        )}
                    </LoadingAnimation>
                )}

                {tab && (
                    <>
                        {(data?.admins && data?.collaborators) && (
                            <>
                                {(data?.admins?.length > 0 || data.collaborators.length > 0) ? (
                                    <>
                                        {search ? (
                                            <Flex flexDir={"column"} gap={"4"} maxH={"250px"} pb={"4"} px={"5"} overflowY={"auto"} >
                                                {data?.admins?.filter((item: IUser) => item.firstName?.toLowerCase().includes(search?.toLowerCase()) || item.lastName?.toLowerCase().includes(search?.toLowerCase()) || item.email?.toLowerCase().includes(search?.toLowerCase()) || item.username?.toLowerCase().includes(search?.toLowerCase()))?.map((item, index) => (
                                                    <UserCard {...item} collaborators={eventdata?.collaborators?.includes(item.userId)} admin={eventdata?.admins?.includes(item.userId)} key={index.toString()} />
                                                ))}
                                                {data?.collaborators?.filter((item: IUser) => item.firstName?.toLowerCase().includes(search?.toLowerCase()) || item.lastName?.toLowerCase().includes(search?.toLowerCase()) || item.email?.toLowerCase().includes(search?.toLowerCase()) || item.username?.toLowerCase().includes(search?.toLowerCase()))?.map((item, index) => (
                                                    <UserCard {...item} collaborators={eventdata?.collaborators?.includes(item.userId)} admin={eventdata?.admins?.includes(item.userId)} key={index.toString()} />
                                                ))}
                                            </Flex>
                                        ) : (
                                            <Flex flexDir={"column"} gap={"4"} maxH={"250px"} pb={"4"} px={"5"} overflowY={"auto"} >
                                                {data?.admins?.map((item, index) => (
                                                    <UserCard {...item} collaborators={eventdata?.collaborators?.includes(item.userId)} admin={eventdata?.admins?.includes(item.userId)} key={index.toString()} />
                                                ))}
                                                {data?.collaborators?.map((item, index) => (
                                                    <UserCard {...item} collaborators={eventdata?.collaborators?.includes(item.userId)} admin={eventdata?.admins?.includes(item.userId)} key={index.toString()} />
                                                ))}
                                            </Flex>
                                        )}
                                    </>
                                ) : (
                                    <Flex flexDir={"column"} gap={"4"} maxH={"250px"} h={"full"} justifyContent={"center"} alignItems={"center"} pb={"4"} px={"5"} overflowY={"auto"} >
                                        <Text lineHeight={"20.83px"} >You don’t have any collaborators for this please go to your <span style={{ fontWeight: "bold" }} >network tab</span> to select collaborators </Text>
                                    </Flex>
                                )}
                            </>
                        )}
                    </>
                )}
                {btn && (
                    <Box paddingX={'6'} position={"sticky"} bottom={"0px"} shadow='lg' bg='white' py={'20px'} >
                        <CustomButton text={tab ? 'Update Role' : 'Assign Role'} disable={(eventdata?.admins?.length === data?.admins?.length) && (eventdata?.collaborators?.length === data?.collaborators?.length)} isLoading={updateUserEvent?.isLoading} onClick={() => updateEventCollaboration({ admins: eventdata?.admins, collaborators: eventdata?.collaborators, id: eventdata?.id })} width='100%' height='50px' bg='brand.chasescrollButtonBlue' color={'white'} />
                    </Box>
                )}

                {!btn && (
                    <Box paddingX={'6'} position={"sticky"} bottom={"0px"} shadow='lg' bg='white' py={'20px'} >
                        <CustomButton text='Done' onClick={() => setOpen(false)} width='100%' height='50px' bg='brand.chasescrollButtonBlue' color={'white'} />
                    </Box>
                )}
            </ModalLayout>
        </>
    )
}
