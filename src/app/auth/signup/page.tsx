"use client";
import React from 'react'
import Image from 'next/image';
import { Checkbox, HStack, VStack, useToast } from '@chakra-ui/react';
import CustomText from '@/components/general/Text';
import { useForm } from '@/hooks/useForm';
import { signInValidation, signUpValidation } from '@/services/validations';
import { CustomInput } from '@/components/Form/CustomInput';
import { THEME } from '@/theme';
import CustomButton from '@/components/general/Button';
import { useMutation } from 'react-query';
import httpService, { unsecureHttpService } from '@/utils/httpService';
import { URLS } from '@/services/urls'
import { useRouter } from 'next/navigation'
import Link from 'next/link';

function Signup() {
    const [email, setEmail] = React.useState('');

    const router = useRouter();
    const [terms, setTerms] = React.useState(false);
    const toast = useToast();

    const sendVerificatinEmail = useMutation({
      mutationFn: (data: string) => unsecureHttpService.post(`${URLS.SEND_VERIFICATION_EMAIL}`, {
        userEmail: data,
        emailType: 1,
      }),
      onError: (error: any) => {
        toast({
          title: 'An error occured',
          description: error.response.data.error,
          status: 'error',
          isClosable: true,
          duration: 5000,
          position: 'top-right',
      });
      },
      onSuccess: () => {
        toast({
          title: 'Success',
          description: 'A verification code has been sent to your email',
          status: 'success',
          isClosable: true,
          duration: 5000,
          position: 'top-right',
      });
      router.push('/auth/verify-account?email=' + email);
      }
    });

    const { mutate, isLoading } = useMutation({
        mutationFn: (data) => unsecureHttpService.post(`${URLS.SIGNUP}`, data),
        onError: (error: any) => {
          toast({
            title: 'An error occured',
            description: error.response.data,
            status: 'error',
            isClosable: true,
            duration: 5000,
            position: 'top-right',
        });
        },
        onSuccess:(data) => {
            sendVerificatinEmail.mutate(email);
        }
    });
    const { renderForm } = useForm({
        defaultValues: {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            dob: '',
            phone: '',
            email: '',
            confirmPassword: ''
        },
        validationSchema: signUpValidation,
        submit: (data) => {
          if (!terms) {
            toast({
              title: 'Attention!',
              description: 'You must accept our terms of service to continue',
              status: 'warning',
              isClosable: true,
              duration: 5000,
              position: 'top-right',
          });
          return;
          }
          setEmail(data.email);
          mutate(data)
        }
    });
  return renderForm(
    <VStack width='100%' height='100vh' justifyContent={'center'} padding={['20px', '0px']}>
      <Image src='/assets/images/chasescroll-logo.png' width={100} height={100} alt='chasescroll logo' />
      <CustomText color='brand.chasescrollBlue' fontSize='xl' marginY='10px'>Create An account</CustomText>

      <VStack width={['100%', '100%', '25%', '25%']}>
            <CustomInput name='email' isPassword={false} type='email' placeholder='Enter your email' />
            <CustomInput name='username' isPassword={false} type='text' placeholder='Enter your username' />
            <CustomInput name='firstName' isPassword={false} type='text' placeholder='Enter your firstname' />
            <CustomInput name='lastName' isPassword={false} type='text' placeholder='Enter your lastname' />
            <CustomInput name='dob' isPassword={false} type='date' placeholder='Enter your birth date' />
            <CustomInput name='phone' isPassword={false} type='text' placeholder='Enter your phone number' />
            <CustomInput name='password' isPassword type='password' placeholder='Enter your password' />
            <CustomInput name='confirmPassword' isPassword={true} type='password' placeholder='Confirm password' />

            <HStack justifyContent={'flex-start'} spacing={6} width='100%' marginY='20px'>
                <Checkbox colorScheme='blue' size='md' isChecked={terms} onChange={() =>setTerms(prev => !prev)} />
             

                <CustomText fontSize={'sm'} fontFamily={'Satoshi-Regular'} marginLeft='0px'>
                  I accept the
                    <span style={{ color: THEME.COLORS.chasescrollBlue }}> terms of service </span>
                    as well as the <span style={{ color: THEME.COLORS.chasescrollBlue }}> privacy policy </span>
                </CustomText>
            </HStack>

            <CustomButton type='submit' disable={terms === false} variant={'outline'} text='Create Account' isLoading={isLoading || sendVerificatinEmail.isLoading} color='white' width='100%' borderRadius='10px'  backgroundColor={THEME.COLORS.chasescrollButtonBlue} fontFamily={'Satoshi-Regular'} />

            <HStack>
                <CustomText fontSize={'sm'} fontFamily={'Satoshi-Regular'} marginLeft='0px'>
                  Already have an account ? 
                </CustomText>
                <Link href="/auth">
                  <CustomText color='brand.chasescrollButtonBlue' fontFamily={'Satoshi-Regular'} decoration={'underline'} cursor='pointer'>Log in</CustomText>
                </Link>
            </HStack>
      </VStack>
    </VStack>
  )
}

export default Signup