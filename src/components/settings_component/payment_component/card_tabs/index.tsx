import { Box } from '@chakra-ui/react'
import React from 'react'
import FundWallet from './fund_wallet'

interface Props {
    tab: number, 
}

function CardTabs(props: Props) {
    const {
        tab, 
    } = props

    return (
        <Box width={"full"} > 
            {tab === 2 && (
                <FundWallet />
            )}
        </Box>
    )
}

export default CardTabs
