/* eslint-disable react/display-name */
import CustomText from '@/components/general/Text';
import { useDetails } from '@/global-state/useUserDetails';
import { IMediaContent } from '@/models/MediaPost'
import { IMAGE_URL, RESOURCE_BASE_URL, URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Avatar, HStack, VStack, Image, Box, Spinner } from '@chakra-ui/react';
import React from 'react'
import { FiCheck, FiHeart, FiMessageSquare } from 'react-icons/fi'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import moment from 'moment';
import { IoMdCloudDownload } from 'react-icons/io';
import { THEME } from '@/theme';
import { IoHeart } from 'react-icons/io5';
import { useCommunityPageState } from '@/components/Community/chat/state';
import LinkExtractor, { handleLinks } from '@/components/general/LinkExtractor';
import { ChatMessage } from '@/models/ChatMessage';
import { useChatPageState } from './state';
import { PaginatedResponse } from '@/models/PaginatedResponse';
import { useImageModalState } from '../general/ImageModal/imageModalState';
import UserImage from '../sharedComponent/userimage';

interface IProps {
    message: ChatMessage;
    id: string|undefined;
}

const ChatBubble = React.forwardRef<HTMLDivElement, IProps>(({ message, id = undefined }, ref) => {
    const [post, setPost] = React.useState(message);
    const [shoowSubmenu, setShowSubmenu] = React.useState(false);
    const [showAll, setShowAll] = React.useState(false);


    const queryClient = useQueryClient();
    const { setAll, activeChat } = useChatPageState((state) => state);
    const { setAll: setImageModal  } = useImageModalState((state) => state)
    // query
    const { isLoading } = useQuery([`getSingleChat-${post.id}`, message?.id], () => httpService.get(`${URLS.CHAT_MESSGAE}`, {
        params: {
            messageID: message.id,
            chatID: activeChat?.id,
        }
    }), {
        onSuccess: (data) => {
            const item: PaginatedResponse<ChatMessage> = data.data;
            setPost(item.content[0]);
        },
        onError: (error: any) => {
            alert('An errror occured');
        }
    });

    // mutations

  // MUTATIONS
  const likeMutation = useMutation({
    mutationFn: () => httpService.post(`${URLS.LIKE_POST}/${post?.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries([`getSinglePost-${message?.id}`])
    },
    onError: () =>{
        alert('An error occurred');
    }
  });
    const { userId: myId } = useDetails((state) => state)
    const self = message?.createdBy?.userId === myId;

    if (isLoading ) {
        return (
            <CustomText>Loading...</CustomText>
        )
    }

    const downloadFile = (url: string) => {
        const name = url.split('amazonaws.com/')[1]
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = name;
        anchor.click();
      };

      const FileExtentions = (url: string) => {
        const __format__ = url.split('.');
        const format = __format__[__format__.length - 1];
        return format.toUpperCase();
      }

      const handleImageClick = () => {
        setImageModal({ images: [post.media, ...post?.multipleMedia], isOpen: true })
      }
  return (
    <HStack id={id} ref={ref} justifyContent={'flex-start'} onMouseOver={() => setShowSubmenu(true)} onMouseOut={() => setShowSubmenu(false)} alignItems={'flex-start'} alignSelf={post?.createdBy.userId === myId ? 'flex-end':'flex-start'} flexDirection={self ? 'row':'row-reverse'}  borderRadius='20px'>
       
       <HStack  position={'relative'}  width='100%' justifyContent={'space-between'} alignItems={'flex-start'} flexDirection={self ? 'row':'row-reverse'}>
           

            <VStack borderRadius='10px 20px 20px 0px'  bg={self ? 'white':'brand.chasescrollButtonBlue'}  padding='5px' spacing={0} alignItems={self? 'flex-end':'flex-start'} flexWrap={'wrap'}  maxW={'300px'} minW={'100px'} borderTopLeftRadius={'20px'} borderTopRightRadius={'20px'} borderBottomLeftRadius={self ? '20px':'0px'} borderBottomRightRadius={self ? '0px':'20px'} >
               
                {post.media !== null && (
                    <>
                        { post.mediaType === 'PICTURE' && (
                            <Image onClick={handleImageClick} src={`${post?.media}`} alt='img' width={'100%'} height={'150px'} objectFit={'cover'} borderRadius={'20px'} />
                        )}
                        {
                            post.mediaType === 'VIDEO' && (
                                <Box width='100%' height='100%' maxH={'150px'} overflow={'hidden'}>
                                    <video controls width={'100%'} height={'100%'} style={{ borderRadius: '20px', maxHeight: '150px' }}>
                                        <source src={post.media}  />
                                    </video>
                                </Box>
                            )
                        }
                        {
                            post.mediaType === 'DOCUMENT' && (
                                <HStack width='100%' height={'100px'} >
                                    <Box flex='0.2' onClick={() => downloadFile(post.media)}>
                                        <IoMdCloudDownload color={THEME.COLORS.chasescrollButtonBlue} fontSize='40px' />
                                    </Box>
                                    <Box width='100%'>
                                        <CustomText width='80%' color="brand.chasescrollButtonBlue" fontFamily={'DM-Bold'} fontSize={'16px'}>{FileExtentions(post.media)}</CustomText>
                                    </Box>
                                </HStack>
                            )
                        }
                    </>
                )}
                <Box padding='5px' width="100%" borderRadius={'12px 12px 12px 0px'}>
                        <CustomText color={self ? 'black':'white'} fontFamily={'DM-Regular'} fontSize={'14px'} >
                            { showAll ? handleLinks(post?.message) : post?.message.length > 500 ? post?.message.slice(0, 500) + '...' : post?.message}
                            { post?.message.length > 500 && (
                            <span style={{ fontFamily: 'DM-Bold', color: THEME.COLORS.chasescrollButtonBlue, fontSize:'12px', cursor: 'pointer' }} onClick={() => setShowAll(!showAll)} >{showAll ? 'Show Less' : 'Show More'}</span>
                            )}
                        </CustomText>
                </Box>
                <HStack>
                    {/* { !self && (
                        <CustomText fontFamily={'DM-Medium'} fontSize={'14px'} color='brand.chasescrollButtonBlue'>{post?.createdBy?.username[0]?.toUpperCase()}{post?.createdBy?.username.substring(1, post?.createdBy?.username.length)}</CustomText>
                    )} */}
                    <CustomText color={self ? 'black':'white'} fontFamily={'DM-Medium'} fontSize={'12px'}>{moment(post?.createdDate).format('HH:MM')}</CustomText>
                   {!self && (
                     <HStack spacing={0}>
                        <FiCheck fontSize='16px' color={'white'} />
                        <FiCheck fontSize='16px' color={'white'} />
                    </HStack>   
                   )}
                </HStack>
               
            </VStack>

            <Box width={"fit-content"} >
              <UserImage size={"32px"} font={"13px"} border={"2px"} fontWeight={"medium"} data={post?.createdBy} image={post?.createdBy?.data?.imgMain?.value} />
            </Box>             
            
       </HStack>

      

       
        
    </HStack>
  )
});

export default ChatBubble