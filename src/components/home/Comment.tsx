/* eslint-disable react/display-name */
import { Avatar, Box, Button, HStack, Input, Spinner, VStack, useToast, Image } from '@chakra-ui/react'
import React from 'react'
import CustomText from '../general/Text'
import { FiHeart } from 'react-icons/fi'
import { IComment, Subcomment } from '@/models/Comment'
import { useDetails } from '@/global-state/useUserDetails'
import Moment from 'moment';
import { IMAGE_URL, RESOURCE_BASE_URL, URLS } from '@/services/urls'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import httpService from '@/utils/httpService'
import { Heart } from 'iconsax-react'
import {handleLinks, LinksHandler} from '../general/LinkExtractor'
import { THEME } from '@/theme'
import { error } from 'console'
import _ from 'lodash'
import Link from 'next/link'

const SubCommentBox = React.forwardRef<HTMLDivElement, Subcomment & {deleteComment: (id:string) => void}>(({ deleteComment, comment, id, commentID, timeInMilliseconds, likeCount, likeStatus, user: { userId, username, publicProfile, data, firstName, lastName } },ref) => {
    const [isLiked, setIsLiked] = React.useState(likeStatus);
    const { userId: myId } = useDetails((state) => state);
    const queryClient = useQueryClient();
    const toast = useToast();
    const [showMore, setShowMore] = React.useState(false)


    // GET SUBCOMMENTS

    // mutateion
    const likeComment = useMutation({
        mutationFn: () => httpService.post(`${URLS.LIKE_SUB_COMMENT}/${id}`),
        onSuccess: () => {
            // queryClient.invalidateQueries([`getSubcomments-${commentID}`]);
            setIsLiked(prev => prev === 'LIKED'? 'NOT_LIKED':'LIKED');
        }
    });

    const deleteeComment = useMutation({
        mutationFn: () => httpService.delete(`${URLS.DELETE_SUB_COMMENT}/${id}`),
        onSuccess: () => {
            toast({
                title: 'Success',
                description: 'Deleted',
                status: 'success',
                position: 'top-right',
                isClosable: true,
                duration: 5000,
            });
            queryClient.invalidateQueries([`getSubcomments-${commentID}`]);
            deleteComment(id);
        }
    });


    return (
        <div ref={ref}>
            <HStack width='100%' justifyContent={'space-between'} alignItems={'center'} marginBottom={'20px'}>

                <HStack flex={0.8} overflow={'hidden'} alignItems={'flex-start'}>

                    <Link href={`/dashboard/profile/${userId}`}>
                    
                    <Box width='42px' height='42px' borderRadius={'20px 0px 20px 20px'} borderWidth={'2px'} borderColor={'#D0D4EB'} overflow={'hidden'}>
                            { data === null && (
                            <VStack width={'100%'} height='100%' justifyContent={'center'} alignItems={'center'}>
                                <CustomText fontFamily={'DM-Regular'}>{username ? username[0].toUpperCase(): 'USER'}</CustomText>
                            </VStack>
                            )}
                            { data?.imgMain.value === null && (
                            <VStack width={'100%'} height='100%' justifyContent={'center'} alignItems={'center'}>
                                <CustomText fontFamily={'DM-Regular'}>{firstName[0].toUpperCase()}{lastName[0].toUpperCase()}</CustomText>
                            </VStack>
                            )}
                            {
                            data.imgMain.value && (
                                <>
                                { data?.imgMain?.value.startsWith('https://') && <Image src={`${data.imgMain.value}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} /> }

                                { !data?.imgMain?.value.startsWith('https://') && <Image src={`${IMAGE_URL}${data.imgMain.value}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} /> }
                                </>
                            )
                            }
                    </Box>

                    </Link>

                    <VStack alignItems={'flex-start'}>
                        <VStack alignItems={'flex-start'} spacing={0} width='250px'>
                            <CustomText fontFamily={'Satoshi-Medium'} color='brand.chasescrollButtonBlue'>{username}</CustomText>
                            <CustomText fontFamily={'Satoshi-Regular'}>
                                { showMore ? LinksHandler({ text: comment, showAll: true }) : comment.length > 130 ? LinksHandler({ text: comment, showAll: false, length: 100 })  : LinksHandler({ text: comment, showAll: true })
                                }
                                <br />
                                { comment.length > 130 && (
                                    <span style={{ fontFamily: 'DM-Bold', color: THEME.COLORS.chasescrollButtonBlue, fontSize:'12px', cursor: 'pointer' }} onClick={() => setShowMore(!showMore)} >{showMore ? 'Show Less' : 'Show More'}</span>
                                )}
                            </CustomText>
                        </VStack>

                        <HStack spacing={10} fontSize={'14px'}>
                            <CustomText>{Moment(timeInMilliseconds).fromNow()}</CustomText>
                            <CustomText >{likeCount} like</CustomText>
                            {myId === userId && (
                                <CustomText cursor={'pointer'} color={'red'} onClick={() => deleteeComment.mutate()}>Delete</CustomText>
                            )}
                        </HStack>
                    </VStack>
                </HStack>

                <Heart variant={isLiked === 'LIKED' ? 'Bold':'Outline'} cursor={'pointer'} style={{ alignSelf: 'flex-end' }} onClick={() => likeComment.mutate()} fontSize='20px' color={isLiked === 'LIKED' ? 'red' : 'black'} />
            </HStack>
        
        </div>
    )
})

