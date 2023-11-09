import React from "react";
import { ElementsConsumer, CardElement, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CardSection from "../CardSection";
import { useMutation, useQueryClient } from "react-query";
import httpService from "@/utils/httpService";
import { useToast } from "@chakra-ui/react";
import CustomButton from "@/components/general/Button";
// import { useNavigate, useParams } from "react-router-dom"; 

interface IProps {
  config: any,
  closeModal: any,
}

export default function InjectedCheckoutForm(props: IProps) {

  const {
    config,
    closeModal,
  } = props

  // const navigate = useNavigate()
  // const { id, orderId, orderCode } = useParams()
  const queryClient = useQueryClient()

  function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [isProcessing, setIsProcessing] = React.useState(false);
    const toast = useToast()


    const stripeMutation = useMutation({
      mutationFn: (data) => httpService.post(`/payments/stripePaySuccessWeb?orderId=${data}`),
      onSuccess: (data) => {
        // toast.success('Payment verified');
        toast({
          title: 'Success',
          description: "Payment verified",
          status: 'success',
          isClosable: true,
          duration: 5000,
          position: 'top-right',
        });
        // queryClient.invalidateQueries(['EventInfo'+id])  
        // getData() 
        closeModal()
      },
      onError: (error: any) => { 
        toast({
          title: 'Error',
          description: error,
          status: 'error',
          isClosable: true,
          duration: 5000,
          position: 'top-right',
        });
        // toast.error(error);
        setLoading(false)
        closeModal()
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
        // toast.success('Payment verified');
        // queryClient.invalidateQueries(['EventInfo'])  
        // getData()
        setLoading(false)
        closeModal(false)
      },
      onError: (error: any) => {

        toast({
          title: 'Error',
          description: error,
          status: 'error',
          isClosable: true,
          duration: 5000,
          position: 'top-right',
        });
        // toast.error(error);
        setLoading(false)
        closeModal()
      },
    });


    const handleSubmit = async () => {
      // e.preventDefault();

      setLoading(true)
      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }

      setIsProcessing(true);

      const { error, paymentIntent } = await stripe?.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: `${window.location.origin}`,
        },
        redirect: "if_required"
      });

      // console.log(paymentIntent);

      if (paymentIntent?.status === "succeeded") {
        // if (fund) {
        //   setLoading(true)
        //   stripeFund.mutate(config?.reference);
        // } else {
          stripeMutation.mutate(config?.reference);
        // }
      }

      //   if (error.type === "card_error" || error.type === "validation_error") {
      //     setMessage(error.message);
      //   } else {
      //     setMessage("An unexpected error occured.");
      //   }

      setIsProcessing(false);
    };

    return (
      <> 
        {!loading && (
          <form style={{width: "100%"}} id="payment-form" >
            <PaymentElement id="payment-element" />

            <CustomButton isLoading={loading} mt={"6"} onClick={handleSubmit} text='Pay now' width={["full", "full"]}  /> 
            {/* <button onClick={() => handleSubmit()} className={` bg-chasescrollBlue mt-6 font-semibold text-white w-full p-3 text-sm rounded-lg `} disabled={isProcessing || !stripe || !elements} id="submit">
              <span id="button-text">
                {isProcessing ? "Processing ... " : "Pay now"}
              </span>
            </button> */}
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
          </form>
        )}
      </>
    );
  }

  return (
    <CheckoutForm />
  );
}