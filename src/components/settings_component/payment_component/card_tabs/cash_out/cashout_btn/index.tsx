import React from 'react'
import { Box, useToast } from '@chakra-ui/react'
import ModalLayout from '@/components/sharedComponent/modal_layout'
import AddBankInfo from '../modals/add_bank_info'
import BankOtp from '../modals/bank_otp'
import httpService from '@/utils/httpService'
import CustomButton from '@/components/general/Button'
import useSettingsStore from '@/global-state/useSettingsState'

interface Props {
    currency: string,
    amount: any,
}

function CashoutBtn(props: Props) {
    const {
        currency,
        amount,
    } = props

    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [modalType, setModalType] = React.useState(0)
    const [transferCode, settransferCode] = React.useState("")
    const toast = useToast()

    const { setAmount } = useSettingsStore((state) => state);

    const clickHandler = async () => {
        setLoading(true)
        let response: any
        if (currency === "USD") {
            response = await httpService.get("/payments/account/check")
        } else {
            response = await httpService.get("/payments/account/checkPaystack")
        }
        if (!response?.data) {
            if (currency === "USD") {
                const request: any = await httpService.get(`/payments/account/oauthOnboard`)
                console.log(request);
                if (request?.data?.checkout) {
                    window.open(request?.data?.checkout, '_blank')
                }
            } else {
                setOpen(true)
            }
        } else {
            const request: any = await httpService.post(`/payments/account/withdraw?currency=${currency}&amount=${amount}`)
            
            if (request?.data?.status === "SUCCESS") {
                toast({
                    title: 'Success',
                    description: "Withdraw Success",
                    status: 'success',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });
                setAmount("")
            } else if (request?.data?.status === "ok") {
                toast({
                    title: 'Success',
                    description: "Withdraw Success",
                    status: 'success',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                });

                setAmount("")
            } else if (request?.data?.status === "OTP") {
                settransferCode(request?.transfer_code)
                setModalType(1)
                setOpen(true)
            } else {

                toast({
                    title: 'Error',
                    description: "Error Occurred",
                    status: 'error',
                    isClosable: true,
                    duration: 5000,
                    position: 'top-right',
                }); 
            }
        }
        setLoading(false)
    }

    return (
        <Box width={"full"} >
            <CustomButton backgroundColor={"#12299C"} onClick={() => clickHandler()} text='Withdraw' isLoading={loading} disable={loading} marginTop={"8"} />
            <ModalLayout open={open} close={setOpen} title='Bank Information' >
                {modalType === 0 && (
                    <AddBankInfo close={setOpen} />
                )}
                {modalType === 1 && (
                    <BankOtp close={setOpen} currency={currency} transferCode={transferCode} />
                )}
            </ModalLayout>
        </Box>
    )
}

export default CashoutBtn
