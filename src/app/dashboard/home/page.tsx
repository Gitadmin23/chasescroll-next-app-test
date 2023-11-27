"use client";
import CustomButton from '@/components/general/Button';
import CustomText from '@/components/general/Text'
import ThreadCard from '@/components/home/ThreadCard';
import CreateMediaPost from '@/components/modals/CreateMediaPost';
import { useDetails } from '@/global-state/useUserDetails';
import { IMediaContent, IMediaPost } from '@/models/MediaPost';
import { IMAGE_URL, URLS } from '@/services/urls';
import { THEME } from '@/theme'
import httpService from '@/utils/httpService';
import { Avatar, Box, Flex, HStack, Spinner, Textarea, VStack, useToast, Image } from '@chakra-ui/react'
import lodash, { uniq } from 'lodash';
import React from 'react'
import { FiSend, FiImage } from 'react-icons/fi';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Heart, MessageAdd, Share, DocumentDownload, Send2, Image as ImgIcon } from 'iconsax-react';
import { IUser } from '@/models/User';
import ImageModal from '@/components/general/ImageModal';



function Home() {
  const [page, setPage] = React.useState(0);
  const [post,setPost] = React.useState('');
  const [posts, setPosts] = React.useState<IMediaContent[]>([]);
  const [hasNextPage, setHasNextPage] = React.useState(false);
  const [newIttem, setNew] = React.useState<IMediaContent[]>([]);
  const [showModal, setShowModal] = React.useState(false);

  const { firstName, lastName, userId, username, user: Details } = useDetails((state) => state);
  console.log(Details);

  const [user, setUser] = React.useState<IUser | null>(null);

  const intObserver = React.useRef<IntersectionObserver>();
  const toast = useToast();
  const queryClient = useQueryClient();

  const getUser = useQuery(['getUserDets', userId], () => httpService.get(`${URLS.GET_USER_PRIVATE_PROFILE}`, {
  }), {
    onSuccess: (data) => {
      setUser(data.data);
      console.log(data.data);
    },
  });

  const { isLoading, isError, refetch } = useQuery(['getPostss', page], () => httpService.get(`${URLS.GET_PUBLIC_POST}`, {
    params: {
      page,
    }
  }), {
    onSuccess: (data) => {
      setPosts(uniq([...posts, ...data?.data?.content]));
      setHasNextPage(data.data.last ? false:true);
    },
  });

  const lastChildRef = React.useCallback((post: any) => {
    if (isLoading) return;
    if (intObserver.current) intObserver.current.disconnect();
    intObserver.current = new IntersectionObserver((posts) => {
      if (posts[0].isIntersecting && hasNextPage) {
        setPage(prev => prev + 1); 
      }
    });
    if (post) intObserver.current.observe(post);
   }, [isLoading, hasNextPage, setPage]);

   //MUTATIONS
   const { mutate } = useMutation({
    mutationFn: () => httpService.get(`${URLS.GET_POSTS}`, {
      params: {
        page: 0,
      }
    }),
    onSuccess: (data: any) => {
      console.log(data.data.content[0]);
      const item: IMediaPost = data.data as IMediaPost;
      newIttem.unshift(item.content[0]);
      setNew(lodash.uniq(newIttem));
    }
  })

   const createPostMutation = useMutation({
    mutationFn: (data: any) => httpService.post(`${URLS.CREATE_POST}`, data),
    onSuccess: () => {
      toast({
        title: 'Post Created',
        description: 'Your post has been created an is live',
        duration: 5000,
        status: 'success',
        isClosable: true,
        position: 'top-right'
      });
      setPost('');
      mutate();
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'An eror occured while trying to create post',
        duration: 5000,
        status: 'error',
        isClosable: true,
        position: 'top-right'
      });
    }
   });

   const handlePostCreation = React.useCallback(() => {
    if (post.length < 1) return;
    createPostMutation.mutate({
      text: post,
      type: 'NO_IMAGE_POST',
      sourceId: userId
    });
   }, [createPostMutation, post, userId])

  return (
    <VStack width="full" h={"full"} overflowY={"auto"} alignItems={'flex-start'} >
      {/* MODAL */}
      <CreateMediaPost mutate={mutate} isOpen={showModal} onClose={() => setShowModal(false)} />

      <VStack width={['100%', '100%', '40%', '40%']} height='180px'  paddingTop='20px' paddingLeft={'20px'} paddingRight={['20px', '0px']} overflowY={'hidden'}>

        {/* TEXTBOX */}
        <VStack alignItems={'flex-start'} justifyContent={'flex-start'} width='100%' height='150px' bg='whitesmoke' borderWidth={0} shadow={'md'} borderColor={'lightgrey'} borderRadius={'10px'} padding='10px'>
          <HStack width='100%' height={'90px'}>

            <Box  width='32px' height='32px' borderRadius={'20px 0px 20px 20px'} borderWidth={'2px'} borderColor={'#D0D4EB'} overflow={'hidden'}>
            {Details?.data.imgMain.value === null && (
              <VStack width={'100%'} height='100%' justifyContent={'center'} alignItems={'center'}>
                <CustomText fontFamily={'DM-Regular'}>{Details?.username[0].toUpperCase()}</CustomText>
              </VStack>
            )}
            {
              Details?.data.imgMain.value !== null && (
                <>
                  { Details?.data?.imgMain?.value.startsWith('https://') && <Image src={`${Details?.data.imgMain.value}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} /> }

                  { !Details?.data?.imgMain?.value.startsWith('https://') && <Image src={`${IMAGE_URL}${Details?.data.imgMain.value}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} /> }
                </>
              )
            }
            </Box>

            <Textarea bg='whitesmoke' borderWidth={'0px'} fontFamily={'DM-Regular'} fontSize={'14px'} flex={'1'} width='100%'  placeholder={`What's on your mind @${username}`} resize={'none'} value={post} onChange={(e) => setPost(e.target.value)}></Textarea>
            { !createPostMutation.isLoading && <Send2 onClick={() => handlePostCreation()} size={'30px'} color={THEME.COLORS.chasescrollButtonBlue} /> }
            { createPostMutation.isLoading && <Spinner size={'sm'} color={THEME.COLORS.chasescrollButtonBlue} /> }
          </HStack>

          <HStack>
            <ImgIcon size={25} color={THEME.COLORS.chasescrollButtonBlue} />
            <CustomText onClick={() => setShowModal(true)} fontFamily={'DM-Regular'} fontSize={'sm'} cursor='pointer' color='brand.chasescrollButtonBlue'>Add Photos /Video in your post</CustomText>
          </HStack>
        </VStack>
       
      </VStack>

          <Box flex='1' width={'full'} height={'full'} overflow={'auto'} paddingX='20px' paddingTop='0px'>

          {
            !isLoading && isError && (
              <VStack width={'30%'} height={'100px'} justifyItems={'center'}>
                <CustomText>An error occured please retry</CustomText>
                <CustomButton isLoading={isLoading} text='Retry' onClick={() => refetch()} backgroundColor={THEME.COLORS.chasescrollButtonBlue} />
              </VStack>
            )
          }
          <VStack width={['100%', '100%', '40%', '40%']} height={['100%', '80%']}>
            {
              newIttem.map((item, i) => (
                <ThreadCard post={item} key={i.toString()} />
              ))
            }
            {posts.map((item, i) => {
              if (i === posts.length - 1) {
                return <ThreadCard ref={lastChildRef} key={i.toString()} post={item} />
              }
              return (<ThreadCard key={i.toString()} post={item} />)
            })}
          </VStack>

          </Box>

    </VStack>
  )
}

export default Home
