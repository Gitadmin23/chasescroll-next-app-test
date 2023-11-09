import React from 'react'
import HeaderLayout from './header_layout'
import { PostGridIcon } from '@/components/svg'
import httpService from '@/utils/httpService'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useQuery } from 'react-query'
import { URLS } from '@/services/urls'

interface Props {
    user_index: string
}

function PostHeader(props: Props) {
    const {
        user_index
    } = props

    const toast = useToast()
    const [data, setData] = React.useState([] as any)
    // const router = useRouter()

    // react query
    const {  } = useQuery(['get-post'], () => httpService.get(URLS.GET_MEDIA_POST+user_index), {
        onError: (error: any) => {
            toast({
                status: "error",
                title: error.response?.data,
            });
        },
        onSuccess: (data) => {    
            setData(data.data); 
        }
    }) 

    return (
        <HeaderLayout name='Post' count={data?.totalElements} icon={<PostGridIcon />} link={`/dashboard/profile/${user_index}`} index={user_index} />
    )
}

export default PostHeader
