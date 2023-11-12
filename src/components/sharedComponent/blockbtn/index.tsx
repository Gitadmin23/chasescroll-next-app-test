import { URLS } from '@/services/urls';
import httpService from '@/utils/httpService';
import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { CgMore } from "react-icons/cg";
import { useQueryClient } from 'react-query';

interface Props {
    user_index: any,
    setDeleted?: any,
    deleted?: any,
    isprofile?: boolean
}

function BlockBtn(props: Props) {
    const {
        user_index,
        setDeleted,
        deleted,
        isprofile
    } = props

    const [showModal, setShowModal] = useState("0")
    const [loading, setLoading] = useState("0")
    const toast = useToast()
    const queryClient = useQueryClient()

    const blockSuggestion = async (event: any) => {

        event.stopPropagation();
        setLoading(user_index)
        const response = await httpService.post(URLS.BLOCK_USER, {
            blockType: "USER",
            typeID: user_index,
        })

        toast({
            title: 'Success',
            description: response?.data?.message,
            status: 'success',
            isClosable: true,
            duration: 5000,
            position: 'top-right',
        });

        queryClient.invalidateQueries([URLS.GET_SUGGESTED_FRIENDS])
        // if(!isprofile) {
        //     setDeleted([...deleted, user_index])
        // }
        setLoading("")
    }

    const clickHandler = (event: any) => {
        event.stopPropagation();
        setShowModal(user_index)
    }


    const closeHandler = (event: any) => {
        event.stopPropagation();
        setShowModal("0")
    }

    return (
        <Flex position={"relative"} width={isprofile ? "fit-content" : "full"} >
            {isprofile && (
                <Text onClick={(e) => blockSuggestion(e)} as={"button"} width={"full"}>
                    {loading === user_index ? "Loading.." : "Block"}
                </Text>
            )}
            {!isprofile && (
                <Box as="button" onClick={(e: any) => clickHandler(e)} ml={"auto"} >
                    <CgMore size={25} />
                </Box>
            )}
            {showModal === user_index && (
                <Box position={"absolute"} zIndex={"20"} right={"0px"} left={"0px"} top={"25px"}  >
                    <Button onClick={(e) => blockSuggestion(e)} fontSize={"sm"} width={"full"}>
                        {loading === user_index ? "Loading.." : "Block"}
                    </Button>
                </Box>
            )}
            {showModal === user_index && (
                <Box onClick={closeHandler} position={"fixed"} inset={"0px"} zIndex={"10"} />
            )}
        </Flex>
    )
}

export default BlockBtn
