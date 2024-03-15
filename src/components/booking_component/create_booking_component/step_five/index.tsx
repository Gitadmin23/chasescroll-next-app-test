import CustomButton from '@/components/general/Button';
import CustomText from '@/components/general/Text'
import { useCreateBookingState } from '@/global-state/useCreateBooking';
import { THEME } from '@/theme';
import { Button, HStack, Select, Switch, VStack } from '@chakra-ui/react'
import React from 'react'
import AddServiceModal from '../AddServiceModal';
import { FiPlus } from 'react-icons/fi';

const DayPicker = ({ day }: {day: string}) => {
    const [checked, setChecked] = React.useState(false);
    return (
        <HStack w='100%' height={'50px'} justifyContent={'flex-start'}>
            <CustomText fontFamily={'DM-Medium'} fontSize={'16px'} color={'grey'} width={'100px'}>{day}</CustomText>
            <Switch checked={checked} size='lg' onChange={() => setChecked((prev) => !prev)} />
            <CustomText fontFamily={'DM-Medium'} fontSize={'16px'} color={'grey'} width='100px' marginLeft={'40px'}>{checked ? 'Open':'Closed'}</CustomText>
        </HStack>
    )
}

function StepFive({ next }: {
    next: (step: number) => void
}) {
    const [showModal, setShowModal] = React.useState(false);
    const { serviceList, addService, removeService } = useCreateBookingState((state) => state);
  return (
    <VStack w='full' alignItems={'flex-start'}>
        {/* MODAL */}
        <AddServiceModal isOpen={showModal} onClose={() => setShowModal(false)} />
        <HStack>
            <CustomText fontFamily={'DM-Bold'} fontSize={'20px'} color='black'>Add Services</CustomText>
            <FiPlus size={20} color={THEME.COLORS.chasescrollButtonBlue} cursor={'pointer'} onClick={() => setShowModal(true)} />
        </HStack>
        <CustomText fontFamily={'DM-Regular'} fontSize={'16px'} marginBottom={'20px'}>Add te services your render (You can add up to 3 services)</CustomText>

        { serviceList.length < 1 && (
            <HStack>
                <CustomText cursor={'pointer'} fontFamily={'DM-Regular'} fontSize={'sm'} color={THEME.COLORS.chasescrollButtonBlue}>Add Service +</CustomText>
            </HStack>
        )}
        { serviceList.length > 0 && serviceList.map((item, index) => (
            <HStack key={index.toString()} spacing={1} borderRadius={'0px'} marginBottom='10px' borderWidth={'0px'} alignItems={'center'} justifyContent={'space-between'} paddingX={'10px'} borderColor={'brand.chasescrollButtonBlue'} bg='whitesmoke' width={['100%', '50%']} height='70px'>
               <VStack alignItems={'flex-start'} spacing={1}>
                    <CustomText fontFamily={'DM-Bold'} fontSize={'16px'} color='black'>{item.serviceName}</CustomText>
                    <CustomText fontFamily={'DM-Regular'} fontSize={'14px'} color='grey'>{item.serviceDescription}</CustomText>
               </VStack>

               <CustomText color='red' fontSize={'14px'} fontFamily={'DM-Bold'} cursor={'pointer'} onClick={() => removeService(index)}>Delete</CustomText>
            </HStack>
        ))}

        <Button onClick={() => next(2)} width='50%' height='50px' bg='brand.chasescrollButtonBlue' color="white" marginTop={'10px'}>Next</Button>

    </VStack>
  )
}

export default StepFive