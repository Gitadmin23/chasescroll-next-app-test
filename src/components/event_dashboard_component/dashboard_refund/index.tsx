import CustomButton from '@/components/general/Button'
import httpService from '@/utils/httpService'
import { Flex, useToast } from '@chakra-ui/react'
import { AxiosError, AxiosResponse } from 'axios'
import React from 'react'
import { useMutation, useQuery } from 'react-query'

interface Props { 
    index: any
}

function DashboardRefund(props: Props) {
    const { 
        index
    } = props

    const toast = useToast()
    const [eventUser, setEventUser] = React.useState([] as any)

    const { isLoading, refetch } = useQuery(['geteventuserbyticket'], () => httpService.get('/events/get-event-members/'+index), {
        onError: (error: AxiosError<any, any>) => {
          console.error(error.response?.data);
        }, 
        onSuccess: (data) => { 
            setEventUser(data.data.content);
        }
    })    
    
    // const clickHandler = async()=> {

    //     setLoadingAll(true)
    //     const response = await httpService.get("/payments/refundEvent", {
    //         params : {
    //             eventID: data?.id
    //         }
    //     })

    //     toast.success(response?.data?.result);
    //     setLoadingAll(false)
    //     refetch()
        
    // } 

    return (
        <Flex width={"full"} flexDirection={"column"} > 
            <div className=' w-full flex justify-center relative ' > 
            </div>
        </Flex>
    )
}

export default DashboardRefund
