"use client";
import React from 'react'
import { Box, Divider, HStack, VStack, Image, useToast, Button, Flex, Input } from '@chakra-ui/react';
import CustomText from '@/components/general/Text';
import CustomButton from '@/components/general/Button';
import { THEME } from '@/theme';
import Link from 'next/link';
import { useForm } from '@/hooks/useForm';
import { signInValidation } from '@/services/validations';
import { useRouter } from 'next/navigation';
import { useDetails } from '@/global-state/useUserDetails';
import { useMutation, useQuery } from 'react-query';
import httpService from '@/utils/httpService';
import { URLS } from '@/services/urls';
import { CustomInput } from '@/components/Form/CustomInput';
import { signIn, useSession, signOut, } from 'next-auth/react'
import { Session, } from 'next-auth';
import httpServiceGoogle from '@/utils/httpServiceGoogle';



const LINK2 = [
  {
    name: "Sign in",
    link: "/",
    isExternal: false
  },
  {
    name: "Sign up",
    link: "/sign-up",
    isExternal: true
  },
  {
    name: "Home",
    link: "https://chasescroll.com/",
    isExternal: true
  },
  {
    name: "About us",
    link: "https://chasescroll.com/about",
    isExternal: true
  },
  {
    name: "Policy",
    link: "https://chasescroll.com/privacy-poilcy",
    isExternal: true
  },
  {
    name: "Terms and conditions",
    link: "https://chasescroll.com/terms",
    isExternal: true
  },
  {
    name: "Contact us",
    link: "https://chasescroll.com/contact",
    isExternal: true
  },
]
const exclude = ['Events', 'Sign up', 'Community', 'Sign up']


