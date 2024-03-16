import React from 'react'
import { Modal, ModalOverlay, ModalBody, ModalContent, ModalCloseButton, Box, VStack,Image, Input, Textarea, Select, HStack, Button, useToast } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import httpService from '@/utils/httpService'
import { URLS } from '@/services/urls'
import { useCreateBookingState } from '@/global-state/useCreateBooking'
import CustomText from '@/components/general/Text'
import LoadingAnimation from '@/components/sharedComponent/loading_animation'
import { THEME } from '@/theme'
import { FiPlus, FiX } from 'react-icons/fi'
import { useDetails } from '@/global-state/useUserDetails'

const daysofTheWeek = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
}

function AddServiceModal({
    isOpen,
    onClose
}: { isOpen: boolean, onClose: () => void}) {
    const [selected, setSelected] = React.useState<string[]>([]);
    const [serviceName, setServiceName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [images, setImages] = React.useState<File[]>([]);
    const [time, setTime] = React.useState<Array<{ startTime: string, endTime: string, availabilityDayOfWeek:number}>>([])
    
    const inputRef = React.useRef<HTMLInputElement>(null);
    const toast = useToast();

    const { addService } = useCreateBookingState((state) => state);
    const { userId } = useDetails((state) => state)
    const { isLoading, data  } = useQuery(['getEventCategories'], () => httpService.get(URLS.GET_EVENTS_TYPES), {
        onError: () => {},
    });

    React.useEffect(() => {
        return () => {
            setServiceName('');
            setDescription('');
            setImages([]);
            setTime([]);
        }
    }, []);

    const handleTimeChange = (event: string) => {
      
        // Split the time string into hours and minutes
        const [hoursStr, minutesStr] = event.split(':');
        
        // Convert hours and minutes to numbers
        const hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr, 10);
    
        // Calculate time in minutes
        const totalMinutes = hours * 60 + minutes;
        return totalMinutes;
      };

    const AddOrRemoveItem = (item: string) => {
        if (selected.includes(item)) {
            setSelected((prev) => prev.filter((itm) => item !== itm))
        } else {
            setSelected((prev) => [...prev, item]);
        }
    }

    const handlePickedFiles = (files: File[]) => {
        console.log(files);
        setImages((prev) => [...prev, files[0]]);
    }

    const addTimeEntry = () => {
        setTime((prev) => [...prev, { startTime: '', endTime: '', availabilityDayOfWeek: 0}])
    }

    const removeTime = (indx: number) => {
        setTime((prev) => prev.filter((item, index) => index !== indx));
    }

    const handleChange = (index: number, field: any, value: string) => {
        const updated = time.map((item, indx) => {
            if (index === indx) {
                return { ...item, [field]: value}
            }
            return item;
        });

        setTime(updated);
    }



    const handleAdd = () => {

        if(serviceName === '' || description === '') {
            toast({
                title: 'Warnng',
                description: 'please filling the service name and description',
                status: 'warning',
                duration: 5000,
                position: 'top-right',
                isClosable: true,
            });
            return;
        } else if (selected.length < 1) {
            toast({
                title: 'Warnng',
                description: 'u must select at least on event category',
                status: 'warning',
                duration: 5000,
                position: 'top-right',
                isClosable: true,
            });
            return;
        } else if (time.length < 1) {
            toast({
                title: 'Warnng',
                description: 'you must select at least one time of operations',
                status: 'warning',
                duration: 5000,
                position: 'top-right',
                isClosable: true,
            });
            return;
        }
        addService({
            vendorID: userId,
            serviceName,
            serviceDescription: description,
            availabilityTimes: time.map((item) => ({
                ...item,
                startTime: handleTimeChange(item.startTime),
                endTime: handleTimeChange(item.endTime),

            })) as any,
            eventTypes: selected,
            photos: images,
        });
        onClose();
        
    }
  return (
    <Modal isOpen={isOpen} isCentered closeOnEsc closeOnOverlayClick onClose={() => onClose()} size={'lg'}>
        <input type='file' ref={inputRef} accept='image/*' onChange={(e) => handlePickedFiles(e.target.files as any)} />
        <ModalOverlay />
        <ModalContent bg='white' width={['100%', '100%']} height={'500px'} overflowY={'auto'} borderRadius={'0px'}>
            <ModalBody bg='white' paddingBottom={'50px'} >
                <CustomText color='black' fontSize={'18px'} fontFamily={'DM-Bold'}>Add Service</CustomText>

                <CustomText fontSize="16px" fontFamily={'DM-Regular'} marginTop={'20px'} color='grey'>Select event categories you want to be associated with your service</CustomText>
                <Box width={'100%'} whiteSpace={'nowrap'} height='60px' bg='white' overflowX={'auto'} paddingTop="5px">
                    { isLoading && (
                        <VStack width='100%' height="100%"></VStack>
                    )}
                <LoadingAnimation loading={isLoading} >
                    { !isLoading && (data?.data as string[]).map((item, index) => (
                        <Box cursor='pointer' marginRight={'10px'} marginTop={'6px'} display={'inline-block'} width={'auto'} overflow={'hidden'} borderRadius={'100px'} height={'70%'} onClick={() => AddOrRemoveItem(item)} bg={selected.includes(item) ? THEME.COLORS.chasescrollButtonBlue:'whitesmoke'} borderWidth='0px' borderColor='brand.chasescrollButtonBlue' justifyContent={'center'} key={index.toString()}>
                            <VStack flex='1' justifyContent={'center'} height='100%' paddingX='10px'>
                            <CustomText color={selected.includes(item) ? 'white':'black'} fontSize={'14px'} fontFamily={'DM-Bold'}>{item.replace('_', ' ')}</CustomText>
                            </VStack>
                        </Box>
                    ))}
                </LoadingAnimation>
                   
                </Box>
                
                <CustomText fontSize="16px" fontFamily={'DM-Regular'} marginTop={'20px'} color='grey'>Add images</CustomText>
                <Box width={'100%'} whiteSpace={'nowrap'} height='100px' bg='white' overflowX={'auto'} paddingTop="5px" marginTop={'20px'}>
                    {images.length > 0 && images.map((item, index) => (
                        <Box key={index.toString()} marginRight='20px' display={'inline-block'} width={'80px'} height={'80px'} borderRadius={'10px'} overflow='hidden'>
                            <Image alt='image' src={URL.createObjectURL(item)} width='100%' height={'100%'} />
                        </Box>
                    ))}
                    {images.length < 10 && (
                        <Box cursor={'pointer'} onClick={() => {
                            if (inputRef.current) {
                                inputRef?.current?.click()
                            }
                        }} display={'inline-block'} borderWidth={'0.6px'} borderStyle={'dashed'} position='relative' width={'80px'} height={'80px'} borderRadius={'10px'} overflow='hidden' >
                            <VStack width='100%' height='100%' justifyContent={'center'}>
                                <FiPlus color={THEME.COLORS.chasescrollButtonBlue} size={30} />
                            </VStack>
                        </Box>
                    )}
                </Box>

                <VStack width='100%' marginTop={'20px'} marginBottom='10px' alignItems={'flex-start'}>
                    <CustomText>Service name</CustomText>
                    <Input value={serviceName} onChange={(e) => setServiceName(e.target.value)} />
                </VStack>

                <VStack width='100%' marginBottom='10px' alignItems={'flex-start'}>
                    <CustomText>Description</CustomText>
                    <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </VStack>

                <Box marginTop={'10px'}>
                    
                    {time.length>0&& time.map((item, index) => (
                        <HStack alignItems={'flex-end'} key={index.toString()} marginBottom='10px'>
                            <VStack width='full' alignItems={'flex-start'} >
                                <CustomText fontSize='14px'>Start Time</CustomText>
                                <Input type='time' value={time[index].startTime} onChange={(e) => handleChange(index, 'startTime', e.target.value) } />
                            </VStack>

                            <VStack width='full' alignItems={'flex-start'} fontSize='14px'>
                                <CustomText fontSize='14px'>End Time</CustomText>
                                <Input type='time' value={time[index].endTime} onChange={(e) => handleChange(index, 'endTime', e.target.value) } />
                            </VStack>
                            
                            <VStack width='full' alignItems={'flex-start'} fontSize='14px'>
                                <CustomText fontSize='14px'>End Time</CustomText>
                                <Select value={time[index].availabilityDayOfWeek} onChange={(e) => handleChange(index, 'availabilityDayOfWeek', e.target.value) }>
                                    <option value={0}>Sunday</option>
                                    <option value={1}>Monday</option>
                                    <option value={2}>Tuesday</option>
                                    <option value={3}>Wednesday</option>
                                    <option value={4}>Thursday</option>
                                    <option value={5}>Friday</option>
                                    <option value={6}>Saturday</option>
                                </Select>
                            </VStack>

                            <VStack cursor='pointer' onClick={() => removeTime(index)} justifyContent={'center'} width='40px' height='40px' borderRadius={'25px'} bg='white'>
                                <FiX color="red" size={20} />
                            </VStack>
                        </HStack>
                    ))}

                    <CustomText onClick={addTimeEntry} cursor={'pointer'} fontSize={'14px'} color={'brand.chasescrollButtonBlue'} fontFamily={'DM-Bold'}>Add available days for this service +</CustomText>
                </Box>

                <Button onClick={() => handleAdd()} width='100%' height='50px' bg='brand.chasescrollButtonBlue' color="white" marginTop={'10px'}>Add +</Button>

            </ModalBody>
        </ModalContent>
    </Modal>
  )
}

export default AddServiceModal