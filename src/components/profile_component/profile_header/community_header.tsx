import React from 'react'
import HeaderLayout from './header_layout'
import { CommunitiesIcon, EventsIcon, NetworkIcon } from '@/components/svg'
import httpService from '@/utils/httpService'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useQuery } from 'react-query'
import { URLS } from '@/services/urls'

interface Props {
    user_index: string
}

function CommunityHeader(props: Props) {
    const {
        user_index
    } = props

    const toast = useToast()
    const [data, setData] = React.useState([] as any)
    const router = useRouter()

    // react query
    const {  } = useQuery(['get-joined-community'], () => httpService.get(URLS.GET_JOINED_GROUPS+"?userID="+user_index), {
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
        <HeaderLayout name='Community' count={data?.totalElements} icon={<CommunitiesIcon />} link={`/dashboard/profile/${user_index}/community`} />
    )
}

export default CommunityHeader
