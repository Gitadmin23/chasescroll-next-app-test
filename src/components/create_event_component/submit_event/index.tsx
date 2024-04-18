import CustomButton from '@/components/general/Button'
import ModalLayout from '@/components/sharedComponent/modal_layout';
import useEventStore, { CreateEvent } from '@/global-state/useCreateEventState';
import { useDetails } from '@/global-state/useUserDetails';
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Flex, useToast } from '@chakra-ui/react'
import { AxiosError, AxiosResponse } from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useMutation } from 'react-query';
import SuccessMessageCreateEvent from '../success_message';
import { IUser } from '@/models/User';

interface Iprops {
    type?: any,
    promotion?: boolean,
}

function SubmitEvent(props: Iprops) {

    const {
        type,
        promotion,
    } = props

    const { eventdata, image, tab, updateEvent, changeTab } = useEventStore((state) => state);
    const { userId: user_index } = useDetails((state) => state);
    const router = useRouter()
    const pathname = usePathname();

    const [open, setOpen] = useState(false)

    // const []
    const toast = useToast()

    const getValidationTheme = () => {
        if (!eventdata?.eventName) {
            toast({
                description: "Please Enter Event Name",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            return
        } else if (!eventdata?.eventType) {
            toast({
                description: "Please Enter Event Type",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            return
        } else if (!eventdata?.eventDescription) {
            toast({
                description: "Please Enter Event Description",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            return
        } else if (!image && !eventdata?.currentPicUrl) {
            toast({
                description: "Please Enter Event Image",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            return
        } else {
            if (pathname?.includes("edit_event")) {
                changeTab(1)
            } else {
                if (image) {
                    const fd = new FormData();
                    fd.append("file", image);
                    uploadImage.mutate(fd)
                } else {
                    saveToDraft.mutate(eventdata)
                }
            }
        }
    }

    const getValidationInfo = () => {
        if (!eventdata?.startDate) {
            toast({
                description: "Please Enter Event Starting Date",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            return
        } else if (!eventdata?.endDate) {
            toast({
                description: "Please Enter Event Ending Date",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            return
        } else if (eventdata?.startDate > eventdata?.endDate) {
            toast({
                description: "End date and time cannot earlier than Start date and time",
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
            return
        } else if (!eventdata?.location?.toBeAnnounced) {
            if (!eventdata?.location?.locationDetails && !eventdata?.location?.link) {
                toast({
                    description: "Please Enter Event Location",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else {

                if (pathname?.includes("edit_event_data")) {
                    updateUserEvent.mutate(eventdata)
                } else if (pathname?.includes("edit_event")) {
                    changeTab(2)
                } else {
                    saveToDraft.mutate(eventdata)
                }
            }
        } else {
            if (pathname?.includes("edit_event")) {
                changeTab(2)
            } else {
                saveToDraft.mutate(eventdata)
            }
        }
    }


    const getValidationThemeBtn = () => {
        if (!eventdata?.eventName) {
            return true
        } else if (!eventdata?.eventType) {
            return true
        } else if (!eventdata?.eventDescription) {
            return true
        } else if (!image && !eventdata?.currentPicUrl) {
            return true
        } else {
            return false
        }
    }

    const getValidationInfoBtn = () => {
        if (!eventdata?.startDate) {
            return true
        } else if (!eventdata?.endDate) {
            return true
        } else if (eventdata?.startDate > eventdata?.endDate) {
            return true
        } else if (!eventdata?.location?.toBeAnnounced) {
            if (!eventdata?.location?.locationDetails && !eventdata?.location?.link) {
                return true
            }
        } else {
            return false
        }
    }

    const getValidationAll = () => {
        if (tab === 0) {
            return getValidationThemeBtn()
        } else if (tab === 1) {
            return getValidationInfoBtn()
        } else {
            return getValidationTicketBtn()
        }
    }
    const getValidationTicket: any = () => {
        return eventdata?.productTypeData?.every((item: any, index: number) => {

            if (!item.totalNumberOfTickets) {

                toast({
                    description: "Please Enter Total Number Of Tickets",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                }); return
            } else if (!item.ticketType) {
                toast({
                    description: "Please Enter Ticket Type Or Name",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                }); return
            } else if (!item.minTicketBuy) {
                toast({
                    title: "Please Enter Minimum Ticket Buy",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                }); return
            } else if (!item.maxTicketBuy) {
                toast({
                    description: "Please Enter Maximum Ticket Buy",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                }); return
            } else if (getValidationTicketBtn()) {
                toast({
                    description: "Please Fill Ticket Information ",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                return
            } else {
                if (getValidationTicketNotification() === false) {
                    toast({
                        status: "error",
                        title: "Error",
                        description: "minimum ticket Price can't be less than zero ",
                        position: "top-right"
                    })
                } else {
                    if (pathname?.includes("edit_event")) {
                        if (image) {
                            const fd = new FormData();
                            fd.append("file", image);
                            uploadImage.mutate(fd)
                        } else {
                            updateUserEvent.mutate(eventdata)
                        }
                    } else {
                        createEventFromDraft.mutate(eventdata)
                    }
                }
            }
        })
    }

    const getValidationTicketBtn: any = () => {

        return eventdata?.productTypeData?.every((item: any, index: number) => {

            if (!item.totalNumberOfTickets) {
                return true
            } else if (!item.ticketType) {
                return true
            } else if (!item.minTicketBuy) {
                return true
            } else if (!item.maxTicketBuy) {
                return true
            } else if (promotion) {
                if (!item.rerouteURL) {
                    return true
                }
            } else if (eventdata?.productTypeData?.length === index + 1) {
                return false
            } else {
                return true
            }
        })
    }

    const getValidationTicketNotification: any = () => {
        return eventdata?.productTypeData?.every((item: any) => {
            if (type !== "Free") {
                return (Number(item.ticketPrice) === 0 || !item.ticketPrice) ? false : true
            } else {
                return true
            }
        })
    }

    // Upload Image
    const uploadImage = useMutation({
        mutationFn: (data: any) => httpService.post(URLS.UPLOAD_IMAGE + "/" + user_index, data,
            {
                headers: {
                    'Content-Type': image.type,
                }
            }),
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
        onSuccess: (data: any) => {
            let newObj: any = { ...eventdata, picUrls: [data?.data?.fileName], currentPicUrl: data?.data?.fileName }
            if (pathname?.includes("edit_event")) {
                updateUserEvent?.mutate(newObj)
            } else {
                if (image && !eventdata?.currentPicUrl) {
                    createDraft.mutate(newObj)
                } else if (image && eventdata?.currentPicUrl) {
                    saveToDraft.mutate(newObj)
                }
            }
        }
    });

    // Create Draft 
    const createDraft = useMutation({
        mutationFn: (data: any) => httpService.post(URLS.CREATE_DRAFT, data),
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
        onSuccess: (data: AxiosResponse<any>) => {
            updateEvent(data?.data)
            changeTab(1)
            toast({
                title: 'Success',
                description: "Event Saved",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        }
    });

    // Save To Draft
    const saveToDraft = useMutation({
        mutationFn: (data: any) => httpService.put(URLS.UPDATE_DRAFT, data),
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
        onSuccess: (data: AxiosResponse<any>) => {

            const clone: CreateEvent = {
                id: data?.data?.id,
                picUrls: data?.data?.picUrls,
                eventType: data?.data?.eventType,
                eventName: data?.data?.eventName,
                eventDescription: data?.data?.eventDescription,
                joinSetting: data?.data?.joinSetting,
                locationType: data?.data?.locationType,
                currency: data?.data?.currency,
                currentPicUrl: data?.data?.currentPicUrl,
                eventFunnelGroupID: data?.data?.eventFunnelGroupID,
                mediaType: data?.data?.mediaType,
                currentVideoUrl: data?.data?.currentVideoUrl,
                isPublic: data?.data?.isPublic,
                isExclusive: data?.data?.isExclusive,
                mask: data?.data?.mask,
                attendeesVisibility: data?.data?.attendeesVisibility,
                minPrice: data?.data?.minPrice,
                maxPrice: data?.data?.maxPrice,
                startTime: data?.data?.startTime,
                endTime: data?.data?.endTime,
                startDate: data?.data?.startDate,
                endDate: data?.data?.endDate,
                // expirationDate: "",
                location: data?.data?.location,
                productTypeData: data?.data?.productTypeData,
                collaborators: data?.data?.collaborators,
                admins: data?.data?.admins
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
            changeTab(tab !== 1 ? 1 : 2)
            toast({
                title: 'Success',
                description: "Event Saved",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        }
    });

    // Create Event From Draft
    const createEventFromDraft = useMutation({
        mutationFn: (data: any) => httpService.post(URLS.CREATE_EVENT_FROM_DRAFT, data),
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
        onSuccess: (data: AxiosResponse<any>) => {
            setOpen(true)
        }
    });

    // Edit Event
    const updateUserEvent = useMutation({
        mutationFn: (data: any) => httpService.put(URLS.UPDATE_EVENT, data),
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
        onSuccess: (data: AxiosResponse<any>) => {
            router.push("/dashboard/event")

            toast({
                title: 'Success',
                description: "Event has been updated successfully",
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-right',
            });
        }
    });


    function clean(obj: any) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
                delete obj[propName];
            }
            if (obj[propName] === "location") {
                for (var propName in obj?.location) {
                    if (obj?.location[propName] === null || obj?.location[propName] === undefined || obj?.location[propName] === "") {
                        delete obj?.location[propName];
                    }
                }
            }
        }
        return obj

    }

    const handleClick = React.useCallback(() => {
        if (tab === 0) {
            getValidationTheme()
        } else if (tab === 1) {
            getValidationInfo()
        } else {
            getValidationTicket()
        }
    }, [saveToDraft, uploadImage, createEventFromDraft])

    const updateEventCollaboration = React.useCallback(() => {
        updateUserEvent.mutate(eventdata)
    }, [])

    return (
        <Flex w={"full"} alignItems={"center"} justifyContent={"center"} fontSize={["md", "lg"]} fontWeight={"bold"} >

            <CustomButton borderWidth={tab === 2 ? "2px" : "0px"} backgroundColor={getValidationAll() ? "#F04F4F" : "brand.chasescrollBlue"} color={"white"} isLoading={uploadImage?.isLoading || uploadImage?.isLoading || saveToDraft?.isLoading || createEventFromDraft?.isLoading || updateUserEvent?.isLoading} onClick={handleClick} _disabled={{ cursor: "not-allowed" }} width={"full"}
                text={pathname?.includes("edit_event_data") ? "Update Event" : pathname?.includes("edit_event") && tab === 2 ? "Update Event" : tab === 2 ? 'Submit' : 'Continue'} />

            <ModalLayout close={setOpen} open={open} >
                <SuccessMessageCreateEvent update={(pathname?.includes("edit_event_data") || pathname?.includes("edit_event")) ? true : false} />
            </ModalLayout>
        </Flex>
    )
}

export default SubmitEvent