function LoginPage() {
  // const { getValues } = useForm()
  const [showModal, setShowModal] = React.useState(false)
  const [Loading, setLoading] = React.useState(false)
  const [FirstName, setFirstName] = React.useState("")
  const [CheckUsername, setCheckUsername] = React.useState("")
  const [LastName, setLastName] = React.useState("")
  const [UserName, setUserName] = React.useState("")
  const [email, setEmail] = React.useState({} as any)
  const [checkData, setCheckData] = React.useState<any>({})
  const [checked, setChecked] = React.useState(false);


  const toast = useToast();
  const router = useRouter();
  const { setAll } = useDetails((state) => state);
  const { data: sessionData, update } = useSession();

  


  const handleSignIn = async (event: any) => {
    const result = await signIn('google');
    console.log(result);
  };

  const signinWithGoogle = useMutation({
    mutationFn: (data: string) => httpServiceGoogle.get(`${URLS.SIGN_IN_WTIH_CREDENTIALS}`, {
      headers: {
        Authorization: `Bearer ${data}`,
      }
    }),
    onSuccess: (data) => {
      console.log(data.data);
      localStorage.setItem('token', data?.data?.access_token);
      toast({
        title: 'Success',
        description: 'Signin Successful',
        status: 'success',
      })
      if (!data?.data?.firstName) {
        setShowModal(true)
      } else {
        localStorage.setItem('token', data?.data?.access_token);
        localStorage.setItem('refresh_token', data?.data?.refresh_token);
        localStorage.setItem('user_id', data?.data?.user_id);
        localStorage.setItem('expires_in', data?.data?.expires_in);
        setAll({
          firstName: data?.data?.firstName,
          lastName: data?.data?.firstName,
          username: data?.data?.user_name,
          userId: data?.data?.user_id,
        })
        router.push('/dashboard');
      }
      setCheckData(data?.data)
    },
    onError: (error: any) => {
      console.log(error);
      toast({
        title: 'Erroor',
        description: 'An error occured, please try again',
        status: 'error',
      })
    }
  })

  // React.useEffect(() => {
  //   const token: any = sessionData;
  //   console.log(token.token?.token.token.accessToken);
  //   if (token !== null || token !== undefined) {
  //     if (token.token?.token.token.idToken) {
  //       signinWithGoogle.mutate(token.token?.token.token.idToken);
  //     }
  //   }
   
  // }, [sessionData, signinWithGoogle])

  const handleGoogleSignIn = async() => {
    const token: any = sessionData;
    if (token && token.token?.token.token.idToken) {
      signinWithGoogle.mutate(token.token?.token.token.idToken);
    } else {
      const dets = await signIn('google');
      setCheckData(true);
    }
  }

  React.useEffect(() => {
    if (checkData?.user_id) {
      if (!checkData?.firstName) {
        setShowModal(true)
      } else {
        localStorage.setItem('token', checkData.access_token);
        localStorage.setItem('refresh_token', checkData.refresh_token);
        localStorage.setItem('user_id', checkData.user_id);
        localStorage.setItem('expires_in', checkData.expires_in);
        setAll({
          firstName: checkData.firstName,
          lastName: checkData.firstName,
          username: checkData.user_name,
          userId: checkData.user_id,
        })
        // router.push('/dashboard');
      }
    }
  }, [checkData, router, setAll]);

  const checkUserName = useQuery(['username' + UserName], () => httpService.get('/auth/username-check?username=' + UserName), {
    onError: (error: any) => {
      // toast({
      //   title: 'Error',
      //   description: "Error ocurred",
      //   status: 'error',
      // })
    },
    onSuccess: (data) => {
      console.log(data?.data?.message);
      if (data?.data?.message === "Username already exists.") {
        setCheckUsername(data?.data?.message)
      } else {
        setCheckUsername("")
      }
    }
  })

  const { data, mutate, isLoading } = useMutation({
    mutationFn: (info) => httpServiceGoogle.post(`${URLS.LOGIN}`, info),
    onError: (error) => {
      toast({
        title: 'An error occured',
        description: 'Invalid email or password',
        status: 'error',
        isClosable: true,
        duration: 5000,
        position: 'top-right',
      });
    },
    onSuccess: (data) => {
      toast({
        title: data?.data?.message ? 'Error' : 'Success',
        description: data?.data?.message ? data?.data?.message : 'Login successful',
        status: data?.data?.message ? "error" : 'success',
        isClosable: true,
        duration: 5000,
        position: 'top-right',
      });

      if (data?.data?.message === "This email is not verified") {
        router.push('/auth/verify-account?email=' + values?.username);
      } else {

        localStorage.setItem('token', data?.data?.access_token);
        localStorage.setItem('refresh_token', data?.data?.refresh_token);
        localStorage.setItem('user_id', data?.data?.user_id);
        localStorage.setItem('expires_in', data?.data?.expires_in);
        setAll({
          firstName: data?.data?.firstName,
          lastName: data?.data?.firstName,
          username: data?.data?.user_name,
          userId: data?.data?.user_id,
        })
        router.push('/dashboard');
      }

    }

  });

  const clickHandler = async () => {
    setLoading(true);
    if (!FirstName) {
      toast({
        title: 'Erroor',
        description: 'Enter firstname',
        status: 'error',
      })
    } else if (!LastName) {
      toast({
        title: 'Erroor',
        description: 'Enter lastname',
        status: 'error',
      })
    } else if (!UserName) {
      toast({
        title: 'Erroor',
        description: 'Enter username',
        status: 'error',
      })
    } else {
      const response = await httpService.put(`/user/update-profile`, {
        firstName: FirstName,
        lastName: LastName,
        username: UserName,
      })
      if (response) {
        toast({
          title: 'Success',
          description: 'Update successful',
          status: 'success',
        })
        localStorage.setItem('firstName', FirstName);

        let newObj = { ...checkData, firstName: FirstName }

        localStorage.setItem('token', checkData.access_token);
        localStorage.setItem('refresh_token', checkData.refresh_token);
        localStorage.setItem('user_id', checkData.user_id);
        localStorage.setItem('expires_in', checkData.expires_in);
        setAll({
          firstName: checkData.firstName,
          lastName: checkData.firstName,
          username: checkData.user_name,
          userId: checkData.user_id,
        })
        router.push('/dashboard');
        // navigate("/explore")
      } else {
        toast({
          title: 'Erroor',
          description: 'Something wetn wrong',
          status: 'error',
        })
      }

    }
    setLoading(false);
  }

  const { renderForm, values } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    validationSchema: signInValidation,
    submit: (data: any) => mutate(data)
  });

  return renderForm(
    <Flex flexDir={"column"} gap={"10"} alignItems={"center"} justifyContent={"space-between"} pt={"16"} pb={["16px", "16px", "0px"]} width={"full"} height={"100vh"} >
      <Flex flexDir={["column", "column", "row"]} gap={["10", "10", "4"]} alignItems={"center"} justifyContent={"space-between"} width={"full"} maxWidth={"5xl"} >
        <Flex px={"4"} flexDir={"column"} alignItems={"center"} width={"full"} gap={"12"} >
          <Box width={"full"} maxWidth={"sm"} height={"80"} >
            <Image src='/assets/svg/sign-in-illustration-2.svg' width={"full"} alt='chasescroll logo' />
          </Box>
          <Flex width={"full"} maxWidth={"400px"} flexDirection={"column"} gap={"2"} >
            <CustomText textAlign={'center'} fontSize={['24px', "30px"]} color="#163AB7" fontFamily={'DM-Bold'} fontWeight={'500'}>Your Well tailored virtual Community.</CustomText>
            <CustomText textAlign={'center'} fontFamily={'DM-Regular'} fontSize={'24px'}>An efficient ecosystem for event management.</CustomText>
          </Flex>
          <Flex gap={"5"} justifyContent={"center"} flexWrap={"wrap"} >
            <Box as='button' >
              <Image alt='google-btn' src="/assets/images/play-store.png" width='100%' height={'100%'} objectFit={'contain'} />
            </Box>
            <Box as='button' >
              <Image alt='google-btn' src="/assets/images/apple-store.png" width='100%' height={'100%'} objectFit={'contain'} />
            </Box>
          </Flex>
        </Flex>

        <Flex gap={"4"} flexDir={"column"} width={"full"} alignItems={"center"} p={"4"} >
          <Flex flexDirection={"column"} gap={"8"} borderWidth={"1px"} roundedTopLeft={"3xl"} roundedBottom={"3xl"} p={"6"} width={"full"} maxWidth={"463px"} >

            <CustomText textAlign={'center'} fontSize={['2xl', "4xl"]} color={"brand.chasescrollDarkBlue"} fontFamily={'DM-Bold'} fontWeight={'700'}>Chasescroll</CustomText>
            <CustomText textAlign={'center'} fontWeight={"400"} fontFamily={'DM-Regular'} fontSize={'md'}>An efficient ecosystem for event management.</CustomText>
            <Flex width={"full"} gap={"4"} flexDir={"column"} >
              <CustomInput name='username' isPassword={false} type='text' placeholder='Enter your Email' />
              <CustomInput name='password' isPassword type='password' placeholder='Enter your password' />

              <HStack justifyContent={'space-between'} spacing={0} width='100%' marginY='0px'>
                <Link href='/auth/forgotpassword'>
                  <CustomText color='brand.chasescrollBlue' fontSize={'sm'} fontFamily={'Satoshi-Regular'} textAlign={'left'}>
                    Forgot password ?
                  </CustomText>
                </Link>

                <CustomText fontSize={'sm'} fontFamily={'Satoshi-Regular'}>
                  Dont have an account ?
                  <Link href='/auth/signup'>
                    <span style={{ color: THEME.COLORS.chasescrollBlue }}> Sign up</span>
                  </Link>
                </CustomText>
              </HStack>

              <CustomButton type='submit' text='Login' isLoading={isLoading} color='white' width='100%' borderRadius='10px' />

            </Flex>
          </Flex>

          <Button onClick={handleGoogleSignIn} width={['100%', '294px']} height={'40px'} borderRadius={'8px'} bg='#1018280D' padding='8px 16px 8px 16px'>
            <Image alt='google' src='/assets/svg/googlelogo.svg' />
            <CustomText marginLeft={'20px'} fontFamily={'DM-Medium'} fontSize={'16px'} color='black' fontWeight={'700'}>Sign in with Google</CustomText>
          </Button>

          <CustomText fontFamily={'DM-Medium'} color='grey' textAlign={'center'} fontSize={'16px'}>Create a page for events, Community and Business.</CustomText>

        </Flex>
      </Flex>
      <Box width={"full"} display={["none", "none", "flex"]} mt={"auto"} flexDirection={"column"} gap={"4"} pb={"4"} >
        <Box width={"full"} borderWidth={"1px"} />
        <Flex gap={"4"} justifyContent={"center"} alignItems={"center"} fontSize={"sm"} textAlign={"center"} color={"brand.chasescrollTextGrey"} >
          {LINK2.map((item, index) => {
            if (item.isExternal) {
              return (
                <CustomText fontFamily={'DM-Regular'} color={item.name === "Sign in" ?  "brand.chasescrollBlue" :"brand.chasescrollTextGrey"} _hover={{color:"brand.chasescrollBlue"}} key={index.toString()}>
                  <a key={index.toString()} href={item.link}>{item.name}</a>
                </CustomText>
              )
            } else {
              return (
                <CustomText  fontFamily={'DM-Regular'} color={item.name === "Sign in" ?  "brand.chasescrollBlue" :"brand.chasescrollTextGrey"} _hover={{color:"brand.chasescrollBlue"}} key={index.toString()}>
                  <Link href={`/${item.link}`} key={index.toString()}>
                    {item.name}
                  </Link>
                </CustomText>
              )
            }
          })}
        </Flex>
      </Box>
    </Flex>
  )
}

export default LoginPage