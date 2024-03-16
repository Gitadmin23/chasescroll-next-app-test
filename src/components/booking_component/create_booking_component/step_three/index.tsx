import CustomButton from '@/components/general/Button'
import { Checkbox, Flex, HStack, Input, Select, Text, VStack, useToast } from '@chakra-ui/react'
import React from 'react'
import AddSocialMedia from '../AddSocialMedia'
import { useCreateBookingState } from '@/global-state/useCreateBooking'
import CustomText from '@/components/general/Text'
import { FiPlus, FiX } from 'react-icons/fi'
import { THEME } from '@/theme'
import { useMutation } from 'react-query'
import httpService from '@/utils/httpService'
import { URLS } from '@/services/urls'
import { useDetails } from '@/global-state/useUserDetails'
import { useRouter } from 'next/navigation'

interface Props { 
    next?: any
}

function StepThree(props: Props) {
    const { 
        next
    } = props

    const toast = useToast();

    const [showModal, setShowModal] = React.useState(false);

    const { userId } = useDetails((state) => state);
    const router = useRouter();

    const { socialMediaHandles, description, businessName, email, phone,serviceList, locationData, locationType, removeSocial } = useCreateBookingState((state) => state);

    const { isLoading, mutate } = useMutation({
        mutationFn: (data: any) => httpService.post(URLS.CREATE_VENDOR, data),
        onSuccess: (data) => {
            toast({
                title: 'Success',
                description: 'Business created',
                status: 'success',
                position: 'top-right',
                duration: 5000,
                isClosable: true,
            });
            router.push('/dashboard/booking')
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: 'Error occured while creating business account',
                status: 'error',
                position: 'top-right',
                duration: 5000,
                isClosable: true,
            })
        }
    })
    const submit = () => {
        const data = {
            userID: userId,
            email,
            phone,
            businessName,
            description,
            locationType,
            locationData,
            socialMediaHandles,
            serviceList
        }
        console.log(data);
        mutate(data);
    }

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
            
            <CustomButton isLoading={isLoading} onClick={submit}  borderRadius={"8px"} width={"full"} text='Next' backgroundColor={"#5D70F9"} color={"white"} fontSize={"sm"} />
        </Flex>
    )
}

export default StepThree
