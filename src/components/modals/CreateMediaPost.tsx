import React from 'react'
import { Modal, ModalOverlay, ModalBody, ModalContent, useToast } from '@chakra-ui/react';
import SelectImages from './mediapostPages/SelectImages';
import ShowImages from './mediapostPages/ShowImages';
import Success from './mediapostPages/Success';
import AWSHook from '@/hooks/awsHook';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    mutate: () => void;
}

function CreateMediaPost({isOpen, onClose, mutate}:IProps) {
    const [stage, setStage] = React.useState(1);
    const [files, setFiles] = React.useState<File[]>([]);
    const { uploadedFile, loading, fileUploadHandler } = AWSHook();
    const toast = useToast();

    const handleImagePicked = React.useCallback((Files: FileList, goNext?: boolean) => {
        console.log(Files)
        const file = Files[0];
        if (file.size > 314572800) {
            toast({
                title: 'Error',
                description: 'File size too large',
                position: 'top-right',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }
        if (goNext) {
            const arrs: File[] = [];
            for (let i = 0; i < Files.length; i++) {
                arrs.push(Files[i]);
            }
            setFiles(prev => [...prev, ...arrs]);
            setStage(prev => prev+1);
            return;
        }
        const arrs: File[] = [];
            for (let i = 0; i < Files.length; i++) {
                arrs.push(Files[i]);
            }
            setFiles(prev => [...prev, ...arrs]);
    }, [toast]);

    const handleSetStage = React.useCallback((page: number) => {
        setStage(page);
    }, []);

    const emptyFiles = React.useCallback(() => {
        setFiles([]);
    }, [])

    const handleSwitch = React.useCallback(() => {
        switch(stage) {
            case 1: {
                return <SelectImages setImage={handleImagePicked} />
            }
            case 2: {
                return <ShowImages mutate={mutate} setEmpty={emptyFiles} stage={stage}  handleStage={handleSetStage} files={files as any} setImage={handleImagePicked} />
            }
            case 4: {
                return <Success onClose={onClose} handleStage={handleSetStage} />
            }
            default: {
                return <ShowImages mutate={mutate}  setEmpty={emptyFiles} stage={stage} handleStage={handleSetStage} files={files as any} setImage={handleImagePicked} />
            }
        }
    }, [stage, handleImagePicked, mutate, emptyFiles, handleSetStage, files, onClose]);


  return (
    <Modal isOpen={isOpen} onClose={() => {
        setStage(1);
        setFiles([]);
        onClose()
        }} closeOnEsc={true} closeOnOverlayClick={true} size='md' isCentered>
        <ModalOverlay />
        <ModalContent width={'auto'} height={'auto'} bg='white' padding='0px' overflow={'hidden'} borderRadius={'20px'}>
            <ModalBody width='100%' height='100%' padding='0px' overflow={'hidden'}>
                {handleSwitch()}
            </ModalBody>
        </ModalContent>
    </Modal>
  )
}

export default CreateMediaPost