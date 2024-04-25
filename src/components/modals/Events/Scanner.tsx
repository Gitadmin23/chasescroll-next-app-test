import React from 'react';
import {Modal, ModalBody, ModalCloseButton, ModalContent, Box, VStack, Spinner, Image, Button} from "@chakra-ui/react";
import { Scanner as QrcodeScanner } from '@yudiel/react-qr-scanner';
import {useMutation} from "react-query";
import httpService from "@/utils/httpService";
import {URLS} from "@/services/urls";
import CustomText from "@/components/general/Text";
import Ticket from "@/components/event_component/ticket";
import {ITicket} from "@/models/Ticket";

interface IProps {
    isOpen: boolean;
    onClose:() => void;
}

export default function Scanner({
    isOpen,
    onClose
                                }: IProps) {
    const [approved, setApproved] = React.useState(false);
    const [show, setShow] = React.useState(true);
    const [ticket, setTicket] = React.useState<ITicket|null>(null);
    const [scanned, setScanned] = React.useState(false);

    const { isLoading, mutate, isError } = useMutation({
        mutationFn: (data: string) => httpService.get(`${URLS.VALIDATE_TICKET(data)}`),
        onSuccess: (data) => {
            console.log(data.data);
            setTicket(data?.data?.ticket);
            setApproved(data?.data?.validate);
            const item: {} = data.data;
        }
    })

    const handleScanner = (str: string) => {
        setShow(false);
        mutate(str);
    }

    const retry = () => {
        setShow(true);
        setScanned(false);
    }

    return (
        <Modal isOpen={isOpen} isCentered={true} onClose={() => onClose()} size={scanned && !isLoading && !isError ? 'full':'full'}>
            <ModalContent bg={'grey'}>
                <ModalCloseButton size={'large'} onClick={() => onClose()} />
                <ModalBody position={'relative'} width={'100%'} height={'400px'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    { !isLoading && show && !scanned && (
                        <Box width={'300px'} height={'300px'} bg={'black'}>
                           <Box width={'100%'} height={'100%'}>
                               <QrcodeScanner
                                   enabled={true}
                                   onResult={(text, result) => handleScanner(text)}
                                   onError={(error) => console.log(error?.message)}
                               />
                           </Box>
                        </Box>
                    )}
                    {isLoading && (
                        <VStack justifyContent={'center'} w={'100%'} h={'100%'}>
                            <Spinner />
                            <CustomText>Verifing Ticket...</CustomText>
                        </VStack>
                    )}
                    { !isLoading && !show && approved && (
                        <></>
                    )}
                    { !isLoading && !show && !isError &&(
                       <>
                           <Ticket showQrCode={true} ticket={ticket as ITicket} />
                           <Box width={'250px'} height={'250px'} position={'absolute'} top={'160px'} left={'220px'} bg={'transparent'}>
                               <Image src={ approved ? '/assets/approved.svg': '/assets/denied.svg'} alt={'approved'} width={'100px'} height={'100px'} objectFit={'cover'} />
                           </Box>
                       </>
                    )}
                    { !isLoading && isError && !show && (
                        <Box flex={1}>
                            <CustomText fontFamily={'DM-Bold'} fontSize={'18px'} textAlign={'center'}>An error occured while scanning the ticket</CustomText>
                            <Button onClick={retry} width={'100%'} height={'45px'} color={'white'} bg={'brand.chasescrollButtonBlue'}>Retry</Button>
                        </Box>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
