/* eslint-disable react/display-name */
import CustomText from '@/components/general/Text'
import { IComment } from '@/models/Comment'
import { Box, HStack, Image, VStack } from '@chakra-ui/react'
import React from 'react'
import moment from 'moment';
import { IMAGE_URL } from '@/services/urls';

const CommentCard = React.forwardRef<HTMLDivElement, { comment: IComment }>(({ comment}, ref) => {
  return (
   <HStack ref={ref} width="100%" marginBottom='20px'>
        <Box width='32px' height='32px' borderRadius={'20px 0px 20px 20px'} borderWidth={'2px'} borderColor={'brand.chasescrollBlue'} overflow={'hidden'}>
            { comment.user.data.imgMain.value === null && (
                <HStack width='100%' height='100%' justifyContent={'center'} alignItems={'center'} spacing={0}>
                    <CustomText fontFamily={'DM-Bold'} fontSize={'16px'}>{comment.user.firstName[0].toUpperCase()} {comment.user.lastName[0].toUpperCase()}</CustomText>
                </HStack>
            )}
            {
                comment.user.data.imgMain.value !== null && (
                    <>
                        { comment.user.data.imgMain.value.startsWith('https://') && <Image src={comment.user.data.imgMain.value} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} /> }
                        { !comment.user.data.imgMain.value.startsWith('https://') && <Image src={`${IMAGE_URL}${comment.user.data.imgMain.value}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} /> }
                    </>
                )
            }
        </Box>
        <VStack>
            <HStack>
                <CustomText fontFamily={'DM-Medium'} fontSize={'14px'}>{comment.user.username}</CustomText>
                <CustomText fontFamily={'DM-Light'} fontSize={'10px'}>{moment(comment.timeInMilliseconds).fromNow()}</CustomText>
            </HStack>
            <Box width='100%'>
                <CustomText fontFamily={'DM-Regular'} fontSize={'12px'}>{comment?.comment}</CustomText>
            </Box>
        </VStack>
   </HStack>
  )
})

export default CommentCard