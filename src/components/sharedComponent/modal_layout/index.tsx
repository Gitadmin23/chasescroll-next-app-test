import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'

type props = {
    open: any,
    close: any,
    size?: any,
    bg?: any,
    rounded?: boolean,
    children: React.ReactNode,
    title?: string,
    scrollBehavior?: "outside" | "inside"
}

export default function ModalLayout({ open, close, children, size, bg, rounded, title, scrollBehavior }: props) {

    // const [size, setSize] = React.useState("md") 

    return (
        <Modal onClose={close} scrollBehavior={scrollBehavior ? scrollBehavior : "inside"} size={size ? size : "md"} isOpen={open} isCentered>
            <ModalOverlay />
            <ModalContent backgroundColor={bg ? bg : "#fff"} rounded={rounded ? "0px" : "6px"} padding="0px" margin="16px" w="full"  h={scrollBehavior ? "full" : "auto"}  >
                <ModalCloseButton color={'white'} size={'lg'} />
                {title && (
                    <>
                        <ModalHeader textAlign={"center"} >{title}</ModalHeader>
                        <ModalCloseButton />
                    </>
                )}
                <ModalBody backgroundColor={bg ? bg : "#fff"} borderRadius={rounded ? "0px" : "8px"} margin="0px" padding="0px" h={scrollBehavior ? "full" : "auto"} w="full" >
                    {children}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
