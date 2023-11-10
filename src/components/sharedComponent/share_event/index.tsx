import { Box, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FiUpload } from 'react-icons/fi'
import ModalLayout from '../modal_layout'
import SendMessage from '@/components/modals/send_message'
import SendMesageModal from '@/components/modals/send_message/send_to_app_user'
import { ShareIcon } from '@/components/svg'

interface Props {
    id: any,
    size?: string,
    isprofile?: boolean,
    istext?: boolean
}

function ShareEvent(props: Props) {
    const {
        id,
        size,
        isprofile,
        istext
    } = props

    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState(1)

    const CloseModal = () => {
        setOpen(false)
        setTab(1)
    }

    const clickHandler = (event: any) => {
        event.stopPropagation();
        setOpen(true)
    }

    return (
        <Box width={"fit-content"} zIndex={"20"} mt={size === "18px" ? "10px" : "0px"} >
            {(isprofile  && !istext) && ( 
                <Flex onClick={(e: any) => clickHandler(e)} as={"button"} width={"48px"} bgColor={"#FFFFFF1A"} height={"48px"} rounded={"full"} pr={"2px"} alignItems={"center"} justifyContent={"center"} >
                    <ShareIcon  /> 
                </Flex>
            )}
            {(isprofile && istext) && (
                <Text onClick={(e: any) => clickHandler(e)} as={"button"} >Share</Text>
            )}
            {!isprofile && (
                <Box onClick={(e: any) => clickHandler(e)} as='button' > 
                    <ShareIcon width={size ? size : "24px"} color={"#3C41F0"} /> 
                </Box>
            )}
            <ModalLayout open={open} close={CloseModal} title={tab === 1 ? "Share" : "Share with friends"} >
                {tab === 1 && (
                    <SendMessage isprofile={isprofile} id={id} click={setTab} />
                )}
                {tab === 2 && (
                    <SendMesageModal isprofile={isprofile} id={id} onClose={CloseModal} />
                )}
            </ModalLayout>
        </Box>
    )
}

export default ShareEvent
