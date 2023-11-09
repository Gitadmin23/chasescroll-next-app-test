import React from 'react'
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '../CheckoutForm';
import { Flex } from '@chakra-ui/react'

interface Props {  
    clientSecret: any,
    stripePromise: any,
    configData: any
}

function StripePopup(props: Props) {
    const {  
        clientSecret,
        stripePromise,
        configData
    } = props 
    

    return (
        <>  
                <Flex width={"full"} alignItems={"center"} justifyContent={"center"} p={"4"} flexDirection={"column"} >
                    {clientSecret?.length !== 0 && (
                        <Flex flexDirection={"column"} gap={"8"} py={"8"} className="flex flex-col gap-8 py-8">
                            <>
                                {clientSecret && stripePromise && (
                                    <Elements stripe={stripePromise} options={{ clientSecret }} >
                                        <CheckoutForm config={configData} closeModal={() => close} />
                                    </Elements>
                                )}
                            </>
                        </Flex>
                    )}
                </Flex> 
        </>
    )
}

export default StripePopup
