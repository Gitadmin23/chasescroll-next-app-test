import React from 'react'
import { Modal, ModalOverlay, ModalBody, ModalContent, ModalCloseButton, Box, VStack,Image, Input, Textarea, Select, HStack, Button, useToast } from '@chakra-ui/react'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import CustomText from '@/components/general/Text'
import { useCreateBookingState } from '@/global-state/useCreateBooking'

function AddSocialMedia({
    open,
    close
}: {
    open: boolean,
    close: () => void
}) {
    const { addSocialMedia } = useCreateBookingState((state) => state);
    const [handle, setHandle] = React.useState('');
    const [platform, setPlatform] = React.useState('');

    const toast = useToast();

    const add = () => {
        if (handle === '' || platform == '') {
            toast({
                title: 'warning',
                description: 'Please fillin all fields',
                status: 'warning',
                duration: 5000,
                isClosable: false,

            });
            return;
        }
        const item = {
            socialMediaHandle: handle,
            platform,
            details: handle
        };
        addSocialMedia(item);
        close();
    }

  return (
    <ModalLayout open={open} close={() => close()} size={'sm'} >
       <VStack padding='20px' alignItems={'flex-start'}>
        <CustomText>Add Social Media</CustomText>
            <Select marginY={'0px'} value={platform} onChange={(e) => setPlatform(e.target.value)}>
                <option value="facebook">Facebook</option>
                <option value="twitter">Twiiter</option>
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
                <option value="website">Website</option>
                <option value="tiktok">Tiktok</option>
                <option value="snapchat">Snapchat</option>
            </Select>

            <CustomText>Handle</CustomText>
            <Input value={handle} onChange={(e) => setHandle(e.target.value)}  />

            <Button onClick={add} color='white' bg='brand.chasescrollButtonBlue' height='45px'>Add +</Button>
       </VStack>
    </ModalLayout>
  )
}

export default AddSocialMedia