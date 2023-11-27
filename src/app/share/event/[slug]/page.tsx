
import React from 'react'
import { useSearchParams } from 'next/navigation'
import GetEventData from '@/app/dashboard/event/details/get_event_data';
import { IMAGE_URL } from '@/services/urls';
import type { Metadata } from 'next' 

type Props = {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
} 

export async function generateMetadata(
  { params }: Props, 
): Promise<Metadata> {
    // read route params
 
    const id = params.slug
  
    // fetch data
    let product: any
    try {
      product = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "?id=" + id, {
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
    <GetEventData event_index={params.slug} />
  )
}

export default ShareEvent