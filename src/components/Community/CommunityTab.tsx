import { THEME } from '@/theme';
import { HStack, VStack } from '@chakra-ui/react';
import React from 'react'
import { FiPlusSquare } from 'react-icons/fi'
import CustomText from '../general/Text';
import { useRouter } from 'next/navigation'

interface IProps {
    activeTab: number;
    setActiveTab: (num: number) => void;
    showModal: () => void;
}

const TAB_TITLES = [
    'My communities',
    'Find Communities',
    'Requests'
]

const Tab = ({ title, isActive, onChange, index }: {
    title: string,
    isActive: boolean,
    onChange: (num: number) => void,
    index: number;
}) => {
    return (
        <HStack height={'100%'} cursor={'pointer'} onClick={() => onChange(index)} flex={1} justifyContent={'center'} alignItems={'center'} bg={isActive ? 'brand.chasescrollButtonBlue' : 'transparent'}>
            <CustomText textAlign={'center'} fontFamily={'Satoshi-Medium'} fontSize={['16px','20px']} color={isActive ? 'white':'grey'} >{title}</CustomText>
        </HStack>
    )
}

function CommunityTab({ activeTab, setActiveTab, showModal }: IProps) {
    const router = useRouter();
  return (
    <HStack width='100%' height='100px' alignItems={'center'}  borderBottomWidth={'2px'} borderBottomColor={'lightgrey'} >
        <HStack flex={1} height='100%'>
            { TAB_TITLES.map((item, index) => (
                <Tab index={index+1} title={item} key={index.toString()} isActive={activeTab === index + 1} onChange={setActiveTab}  />
            ))}
        </HStack>
        <VStack onClick={() => router.push('community/create')} display={['none', 'flex']} width='100px' height={'100%'} justifyContent={'center'} alignItems={'center'}>
            <FiPlusSquare size='30px' color={THEME.COLORS.chasescrollButtonBlue} />
        </VStack>
    </HStack>
  )
}

export default CommunityTab