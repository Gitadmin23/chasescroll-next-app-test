import CustomText from '@/components/general/Text'
import { useDetails } from '@/global-state/useUserDetails'
import AWSHook from '@/hooks/awsHook'
import { IMAGE_URL, URLS } from '@/services/urls'
import { THEME } from '@/theme'
import { capitalizeFLetter } from '@/utils/capitalLetter'
import httpService from '@/utils/httpService'
import { Avatar, Box, Flex, HStack, Image, Input, Progress, Spinner, Textarea, VStack, useToast } from '@chakra-ui/react'
import React from 'react'
import { FiChevronLeft, FiPlus } from 'react-icons/fi'
import { useMutation } from 'react-query'
import { useQueryClient } from 'react-query';

const FileView = ({ file}: { file: File, }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [url, setUrl] = React.useState('');
  const fileReader = new FileReader();

  React.useEffect(() => {
    fileReader.onload = () => {
      setIsLoading(false);
      setUrl(fileReader.result as string);
    }
    fileReader.readAsDataURL(file);
  });
  return (
    <Box display={'inline-block'} width='100px' height='100px' borderRadius={'20px'} marginRight={'20pxß'}>
      { isLoading && (
        <VStack width={'100%'} height='100%' justifyContent={'center'} alignItems={'center'} >
          <Spinner colorScheme='blue' size='md' />
        </VStack>
      )}
      { !isLoading && (
        <VStack width={'100%'} height='100%' overflow={'hidden'}>
          <Image src={url} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} />
        </VStack>
      )}
    </Box>
  )
}