const CommentBox = React.forwardRef<HTMLDivElement, IComment & { deleteComment: (id:string) => void}>(({ deleteComment: delComment, comment, id, postID, timeInMilliseconds, likeCount, likeStatus, user: { userId, username, publicProfile, data, firstName, lastName } }, ref) => {
    const [showReplies, setShowReplies] = React.useState(false);
    const [subComments, setSubComments] = React.useState<Subcomment[]>([]);
    const [reply, setReply] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [liked, setLiked] = React.useState<'LIKED'|'NOT_LIKED'>(likeStatus);
    const [showMore, setShowMore] = React.useState(false);
    const [hasNextPage, setHasNextPage] = React.useState(false);

    const toast = useToast();
    const intObserver = React.useRef<IntersectionObserver>();

    const { userId: myId } = useDetails((state) => state);
    console.log('myId', myId);
    console.log(`userId - ${userId}`)
    const queryClient = useQueryClient();

    const getSubCount = useQuery([`getSubCount-${id}`, id], () => httpService.get(`${URLS.GET_SUB_COMMENT_COUNT}/${id}`), {
        onSuccess: (data) => {
            console.log(data.data);
        },
        onError:(error) => {
            console.log(error)
        }
    })

    // mutate
    const createSubComment = useMutation({
        mutationFn: (data: any) => httpService.post(`${URLS.CREATE_SUB_COMMENT}`, data),
        onSuccess: (data) => {
            toast({
                title: 'Success',
                description: 'Sub comment added',
                status: 'success',
                position: 'top-right',
                isClosable: true,
                duration: 5000,
            });
            queryClient.invalidateQueries([`getSubcomments-${id}`]);
            setReply('');
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: 'An error occured while adding sub comment',
                status: 'error',
                position: 'top-right',
                isClosable: true,
                duration: 5000,
            })
        }
    });

    const likeComment = useMutation({
        mutationFn: () => httpService.post(`${URLS.LIKE_COMMENT}/${id}`),
        onSuccess: () => {
            console.log(liked);
            // queryClient.invalidateQueries([`getComments-${postID}`]);
            if (liked === 'LIKED') {
                setLiked('NOT_LIKED')
            } else {
                setLiked('LIKED');
            }
        }
    });

    const deleteComment = useMutation({
        mutationFn: () => httpService.delete(`${URLS.DELETE_COMMENT}/${id}`),
        onSuccess: () => {
            toast({
                title: 'Success',
                description: 'Comment deleted',
                status: 'success',
                position: 'top-right',
                isClosable: true,
                duration: 5000,
            });
            queryClient.invalidateQueries([`getComments-${postID}`]);
            delComment(id);
        }
    });

    const deleteSubComment = (id: string) => {
        const arr = subComments.filter((item) => item.id !== id);
        setSubComments(arr);
    }

    // GET SUBCOMMENTS
    const { isLoading, isError, refetch } = useQuery([`getSubcomments-${id}`, id, page], () => httpService.get(`${URLS.GET_ALL_SUBCOMMENTS}`, {
        params: {
            commentID: id,
            page,
            size:20
        }
    }), {
        enabled: true,
        onSuccess: (data) => {
            setSubComments(_.uniqBy([ ...subComments, ...data?.data?.content], 'id'));
            setHasNextPage(data.data.last ? false:true);
        },
        onError: (erroor: any) => {}
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

    const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        console.log(e.key);
        if (e.key === 'Enter' && reply.length > 0) {
            const obj = {
                commentID: id,
                comment: reply
            }
            createSubComment.mutate(obj);
        }
    }, [reply, id, createSubComment])
    return (
        <>
            <HStack ref={ref} width='100%' justifyContent={'space-between'} alignItems={'center'} marginBottom={'20px'} marginRight={['20px', '20px']}>

                <HStack flex={1} alignItems={'flex-start'} overflow={'hidden'}>

                     <Link href={`/dashboard/profile/${userId}`}>
                        
                     <Box width='42px' height='42px' borderRadius={'20px 0px 20px 20px'} borderWidth={'2px'} borderColor={'#D0D4EB'} overflow={'hidden'}>
                            { data === null && (
                            <VStack width={'100%'} height='100%' justifyContent={'center'} alignItems={'center'}>
                                <CustomText fontFamily={'DM-Regular'}>{username ? username[0].toUpperCase(): 'USER'}</CustomText>
                            </VStack>
                            )}
                            { data?.imgMain.value === null && (
                            <VStack width={'100%'} height='100%' justifyContent={'center'} alignItems={'center'}>
                                <CustomText fontFamily={'DM-Regular'}>{firstName[0].toUpperCase()} {lastName[0].toUpperCase()}</CustomText>
                            </VStack>
                            )}
                            {
                            data.imgMain.value && (
                                <>
                                { data?.imgMain?.value.startsWith('https://') && <Image src={`${data.imgMain.value}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} /> }

                                { !data?.imgMain?.value.startsWith('https://') && <Image src={`${IMAGE_URL}${data.imgMain.value}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} /> }
                                </>
                            )
                            }
                    </Box>

                     </Link>

                    <VStack alignItems={'flex-start'} width={'70%'}>
                        <VStack spacing={0} alignItems={'flex-start'} width={['100%', '450px']}>
                            <CustomText fontFamily={'Satoshi-Light'} color='brand.chasescrollButtonBlue'>{username[0].toUpperCase()}{username.substring(1)}</CustomText>
                            <Box>

                                <>
                                { showMore ? LinksHandler({ text: comment, showAll: true }) : comment.length > 130 ? LinksHandler({ text: comment, showAll: false, length: 100 })  : LinksHandler({ text: comment, showAll: true })
                                }
                                <br />
                                { comment.length > 130 && (
                                    <span style={{ fontFamily: 'DM-Bold', color: THEME.COLORS.chasescrollButtonBlue, fontSize:'12px', cursor: 'pointer' }} onClick={() => setShowMore(!showMore)} >{showMore ? 'Show Less' : 'Show More'}</span>
                                )}
                                </>

                            </Box>
                        </VStack>

                        <HStack spacing={10} fontSize={'14px'} width={['100%','60%']}>
                            <CustomText flex={1} fontFamily={'Satoshi-Regular'} >{Moment(timeInMilliseconds).fromNow()}</CustomText>
                            <CustomText flex={1} fontFamily={'Satoshi-Regular'} >{likeCount} like</CustomText>
                            <CustomText flex={1} fontFamily={'Satoshi-Regular'} cursor={'pointer'} color={showReplies ? 'brand.chasescrollButtonBlue':'black'} onClick={() => setShowReplies(prev => !prev)}>{subComments.length > 0 ? (`${subComments.length}`):null} Reply</CustomText>
                            {myId === userId && (
                                <CustomText cursor={'pointer'} color={'red'} onClick={() => deleteComment.mutate()}>Delete</CustomText>
                            )}
                        </HStack>
                    </VStack>
                </HStack>

                <Heart cursor={'pointer'} style={{ alignSelf: 'flex-end'}} onClick={() => likeComment.mutate()} size='20px' variant={liked === 'LIKED' ? 'Bold':'Outline'} color={liked === 'LIKED' ? 'red' : 'black'} />
            </HStack>
            {
                showReplies && (
                    <VStack width={['100%','60%']} marginTop='20px'>
                        <HStack width='100%' paddingLeft={['20px', '70px']}  alignItems={'center'}>
                            <Input fontFamily={'Satoshi-Regular'} value={`${reply}`} onChange={(e) => setReply(e.target.value)} onKeyDown={handleKeyDown} width={'70%'} height={'40px'} borderRadius={10} bg='white' />

                            { createSubComment.isLoading && <Spinner color='blue' colorScheme='blue' size='sm' /> }
                        </HStack>
                        <Box width='100%' paddingLeft={['20px', '70px']} marginTop={'20px'} maxHeight={'200px'} overflowY={'auto'} paddingRight={'20px'}>
                            {
                                !isLoading && isError && (
                                    <VStack width='100%' height={'50px'} justifyContent={'center'} alignItems={'center'}>
                                        <CustomText fontFamily={'Satoshi-Regular'}>An error occured while getting subcomments</CustomText>
                                        <Button fontFamily={'Satoshi-Regular'} onClick={() => refetch()}>Refresh</Button>
                                    </VStack>
                                )
                            }
                            {
                                !isLoading && !isError && subComments.length < 1 && (
                                    <VStack width='100%' height={'50px'} justifyContent={'center'} alignItems={'center'}>
                                        <CustomText fontFamily={'Satoshi-Regular'}>No sub comments</CustomText>
                                    </VStack>
                                )
                            }
                            { !isError && subComments.length > 0 && subComments.map((item, index) => (
                                <>
                                    { index === subComments.length - 1 ? <SubCommentBox deleteComment={deleteSubComment} ref={lastChildRef} {...item} key={index.toString()} />:<SubCommentBox deleteComment={deleteSubComment}  {...item} key={index.toString()} /> }
                                </>
                            ))}
                            {
                                isLoading && (
                                    <VStack width='100%' height={'50px'} justifyContent={'center'} alignItems={'center'}>
                                        <Spinner color='blue' colorScheme='blue' size={'sm'} />
                                        <CustomText fontFamily={'Satoshi-Regular'}>Loading subcomments</CustomText>
                                    </VStack>
                                )
                            }
                        </Box>
                    </VStack>
                )
            }
        </>
    )
})

export default CommentBox