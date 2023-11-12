'use client';
import { Box, Button, HStack, Image, Spinner, VStack, useToast } from '@chakra-ui/react'
import React from 'react'
import { ArrowLeft2, ArrowRight2, Camera } from 'iconsax-react'
import CustomText from '@/components/general/Text'
import { THEME } from '@/theme'
import { useForm } from '@/hooks/useForm'
import { editProfileSchema } from '@/services/validations'
import { CustomInput } from '@/components/Form/CustomInput'
import Link from 'next/link';
import { useDetails } from '@/global-state/useUserDetails';
import { useMutation, useQuery } from 'react-query';
import httpService from '@/utils/httpService';
import { IMAGE_URL, URLS } from '@/services/urls';
import { IUser } from '@/models/User';
import AWSHook from '@/hooks/awsHook';
import { useRouter } from 'next/navigation'

function EditProfile() {
    const [user, setUser] = React.useState<IUser | null>(null);
    const [pic, setPic] = React.useState<{ file: '', url: '' } | null>(null);
    const [showEmail, setShowEmail] = React.useState(false);
    const { userId, firstName, lastName, username } = useDetails((state) => state);
    const { uploadedFile, fileUploadHandler, loading } = AWSHook();

    const ref = React.useRef<HTMLInputElement>(null);
    const router = useRouter();
    const toast = useToast();

    const { renderForm, setValue, formState: { isDirty,  } } = useForm({
        defaultValues: {
            firstName: user?.firstName,
            lastName: user?.lastName,
            username: user?.username,
            website: user?.data?.webAddress?.value || '',
            aboutme: user?.data?.about?.value || '',
        },
        validationSchema: editProfileSchema,
        submit: (data: {
            firstName: string,
            lastName: string,
            username: string,
            website: string,
            aboutme: string
        }) => {
            if (loading || isLoading || !isDirty) {
                return;
            } else if (!isDirty) {
                toast({
                    title: 'Warning',
                    description: 'You have to make changes first',
                    status: 'warning',
                    position: 'top-right',
                    duration: 3000,
                    isClosable: true,
                })
            }
            else {
                const dataOb = {
                    "firstName": data.firstName,
                    "showEmail": showEmail,
                    "lastName": data.lastName,
                    "publicProfile": true,
                    "username": data.username,
                    "data": {
                        "imgMain": {
                            "value": pic?.url
                        },
                        "webAddress": {
                            "value": data.website
                        },
                        "about": {
                            "value": data.aboutme
                        },
                    }
                }
                editProfile.mutate(dataOb);
            }
        },
    });

    const { isLoading, isError } = useQuery(['getUserDetails', userId], () => httpService.get(`${URLS.GET_USER_PRIVATE_PROFILE}`), {
        onSuccess: (data) => {
            setUser(data.data);
            setValue('firstName', data?.data?.firstName);
            setValue('lastName', data?.data?.lastName);
            setValue('username', data?.data?.username);
            setValue('website', data?.data?.data?.webAddress.value);
            setValue('aboutme', data?.data?.data.about.value);
        },
        onError: (error) => {
            console.log(error);
            toast({
                title: 'Error',
                description: 'An error occured while updating your profile',
                status: 'error',
                position: 'top-right',
                isClosable: true,
                duration: 3000,
            });
        },
    });

    const editProfile = useMutation({
        mutationFn: (data: any) => httpService.put(`${URLS.UPDATE_PROFILE}`, data),
        onSuccess: (data) => {
            toast({
                title: 'Success',
                description: 'Your profile has been updated',
                status: 'success',
                position: 'top-right',
                isClosable: true,
                duration: 3000,
            });
        },
        onError: (error: any) => {
            toast({
                title: 'Error',
                description: 'An error occured while updating your profile',
                status: 'error',
                position: 'top-right',
                isClosable: true,
                duration: 3000,
            });
        }
    })

    React.useEffect(() => {
        if (!loading) {
            if (uploadedFile.length > 0) {
                setPic(uploadedFile[0] as any);
            }
        }
    }, [uploadedFile, loading])


    const handleChange = (files: FileList) => {
        fileUploadHandler(files);
    }
    if (isLoading) {
        return (
            <VStack width='100%' height='100%' justifyContent={'center'} alignItems={'center'}>
                <Spinner />
                <CustomText fontFamily={'DM-Regular'} fontSize={'18px'}>Loading Details</CustomText>
            </VStack>
        )
    }
    return renderForm(
        <VStack width={'100%'} height={'100%'}>
            <input ref={ref} onChange={(e) => handleChange(e.target.files as FileList)} hidden type='file' accept='image/*' />
            <Box overflowY='auto' width={['100%']} height={'100vh'} paddingY='20px' paddingX={['20px', '0px']}>


                <VStack width='100%' height={'100%'} alignItems={'center'}>


                    <VStack width={['100%', '25%']} height='100%'>


                        {/* HEADER */}
                        <HStack width={'100%'} height={'50px'} justifyContent={'space-between'}>
                            <ArrowLeft2 size={'30px'} color='black' onClick={() => router.back()} />
                            <CustomText fontFamily={'DM-Regular'} fontSize={'18px'}>Edit Profile</CustomText>
                            <Box></Box>
                        </HStack>

                        <VStack flex='1' width={'100%'} alignItems={'center'} paddingBottom='20px' spacing={0}>

                            {/* IMAGE */}
                            <Box width='144px' height='144px' overflow={'hidden'} position={'relative'}>
                                <Box width={'144px'} height={'144px'} borderRadius={'50px 0px 50px 50px'} overflow={'hidden'} borderWidth={'3px'} borderColor={'#CFD4DF'}>
                                    {user?.data.imgMain.value !== null && pic === null && (
                                        <>
                                            { user?.data?.imgMain.value.startsWith('https://') && <Image alt='prifle' src={`${user?.data.imgMain.value}`} width={'100%'} height={'100%'} objectFit={'cover'} />}
                                            { !user?.data?.imgMain.value.startsWith('https://') && <Image alt='prifle' src={`${IMAGE_URL}${user?.data.imgMain.value}`} width={'100%'} height={'100%'} objectFit={'cover'} />}
                                        </>
                                    )}
                                    {
                                        user?.data.imgMain.value === null && pic === null && (
                                            <HStack width='100%' height={'100%'} alignItems={'center'} justifyContent={'center'}>
                                                <CustomText fontSize={'30px'} fontFamily={'DM-Bold'} color='brand.chasescrollButtonBlue'>{user?.firstName[0].toUpperCase()}</CustomText>
                                                <CustomText fontSize={'30px'} fontFamily={'DM-Bold'} color='brand.chasescrollButtonBlue'>{user?.lastName[0].toUpperCase()}</CustomText>
                                            </HStack>
                                        )
                                    }

                                    {
                                        user?.data.imgMain.value === null && pic !== null && (
                                            <Image alt='prifle' src={pic.url} width={'100%'} height={'100%'} objectFit={'cover'} />
                                        )
                                    }

                                </Box>

                                <Box onClick={() => ref.current?.click()} position={'absolute'} right={'0px'} bottom='0px' width='30px' height={'30px'} borderRadius={'15px'} bg='white' shadow='lg' display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                    {loading && <Spinner size='xs' color='blue' />}
                                    {!loading && <Camera size='15px' variant='Bold' color='lightgrey' />}
                                </Box>
                            </Box>

                            <VStack marginTop={'20px'} alignItems={'flex-start'} width={'100%'} spacing={0}>
                                <CustomText fontFamily={'DM-Regular'} fontSize={'16px'}>FirstName</CustomText>
                                <CustomInput name='firstName' isPassword={false} type='text' placeholder='' />
                            </VStack>

                            <VStack marginTop={'20px'} alignItems={'flex-start'} width={'100%'} spacing={0}>
                                <CustomText fontFamily={'DM-Regular'} fontSize={'16px'}>LastName</CustomText>
                                <CustomInput name='lastName' isPassword={false} type='text' placeholder='' />
                            </VStack>

                            <VStack marginTop={'20px'} alignItems={'flex-start'} width={'100%'} spacing={0}>
                                <CustomText fontFamily={'DM-Regular'} fontSize={'16px'}>Username</CustomText>
                                <CustomInput name='username' isPassword={false} type='text' placeholder='' />
                            </VStack>

                            <VStack marginTop={'20px'} alignItems={'flex-start'} width={'100%'} spacing={0}>
                                <CustomText fontFamily={'DM-Regular'} fontSize={'16px'}>Website</CustomText>
                                <CustomInput name='website' isPassword={false} type='text' placeholder='' />
                            </VStack>

                            <VStack marginTop={'20px'} alignItems={'flex-start'} width={'100%'} spacing={0}>
                                <CustomText fontFamily={'DM-Regular'} fontSize={'16px'}>About me</CustomText>
                                <CustomInput name='aboutme' isPassword={false} type='text' placeholder='' />
                            </VStack>

                            <Link href='/dashboard/settings/info/personalinfo' style={{ width: '100%', marginTop: '20px' }}>
                                <HStack width={'100%'} justifyContent={'space-between'}>
                                    <CustomText fontFamily={'DM-Bold'} color='brand.chasescrollButtonBlue'>Personal Information</CustomText>
                                    <ArrowRight2 size={'25px'} color={THEME.COLORS.chasescrollButtonBlue} variant='Outline' />
                                </HStack>
                            </Link>

                            <Button marginTop={'20px'} marginBottom='100px' width='100%' type='submit' isLoading={editProfile.isLoading} variant={'ghost'} borderWidth={'1px'} borderColor='brand.chasescrollButtonBlue' color='brand.chasescrollButtonBlue'>Save Changes</Button>

                        </VStack>

                    </VStack>


                </VStack>


            </Box>
        </VStack>
    )
}

export default EditProfile