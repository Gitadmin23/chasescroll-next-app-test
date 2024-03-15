import CustomButton from '@/components/general/Button'
import { Checkbox, Flex, HStack, Input, Select, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import AddSocialMedia from '../AddSocialMedia'
import { useCreateBookingState } from '@/global-state/useCreateBooking'
import CustomText from '@/components/general/Text'
import { FiPlus, FiX } from 'react-icons/fi'
import { THEME } from '@/theme'

interface Props { 
    next?: any
}

function StepThree(props: Props) {
    const { 
        next
    } = props

    const [showModal, setShowModal] = React.useState(false);

    const { socialMediaHandles, removeSocial } = useCreateBookingState((state) => state);

    return (
        <Flex maxW={"412px"} w={"full"} flexDir={"column"} >
            <AddSocialMedia open={showModal} close={() => setShowModal(false)} />
            <HStack>
                <Text color={"#000000CC"} fontSize={"2xl"} fontWeight={"medium"} >Add your Social Media handles</Text>
                <VStack width='30px' height='30px' borderRadius='15px' justifyContent={'center'} bg='whitesmoke' cursor={'pointer'}>
                    <FiPlus color={THEME.COLORS.chasescrollButtonBlue} size={18} onClick={() => setShowModal(true)} />
                </VStack>
            </HStack>
            <Text fontSize={"sm"} color={"#00000080"} mt={"2"} >Add your social media handles for more engaments</Text>
            <Flex my={"6"} flexDir={"column"} w={"full"} gap={"4"} >
                { socialMediaHandles.map((item, index) => (
                    <HStack key={index.toString()} justifyContent={'space-between'}>
                        <VStack>
                            <CustomText fontFamily={'DM-Bold'} fontSize={'18px'} color='black'>{item.platform}</CustomText>
                            <CustomText fontFamily={'DM-Regular'} fontSize={'14px'} color='grey'>{item.socialMediaHandle}</CustomText>
                        </VStack>
                        <FiX color={THEME.COLORS.chasescrollButtonBlue} size={18} onClick={() => removeSocial(index)} />
                    </HStack>
                ))}
            </Flex>
            
            <CustomButton  borderRadius={"8px"} width={"full"} text='Next' backgroundColor={"#5D70F9"} color={"white"} fontSize={"sm"} />
        </Flex>
    )
}

export default StepThree
