import CustomText from '@/components/general/Text'
import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Modal, ModalBody, ModalContent, ModalOverlay, VStack, Image, Button, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useMutation } from 'react-query';

type Props = {
    isOpen: boolean;
    onClose: () => void;
}

function DeleteAccoutModal({ isOpen, onClose }: Props) {
    const router = useRouter();
    const toast = useToast();

    const { isLoading, mutate } = useMutation({
        mutationFn: () => httpService.delete(`${URLS.DELETE_ACCOUNT}`),
        onSuccess: () => {
            toast({
                title: 'Success',
                description: ' You account has been deleted',
                status: 'success',
                position: 'top-right',
                duration: 3000,
                isClosable: true,
            });
            localStorage.clear();
            sessionStorage.clear();
            router.replace('/auth');
        }, 
        onError: () => {
            toast({
                title: 'Error',
                description: 'An error occured while deleting your account',
                status: 'error',
                position: 'top-right',
                isClosable: true,
                duration: 3000,
            });
        },
    });
    
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent width='350px' bg='white' height='326px' borderRadius={'16px'}>
            <ModalBody >
                <VStack width='100%' justifyContent={'center'} height='100%' alignItems={'center'} spacing={3}>
                    <Image alt='delete' src='/assets/images/deleteaccount.svg' />
                    <CustomText fontFamily='DM-Bold' textAlign={'center'} fontSize={'20px'}>Delete Account</CustomText>
                    <CustomText fontFamily={'DM-Regular'} textAlign={'center'} fontSize={'16px'} color='grey'>Are you sure you want  to delete this account ? this action cannot be undone.</CustomText>

                    <Button isLoading={isLoading} onClick={() => mutate()} width='100%' height='42px' bg='red' color="white" variant='solid'>Delete</Button>
                    <Button onClick={() => onClose()} width='100%' height='42px' borderWidth={'0px'} color="grey" variant='outline' outlineColor={'lightgrey'}>Cancel</Button>
                </VStack>
            </ModalBody>
        </ModalContent>
    </Modal>
  )
}

export default DeleteAccoutModal