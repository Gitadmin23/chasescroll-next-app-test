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
import { useChatPageState } from './state';
import moment from 'moment';
import ReportUserModal from '../modals/chat/ReportUser';
import ReportGroupChatModal from '../modals/chat/ReportGroupChat';
import { CloseCircle, ArrowLeft2 } from 'iconsax-react'


function ChatSectionHeader() {
  const { activeChat, setAll, events, eventHasNext, eventPageNumber, showEvents } = useChatPageState((state) => state);
  const { userId } = useDetails((state) => state);
  const [showModal, setShowModal] = React.useState(false);
  const [showReportGroup, setShowReportGroup] = React.useState(false);
  const queryClient = useQueryClient();
  const toast = useToast();


  const self = userId === activeChat?.createdBy.userId;

  const leaveGroup = useMutation({
    mutationFn: () => httpService.delete(`${URLS.LEAVE_CHAT}`, {
      params: {
        chatID: activeChat?.id,
      }
    }),
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Successfully left the chat',
        status: 'success',
        position: 'top-right',
        duration: 5000,
      })
      queryClient.invalidateQueries(['getChats']);
      setAll({ activeChat: null, pageNumber: 0, hasNext: false, messages: [] })
    },
    onError: () => {
      toast({
        title: 'Error'
      })
    }
  });


  return (
   <HStack width='100%' height={['80px','80px']} bg='white' borderBottomWidth={'1px'} borderBottomColor={'lightgrey'} paddingX={'0px'} justifyContent={'space-between'}>

    {/* {MODAL} */}

    <ReportUserModal isOpen={showModal} onClose={() => setShowModal(false)} typeID={activeChat?.id as string} REPORT_TYPE='REPORT_USER' />

    <ReportGroupChatModal isOpen={showReportGroup} onClose={() => setShowReportGroup(false)} typeID={activeChat?.id as string} REPORT_TYPE='REPORT_COMMUNITY' />

    <HStack> 
          <Box display={['block', 'none']}>
            <ArrowLeft2 onClick={() => setAll({ activeChat: null })} color='grey' size='20px' variant='Outline' />
          </Box>
         {activeChat?.type === 'ONE_TO_ONE' && (
            <Link href={`/dashboard/profile/${activeChat?.otherUser.userId}`}>
                 <Box width='32px' height='32px' borderRadius={'20px 0px 20px 20px'} borderWidth={'2px'} borderColor={'brand.chasescrollBlue'} overflow={'hidden'}>
                    { activeChat.otherUser.data.imgMain.value === null && (
                        <VStack width={'100%'} height='100%' justifyContent={'center'} alignItems={'center'} spacing={0}>
                            <CustomText fontFamily={'DM-Bold'} fontSize={'10px'} color={'brand.chasescrollButtonBlue'} >{activeChat.otherUser.firstName[0].toUpperCase()} {activeChat.otherUser.firstName[0].toUpperCase()}</CustomText>
                        </VStack>
                    )}
                    {
                        activeChat.otherUser.data.imgMain.value && (
                            <Image src={`${IMAGE_URL}${activeChat.otherUser.data.imgMain.value}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} />
                        )
                    }
                </Box>
            </Link>
         )}
          {activeChat?.type === 'GROUP' && (
             <Box width='45px' height='45px' borderRadius={'36px 0px 36px 36px'} borderWidth={'2px'} borderColor={'brand.chasescrollBlue'} overflow={'hidden'}>
                    { activeChat.image === null && (
                        <VStack width={'100%'} height='100%' justifyContent={'center'} alignItems={'center'}>
                            <CustomText fontFamily={'DM-Regular'}>{activeChat.name.toUpperCase()}</CustomText>
                        </VStack>
                    )}
                    {
                        activeChat.image && (
                            <Image src={`${IMAGE_URL}${activeChat.image}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} />
                        )
                    }
            </Box>
         )}
        <VStack alignItems={'flex-start'} spacing={0}>
            {activeChat?.type === 'ONE_TO_ONE' && (
               <Link href={`/dashboard/profile/${activeChat?.otherUser.userId}`}>
                 <CustomText fontFamily={'DM-Medium'} fontSize={'16px'} color='brand.chasescrollButtonBlue'>{activeChat?.otherUser.firstName} {activeChat.otherUser.lastName}</CustomText>
               </Link>
            )}
            { activeChat?.type === 'GROUP' && (
                 <CustomText fontFamily={'DM-Medium'} fontSize={'16px'} color='brand.chasescrollButtonBlue'>{activeChat?.name}</CustomText>
            )}
            <CustomText fontFamily={'DM-Regular'} fontSize={'11px'}>Active {moment(activeChat?.lastModifiedDate).fromNow()}</CustomText>
        </VStack>
    </HStack>

   <HStack>
   <Menu>
        <MenuButton>
          <IoMdInformationCircleOutline color='grey' fontSize='25px' />
        </MenuButton>
        <MenuList padding='0px'>
          {activeChat?.type === 'GROUP' && (
            <Link 
            href={`/dashboard/community/info/${activeChat?.id}`}
            >
                <MenuItem height={'50px'}>Group information</MenuItem>
            </Link>
          )}
            { activeChat?.type === 'ONE_TO_ONE' && (
                <MenuItem height={'50px'} color={'red'} onClick={() => setShowModal(true)}>Report user</MenuItem>
            )}
            {
                activeChat?.type === 'GROUP' && (
                    <MenuItem height={'50px'} color={'red'} onClick={() => setShowReportGroup(true)}>Report Group</MenuItem>
                )
            }

          { activeChat?.type === 'ONE_TO_ONE' &&  (
            <MenuItem height={'50px'} color='red' onClick={() => leaveGroup.mutate()} >
            { leaveGroup.isLoading && <Spinner /> }
            { !leaveGroup.isLoading && 'Delete Chat' }
          </MenuItem>
          )}
           { activeChat?.type === 'GROUP' &&  (
            <MenuItem height={'50px'} color='red' onClick={() => leaveGroup.mutate()} >
            { leaveGroup.isLoading && <Spinner /> }
            { !leaveGroup.isLoading && 'Leave Group Chat' }
          </MenuItem>
          )}
        </MenuList>
    </Menu>
   </HStack>

   </HStack>
  )
}

export default ChatSectionHeader