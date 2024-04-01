"use client";
import React from 'react'
// import Image from 'next/image';
import { Button, Checkbox, HStack, VStack, useToast, Image, Flex, Box, Text } from '@chakra-ui/react';
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
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import moment from 'moment';

import { DropdownDate } from "react-dropdown-date";
import GoogleBtn from '@/components/sharedComponent/googlebtn';

function Signup() {
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [month, setmonth] = React.useState('');
  const [day, setday] = React.useState('');
  const [year, setyear] = React.useState('');
  const [dob, setdate] = React.useState('');
  const router = useRouter();
  const [terms, setTerms] = React.useState(false);
  const toast = useToast();


  const { renderForm, values, formState: { isValid }, watch } = useForm({
    defaultValues: {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      // dob: '',
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
      if (phone.length < 11) {
        toast({
          title: 'Attention!',
          description: 'You must put in a valid phone number',
          status: 'warning',
          isClosable: true,
          duration: 5000,
          position: 'top-right',
        });
        return;
      }
      if (!dob) {
        toast({
          title: 'Attention!',
          description: 'You must fillin your date of birth',
          status: 'warning',
          isClosable: true,
          duration: 5000,
          position: 'top-right',
        });
        return;
      }
      const ageLimit = moment().subtract(18, 'years');
          if (moment(dob).isAfter(ageLimit)) {
            toast({
              title: 'Attention!',
              description: 'You must be upto 18 years old',
              status: 'warning',
              isClosable: true,
              duration: 5000,
              position: 'top-right',
            });
              return;
          }
      setEmail(data.email);
      //console.log(phone)
      if (watchEmail) {
        mutate({ ...data, phone, dob });
      } else {
        toast({
          title: 'Attention!',
          description: 'You must fill in your email',
          status: 'warning',
          isClosable: true,
          duration: 5000,
          position: 'top-right',
        });
      }
    }
  });

  const watchEmail = watch('email')


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
      router.push('/auth/verify-account?email=' + watchEmail);
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
    onSuccess: (data) => {
      router.push('/auth/verify-account?email=' + watchEmail);
      //sendVerificatinEmail.mutate(watchEmail);
    }
  });


  const formatDate = (item: any, name: string) => {

    const listofmonth = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]

    if (name === "month") {

      if (item && item && day) {
        setdate([year, listofmonth.indexOf(item) + 1 > 9 ? listofmonth.indexOf(item) + 1 : "0" + (listofmonth.indexOf(item) + 1), day].join("-"));
      }
      setmonth(item)
    } else if (name === "year") {

      if (item && month && day) {
        setdate([item, listofmonth.indexOf(month) + 1 > 9 ? listofmonth.indexOf(month) + 1 : "0" + (listofmonth.indexOf(month) + 1), day].join("-"));
      }
      setyear(item)
    } else {
      if (year && month && item) {
        setdate([year, listofmonth.indexOf(month) + 1 > 9 ? listofmonth.indexOf(month) + 1 : "0" + (listofmonth.indexOf(month) + 1), item].join("-"));
      }
      setday(item)
    }

  }

  return renderForm(
    <VStack width='100%' height='100%' overflowY={"auto"} justifyContent={'center'} padding={['20px', '20px']} py={["20px", "20px"]}>
      {/* <Box width={"fit-content"} > */}
        <Image src='/assets/images/chasescroll-logo.png' width={100} height={100} alt='chasescroll logo' />

        <CustomText color='brand.chasescrollBlue' fontSize='xl' marginY='10px'>Create An account</CustomText>

        <VStack width={['100%', '100%', '500px', '500px']}>


          <GoogleBtn title="Sign up" />

          <CustomText fontFamily={'DM-Medium'} textAlign={'center'}>OR</CustomText>

          <Box width="full" >
            <CustomText fontSize={"sm"} mb={"1"} >Enter your email<span style={{color: "#F04F4F"}} > *</span></CustomText>
            <CustomInput name='email' isPassword={false} type='email' placeholder='' />
          </Box>
          <Box width="full" >
            <CustomText fontSize={"sm"} mb={"1"} >Enter your username<span style={{color: "#F04F4F"}} > *</span></CustomText>
            <CustomInput name='username' isPassword={false} type='text' placeholder='' />
          </Box>
          <Box width="full" >
            <CustomText fontSize={"sm"} mb={"1"} >Enter your firstname<span style={{color: "#F04F4F"}} > *</span></CustomText>
            <CustomInput name='firstName' isPassword={false} type='text' placeholder='' />
          </Box>
          <Box width="full" >
            <CustomText fontSize={"sm"} mb={"1"} >Enter your lastname<span style={{color: "#F04F4F"}} > *</span></CustomText>
            <CustomInput name='lastName' isPassword={false} type='text' placeholder='' />
          </Box>
          <Box width="full" >
            <CustomText fontSize={"sm"} mb={"1"} >(Date of Birth)<span style={{color: "#F04F4F"}} > *</span></CustomText>
            {/* <CustomInput name='dob' isPassword={false} type='date' placeholder='DD/MM/YYYY (Date of Birth)' /> */}
            <DropdownDate
              onMonthChange={(month: any) => {
                // optional
                formatDate(month, "month");
              }}
              onDayChange={(day: any) => {
                // optional
                formatDate(day, "day");
              }}
              onYearChange={(year: any) => {
                // optional
                formatDate(year, "year");
              }}
              defaultValues={
                // optional
                {
                  year: year ? year : "select year",
                  month: month ? month : "select month",
                  day: day ? day : "select day"
                }
              }
            />
          </Box>

          <Box width="full" >
            <CustomText fontSize={"sm"} mb={"1"} >Enter Phone Number<span style={{color: "#F04F4F"}} > *</span></CustomText>
            <PhoneInput
              country={'us'}
              enableSearch
              // style={{ width: '100%', height: '45px', borderWidth: '1px', borderRadius: '5px', borderColor: 'lightgrey', padding: '10px' }}
              containerStyle={{ width: '100%', height: '45px', }}
              inputStyle={{ width: "100%", height: "45px", borderWidth: '1px', borderColor: 'lightgrey', }}
              value={phone}
              onChange={(phone: any) => setPhone(phone)}
            />
          </Box>

          <Box width="full" >
            <CustomText fontSize={"sm"} mb={"1"} >Enter your password<span style={{color: "#F04F4F"}} > *</span></CustomText>
            <CustomInput name='password' isPassword type='password' placeholder='' />
          </Box>

          <Box width="full" >
            <CustomText fontSize={"sm"} mb={"1"} >Confirm password<span style={{color: "#F04F4F"}} > *</span></CustomText>
            <CustomInput name='confirmPassword' isPassword={true} type='password' placeholder='' />
          </Box>


          <HStack justifyContent={'flex-start'} spacing={6} width='100%' marginY='20px'>
            <Checkbox colorScheme='blue' size='md' isChecked={terms} onChange={() => setTerms(prev => !prev)} />


            <CustomText fontSize={'sm'} fontFamily={'Satoshi-Regular'} marginLeft='0px'>
              I accept the
              <span style={{ color: THEME.COLORS.chasescrollBlue }}> terms of service </span>
              as well as the <span style={{ color: THEME.COLORS.chasescrollBlue }}> privacy policy </span>
            </CustomText>
          </HStack>

          <CustomButton type='submit' disable={terms === false} variant={'outline'} text='Create Account' isLoading={isLoading || sendVerificatinEmail.isLoading} color='white' width='100%' borderRadius='10px' backgroundColor={THEME.COLORS.chasescrollButtonBlue} fontFamily={'Satoshi-Regular'} />

          <HStack>
            <CustomText fontSize={'sm'} fontFamily={'Satoshi-Regular'} marginLeft='0px'>
              Already have an account ?
            </CustomText>
            <Link href="/auth">
              <CustomText color='brand.chasescrollButtonBlue' fontFamily={'Satoshi-Regular'} decoration={'underline'} cursor='pointer'>Log in</CustomText>
            </Link>
          </HStack>
        </VStack>
      {/* </Box> */}
    </VStack>
  )
}

export default Signup
