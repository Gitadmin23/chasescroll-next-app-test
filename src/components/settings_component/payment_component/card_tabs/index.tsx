import { Box } from '@chakra-ui/react'
import React from 'react'
import FundWallet from './fund_wallet'
import CashOut from './cash_out' 
import WalletTransaction from './fund_wallet/wallet_transaction'

interface Props {
    tab: number,
    currency: string
}

function CardTabs(props: Props) {
    const {
        tab,
        currency
    } = props

    return (
        <Box width={"full"} >
            {tab === 1 && (
                <CashOut currency={currency} />
            )}
            {tab === 2 && (
                <FundWallet currency={currency} />
            )}
            {tab === 3 && (
                <WalletTransaction  />
            )}
        </Box>
    )
}

export default CardTabs