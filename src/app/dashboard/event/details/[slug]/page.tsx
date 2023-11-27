// import { Metadata } from "next"
import GetEventData from "../get_event_data" 
import type { Metadata } from 'next' 
import { IMAGE_URL } from "@/services/urls"
// import { URLS } from "@/services/urls"

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
    product = await fetch(url + "/events/events?id=" + id,  {
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


  export default function EventDetailsPage({ params }: Props) {

    return (
      <div> 
        <GetEventData event_index={params.slug} />
      </div>
    )
  }