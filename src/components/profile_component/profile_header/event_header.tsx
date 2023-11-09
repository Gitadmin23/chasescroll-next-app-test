import React from 'react'
import HeaderLayout from './header_layout'
import { EventsIcon, NetworkIcon } from '@/components/svg'
import httpService from '@/utils/httpService'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useQuery } from 'react-query'
import { URLS } from '@/services/urls'

interface Props {
    user_index: string
}

function EventHeader(props: Props) {
    const {
        user_index
    } = props

    const toast = useToast()
    const [data, setData] = React.useState([] as any)
    const router = useRouter()

    // react query
    const {  } = useQuery(['get-joined-events'], () => httpService.get(URLS.JOINED_EVENT+user_index), {
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
        <HeaderLayout name='Event' count={data?.totalElements} icon={<EventsIcon />} link={`/dashboard/profile/${user_index}/event`} />
    )
}

export default EventHeader
