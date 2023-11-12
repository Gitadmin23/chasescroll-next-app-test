"use client"
import React from "react";
import { ElementsConsumer, CardElement, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CardSection from "../CardSection";
import { useMutation, useQueryClient } from "react-query";
import httpService from "@/utils/httpService";
import { useToast } from "@chakra-ui/react";
import CustomButton from "@/components/general/Button";
import LoadingAnimation from "@/components/sharedComponent/loading_animation";
import useModalStore from "@/global-state/useModalSwitch";
import useSettingsStore from "@/global-state/useSettingsState";
// import { useNavigate, useParams } from "react-router-dom"; 

interface IProps {
  index?: any
  config: any, 
  clientSecret?: any,
  fund?: any
}

export default function InjectedCheckoutForm(props: IProps) {

  const {
    index,
    config,
    clientSecret, 
    fund
  } = props

  const { setOpen, setShowModal  } = useModalStore((state) => state);
  const { setAmount } = useSettingsStore((state) => state); 
  const queryClient = useQueryClient() 

  const [loading, setLoading] = React.useState(false); 
  const toast = useToast()

  function CheckoutForm() {
    const stripe: any = useStripe();
    const elements: any = useElements();


    const stripeMutation = useMutation({
      mutationFn: (data) => httpService.post(`/payments/stripePaySuccessWeb?orderId=${data}`),
      onSuccess: () => { 
        toast({
          title: 'Success',
          description: "Payment verified",
          status: 'success',
          isClosable: true,
          duration: 5000,
          position: 'top-right',
        }); 
        queryClient.invalidateQueries(['all-events-details'+index])
        setShowModal(false)
      },
      onError: (error: any) => {
        toast({
          title: 'Error',
          description: "Error Occurred",
          status: 'error',
          isClosable: true,
          duration: 5000,
          position: 'top-right',
        }); 
      },
    });


    const stripeFund = useMutation({
      mutationFn: (data) => httpService.get(`/payments/api/wallet/verifyFundWalletWeb?transactionID=${data}`),
      onSuccess: (data) => { 
        toast({
          title: 'Success',
          description: "Payment verified",
          status: 'success',
          isClosable: true,
          duration: 5000,
          position: 'top-right',
        }); 
        setAmount("")
        setOpen(false)
        queryClient.invalidateQueries(['get-wallet-balanceUSD'])
      },
      onError: (error: any) => {

        toast({
          title: 'Error',
          description: "Error Occurred",
          status: 'error',
          isClosable: true,
          duration: 5000,
          position: 'top-right',
        }); 
      },
    });

    const handleSubmit = async () => { 
      // e.preventDefault();

      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      } 

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: `${window.location.origin}`,
        },
        redirect: "if_required"
      });
      console.log(paymentIntent);

      if (paymentIntent?.status === "succeeded") {
        console.log(paymentIntent);
        if (fund) {
          setLoading(false)
          stripeFund.mutate(config?.reference);
        } else {
          setLoading(false)
          stripeMutation.mutate(config?.reference);
        }
      }

      //   if (error.type === "card_error" || error.type === "validation_error") {
      //     setMessage(error.message);
      //   } else {
      //     setMessage("An unexpected error occured.");
      //   }
 
    };

    return (
      <>
        <LoadingAnimation loading={loading || stripeFund?.isLoading || stripeMutation?.isLoading} >

          <div id="payment-form" >
            <PaymentElement id="payment-element" />

            <CustomButton isLoading={loading} mt={"6"} onClick={() => handleSubmit()} text='Pay now' width={["full", "full"]} id="submit" />

          </div>
        </LoadingAnimation>
      </>
    );
  }

  return (
    <CheckoutForm />
  );
}