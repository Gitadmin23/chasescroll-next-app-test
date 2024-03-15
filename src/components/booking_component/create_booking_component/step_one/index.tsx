import { CustomInput } from '@/components/Form/CustomInput'
import { CustomTextArea } from '@/components/Form/CustomTextarea'
import CustomButton from '@/components/general/Button'
import CustomText from '@/components/general/Text'
import { useCreateBookingState } from '@/global-state/useCreateBooking'
import { Flex, Input, Text, Textarea, HStack, VStack, Switch, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'

interface Props { 
    next: (step: number) => void
}

function StepOne(props: Props) {
    const { 
        next
    } = props

   const { email, phone, businessName, description, locationType, locationData, setLocationValue, setAll } = useCreateBookingState((state) => state);

    const [selected, setSelected] = useState([] as any);
    const [isPhysical, setIsPhysical] = React.useState(true);

    React.useEffect(() => {
        setAll({ locationType: 'pysical'});
    }, [setAll])

    const handleSwitch = () => {
        if(isPhysical) {
            setAll({ locationType: 'online'});
            setIsPhysical(false);
        } else {
            setAll({ locationType: 'pysical'});
            setIsPhysical(true);
        }
    }

    const clickHander =(item: any) => {
        console.log({
            email,
            phone,
            businessName,
            description,
            locationData,
            locationType
        });
        next(1);
    }

    return (
        <Flex w={"full"} gap={"6"} >
            <Flex w={"full"} flexDir={"column"} >
                <Text color={"#000000CC"} fontSize={"lg"} fontWeight={"medium"} >Start building a booking Profile</Text>

                <VStack width='100%' alignItems={'flex-start'}>
                    <CustomText>Email<span style={{ color: "#F04F4F" }} >*</span></CustomText>
                    <Input  type='text' value={email} onChange={(e) => setAll({ email: e.target.value })} width={['100%']} />
                </VStack>

                <VStack width='100%' alignItems={'flex-start'}>
                    <CustomText>phone<span style={{ color: "#F04F4F" }} >*</span></CustomText>
                    <Input  type='text' value={phone} onChange={(e) => setAll({ phone: e.target.value })} width={['100%']} />
                </VStack>
                <Flex mt={"6"} flexDir={"column"} w={"full"} gap={"1"} >
                    <Text color={"#101828B2"} >Business Name<span style={{ color: "#F04F4F" }} >*</span></Text>
                    <Input  type='text' value={businessName} onChange={(e) => setAll({ businessName: e.target.value })} width={['100%']} />
                </Flex>
                {/* <Flex mt={"4"} flexDir={"column"} w={"full"} gap={"1"} >
                    <Text color={"#101828B2"} >Business Category<span style={{ color: "#F04F4F" }} >*</span></Text>
                    <CustomInput name='' h={"45px"} _placeholder={{ color: "#66708533" }} borderColor={"#A3A3A3"} focusBorderColor="#A3A3A3" placeholder='Business Category*' />
                </Flex> */}
                <Flex mt={"8"} flexDir={"column"} w={"full"} gap={"1"} >
                    <Text color={"#101828B2"} >Business Description<span style={{ color: "#F04F4F" }} >*</span></Text>
                    <Text color={"#00000080"} fontSize={"xs"} >Let customers learn more about your business by adding a description to your booking profile</Text>
                    <Textarea
                    value={description}
                    onChange={(e) => setAll({ description: e.target.value})}
                  className="w-full h-40 rounded-lg border border-gray-400 outline-chasescrollBlue px-3 py-2 placeholder:text-chasescrollTextGrey text-chasescrollTextGrey"
                  cols={5}
                  rows={7}
                  lang='pt_BR'
                  placeholder={'Description'}
                  resize='none'
                  size='lg'
                />
                </Flex>
            </Flex>

            <Flex w={"full"} flexDir={"column"} >
                <Text color={"#000000CC"} fontSize={"lg"} fontWeight={"medium"} >Location</Text>
                <VStack alignItems={'flex-start'}>
                    <HStack>
                        <CustomText>Does your business have a physical address ?</CustomText>
                        <Switch isChecked={isPhysical} onChange={handleSwitch} />
                    </HStack>

                    { isPhysical && (
                        <>
                            <VStack width='100%' alignItems={'flex-start'}>
                                <CustomText>Address<span style={{ color: "#F04F4F" }} >*</span></CustomText>
                                <Input  type='text' value={locationData.address} onChange={(e) => setLocationValue('address', e.target.value)} width={['100%', '50%']} />
                            </VStack>

                            <VStack width='100%' alignItems={'flex-start'}>
                                <CustomText>City<span style={{ color: "#F04F4F" }} >*</span></CustomText>
                                <Input  type='text' value={locationData.city} onChange={(e) => setLocationValue('city', e.target.value)} width={['100%', '50%']} />
                            </VStack>

                            <VStack width='100%' alignItems={'flex-start'}>
                                <CustomText>State<span style={{ color: "#F04F4F" }} >*</span></CustomText>
                                <Input  type='text' value={locationData.state} onChange={(e) => setLocationValue('state', e.target.value)} width={['100%', '50%']} />
                            </VStack>

                            <VStack width='100%' alignItems={'flex-start'}>
                                <CustomText>zipcode</CustomText>
                                <Input  type='text' value={locationData.zipcode} onChange={(e) => setLocationValue('zipcode', e.target.value)} width={['100%', '50%']} />
                            </VStack>

                            <VStack width='100%' alignItems={'flex-start'}>
                                <CustomText>Country<span style={{ color: "#F04F4F" }} >*</span></CustomText>
                                <Input  type='text' value={locationData.country} onChange={(e) => setLocationValue('country', e.target.value)} width={['100%', '50%']} />
                            </VStack>
                        </>
                    )}
                </VStack>

                <Button marginTop={'20px'} onClick={clickHander} bg="brand.chasescrollButtonBlue" color='white' height='50px' width={['100%', '50%']}>Next</Button>
                
            </Flex>

        </Flex>
    )
}

export default StepOne
