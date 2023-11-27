
import React from 'react'  
import { IMAGE_URL } from '@/services/urls';
import type { Metadata } from 'next' 
import { Box } from '@chakra-ui/react';
import GetEventData from '@/app/dashboard/event/details/get_event_data';

type Props = {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
} 

export async function generateMetadata(
  { params }: Props, 
): Promise<Metadata> {
    // read route params
 
    const id = params.slug
    const url = process.env.NEXT_PUBLIC_BASE_URL as string
  
    // fetch data
    let product: any
    try {
      product = await fetch(url + "/events/events?id=" + id, {
        // headers: myHeaders,
        method: 'GET'
      }).then((res) => res.json())
  
      // console.log(product);
    } catch (error) {
      console.log(error);
  
    }  
    
      // optionally access and extend (rather than replace) parent metadata
      // const previousImages = (await parent).openGraph?.images || [] 
      
      return {
        title: product?.content[0]?.eventName,
        description: product?.content[0]?.eventDescription,
        openGraph: {
          title: product?.content[0]?.eventName,
          description: product?.content[0]?.eventDescription,
          images: [{
            url: IMAGE_URL + product?.content[0]?. currentPicUrl,
          }],
        },
      }
    }
  
  

function ShareEvent({ params }: Props) { 

  return ( 
      <GetEventData  dynamic={true} event_index={params.slug} /> 
  )
}

export default ShareEvent