function ShowImages({ files, setImage, handleStage, stage, setEmpty, mutate }: {files: File[], setImage: (files: FileList, go?: boolean) => void, handleStage: (page: number) => void, stage: number, setEmpty: () => void, mutate: () => void}) {
  const [url, setUrl] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const inputRef = React.useRef<HTMLInputElement>();
  const { username, firstName, lastName, publicProfile, userId, user } = useDetails((state) => state);
  const [value, setValue] = React.useState('');
  const toast = useToast();
  const queryClient = useQueryClient();
  const { uploadedFile, fileUploadHandler, loading } = AWSHook();

  const createPost = useMutation({
    mutationFn: (data: any) => httpService.post(`${URLS.CREATE_POST}`, data),
    onSuccess: (data) => {
      handleStage(4);
      queryClient.invalidateQueries(['getPosts']);
      mutate();
    },
    onError: (error: any) => {
      console.log(error);
      toast({
        title: 'Error',
        description: 'An error occured while uploading file',
        position: 'top-right',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  })

  React.useEffect(() => {
    if (uploadedFile.length > 0 && !loading) {
      const obj = {
        text: value,
        type: files[0].type.startsWith('image') ? 'WITH_IMAGE' : 'WITH_VIDEO_POST',
        isGroupFeed: false,
        sourceId: userId,
        mediaRef: uploadedFile[0].url,
        multipleMediaRef: uploadedFile.map((item) => item.url),
      }
      createPost.mutate(obj);
    }
  }, [files, loading, uploadedFile, userId, value])



  React.useEffect(() => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setIsLoading(false);
      setUrl(fileReader.result as string);
    }
    fileReader.readAsDataURL(files[0]);
  }, [files]);

  const handlePick = React.useCallback((data: FileList) => {
    setImage(data, false);
}, [setImage]);

const handleNext = () => {
  console.log(files);
  if (stage === 3) {
    if (files[0].size > 314572800) {
      toast({
        title: 'Warniing',
        description: 'File size must be less than or equal to 300MB',
        position: 'top-right',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return
    }
    fileUploadHandler(files as any);
    return;
  } else {
    handleStage(stage+1);
  }
}

const handlePrev = React.useCallback(() => {
  if (stage === 2) {
    setEmpty();
    handleStage(stage - 1);
    return;
  }
  handleStage(stage-1);
}, [handleStage, setEmpty, stage]);

const handleChange = (e: string) => {
  if (value.length < 60000) {
    setValue(e);
  }
}

  return (
    <VStack width='100%' height='auto'>
        <input hidden type='file' accept="image/*, video/*" ref={inputRef as any} onChange={(e) => handlePick(e.target.files as FileList)} />

        <HStack width='100%' height='50px' bg='white' justifyContent={'space-between'} paddingX='10px' alignItems={'center'} paddingTop={'10px'}>
            <FiChevronLeft size={'25px'} onClick={handlePrev} color={THEME.COLORS.chasescrollButtonBlue} />
            {!loading && !createPost.isLoading && (
              <CustomText cursor='pointer' onClick={handleNext} color='brand.chasescrollButtonBlue' fontFamily={'Satoshi-Regular'} fontSize={'sm'}>{stage > 2 ? 'Create Post' : 'Next'}</CustomText>
            )}
            {
              loading && (
                <Box width='50px'>
                  <Progress isIndeterminate colorScheme='blue' width={'100%'} size='sm' />
                </Box>
              )
            }
            {
             createPost.isLoading && (
                <Box width='50px'>
                  <Progress isIndeterminate colorScheme='blue' width={'100%'} size='sm' />
                </Box>
              )
            }
        </HStack>

        <Flex minWidth='400px' maxWidth={'350px'} height={'auto'}  borderRadius='0px' position={'relative'}>

          { isLoading && (
            <VStack width={'100%'} height='100%' justifyContent={'center'} alignItems={'center'} >
              <Progress isIndeterminate colorScheme='blue' width={'100%'} size='sm' />
            </VStack>
          )}

          { !isLoading && url !== '' && (
            <VStack width={'100%'} zIndex={1} height='auto' overflow={'hidden'}>
              {files[0].type.startsWith('video') && (
                <video controls width={'100%'} height={'300px'}>
                  <source src={url} type='video/mp4' />
                </video>
              )}
              {files[0].type.startsWith('image') && (
                <Image src={url} alt='image' width={'100%'} height={'300px'} objectFit={'cover'} />
              )}
            </VStack>
          )}
         
        </Flex>
    
        {
          stage === 3 &&  (
            <VStack alignItems='flex-start' width='100%' height='250px' paddingX='20px' paddingTop={'20px'} bg='white' justifyContent={'center'} fontFamily={'Satoshi-Regular'}>

              <HStack>
              <Box  width='32px' height='32px' borderRadius={'20px 0px 20px 20px'} borderWidth={'2px'} borderColor={'#D0D4EB'} overflow={'hidden'}>
                {user?.data.imgMain.value === null && (
                  <VStack width={'100%'} height='100%' justifyContent={'center'} alignItems={'center'}>
                    <CustomText fontFamily={'DM-Regular'}>{user?.username[0].toUpperCase()}</CustomText>
                  </VStack>
                )}
                {
                  user?.data.imgMain.value !== null && (
                    <>
                      { user?.data?.imgMain?.value.startsWith('https://') && <Image src={`${user?.data.imgMain.value}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} /> }

                      { !user?.data?.imgMain?.value.startsWith('https://') && <Image src={`${IMAGE_URL}${user?.data.imgMain.value}`} alt='image' width={'100%'} height={'100%'} objectFit={'cover'} /> }
                    </>
                  )
                }
                </Box>
                <CustomText>{capitalizeFLetter(firstName)} {capitalizeFLetter(lastName)}</CustomText>
              </HStack>

              <Textarea value={value} borderWidth={0} placeholder='Write something about  your post' onChange={(e) =>handleChange(e.target.value)} />

              <HStack width={'100%'} justifyContent={'flex-end'}>
                <CustomText fontFamily={'Satoshi-Light'} fontSize={'ms'}>{value.length}/60000</CustomText>
              </HStack>

            </VStack>
          )
        }
    </VStack>
  )
}

export default ShowImages