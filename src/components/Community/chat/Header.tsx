import { useCommunityPageState } from '@/components/Community/chat/state';
import CustomText from '@/components/general/Text'
import ReportCommunityModal from '@/components/modals/community/ReportCommunityModal';
import { useDetails } from '@/global-state/useUserDetails';
import { IEvent } from '@/models/Events';
import { PaginatedResponse } from '@/models/PaginatedResponse';
import { IMAGE_URL, RESOURCE_BASE_URL, URLS } from '@/services/urls';
import { THEME } from '@/theme';
import httpService from '@/utils/httpService';
import { Avatar, HStack, VStack,  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Image,
  Box,
  Spinner,
  useToast,
  Link
 } from '@chakra-ui/react'
import { uniqBy } from 'lodash';
import React from 'react'
import { FiCalendar, FiPlusSquare, FiX } from 'react-icons/fi';
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ArrowLeft2 } from 'iconsax-react'
import AddEventsModal from '@/components/modals/community/AddEventsModal';
import ShareEvent from '@/components/sharedComponent/share_event';



function CommunityChatHeader() {
  const { activeCommunity, setAll, events, eventHasNext, eventPageNumber, showEvents } = useCommunityPageState((state) => state);
  const { userId } = useDetails((state) => state);
  const [showModal, setShowModal] = React.useState(false);
  const queryClient = useQueryClient();
  const toast = useToast();

  const getCommunityEventts = useQuery(['getCommunityEvents', activeCommunity?.id], () => httpService.get(`${URLS.GET_SAVED_EVENTS}`, {
    params: {
      page: 0,
      typeID: activeCommunity?.id,
    }
  }), {
    enabled: activeCommunity !== null,
    onSuccess: (data) => {
      const item: PaginatedResponse<IEvent> = data.data;
      console.log(item);
      if (item.content?.length > 0) {
        if (events.length > 0) {
          const arr = [...events, ...item.content];
          setAll({ events: uniqBy(arr, 'id'), eventHasNext: item.last ? false:true})
        }else {
          setAll({ events: item.content,  eventHasNext: item.last ? false:true })
        }
      }
    },
    onError: () => {}
  })

  const self = userId === activeCommunity?.creator.userId;

  const leaveGroup = useMutation({
    mutationFn: () => httpService.delete(`${URLS.LEAVE_GROUP}`, {
      params: {
        groupID: activeCommunity?.id,
        userID: userId
      }
    }),
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Successfully left the group',
        status: 'success',
        position: 'top-right',
        duration: 5000,
      })
      queryClient.invalidateQueries(['getJoinedGroups']);
      setAll({ activeCommunity: null, pageNumber: 0, hasNext: false, messages: [] })
    },
    onError: () => {
      toast({
        title: 'Error'
      })
    }
  });

  const deleteGroup = useMutation({
    mutationFn: () => httpService.delete(`${URLS.DELETE_GROUP}/${activeCommunity?.id}`, {
    }),
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Successfully deleted the group',
        status: 'success',
        position: 'top-right',
        duration: 5000,
      })
      queryClient.invalidateQueries(['getJoinedGroups']);
      setAll({ activeCommunity: null, pageNumber: 0, hasNext: false, messages: [] })
    },
    onError: () => {
      toast({
        title: 'Error'
      })
    }
  });


  return (
   <HStack width='100%' height={'100px'} bg='white' borderBottomWidth={'1px'} borderBottomColor={'lightgrey'} paddingX={['0px', '20px']} justifyContent={'space-between'}>
    <Box display={['block', 'none']}>
      <ArrowLeft2 size={'20px'} variant='Outline' onClick={() => setAll({ activeCommunity: null })} />
    </Box>
    {/* {MODAL} */}
    <ReportCommunityModal isOpen={showModal} onClose={() => setShowModal(false)} typeID={activeCommunity?.id as string} REPORT_TYPE='REPORT_COMMUNITY' />
    <HStack flex='1' justifyContent={'flex-start'}>
          

         <Link  href={`/dashboard/community/info/${activeCommunity?.id}`}>
            <Box width='32px' height='32px' borderRadius={'20px 0px 20px 20px'} borderWidth={'2px'} borderColor={'brand.chasescrollBlue'} overflow={'hidden'}>
                      { activeCommunity?.data.imgSrc === null && (
                          <VStack width={'100%'} height='100%' justifyContent={'center'} alignItems={'center'}>
                              <CustomText fontFamily={'DM-Regular'}>{activeCommunity.data.name[0].toUpperCase()}</CustomText>
                          </VStack>
                      )}
                      {
                          activeCommunity?.data.imgSrc && (
                              <Image src={`${IMAGE_URL}${activeCommunity.data.imgSrc}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} />
                          )
                      }
              </Box>
         </Link>
        <VStack alignItems={'flex-start'} spacing={0}>
            <Link  href={`/dashboard/community/info/${activeCommunity?.id}`}>
              <CustomText fontFamily={'DM-Medium'} fontSize={'14px'} color='brand.chasescrollButtonBlue'>{activeCommunity?.data.name}</CustomText>
            </Link>
            <CustomText fontFamily={'DM-Regular'} fontSize={'12px'}>{activeCommunity?.data.memberCount} Members</CustomText>
        </VStack>
    </HStack>

   <HStack>
   <ShareEvent type='COMMUNITY' id={activeCommunity?.id} />
    { events.length > 0 && (
      <Box onClick={() => setAll({ showEvents: !showEvents })} cursor='pointer' position={'relative'} marginRight={'10px'} >

        <Image src='/assets/images/note-add.png' alt='logo' width={'30px'} height={'30px'} />


        <VStack justifyContent={'center'} alignItems={'center'}  zIndex={'10'} position={'absolute'} top='-15px' right='-15px' bg='white' width='30px' height='30px' borderRadius={'15px'} shadow={'lg'}>
          <CustomText fontFamily={'DM-Bold'} fontSize={'14px'} color='red'>{events.length}</CustomText>
        </VStack>

      </Box>
    )}
    <Menu>
        <MenuButton>
          <IoMdInformationCircleOutline color='grey' fontSize='25px' />
        </MenuButton>
        <MenuList padding='0px'>
          <Link 
            href={`/dashboard/community/info/${activeCommunity?.id}`}
          >
            <MenuItem height={'50px'}>Group information</MenuItem>
          </Link>
          {
            !self && (
              <MenuItem height={'50px'} color={'red'} onClick={() => setShowModal(true)}>Report community</MenuItem>
            )
          }
          { !self &&  (
            <MenuItem height={'50px'} color='red' onClick={() => leaveGroup.mutate()} >
            { leaveGroup.isLoading && <Spinner /> }
            { !leaveGroup.isLoading && 'Exit community' }
          </MenuItem>
          )}
          { self &&  (
            <MenuItem height={'50px'} color='red' onClick={() => deleteGroup.mutate()} >
            { deleteGroup.isLoading && <Spinner /> }
            { !deleteGroup.isLoading && 'Delete community' }
          </MenuItem>
          )}
        </MenuList>
    </Menu>
   </HStack>

   </HStack>
  )
}

export default CommunityChatHeader